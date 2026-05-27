import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSocket } from "../../context/SocketContext";
import type { RoomJoinedPayload, SessionStartedPayload } from "../../types/socket";
import textData from "../../locales/ua.json";
import Spinner from "../../components/Spinner";
import ThemeToggle from "../../components/ThemeToggle";

type Phase = "form" | "waiting";

interface JoinFields {
  name: string;
}

export default function JoinPage() {
  const [searchParams] = useSearchParams();
  const pin = searchParams.get("pin") ?? "";

  const [phase, setPhase] = useState<Phase>("form");
  const [socketError, setSocketError] = useState<string | null>(null);
  const [pollTitle, setPollTitle] = useState<string | null>(null);
  const [pollDescription, setPollDescription] = useState<string | null>(null);

  const { socket, emit, connected } = useSocket();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<JoinFields>({ mode: "onTouched" });

  useEffect(() => {
    if (!socket || phase !== 'waiting') return;
    const onReconnect = () => {
      const id = localStorage.getItem('participantId');
      const name = localStorage.getItem('participantName');
      if (id && name) emit('join_room', { pin, participantName: name, participantId: id });
    };
    socket.on('connect', onReconnect);
    return () => { socket.off('connect', onReconnect); };
  }, [socket, phase, pin, emit]);

  useEffect(() => {
    if (!socket) return;

    const onJoined = (payload: RoomJoinedPayload) => {
      localStorage.setItem("participantId", payload.participantId);
      localStorage.setItem("activePin", pin);
      localStorage.setItem("participantName", getValues("name").trim());
      setPollTitle(payload.pollTitle);
      setPollDescription(payload.pollDescription);
      setPhase("waiting");
    };

    const onStarted = (_payload: SessionStartedPayload) => {
      navigate(`/play/${pin}`, { replace: true });
    };

    const onError = (payload: { message: string }) => {
      setSocketError(payload.message);
      setPhase("form");
    };

    socket.on("room_joined", onJoined);
    socket.on("session_started", onStarted);
    socket.on("error", onError);
    socket.on("question_active", (payload) => navigate(`/play/${pin}`, { replace: true, state: { initialQuestion: payload } }));

    return () => {
      socket.off("room_joined", onJoined);
      socket.off("session_started", onStarted);
      socket.off("error", onError);
      socket.off("question_active");
    };
  }, [socket, pin, navigate, getValues]);

  function onSubmit(data: JoinFields) {
    const trimmed = data.name.trim();
    if (!trimmed || !pin) return;
    setSocketError(null);
    const storedPin = localStorage.getItem("activePin");
    const participantId = storedPin === pin ? (localStorage.getItem("participantId") ?? undefined) : undefined;
    emit("join_room", { pin, participantName: trimmed, participantId });
  }

  if (phase === "waiting") {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-50 px-4 dark:bg-slate-950">
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        {pollTitle && (
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-sm text-center ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700">
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
              {textData.join.pinPrefix} {pin}
            </p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">{pollTitle}</h2>
            {pollDescription && (
              <p className="mt-2 text-sm text-gray-500 dark:text-slate-400">{pollDescription}</p>
            )}
          </div>
        )}
        <Spinner size="lg" />
        <p className="text-lg font-semibold text-indigo-700 dark:text-indigo-300">{textData.join.waitingTitle}</p>
        {!pollTitle && (
          <p className="text-sm text-gray-500 dark:text-slate-400">{textData.join.pinPrefix} {pin}</p>
        )}
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 dark:bg-slate-950">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-sm text-center ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700">
        <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          {textData.join.pinPrefix} {pin}
        </p>
        <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">{textData.join.nameTitle}</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4">
          <input
            type="text"
            autoFocus
            maxLength={40}
            placeholder={textData.join.namePlaceholder}
            className="w-full rounded-2xl border-2 border-gray-200 bg-white px-5 py-4 text-center text-xl font-medium text-gray-900 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder:text-slate-400 dark:focus:border-indigo-400 dark:focus:ring-indigo-900/30"
            {...register("name", { required: textData.validation.required })}
          />
          {errors.name && <p className="text-sm text-red-500 dark:text-red-400">{errors.name.message}</p>}
          {socketError && <p className="text-sm text-red-500 dark:text-red-400">{socketError}</p>}

          <button
            type="submit"
            disabled={isSubmitting || !connected}
            className="w-full rounded-2xl bg-indigo-600 py-4 text-xl font-bold text-white shadow-md hover:bg-indigo-700 disabled:opacity-40">
            {textData.join.submitButton}
          </button>

          {!connected && <p className="text-xs text-gray-400 dark:text-slate-500">{textData.join.connecting}</p>}
        </form>
      </div>
    </div>
  );
}
