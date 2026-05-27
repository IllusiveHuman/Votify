import { OpenAPIV3 } from 'openapi-types';

const bearerAuth: OpenAPIV3.SecuritySchemeObject = {
  type: 'http',
  scheme: 'bearer',
  bearerFormat: 'JWT',
};

// ─── Reusable schemas ────────────────────────────────────────────────────────

const OptionInputSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['text', 'isCorrect'],
  properties: {
    text:      { type: 'string', minLength: 1, maxLength: 500, example: 'Kyiv' },
    isCorrect: { type: 'boolean', example: true },
    points:    { type: 'integer', minimum: 1, maximum: 10000, example: 100 },
  },
};

const QuestionInputSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['text', 'type', 'order', 'options'],
  properties: {
    text:      { type: 'string', minLength: 1, example: 'What is the capital of Ukraine?' },
    timeLimit: { type: 'integer', minimum: 5, maximum: 300, nullable: true, example: 30 },
    type:      { type: 'string', enum: ['SINGLE_CHOICE', 'MULTIPLE_CHOICE'], example: 'SINGLE_CHOICE' },
    order:     { type: 'integer', minimum: 0, example: 0 },
    points:    { type: 'integer', minimum: 1, maximum: 10000, example: 100 },
    options: {
      type: 'array',
      items: { $ref: '#/components/schemas/OptionInput' },
      minItems: 2,
      maxItems: 10,
    },
  },
};

const PollInputSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  required: ['title', 'questions'],
  properties: {
    title:           { type: 'string', minLength: 1, maxLength: 255, example: 'Geography Quiz' },
    description:     { type: 'string', example: 'Test your geography knowledge' },
    progressionMode: { type: 'string', enum: ['MANUAL', 'AUTO'], default: 'AUTO', example: 'AUTO' },
    questions: {
      type: 'array',
      items: { $ref: '#/components/schemas/QuestionInput' },
      minItems: 1,
      maxItems: 50,
    },
  },
};

const OptionSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id:        { type: 'integer', example: 1 },
    text:      { type: 'string', example: 'Kyiv' },
    isCorrect: { type: 'boolean', example: true },
    points:    { type: 'integer', example: 100 },
  },
};

const QuestionSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id:        { type: 'integer', example: 1 },
    text:      { type: 'string', example: 'What is the capital of Ukraine?' },
    timeLimit: { type: 'integer', nullable: true, example: 30 },
    type:      { type: 'string', enum: ['SINGLE_CHOICE', 'MULTIPLE_CHOICE'], example: 'SINGLE_CHOICE' },
    order:     { type: 'integer', example: 0 },
    points:    { type: 'integer', example: 100 },
    options:   { type: 'array', items: { $ref: '#/components/schemas/Option' } },
  },
};

const PollSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id:              { type: 'integer', example: 1 },
    title:           { type: 'string', example: 'Geography Quiz' },
    description:     { type: 'string', nullable: true, example: 'Test your geography knowledge' },
    progressionMode: { type: 'string', enum: ['MANUAL', 'AUTO'], example: 'AUTO' },
    questions:       { type: 'array', items: { $ref: '#/components/schemas/Question' } },
    createdAt:       { type: 'string', format: 'date-time' },
    updatedAt:       { type: 'string', format: 'date-time' },
  },
};

const SessionSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id:              { type: 'integer', example: 1 },
    pin:             { type: 'string', description: '6-символьний код сесії', example: 'AB12CD' },
    status:          { type: 'string', enum: ['WAITING', 'ACTIVE', 'FINISHED'], example: 'WAITING' },
    progressionMode: { type: 'string', enum: ['MANUAL', 'AUTO'], example: 'MANUAL' },
    pollId:          { type: 'integer', example: 1 },
    organizerId:     { type: 'integer', example: 1 },
    createdAt:       { type: 'string', format: 'date-time' },
  },
};

const ParticipantResultSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    participantId: { type: 'string', format: 'uuid', example: '550e8400-e29b-41d4-a716-446655440000' },
    name:          { type: 'string', example: 'Іван' },
    totalScore:    { type: 'integer', example: 250 },
    answers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          questionId:  { type: 'integer', example: 1 },
          optionIds:   { type: 'array', items: { type: 'integer' }, example: [2] },
          score:       { type: 'integer', example: 100 },
          answeredAt:  { type: 'string', format: 'date-time' },
        },
      },
    },
  },
};

const UserSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    id:        { type: 'integer', example: 1 },
    email:     { type: 'string', format: 'email', example: 'organizer@example.com' },
    name:      { type: 'string', example: 'Іван Петров' },
    createdAt: { type: 'string', format: 'date-time' },
  },
};

const ErrorSchema: OpenAPIV3.SchemaObject = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    error:   { type: 'string', example: 'Помилка валідації' },
  },
};

// ─── Reusable responses ──────────────────────────────────────────────────────

const unauthorizedResponse: OpenAPIV3.ResponseObject = {
  description: 'Не авторизовано — відсутній або невалідний JWT токен',
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
};

const notFoundResponse: OpenAPIV3.ResponseObject = {
  description: 'Ресурс не знайдено',
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
};

const validationErrorResponse: OpenAPIV3.ResponseObject = {
  description: 'Помилка валідації вхідних даних',
  content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
};

// ─── List query parameters ───────────────────────────────────────────────────

const listQueryParams = (sortByValues: string[]): OpenAPIV3.ParameterObject[] => [
  { name: 'search',    in: 'query', schema: { type: 'string' },  description: 'Пошук за текстом' },
  { name: 'dateFrom',  in: 'query', schema: { type: 'string', format: 'date' }, description: 'Фільтр: дата початку (ISO 8601)' },
  { name: 'dateTo',    in: 'query', schema: { type: 'string', format: 'date' }, description: 'Фільтр: дата кінця (ISO 8601)' },
  { name: 'sortBy',    in: 'query', schema: { type: 'string', enum: sortByValues }, description: 'Поле сортування' },
  { name: 'sortOrder', in: 'query', schema: { type: 'string', enum: ['asc', 'desc'] }, description: 'Порядок сортування' },
  { name: 'page',      in: 'query', schema: { type: 'integer', minimum: 1, default: 1 }, description: 'Номер сторінки' },
  { name: 'pageSize',  in: 'query', schema: { type: 'integer', minimum: 1, maximum: 100, default: 20 }, description: 'Розмір сторінки' },
];

// ─── Main spec ───────────────────────────────────────────────────────────────

export const swaggerSpec: OpenAPIV3.Document = {
  openapi: '3.0.3',
  info: {
    title: 'Votify API',
    description: `
## Votify — API для інтерактивного голосування в реальному часі

### Автентифікація
Всі захищені ендпоінти потребують JWT-токен у заголовку:
\`\`\`
Authorization: Bearer <token>
\`\`\`
Токен отримується через \`POST /auth/login\` або \`POST /auth/register\`.

### WebSocket події
Взаємодія під час сесії відбувається через **Socket.io**. Документацію WebSocket подій дивись в розділі Events нижче.

| Подія (client → server) | Опис |
|---|---|
| \`join_room\` | Учасник приєднується до сесії |
| \`start_session\` | Організатор запускає опитування |
| \`submit_vote\` | Учасник надсилає відповідь |
| \`next_question\` | Організатор переходить до наступного питання (MANUAL) |
| \`end_session\` | Організатор завершує сесію |
| \`join_lobby\` | Організатор приєднується до лобі |

| Подія (server → client) | Опис |
|---|---|
| \`room_joined\` | Успішне приєднання до сесії |
| \`session_started\` | Опитування розпочато |
| \`question_active\` | Нове активне питання |
| \`vote_accepted\` | Відповідь прийнято |
| \`results_updated\` | Оновлення результатів в реальному часі |
| \`user_finished\` | Учасник завершив опитування |
| \`session_ended\` | Сесія завершена |
| \`participants_updated\` | Зміна кількості учасників |
| \`error\` | Помилка |
    `,
    version: '1.0.0',
    contact: {
      name: 'Votify',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Локальна розробка',
    },
  ],
  tags: [
    { name: 'Health',   description: 'Перевірка стану сервера' },
    { name: 'Auth',     description: 'Реєстрація та автентифікація' },
    { name: 'Polls',    description: 'Управління опитуваннями' },
    { name: 'Sessions', description: 'Управління сесіями голосування' },
  ],
  components: {
    securitySchemes: { bearerAuth },
    schemas: {
      Error:               ErrorSchema,
      User:                UserSchema,
      Option:              OptionSchema,
      OptionInput:         OptionInputSchema,
      Question:            QuestionSchema,
      QuestionInput:       QuestionInputSchema,
      Poll:                PollSchema,
      PollInput:           PollInputSchema,
      Session:             SessionSchema,
      ParticipantResult:   ParticipantResultSchema,
    },
    responses: {
      Unauthorized:    unauthorizedResponse,
      NotFound:        notFoundResponse,
      ValidationError: validationErrorResponse,
    },
  },
  paths: {
    // ── Health ──────────────────────────────────────────────────────────────
    '/health': {
      get: {
        tags: ['Health'],
        summary: 'Перевірка стану сервера',
        operationId: 'healthCheck',
        responses: {
          '200': {
            description: 'Сервер працює',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    status:    { type: 'string', example: 'ok' },
                    timestamp: { type: 'string', format: 'date-time' },
                  },
                },
              },
            },
          },
        },
      },
    },

    // ── Auth ─────────────────────────────────────────────────────────────────
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Реєстрація нового організатора',
        operationId: 'register',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password', 'name'],
                properties: {
                  email:    { type: 'string', format: 'email', example: 'organizer@example.com' },
                  password: { type: 'string', minLength: 8, example: 'securepass123' },
                  name:     { type: 'string', minLength: 2, maxLength: 100, example: 'Іван Петров' },
                },
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Обліковий запис створено',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                        user:  { $ref: '#/components/schemas/User' },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/ValidationError' },
          '409': {
            description: 'Email вже зареєстровано',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },

    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Вхід в систему',
        operationId: 'login',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                  email:    { type: 'string', format: 'email', example: 'organizer@example.com' },
                  password: { type: 'string', minLength: 1, example: 'securepass123' },
                },
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Успішний вхід',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'object',
                      properties: {
                        token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
                        user:  { $ref: '#/components/schemas/User' },
                      },
                    },
                  },
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/ValidationError' },
          '401': {
            description: 'Невірний email або пароль',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },

    // ── Polls ─────────────────────────────────────────────────────────────────
    '/polls': {
      get: {
        tags: ['Polls'],
        summary: 'Список опитувань поточного організатора',
        operationId: 'getPolls',
        security: [{ bearerAuth: [] }],
        parameters: listQueryParams(['createdAt', 'questions', 'sessions']),
        responses: {
          '200': {
            description: 'Список опитувань з пагінацією',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success:  { type: 'boolean', example: true },
                    data:     { type: 'array', items: { $ref: '#/components/schemas/Poll' } },
                    total:    { type: 'integer', example: 42 },
                    page:     { type: 'integer', example: 1 },
                    pageSize: { type: 'integer', example: 20 },
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Polls'],
        summary: 'Створити нове опитування',
        operationId: 'createPoll',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PollInput' },
              example: {
                title: 'Географічний квіз',
                description: 'Перевірте свої знання географії',
                progressionMode: 'AUTO',
                questions: [
                  {
                    text: 'Яка столиця України?',
                    type: 'SINGLE_CHOICE',
                    order: 0,
                    timeLimit: 30,
                    points: 100,
                    options: [
                      { text: 'Київ',   isCorrect: true,  points: 100 },
                      { text: 'Харків', isCorrect: false },
                      { text: 'Львів',  isCorrect: false },
                    ],
                  },
                ],
              },
            },
          },
        },
        responses: {
          '201': {
            description: 'Опитування створено',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data:    { $ref: '#/components/schemas/Poll' },
                  },
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/ValidationError' },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
    },

    '/polls/{id}': {
      get: {
        tags: ['Polls'],
        summary: 'Отримати опитування за ID',
        operationId: 'getPoll',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID опитування', example: 1 },
        ],
        responses: {
          '200': {
            description: 'Дані опитування',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data:    { $ref: '#/components/schemas/Poll' },
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      put: {
        tags: ['Polls'],
        summary: 'Оновити опитування',
        operationId: 'updatePoll',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID опитування', example: 1 },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/PollInput' },
            },
          },
        },
        responses: {
          '200': {
            description: 'Опитування оновлено',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data:    { $ref: '#/components/schemas/Poll' },
                  },
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/ValidationError' },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '403': {
            description: 'Заборонено — опитування належить іншому організатору',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
      delete: {
        tags: ['Polls'],
        summary: 'Видалити опитування',
        operationId: 'deletePoll',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID опитування', example: 1 },
        ],
        responses: {
          '200': {
            description: 'Опитування видалено',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    message: { type: 'string', example: 'Poll deleted' },
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '403': {
            description: 'Заборонено — опитування належить іншому організатору',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    '/polls/{id}/duplicate': {
      post: {
        tags: ['Polls'],
        summary: 'Дублювати опитування',
        operationId: 'duplicatePoll',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'id', in: 'path', required: true, schema: { type: 'integer' }, description: 'ID опитування для копіювання', example: 1 },
        ],
        responses: {
          '201': {
            description: 'Копія опитування створена',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data:    { $ref: '#/components/schemas/Poll' },
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '403': {
            description: 'Заборонено — опитування належить іншому організатору',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    // ── Sessions ──────────────────────────────────────────────────────────────
    '/sessions': {
      get: {
        tags: ['Sessions'],
        summary: 'Список сесій поточного організатора',
        operationId: 'getSessions',
        security: [{ bearerAuth: [] }],
        parameters: listQueryParams(['createdAt', 'participants']),
        responses: {
          '200': {
            description: 'Список сесій з пагінацією',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success:  { type: 'boolean', example: true },
                    data:     { type: 'array', items: { $ref: '#/components/schemas/Session' } },
                    total:    { type: 'integer', example: 10 },
                    page:     { type: 'integer', example: 1 },
                    pageSize: { type: 'integer', example: 20 },
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
        },
      },
      post: {
        tags: ['Sessions'],
        summary: 'Створити нову сесію голосування',
        operationId: 'createSession',
        security: [{ bearerAuth: [] }],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['pollId', 'progressionMode'],
                properties: {
                  pollId:          { type: 'integer', minimum: 1, example: 1 },
                  progressionMode: { type: 'string', enum: ['MANUAL', 'AUTO'], example: 'MANUAL' },
                },
              },
              example: { pollId: 1, progressionMode: 'MANUAL' },
            },
          },
        },
        responses: {
          '201': {
            description: 'Сесія створена. PIN передається учасникам для приєднання через WebSocket.',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data:    { $ref: '#/components/schemas/Session' },
                  },
                },
              },
            },
          },
          '400': { $ref: '#/components/responses/ValidationError' },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '404': {
            description: 'Опитування не знайдено або не належить організатору',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
        },
      },
    },

    '/sessions/{pin}/results': {
      get: {
        tags: ['Sessions'],
        summary: 'Результати сесії за PIN-кодом',
        operationId: 'getSessionResults',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'pin', in: 'path', required: true, schema: { type: 'string' }, description: '6-символьний PIN сесії', example: 'AB12CD' },
        ],
        responses: {
          '200': {
            description: 'Результати учасників з оцінками',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    success: { type: 'boolean', example: true },
                    data: {
                      type: 'array',
                      items: { $ref: '#/components/schemas/ParticipantResult' },
                    },
                  },
                },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '403': {
            description: 'Заборонено — сесія належить іншому організатору',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },

    '/sessions/{pin}/results/export': {
      get: {
        tags: ['Sessions'],
        summary: 'Експорт результатів сесії в Excel (.xlsx)',
        operationId: 'exportSessionResults',
        security: [{ bearerAuth: [] }],
        parameters: [
          { name: 'pin', in: 'path', required: true, schema: { type: 'string' }, description: '6-символьний PIN сесії', example: 'AB12CD' },
        ],
        responses: {
          '200': {
            description: 'Excel файл з результатами',
            headers: {
              'Content-Disposition': {
                schema: { type: 'string' },
                description: 'attachment; filename="Votify_AB12CD.xlsx"',
              },
            },
            content: {
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': {
                schema: { type: 'string', format: 'binary' },
              },
            },
          },
          '401': { $ref: '#/components/responses/Unauthorized' },
          '403': {
            description: 'Заборонено — сесія належить іншому організатору',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } },
          },
          '404': { $ref: '#/components/responses/NotFound' },
        },
      },
    },
  },
};
