import { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import textData from '../../locales/ua.json';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../../components/ThemeToggle';

type Role = null | 'participant' | 'organizer';

interface PinFields {
  pin: string;
}

export default function HomePage() {
  const { isAuthenticated } = useAuth();
  const [role, setRole] = useState<Role>(null);
  const navigate = useNavigate();

  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  const { register, handleSubmit, formState: { errors } } = useForm<PinFields>({ mode: 'onTouched' });

  function onJoin(data: PinFields) {
    navigate(`/join?pin=${data.pin.trim()}`);
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-10 dark:bg-slate-950">

      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <h1 className="mb-1 text-5xl font-black text-indigo-600 dark:text-indigo-400">{textData.appName}</h1>
      <p className="mb-10 text-sm text-gray-500 dark:text-slate-400">{textData.home.tagline}</p>

      {role === null && (
        <div className="flex w-full max-w-sm flex-col gap-4">
          <button
            onClick={() => setRole('participant')}
            className="group flex flex-col items-start rounded-2xl border-2 border-gray-200 bg-white px-6 py-5 shadow-sm transition hover:border-indigo-400 hover:shadow-md active:scale-[.98] dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-500"
          >
            <span className="text-lg font-bold text-gray-900 dark:text-white">{textData.home.roleParticipant}</span>
            <span className="text-sm text-gray-600 dark:text-slate-300">{textData.home.roleParticipantDesc}</span>
          </button>

          <button
            onClick={() => setRole('organizer')}
            className="group flex flex-col items-start rounded-2xl border-2 border-gray-200 bg-white px-6 py-5 shadow-sm transition hover:border-indigo-400 hover:shadow-md active:scale-[.98] dark:border-slate-700 dark:bg-slate-800 dark:hover:border-indigo-500"
          >
            <span className="text-lg font-bold text-gray-900 dark:text-white">{textData.home.roleOrganizer}</span>
            <span className="text-sm text-gray-600 dark:text-slate-300">{textData.home.roleOrganizerDesc}</span>
          </button>
        </div>
      )}

      {role === 'participant' && (
        <div className="w-full max-w-sm">
          <form onSubmit={handleSubmit(onJoin)} className="flex flex-col gap-4">
            <label className="block text-center text-sm font-medium text-gray-600 dark:text-slate-300">
              {textData.home.pinLabel}
            </label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={8}
              autoFocus
              placeholder={textData.home.pinPlaceholder}
              className="w-full rounded-2xl border-2 border-gray-200 bg-white px-6 py-5 text-center text-4xl font-bold tracking-widest text-indigo-800 outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-800 dark:text-indigo-300 dark:focus:border-indigo-400 dark:focus:ring-indigo-900/30"
              {...register('pin', {
                required: textData.validation.required,
                minLength: { value: 4, message: textData.validation.pinMin },
                onChange: (event) => {
                  event.target.value = event.target.value.replace(/\D/g, '');
                },
              })}
            />
            {errors.pin && <p className="text-center text-xs text-red-500 dark:text-red-400">{errors.pin.message}</p>}
            <button
              type="submit"
              className="w-full rounded-2xl bg-indigo-600 py-5 text-2xl font-bold text-white shadow-md transition hover:bg-indigo-700 disabled:opacity-40"
            >
              {textData.home.joinButton}
            </button>
          </form>

          <button
            onClick={() => setRole(null)}
            className="mt-5 flex w-full items-center justify-center gap-1 text-sm text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <ArrowLeft size={14} />
            {textData.home.backToRoles}
          </button>
        </div>
      )}

      {role === 'organizer' && (
        <div className="flex w-full max-w-sm flex-col gap-4">
          <Link
            to="/dashboard"
            className="w-full rounded-2xl bg-indigo-600 py-5 text-center text-2xl font-bold text-white shadow-md transition hover:bg-indigo-700"
          >
            {textData.home.organizerButton}
          </Link>

          <button
            onClick={() => setRole(null)}
            className="flex w-full items-center justify-center gap-1 text-sm text-indigo-500 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
          >
            <ArrowLeft size={14} />
            {textData.home.backToRoles}
          </button>
        </div>
      )}
    </div>
  );
}
