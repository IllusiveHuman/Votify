import { QuestionType } from '@prisma/client';

interface OptionForScoring {
  id: number;
  isCorrect: boolean;
  points: number;
}

interface QuestionForScoring {
  type: QuestionType;
  points: number;
  options: OptionForScoring[];
}

// =============================================================
// Серверний скоринг відповідей.
//
// Архітектурний принцип: клієнт НІКОЛИ не знає правильних відповідей.
// isCorrect передається лише всередині сервера.
//
// Правила нарахування балів:
// - SINGLE_CHOICE: question.points якщо вибрано правильний варіант, 0 інакше
// - MULTIPLE_CHOICE:
//     • Будь-який неправильний варіант → 0 (штраф за вгадування)
//     • Інакше → сума option.points для кожного правильно вибраного варіанту
// =============================================================
export function calculateScore(
  question: QuestionForScoring,
  selectedOptionIds: number[],
): number {
  const correctOptions = question.options.filter((o) => o.isCorrect);
  if (correctOptions.length === 0) return 0;

  const correctIds = correctOptions.map((o) => o.id);
  const hasIncorrect = selectedOptionIds.some((id) => !correctIds.includes(id));
  if (hasIncorrect) return 0;

  if (question.type === QuestionType.SINGLE_CHOICE) {
    return selectedOptionIds.some((id) => correctIds.includes(id)) ? question.points : 0;
  }

  // MULTIPLE_CHOICE: сума балів за кожен правильно вибраний варіант
  return selectedOptionIds
    .filter((id) => correctIds.includes(id))
    .reduce((sum, id) => {
      const opt = question.options.find((o) => o.id === id);
      return sum + (opt?.points ?? 100);
    }, 0);
}

// Валідація перед обробкою — повертає { valid, error }
export function validateSubmittedOptions(
  question: QuestionForScoring,
  selectedOptionIds: number[],
): { valid: boolean; error?: string } {
  if (!Array.isArray(selectedOptionIds) || selectedOptionIds.length === 0) {
    return { valid: false, error: 'At least one option must be selected' };
  }

  const validIds = question.options.map((o) => o.id);
  const invalid = selectedOptionIds.filter((id) => !validIds.includes(id));

  if (invalid.length > 0) {
    return { valid: false, error: `Invalid option IDs: ${invalid.join(', ')}` };
  }

  if (question.type === QuestionType.SINGLE_CHOICE && selectedOptionIds.length > 1) {
    return { valid: false, error: 'Single choice question allows only one answer' };
  }

  return { valid: true };
}
