import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useForm,
  useFieldArray,
  useWatch,
  type Control,
  type UseFormRegister,
  type UseFormSetValue,
} from "react-hook-form";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { pollsApi } from "../../services/api";
import type { Question, QuestionType } from "../../types/api";
import textData from "../../locales/ua.json";
import Spinner from "../../components/Spinner";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";
import Checkbox from "../../components/Checkbox";
import Radio from "../../components/Radio";
import { GripVertical, X, ArrowLeft, Lock } from "lucide-react";

// ── Form types ────────────────────────────────────────────────────────────────

interface OptionForm {
  text: string;
  isCorrect: boolean;
  points: number;
}

interface QuestionForm {
  text: string;
  type: QuestionType;
  timeLimit: number | undefined;
  points: number;
  options: OptionForm[];
}

interface BuilderForm {
  title: string;
  description: string;
  progressionMode: "AUTO" | "MANUAL";
  questions: QuestionForm[];
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const TYPE_LABEL: Record<QuestionType, string> = {
  SINGLE_CHOICE: textData.builder.typeSingle,
  MULTIPLE_CHOICE: textData.builder.typeMultiple,
};

const TYPE_BADGE: Record<QuestionType, string> = {
  SINGLE_CHOICE: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300",
  MULTIPLE_CHOICE: "bg-violet-100 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300",
};

function emptyQuestion(): QuestionForm {
  return {
    text: "",
    type: "SINGLE_CHOICE",
    timeLimit: undefined,
    points: 100,
    options: [
      { text: "", isCorrect: false, points: 100 },
      { text: "", isCorrect: false, points: 100 },
    ],
  };
}

function fromServerQuestion(serverQuestion: Question): QuestionForm {
  return {
    text: serverQuestion.text,
    type: serverQuestion.type,
    timeLimit: serverQuestion.timeLimit ?? undefined,
    points: serverQuestion.points ?? 100,
    options: serverQuestion.options.map((serverOption) => ({
      text: serverOption.text,
      isCorrect: serverOption.isCorrect,
      points: serverOption.points ?? 100,
    })),
  };
}

// ── DragOverlay preview ────────────────────────────────────────────────────────

function QuestionDragPreview({ qIdx, control }: { qIdx: number; control: Control<BuilderForm> }) {
  const questionText = useWatch({ control, name: `questions.${qIdx}.text` });
  const questionType = useWatch({ control, name: `questions.${qIdx}.type` });

  return (
    <div className="rounded-2xl bg-white shadow-2xl ring-2 ring-indigo-400/50 dark:bg-slate-800 dark:ring-indigo-500/50">
      <div className="flex items-center gap-3 px-5 py-4">
        <span className="shrink-0 cursor-grabbing touch-none">
          <GripVertical
            size={16}
            className="text-gray-300 dark:text-indigo-400"
          />
        </span>
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
          {qIdx + 1}
        </span>
        <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800 dark:text-slate-200">
          {questionText || <span className="text-gray-400 dark:text-slate-400">{textData.builder.noText}</span>}
        </span>
        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_BADGE[questionType]}`}>
          {TYPE_LABEL[questionType]}
        </span>
      </div>
    </div>
  );
}

// ── QuestionEditor ─────────────────────────────────────────────────────────────

interface QuestionEditorProps {
  qIdx: number;
  fieldId: string;
  control: Control<BuilderForm>;
  register: UseFormRegister<BuilderForm>;
  setValue: UseFormSetValue<BuilderForm>;
  onRemove: () => void;
  isOpen: boolean;
  onToggle: () => void;
  isManual: boolean;
}

function QuestionEditor({
  qIdx,
  fieldId,
  control,
  register,
  setValue,
  onRemove,
  isOpen,
  onToggle,
  isManual,
}: QuestionEditorProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: fieldId,
  });

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `questions.${qIdx}.options`,
  });

  const questionText = useWatch({ control, name: `questions.${qIdx}.text` });
  const questionType = useWatch({ control, name: `questions.${qIdx}.type` });
  const options = useWatch({ control, name: `questions.${qIdx}.options` });

  function handleTypeChange(newType: QuestionType) {
    setValue(`questions.${qIdx}.type`, newType);
    if (newType === "SINGLE_CHOICE") {
      const firstCorrectIdx = (options ?? []).findIndex((option) => option.isCorrect);
      (options ?? []).forEach((_, optionIndex) => {
        setValue(`questions.${qIdx}.options.${optionIndex}.isCorrect`, optionIndex === firstCorrectIdx && firstCorrectIdx !== -1);
      });
    }
  }

  function handleCorrectChange(optionIndex: number, checked: boolean) {
    if (questionType === "SINGLE_CHOICE") {
      (options ?? []).forEach((_, idx) => {
        setValue(`questions.${qIdx}.options.${idx}.isCorrect`, idx === optionIndex ? checked : false);
      });
    } else {
      setValue(`questions.${qIdx}.options.${optionIndex}.isCorrect`, checked);
    }
  }

  return (
    <div
      ref={setNodeRef}
      style={isDragging ? { transition } : { transform: CSS.Transform.toString(transform), transition }}
      className={`rounded-2xl bg-white ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700/50 ${isDragging ? "opacity-0" : ""}`}>
      {/* ── Collapsed header ── */}
      <div
        className="flex cursor-pointer items-center gap-3 px-5 py-4"
        onClick={onToggle}>
        <span
          {...attributes}
          {...listeners}
          className="shrink-0 cursor-grab touch-none active:cursor-grabbing"
          onClick={(event) => event.stopPropagation()}>
          <GripVertical
            size={16}
            className="text-gray-300 dark:text-slate-600"
          />
        </span>

        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400">
          {qIdx + 1}
        </span>

        <span className="min-w-0 flex-1 truncate text-sm font-medium text-gray-800 dark:text-slate-200">
          {questionText || <span className="text-gray-400 dark:text-slate-400">{textData.builder.noText}</span>}
        </span>

        <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${TYPE_BADGE[questionType]}`}>
          {TYPE_LABEL[questionType]}
        </span>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
          className="shrink-0 rounded-lg p-1.5 text-gray-500 transition hover:bg-red-50 hover:text-red-500 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400">
          <X size={14} />
        </button>
      </div>

      {/* ── Expanded editor ── */}
      {isOpen && (
        <div className="border-t border-gray-100 px-5 pb-6 pt-5 dark:border-slate-700/50">
          <div className="mb-5">
            <label className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-slate-300">
              {textData.builder.labelQuestionText}
            </label>
            <Input
              placeholder={textData.builder.placeholderQuestionText}
              {...register(`questions.${qIdx}.text`)}
            />
          </div>

          <div className={`mb-5 grid gap-4 ${questionType === "SINGLE_CHOICE" ? "grid-cols-3" : "grid-cols-2"}`}>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-slate-300">
                {textData.builder.labelType}
              </label>
              <Select
                value={questionType}
                onChange={(event) => handleTypeChange(event.target.value as QuestionType)}>
                <option value="SINGLE_CHOICE">{textData.builder.typeSingle}</option>
                <option value="MULTIPLE_CHOICE">{textData.builder.typeMultiple}</option>
              </Select>
            </div>
            <div>
              <label
                className={`mb-1.5 block text-sm font-medium ${isManual ? "text-gray-400 dark:text-slate-500" : "text-gray-600 dark:text-slate-300"}`}>
                {textData.builder.labelTimeLimit}
              </label>
              {isManual ? (
                <input
                  type="number"
                  disabled
                  placeholder={textData.builder.timeLimitManualHint}
                  className="w-full cursor-not-allowed rounded-xl bg-gray-100 px-4 py-2.5 text-sm opacity-50 outline-none dark:bg-slate-700/60"
                />
              ) : (
                <Input
                  type="number"
                  min={5}
                  max={300}
                  placeholder={textData.builder.timeLimitPlaceholder}
                  {...register(`questions.${qIdx}.timeLimit`, {
                    setValueAs: (rawValue) => (rawValue === "" || rawValue == null ? undefined : Number(rawValue)),
                  })}
                />
              )}
              <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                {isManual ? textData.builder.timeLimitManualHint : textData.builder.timeLimitHint}
              </p>
            </div>
            {questionType === "SINGLE_CHOICE" && (
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-slate-300">
                  {textData.builder.labelPoints}
                </label>
                <Input
                  type="number"
                  min={1}
                  max={10000}
                  placeholder="100"
                  {...register(`questions.${qIdx}.points`, {
                    setValueAs: (v) => (v === "" || v == null ? 100 : Number(v)),
                  })}
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                  {textData.builder.pointsHint}
                </p>
              </div>
            )}
          </div>

          <div className="mb-3">
            <label className="mb-2 block text-sm font-medium text-gray-600 dark:text-slate-300">
              {textData.builder.labelOptions}
            </label>
            <div className="flex flex-col gap-2">
              {optionFields.map((optField, optionIndex) => (
                <div
                  key={optField.id}
                  className="flex items-center gap-2">
                  {questionType === "SINGLE_CHOICE" ? (
                    <Radio
                      checked={options?.[optionIndex]?.isCorrect ?? false}
                      name={`correct-${fieldId}`}
                      onChange={(event) => handleCorrectChange(optionIndex, event.target.checked)}
                      title={textData.builder.checkboxCorrect}
                    />
                  ) : (
                    <Checkbox
                      checked={options?.[optionIndex]?.isCorrect ?? false}
                      onChange={(event) => handleCorrectChange(optionIndex, event.target.checked)}
                      title={textData.builder.checkboxCorrect}
                    />
                  )}
                  <Input
                    className="py-2"
                    placeholder={`${textData.builder.optionPlaceholder} ${optionIndex + 1}`}
                    {...register(`questions.${qIdx}.options.${optionIndex}.text`)}
                  />
                  {questionType === "MULTIPLE_CHOICE" && (
                    <div className="flex shrink-0 items-center gap-1">
                      <Input
                        type="number"
                        min={1}
                        max={10000}
                        className={`w-20 py-2 transition-opacity ${options?.[optionIndex]?.isCorrect ? "" : "pointer-events-none opacity-30"}`}
                        placeholder="100"
                        disabled={!options?.[optionIndex]?.isCorrect}
                        {...register(`questions.${qIdx}.options.${optionIndex}.points`, {
                          setValueAs: (v) => (v === "" || v == null ? 100 : Number(v)),
                        })}
                      />
                      <span className={`text-xs transition-opacity ${options?.[optionIndex]?.isCorrect ? "text-gray-400 dark:text-slate-500" : "opacity-30 text-gray-400 dark:text-slate-500"}`}>
                        {textData.builder.optionPointsLabel}
                      </span>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => removeOption(optionIndex)}
                    disabled={optionFields.length <= 2}
                    className="shrink-0 rounded-lg p-1.5 text-gray-500 transition hover:bg-red-50 hover:text-red-500 disabled:pointer-events-none disabled:opacity-30 dark:text-slate-400 dark:hover:bg-red-500/10 dark:hover:text-red-400">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => appendOption({ text: "", isCorrect: false, points: 100 })}
            className="rounded-xl border border-dashed border-indigo-300 px-4 py-1.5 text-sm text-indigo-600 transition hover:border-indigo-400 hover:bg-indigo-50 dark:border-indigo-500/40 dark:text-indigo-400 dark:hover:border-indigo-400 dark:hover:bg-indigo-500/10">
            {textData.builder.addOption}
          </button>
        </div>
      )}
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────

export default function BuilderPage() {
  const { id } = useParams<{ id: string }>();
  const isNew = id === "new";
  const navigate = useNavigate();

  const [loading, setLoading] = useState(!isNew);
  const [isLocked, setIsLocked] = useState(false);
  const [editingIdx, setEditingIdx] = useState<number | null>(0);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const titleRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BuilderForm>({
    defaultValues: {
      title: "",
      description: "",
      progressionMode: "AUTO",
      questions: [emptyQuestion()],
    },
  });

  const progressionMode = useWatch({ control, name: "progressionMode" });
  const isManual = progressionMode === "MANUAL";

  const {
    fields: questionFields,
    append: appendQuestion,
    remove: removeQuestion,
    move: moveQuestion,
  } = useFieldArray({ control, name: "questions" });

  useEffect(() => {
    if (isNew) {
      titleRef.current?.focus();
      return;
    }
    pollsApi
      .get(id!)
      .then((pollResponse) => {
        const sorted = [...pollResponse.data.questions].sort((a, b) => a.order - b.order);
        reset({
          title: pollResponse.data.title,
          description: pollResponse.data.description ?? "",
          progressionMode: pollResponse.data.progressionMode ?? "AUTO",
          questions: sorted.map(fromServerQuestion),
        });
        setIsLocked((pollResponse.data._count?.sessions ?? 0) > 0);
      })
      .finally(() => setLoading(false));
  }, [id, isNew, reset]);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  function onDragStart({ active }: DragStartEvent) {
    setActiveId(active.id as string);
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = questionFields.findIndex((field) => field.id === active.id);
    const newIdx = questionFields.findIndex((field) => field.id === over.id);
    moveQuestion(oldIdx, newIdx);
  }

  const activeIdx = activeId ? questionFields.findIndex((field) => field.id === activeId) : -1;

  async function onSubmit(data: BuilderForm) {
    setSaveError(null);
    const body = {
      title: data.title,
      description: data.description || undefined,
      progressionMode: data.progressionMode,
      questions: data.questions.map((questionItem, questionIndex) => ({
        text: questionItem.text,
        type: questionItem.type,
        timeLimit: data.progressionMode === "MANUAL" ? undefined : (questionItem.timeLimit ?? undefined),
        order: questionIndex,
        points: questionItem.points ?? 100,
        options: questionItem.options.map((optionItem) => ({
          text: optionItem.text,
          isCorrect: optionItem.isCorrect,
          points: optionItem.points ?? 100,
        })),
      })),
    };
    try {
      if (isNew) {
        await pollsApi.create(body);
      } else {
        await pollsApi.update(id!, body);
      }
      navigate("/dashboard");
    } catch (caughtError: unknown) {
      const axiosError = caughtError as { response?: { data?: { error?: string } } };
      setSaveError(axiosError?.response?.data?.error ?? "Не вдалося зберегти опитування");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-slate-950">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-950">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* ── Sticky header ── */}
        <header className="sticky top-0 z-10 border-b border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-slate-700/60 dark:bg-slate-900 dark:shadow-lg dark:shadow-black/20">
          <div className="mx-auto flex max-w-3xl items-center justify-between">
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200">
                <ArrowLeft size={15} />
                {textData.backToDashboard}
              </Link>
              <span className="text-gray-400 dark:text-slate-600">/</span>
              <h1 className="flex items-center gap-1.5 text-base font-semibold text-gray-800 dark:text-slate-200">
                {isNew ? textData.builder.titleNew : isLocked ? textData.builder.titleLocked : textData.builder.titleEdit}
                {isLocked && <Lock size={14} className="text-amber-500" />}
              </h1>
            </div>
            <div className="flex flex-col items-end gap-1">
              {saveError && (
                <p className="text-xs font-medium text-red-500 dark:text-red-400">{saveError}</p>
              )}
              {!isLocked && (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-[.98] disabled:opacity-50">
                  {isSubmitting && <Spinner size="sm" />}
                  {textData.builder.save}
                </button>
              )}
            </div>
          </div>
        </header>

        {isLocked && (
          <div className="border-b border-amber-200 bg-amber-50 px-6 py-3 dark:border-amber-500/20 dark:bg-amber-500/10">
            <div className="mx-auto flex max-w-3xl items-start gap-2.5">
              <Lock size={15} className="mt-0.5 shrink-0 text-amber-600 dark:text-amber-400" />
              <p className="text-sm text-amber-800 dark:text-amber-300">
                {textData.builder.lockedBanner}{" "}
                <span className="font-semibold">{textData.builder.lockedBannerAction}</span>
              </p>
            </div>
          </div>
        )}

        <main className="mx-auto max-w-3xl px-4 py-8">
          {/* ── Poll meta ── */}
          <section className="mb-6 rounded-2xl bg-white p-6 ring-1 ring-gray-200 dark:bg-slate-800 dark:ring-slate-700/50">
            <div className="mb-4">
              <label className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-slate-300">
                {textData.builder.labelTitle}
              </label>
              <Input
                placeholder={textData.builder.placeholderTitle}
                error={!!errors.title}
                {...(() => {
                  const { ref, ...rest } = register("title", { required: textData.builder.alertNoTitle });
                  return {
                    ...rest,
                    ref: (el: HTMLInputElement | null) => {
                      ref(el);
                      titleRef.current = el;
                    },
                  };
                })()}
              />
              {errors.title && <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.title.message}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-slate-300">
                {textData.builder.labelDescription}
              </label>
              <Textarea
                rows={2}
                placeholder={textData.builder.placeholderDescription}
                {...register("description")}
              />
            </div>

            {/* ── Progression mode toggle ── */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-gray-50 px-4 py-3 dark:bg-slate-700/40">
              <div>
                <p className="text-sm font-medium text-gray-700 dark:text-slate-200">{textData.builder.modeLabel}</p>
                <p className="text-xs text-gray-500 dark:text-slate-400">
                  {isManual ? textData.builder.modeManualHint : textData.builder.modeAutoHint}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm ${!isManual ? "font-semibold text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-slate-400"}`}>
                  {textData.builder.modeAuto}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const next = isManual ? "AUTO" : "MANUAL";
                    setValue("progressionMode", next, { shouldDirty: true });
                    if (next === "MANUAL") {
                      getValues("questions").forEach((_, questionIndex) => {
                        setValue(`questions.${questionIndex}.timeLimit`, undefined, { shouldDirty: true });
                      });
                    }
                  }}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-slate-800 ${isManual ? "bg-indigo-600" : "bg-gray-200 dark:bg-slate-600"}`}>
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${isManual ? "translate-x-6" : "translate-x-1"}`}
                  />
                </button>
                <span
                  className={`text-sm ${isManual ? "font-semibold text-indigo-600 dark:text-indigo-400" : "text-gray-500 dark:text-slate-400"}`}>
                  {textData.builder.modeManual}
                </span>
              </div>
            </div>
          </section>

          {/* ── Questions ── */}
          <div className="mb-3">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-slate-400">
              Питання ({questionFields.length})
            </h2>
          </div>

          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragCancel={() => setActiveId(null)}>
            <SortableContext
              items={questionFields.map((field) => field.id)}
              strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-3">
                {questionFields.map((field, qIdx) => (
                  <QuestionEditor
                    key={field.id}
                    qIdx={qIdx}
                    fieldId={field.id}
                    control={control}
                    register={register}
                    setValue={setValue}
                    onRemove={() => {
                      removeQuestion(qIdx);
                      if (editingIdx === qIdx) setEditingIdx(null);
                    }}
                    isOpen={editingIdx === qIdx}
                    onToggle={() => setEditingIdx(editingIdx === qIdx ? null : qIdx)}
                    isManual={isManual}
                  />
                ))}
              </div>
            </SortableContext>

            <DragOverlay dropAnimation={null}>
              {activeIdx !== -1 && (
                <QuestionDragPreview
                  qIdx={activeIdx}
                  control={control}
                />
              )}
            </DragOverlay>
          </DndContext>

          {/* ── Add question ── */}
          <button
            type="button"
            onClick={() => {
              appendQuestion(emptyQuestion());
              setEditingIdx(questionFields.length);
            }}
            className="mt-4 w-full rounded-2xl border-2 border-dashed border-gray-200 py-4 text-sm font-medium text-gray-500 transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:text-slate-400 dark:hover:border-indigo-500/60 dark:hover:text-indigo-400">
            {textData.builder.addQuestion}
          </button>
        </main>
      </form>
    </div>
  );
}
