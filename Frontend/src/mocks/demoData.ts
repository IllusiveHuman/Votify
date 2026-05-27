import type { SessionListItem, SessionResults } from '../types/api';

// Deterministic LCG — same seed → same data every render
function makeRng(seed: number) {
  let s = seed >>> 0;
  return (): number => {
    s = (Math.imul(1664525, s) + 1013904223) >>> 0;
    return s / 0x100000000;
  };
}

const PARTICIPANT_NAMES = [
  'Олег Петренко', 'Марія Коваленко', 'Іван Шевченко', 'Анна Бондаренко',
  'Дмитро Мельник', 'Катерина Ткаченко', 'Андрій Кравченко', 'Юлія Бойко',
  'Микола Лисенко', 'Олена Гриценко', 'Тарас Мороз', 'Ірина Кузьменко',
  'Сергій Поліщук', 'Людмила Павленко', 'Владислав Сидоренко', 'Наталія Марченко',
  'Роман Захаренко', 'Вікторія Герасименко', 'Богдан Пономаренко', 'Оксана Василенко',
  'Євген Тимченко', 'Аліна Зінченко', 'Максим Карпенко', 'Діана Федоренко',
  'Артем Литвиненко', 'Поліна Овдієнко', 'Антон Горбаченко', 'Таміла Даниленко',
  'Кирило Середа', 'Галина Вовченко', 'Денис Нечипоренко', 'Лілія Примаченко',
  'Ярослав Гонченко', 'Христина Білоус', 'Вадим Дяченко', 'Надія Пилипенко',
  'Павло Наливайко', 'Зоряна Саченко', 'Леонід Гладченко', 'Валерія Корнієнко',
  'Тимур Хоменко', 'Інна Луценко', 'Станіслав Соловйов', 'Лариса Руденко',
  'Олексій Власенко', 'Тетяна Матвієнко', 'Руслан Білоченко', 'Світлана Пасічник',
  'Григорій Коломієць', 'Валентина Шульга',
];

interface QDef {
  id: string;
  text: string;
  type: 'SINGLE_CHOICE' | 'MULTIPLE_CHOICE';
  points: number;
  correctRate: number;
  options: { id: string; text: string; isCorrect: boolean; points: number }[];
}

const QUESTION_DEFS: QDef[] = [
  {
    id: 'dq1', text: 'Яка столиця України?',
    type: 'SINGLE_CHOICE', points: 10, correctRate: 0.88,
    options: [
      { id: 'dq1o1', text: 'Київ', isCorrect: true, points: 10 },
      { id: 'dq1o2', text: 'Харків', isCorrect: false, points: 0 },
      { id: 'dq1o3', text: 'Одеса', isCorrect: false, points: 0 },
      { id: 'dq1o4', text: 'Львів', isCorrect: false, points: 0 },
    ],
  },
  {
    id: 'dq2', text: 'Хто є автором «Кобзаря»?',
    type: 'SINGLE_CHOICE', points: 10, correctRate: 0.76,
    options: [
      { id: 'dq2o1', text: 'Тарас Шевченко', isCorrect: true, points: 10 },
      { id: 'dq2o2', text: 'Іван Франко', isCorrect: false, points: 0 },
      { id: 'dq2o3', text: 'Леся Українка', isCorrect: false, points: 0 },
      { id: 'dq2o4', text: 'Михайло Коцюбинський', isCorrect: false, points: 0 },
    ],
  },
  {
    id: 'dq3', text: 'Яке число є простим?',
    type: 'SINGLE_CHOICE', points: 10, correctRate: 0.44,
    options: [
      { id: 'dq3o1', text: '51', isCorrect: false, points: 0 },
      { id: 'dq3o2', text: '91', isCorrect: false, points: 0 },
      { id: 'dq3o3', text: '97', isCorrect: true, points: 10 },
      { id: 'dq3o4', text: '99', isCorrect: false, points: 0 },
    ],
  },
  {
    id: 'dq4', text: 'Які з перелічених є семантичними HTML-тегами?',
    type: 'MULTIPLE_CHOICE', points: 10, correctRate: 0.60,
    options: [
      { id: 'dq4o1', text: '<section>', isCorrect: true, points: 3 },
      { id: 'dq4o2', text: '<div>', isCorrect: false, points: 0 },
      { id: 'dq4o3', text: '<article>', isCorrect: true, points: 4 },
      { id: 'dq4o4', text: '<header>', isCorrect: true, points: 3 },
    ],
  },
  {
    id: 'dq5', text: 'Які CSS-властивості вирівнюють flex-елементи?',
    type: 'MULTIPLE_CHOICE', points: 10, correctRate: 0.38,
    options: [
      { id: 'dq5o1', text: 'align-items', isCorrect: true, points: 5 },
      { id: 'dq5o2', text: 'justify-content', isCorrect: true, points: 5 },
      { id: 'dq5o3', text: 'text-align', isCorrect: false, points: 0 },
      { id: 'dq5o4', text: 'vertical-align', isCorrect: false, points: 0 },
    ],
  },
];

function buildResults(count: number): SessionResults {
  const rng = makeRng(54321 + count * 7);
  const names = PARTICIPANT_NAMES.slice(0, count);

  // [participant][question] → chosen option ids
  const rawAnswers: string[][][] = names.map(() =>
    QUESTION_DEFS.map((q) => {
      const wrong = q.options.filter((o) => !o.isCorrect);
      const correct = q.options.filter((o) => o.isCorrect);
      if (q.type === 'SINGLE_CHOICE') {
        return rng() < q.correctRate
          ? [correct[0].id]
          : [wrong[Math.floor(rng() * wrong.length)].id];
      }
      const sel = q.options
        .filter((o) => rng() < (o.isCorrect ? q.correctRate : 0.18))
        .map((o) => o.id);
      return sel.length > 0 ? sel : [q.options[Math.floor(rng() * q.options.length)].id];
    }),
  );

  const participants = names.map((name, i) => {
    const answers = QUESTION_DEFS.map((q, qi) => {
      const chosen = rawAnswers[i][qi];
      const score = chosen.reduce(
        (s, oid) => s + (q.options.find((o) => o.id === oid)?.points ?? 0),
        0,
      );
      return { questionId: q.id, optionIds: chosen, score };
    });
    return {
      participantId: `dp${i}`,
      name,
      totalScore: answers.reduce((s, a) => s + a.score, 0),
      answers,
    };
  });

  const questionsSummary = QUESTION_DEFS.map((q, qi) => ({
    questionId: q.id,
    questionText: q.text,
    questionType: q.type,
    questionPoints: q.points,
    options: q.options.map((opt) => {
      const voters = participants
        .filter((p) => p.answers[qi].optionIds.includes(opt.id))
        .map((p) => ({ participantId: p.participantId, name: p.name }));
      return {
        optionId: opt.id,
        optionText: opt.text,
        isCorrect: opt.isCorrect,
        points: opt.points,
        count: voters.length,
        voters,
      };
    }),
  }));

  return { participants, questionsSummary };
}

// Sessions shown in HistoryPage (page 1, no filter)
export const DEMO_SESSIONS: SessionListItem[] = [
  {
    id: 'demo-s1', pin: 'DEMO50', status: 'FINISHED', progressionMode: 'AUTO',
    createdAt: '2026-05-22T14:30:00Z',
    poll: { title: '[DEMO] Вікторина «Знай Україну» — 50 учасників' },
    _count: { participants: 50 },
  },
  {
    id: 'demo-s2', pin: 'DEMO30', status: 'FINISHED', progressionMode: 'MANUAL',
    createdAt: '2026-05-20T10:15:00Z',
    poll: { title: '[DEMO] Тест з веб-розробки — 30 учасників' },
    _count: { participants: 30 },
  },
  {
    id: 'demo-s3', pin: 'DEMO15', status: 'FINISHED', progressionMode: 'AUTO',
    createdAt: '2026-05-18T09:00:00Z',
    poll: { title: '[DEMO] Середня група — 15 учасників' },
    _count: { participants: 15 },
  },
  {
    id: 'demo-s4', pin: 'DEMO05', status: 'FINISHED', progressionMode: 'AUTO',
    createdAt: '2026-05-16T16:45:00Z',
    poll: { title: '[DEMO] Мала група — 5 учасників' },
    _count: { participants: 5 },
  },
  {
    id: 'demo-s5', pin: 'DEMO01', status: 'FINISHED', progressionMode: 'MANUAL',
    createdAt: '2026-05-10T11:00:00Z',
    poll: { title: '[DEMO] Один учасник' },
    _count: { participants: 1 },
  },
];

// Results keyed by pin — built once at module load
export const DEMO_RESULTS: Record<string, SessionResults> = {
  DEMO50: buildResults(50),
  DEMO30: buildResults(30),
  DEMO15: buildResults(15),
  DEMO05: buildResults(5),
  DEMO01: buildResults(1),
};

export const DEMO_PINS = new Set(Object.keys(DEMO_RESULTS));
