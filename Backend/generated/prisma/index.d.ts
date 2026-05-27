
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Poll
 * 
 */
export type Poll = $Result.DefaultSelection<Prisma.$PollPayload>
/**
 * Model Question
 * 
 */
export type Question = $Result.DefaultSelection<Prisma.$QuestionPayload>
/**
 * Model Option
 * 
 */
export type Option = $Result.DefaultSelection<Prisma.$OptionPayload>
/**
 * Model Session
 * 
 */
export type Session = $Result.DefaultSelection<Prisma.$SessionPayload>
/**
 * Model Result
 * 
 */
export type Result = $Result.DefaultSelection<Prisma.$ResultPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const QuestionType: {
  SINGLE_CHOICE: 'SINGLE_CHOICE',
  MULTIPLE_CHOICE: 'MULTIPLE_CHOICE'
};

export type QuestionType = (typeof QuestionType)[keyof typeof QuestionType]


export const ProgressionMode: {
  MANUAL: 'MANUAL',
  SELF_PACED: 'SELF_PACED'
};

export type ProgressionMode = (typeof ProgressionMode)[keyof typeof ProgressionMode]


export const SessionStatus: {
  WAITING: 'WAITING',
  ACTIVE: 'ACTIVE',
  FINISHED: 'FINISHED'
};

export type SessionStatus = (typeof SessionStatus)[keyof typeof SessionStatus]

}

export type QuestionType = $Enums.QuestionType

export const QuestionType: typeof $Enums.QuestionType

export type ProgressionMode = $Enums.ProgressionMode

export const ProgressionMode: typeof $Enums.ProgressionMode

export type SessionStatus = $Enums.SessionStatus

export const SessionStatus: typeof $Enums.SessionStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.poll`: Exposes CRUD operations for the **Poll** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Polls
    * const polls = await prisma.poll.findMany()
    * ```
    */
  get poll(): Prisma.PollDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.question`: Exposes CRUD operations for the **Question** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Questions
    * const questions = await prisma.question.findMany()
    * ```
    */
  get question(): Prisma.QuestionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.option`: Exposes CRUD operations for the **Option** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Options
    * const options = await prisma.option.findMany()
    * ```
    */
  get option(): Prisma.OptionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **Session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.SessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.result`: Exposes CRUD operations for the **Result** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Results
    * const results = await prisma.result.findMany()
    * ```
    */
  get result(): Prisma.ResultDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Poll: 'Poll',
    Question: 'Question',
    Option: 'Option',
    Session: 'Session',
    Result: 'Result'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "poll" | "question" | "option" | "session" | "result"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Poll: {
        payload: Prisma.$PollPayload<ExtArgs>
        fields: Prisma.PollFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PollFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PollPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PollFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PollPayload>
          }
          findFirst: {
            args: Prisma.PollFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PollPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PollFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PollPayload>
          }
          findMany: {
            args: Prisma.PollFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PollPayload>[]
          }
          create: {
            args: Prisma.PollCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PollPayload>
          }
          createMany: {
            args: Prisma.PollCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PollDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PollPayload>
          }
          update: {
            args: Prisma.PollUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PollPayload>
          }
          deleteMany: {
            args: Prisma.PollDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PollUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PollUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PollPayload>
          }
          aggregate: {
            args: Prisma.PollAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePoll>
          }
          groupBy: {
            args: Prisma.PollGroupByArgs<ExtArgs>
            result: $Utils.Optional<PollGroupByOutputType>[]
          }
          count: {
            args: Prisma.PollCountArgs<ExtArgs>
            result: $Utils.Optional<PollCountAggregateOutputType> | number
          }
        }
      }
      Question: {
        payload: Prisma.$QuestionPayload<ExtArgs>
        fields: Prisma.QuestionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.QuestionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.QuestionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findFirst: {
            args: Prisma.QuestionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.QuestionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          findMany: {
            args: Prisma.QuestionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>[]
          }
          create: {
            args: Prisma.QuestionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          createMany: {
            args: Prisma.QuestionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.QuestionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          update: {
            args: Prisma.QuestionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          deleteMany: {
            args: Prisma.QuestionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.QuestionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.QuestionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$QuestionPayload>
          }
          aggregate: {
            args: Prisma.QuestionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateQuestion>
          }
          groupBy: {
            args: Prisma.QuestionGroupByArgs<ExtArgs>
            result: $Utils.Optional<QuestionGroupByOutputType>[]
          }
          count: {
            args: Prisma.QuestionCountArgs<ExtArgs>
            result: $Utils.Optional<QuestionCountAggregateOutputType> | number
          }
        }
      }
      Option: {
        payload: Prisma.$OptionPayload<ExtArgs>
        fields: Prisma.OptionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OptionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OptionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
          findFirst: {
            args: Prisma.OptionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OptionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
          findMany: {
            args: Prisma.OptionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>[]
          }
          create: {
            args: Prisma.OptionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
          createMany: {
            args: Prisma.OptionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OptionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
          update: {
            args: Prisma.OptionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
          deleteMany: {
            args: Prisma.OptionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OptionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OptionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OptionPayload>
          }
          aggregate: {
            args: Prisma.OptionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOption>
          }
          groupBy: {
            args: Prisma.OptionGroupByArgs<ExtArgs>
            result: $Utils.Optional<OptionGroupByOutputType>[]
          }
          count: {
            args: Prisma.OptionCountArgs<ExtArgs>
            result: $Utils.Optional<OptionCountAggregateOutputType> | number
          }
        }
      }
      Session: {
        payload: Prisma.$SessionPayload<ExtArgs>
        fields: Prisma.SessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findFirst: {
            args: Prisma.SessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          findMany: {
            args: Prisma.SessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>[]
          }
          create: {
            args: Prisma.SessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          createMany: {
            args: Prisma.SessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          update: {
            args: Prisma.SessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          deleteMany: {
            args: Prisma.SessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.SessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.SessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      Result: {
        payload: Prisma.$ResultPayload<ExtArgs>
        fields: Prisma.ResultFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ResultFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ResultFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          findFirst: {
            args: Prisma.ResultFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ResultFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          findMany: {
            args: Prisma.ResultFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>[]
          }
          create: {
            args: Prisma.ResultCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          createMany: {
            args: Prisma.ResultCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ResultDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          update: {
            args: Prisma.ResultUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          deleteMany: {
            args: Prisma.ResultDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ResultUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ResultUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ResultPayload>
          }
          aggregate: {
            args: Prisma.ResultAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateResult>
          }
          groupBy: {
            args: Prisma.ResultGroupByArgs<ExtArgs>
            result: $Utils.Optional<ResultGroupByOutputType>[]
          }
          count: {
            args: Prisma.ResultCountArgs<ExtArgs>
            result: $Utils.Optional<ResultCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    poll?: PollOmit
    question?: QuestionOmit
    option?: OptionOmit
    session?: SessionOmit
    result?: ResultOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    polls: number
    sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    polls?: boolean | UserCountOutputTypeCountPollsArgs
    sessions?: boolean | UserCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPollsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PollWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type PollCountOutputType
   */

  export type PollCountOutputType = {
    questions: number
    sessions: number
  }

  export type PollCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    questions?: boolean | PollCountOutputTypeCountQuestionsArgs
    sessions?: boolean | PollCountOutputTypeCountSessionsArgs
  }

  // Custom InputTypes
  /**
   * PollCountOutputType without action
   */
  export type PollCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PollCountOutputType
     */
    select?: PollCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PollCountOutputType without action
   */
  export type PollCountOutputTypeCountQuestionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
  }

  /**
   * PollCountOutputType without action
   */
  export type PollCountOutputTypeCountSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
  }


  /**
   * Count Type QuestionCountOutputType
   */

  export type QuestionCountOutputType = {
    options: number
    results: number
  }

  export type QuestionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    options?: boolean | QuestionCountOutputTypeCountOptionsArgs
    results?: boolean | QuestionCountOutputTypeCountResultsArgs
  }

  // Custom InputTypes
  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the QuestionCountOutputType
     */
    select?: QuestionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountOptionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OptionWhereInput
  }

  /**
   * QuestionCountOutputType without action
   */
  export type QuestionCountOutputTypeCountResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResultWhereInput
  }


  /**
   * Count Type SessionCountOutputType
   */

  export type SessionCountOutputType = {
    results: number
  }

  export type SessionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    results?: boolean | SessionCountOutputTypeCountResultsArgs
  }

  // Custom InputTypes
  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SessionCountOutputType
     */
    select?: SessionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SessionCountOutputType without action
   */
  export type SessionCountOutputTypeCountResultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResultWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    email: string | null
    password: string | null
    name: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    password: number
    name: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    password?: true
    name?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    email: string
    password: string
    name: string
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    polls?: boolean | User$pollsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    password?: boolean
    name?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "password" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    polls?: boolean | User$pollsArgs<ExtArgs>
    sessions?: boolean | User$sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      polls: Prisma.$PollPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      email: string
      password: string
      name: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    polls<T extends User$pollsArgs<ExtArgs> = {}>(args?: Subset<T, User$pollsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends User$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.polls
   */
  export type User$pollsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poll
     */
    select?: PollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poll
     */
    omit?: PollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PollInclude<ExtArgs> | null
    where?: PollWhereInput
    orderBy?: PollOrderByWithRelationInput | PollOrderByWithRelationInput[]
    cursor?: PollWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PollScalarFieldEnum | PollScalarFieldEnum[]
  }

  /**
   * User.sessions
   */
  export type User$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Poll
   */

  export type AggregatePoll = {
    _count: PollCountAggregateOutputType | null
    _avg: PollAvgAggregateOutputType | null
    _sum: PollSumAggregateOutputType | null
    _min: PollMinAggregateOutputType | null
    _max: PollMaxAggregateOutputType | null
  }

  export type PollAvgAggregateOutputType = {
    id: number | null
    organizerId: number | null
  }

  export type PollSumAggregateOutputType = {
    id: number | null
    organizerId: number | null
  }

  export type PollMinAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    organizerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PollMaxAggregateOutputType = {
    id: number | null
    title: string | null
    description: string | null
    organizerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PollCountAggregateOutputType = {
    id: number
    title: number
    description: number
    organizerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PollAvgAggregateInputType = {
    id?: true
    organizerId?: true
  }

  export type PollSumAggregateInputType = {
    id?: true
    organizerId?: true
  }

  export type PollMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    organizerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PollMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    organizerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PollCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    organizerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PollAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Poll to aggregate.
     */
    where?: PollWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polls to fetch.
     */
    orderBy?: PollOrderByWithRelationInput | PollOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PollWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Polls
    **/
    _count?: true | PollCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PollAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PollSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PollMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PollMaxAggregateInputType
  }

  export type GetPollAggregateType<T extends PollAggregateArgs> = {
        [P in keyof T & keyof AggregatePoll]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePoll[P]>
      : GetScalarType<T[P], AggregatePoll[P]>
  }




  export type PollGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PollWhereInput
    orderBy?: PollOrderByWithAggregationInput | PollOrderByWithAggregationInput[]
    by: PollScalarFieldEnum[] | PollScalarFieldEnum
    having?: PollScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PollCountAggregateInputType | true
    _avg?: PollAvgAggregateInputType
    _sum?: PollSumAggregateInputType
    _min?: PollMinAggregateInputType
    _max?: PollMaxAggregateInputType
  }

  export type PollGroupByOutputType = {
    id: number
    title: string
    description: string | null
    organizerId: number
    createdAt: Date
    updatedAt: Date
    _count: PollCountAggregateOutputType | null
    _avg: PollAvgAggregateOutputType | null
    _sum: PollSumAggregateOutputType | null
    _min: PollMinAggregateOutputType | null
    _max: PollMaxAggregateOutputType | null
  }

  type GetPollGroupByPayload<T extends PollGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PollGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PollGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PollGroupByOutputType[P]>
            : GetScalarType<T[P], PollGroupByOutputType[P]>
        }
      >
    >


  export type PollSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    organizerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    organizer?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | Poll$questionsArgs<ExtArgs>
    sessions?: boolean | Poll$sessionsArgs<ExtArgs>
    _count?: boolean | PollCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["poll"]>



  export type PollSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    organizerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PollOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "description" | "organizerId" | "createdAt" | "updatedAt", ExtArgs["result"]["poll"]>
  export type PollInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    organizer?: boolean | UserDefaultArgs<ExtArgs>
    questions?: boolean | Poll$questionsArgs<ExtArgs>
    sessions?: boolean | Poll$sessionsArgs<ExtArgs>
    _count?: boolean | PollCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $PollPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Poll"
    objects: {
      organizer: Prisma.$UserPayload<ExtArgs>
      questions: Prisma.$QuestionPayload<ExtArgs>[]
      sessions: Prisma.$SessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      title: string
      description: string | null
      organizerId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["poll"]>
    composites: {}
  }

  type PollGetPayload<S extends boolean | null | undefined | PollDefaultArgs> = $Result.GetResult<Prisma.$PollPayload, S>

  type PollCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PollFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PollCountAggregateInputType | true
    }

  export interface PollDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Poll'], meta: { name: 'Poll' } }
    /**
     * Find zero or one Poll that matches the filter.
     * @param {PollFindUniqueArgs} args - Arguments to find a Poll
     * @example
     * // Get one Poll
     * const poll = await prisma.poll.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PollFindUniqueArgs>(args: SelectSubset<T, PollFindUniqueArgs<ExtArgs>>): Prisma__PollClient<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Poll that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PollFindUniqueOrThrowArgs} args - Arguments to find a Poll
     * @example
     * // Get one Poll
     * const poll = await prisma.poll.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PollFindUniqueOrThrowArgs>(args: SelectSubset<T, PollFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PollClient<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poll that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PollFindFirstArgs} args - Arguments to find a Poll
     * @example
     * // Get one Poll
     * const poll = await prisma.poll.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PollFindFirstArgs>(args?: SelectSubset<T, PollFindFirstArgs<ExtArgs>>): Prisma__PollClient<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Poll that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PollFindFirstOrThrowArgs} args - Arguments to find a Poll
     * @example
     * // Get one Poll
     * const poll = await prisma.poll.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PollFindFirstOrThrowArgs>(args?: SelectSubset<T, PollFindFirstOrThrowArgs<ExtArgs>>): Prisma__PollClient<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Polls that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PollFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Polls
     * const polls = await prisma.poll.findMany()
     * 
     * // Get first 10 Polls
     * const polls = await prisma.poll.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pollWithIdOnly = await prisma.poll.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PollFindManyArgs>(args?: SelectSubset<T, PollFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Poll.
     * @param {PollCreateArgs} args - Arguments to create a Poll.
     * @example
     * // Create one Poll
     * const Poll = await prisma.poll.create({
     *   data: {
     *     // ... data to create a Poll
     *   }
     * })
     * 
     */
    create<T extends PollCreateArgs>(args: SelectSubset<T, PollCreateArgs<ExtArgs>>): Prisma__PollClient<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Polls.
     * @param {PollCreateManyArgs} args - Arguments to create many Polls.
     * @example
     * // Create many Polls
     * const poll = await prisma.poll.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PollCreateManyArgs>(args?: SelectSubset<T, PollCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Poll.
     * @param {PollDeleteArgs} args - Arguments to delete one Poll.
     * @example
     * // Delete one Poll
     * const Poll = await prisma.poll.delete({
     *   where: {
     *     // ... filter to delete one Poll
     *   }
     * })
     * 
     */
    delete<T extends PollDeleteArgs>(args: SelectSubset<T, PollDeleteArgs<ExtArgs>>): Prisma__PollClient<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Poll.
     * @param {PollUpdateArgs} args - Arguments to update one Poll.
     * @example
     * // Update one Poll
     * const poll = await prisma.poll.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PollUpdateArgs>(args: SelectSubset<T, PollUpdateArgs<ExtArgs>>): Prisma__PollClient<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Polls.
     * @param {PollDeleteManyArgs} args - Arguments to filter Polls to delete.
     * @example
     * // Delete a few Polls
     * const { count } = await prisma.poll.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PollDeleteManyArgs>(args?: SelectSubset<T, PollDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Polls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PollUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Polls
     * const poll = await prisma.poll.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PollUpdateManyArgs>(args: SelectSubset<T, PollUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Poll.
     * @param {PollUpsertArgs} args - Arguments to update or create a Poll.
     * @example
     * // Update or create a Poll
     * const poll = await prisma.poll.upsert({
     *   create: {
     *     // ... data to create a Poll
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Poll we want to update
     *   }
     * })
     */
    upsert<T extends PollUpsertArgs>(args: SelectSubset<T, PollUpsertArgs<ExtArgs>>): Prisma__PollClient<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Polls.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PollCountArgs} args - Arguments to filter Polls to count.
     * @example
     * // Count the number of Polls
     * const count = await prisma.poll.count({
     *   where: {
     *     // ... the filter for the Polls we want to count
     *   }
     * })
    **/
    count<T extends PollCountArgs>(
      args?: Subset<T, PollCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PollCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Poll.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PollAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PollAggregateArgs>(args: Subset<T, PollAggregateArgs>): Prisma.PrismaPromise<GetPollAggregateType<T>>

    /**
     * Group by Poll.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PollGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PollGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PollGroupByArgs['orderBy'] }
        : { orderBy?: PollGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PollGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPollGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Poll model
   */
  readonly fields: PollFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Poll.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PollClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    organizer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    questions<T extends Poll$questionsArgs<ExtArgs> = {}>(args?: Subset<T, Poll$questionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    sessions<T extends Poll$sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Poll$sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Poll model
   */
  interface PollFieldRefs {
    readonly id: FieldRef<"Poll", 'Int'>
    readonly title: FieldRef<"Poll", 'String'>
    readonly description: FieldRef<"Poll", 'String'>
    readonly organizerId: FieldRef<"Poll", 'Int'>
    readonly createdAt: FieldRef<"Poll", 'DateTime'>
    readonly updatedAt: FieldRef<"Poll", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Poll findUnique
   */
  export type PollFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poll
     */
    select?: PollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poll
     */
    omit?: PollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PollInclude<ExtArgs> | null
    /**
     * Filter, which Poll to fetch.
     */
    where: PollWhereUniqueInput
  }

  /**
   * Poll findUniqueOrThrow
   */
  export type PollFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poll
     */
    select?: PollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poll
     */
    omit?: PollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PollInclude<ExtArgs> | null
    /**
     * Filter, which Poll to fetch.
     */
    where: PollWhereUniqueInput
  }

  /**
   * Poll findFirst
   */
  export type PollFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poll
     */
    select?: PollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poll
     */
    omit?: PollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PollInclude<ExtArgs> | null
    /**
     * Filter, which Poll to fetch.
     */
    where?: PollWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polls to fetch.
     */
    orderBy?: PollOrderByWithRelationInput | PollOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Polls.
     */
    cursor?: PollWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Polls.
     */
    distinct?: PollScalarFieldEnum | PollScalarFieldEnum[]
  }

  /**
   * Poll findFirstOrThrow
   */
  export type PollFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poll
     */
    select?: PollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poll
     */
    omit?: PollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PollInclude<ExtArgs> | null
    /**
     * Filter, which Poll to fetch.
     */
    where?: PollWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polls to fetch.
     */
    orderBy?: PollOrderByWithRelationInput | PollOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Polls.
     */
    cursor?: PollWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Polls.
     */
    distinct?: PollScalarFieldEnum | PollScalarFieldEnum[]
  }

  /**
   * Poll findMany
   */
  export type PollFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poll
     */
    select?: PollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poll
     */
    omit?: PollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PollInclude<ExtArgs> | null
    /**
     * Filter, which Polls to fetch.
     */
    where?: PollWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Polls to fetch.
     */
    orderBy?: PollOrderByWithRelationInput | PollOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Polls.
     */
    cursor?: PollWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Polls from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Polls.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Polls.
     */
    distinct?: PollScalarFieldEnum | PollScalarFieldEnum[]
  }

  /**
   * Poll create
   */
  export type PollCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poll
     */
    select?: PollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poll
     */
    omit?: PollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PollInclude<ExtArgs> | null
    /**
     * The data needed to create a Poll.
     */
    data: XOR<PollCreateInput, PollUncheckedCreateInput>
  }

  /**
   * Poll createMany
   */
  export type PollCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Polls.
     */
    data: PollCreateManyInput | PollCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Poll update
   */
  export type PollUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poll
     */
    select?: PollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poll
     */
    omit?: PollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PollInclude<ExtArgs> | null
    /**
     * The data needed to update a Poll.
     */
    data: XOR<PollUpdateInput, PollUncheckedUpdateInput>
    /**
     * Choose, which Poll to update.
     */
    where: PollWhereUniqueInput
  }

  /**
   * Poll updateMany
   */
  export type PollUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Polls.
     */
    data: XOR<PollUpdateManyMutationInput, PollUncheckedUpdateManyInput>
    /**
     * Filter which Polls to update
     */
    where?: PollWhereInput
    /**
     * Limit how many Polls to update.
     */
    limit?: number
  }

  /**
   * Poll upsert
   */
  export type PollUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poll
     */
    select?: PollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poll
     */
    omit?: PollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PollInclude<ExtArgs> | null
    /**
     * The filter to search for the Poll to update in case it exists.
     */
    where: PollWhereUniqueInput
    /**
     * In case the Poll found by the `where` argument doesn't exist, create a new Poll with this data.
     */
    create: XOR<PollCreateInput, PollUncheckedCreateInput>
    /**
     * In case the Poll was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PollUpdateInput, PollUncheckedUpdateInput>
  }

  /**
   * Poll delete
   */
  export type PollDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poll
     */
    select?: PollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poll
     */
    omit?: PollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PollInclude<ExtArgs> | null
    /**
     * Filter which Poll to delete.
     */
    where: PollWhereUniqueInput
  }

  /**
   * Poll deleteMany
   */
  export type PollDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Polls to delete
     */
    where?: PollWhereInput
    /**
     * Limit how many Polls to delete.
     */
    limit?: number
  }

  /**
   * Poll.questions
   */
  export type Poll$questionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    cursor?: QuestionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Poll.sessions
   */
  export type Poll$sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    cursor?: SessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Poll without action
   */
  export type PollDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Poll
     */
    select?: PollSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Poll
     */
    omit?: PollOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PollInclude<ExtArgs> | null
  }


  /**
   * Model Question
   */

  export type AggregateQuestion = {
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  export type QuestionAvgAggregateOutputType = {
    id: number | null
    timeLimit: number | null
    order: number | null
    pollId: number | null
  }

  export type QuestionSumAggregateOutputType = {
    id: number | null
    timeLimit: number | null
    order: number | null
    pollId: number | null
  }

  export type QuestionMinAggregateOutputType = {
    id: number | null
    text: string | null
    timeLimit: number | null
    type: $Enums.QuestionType | null
    order: number | null
    pollId: number | null
    createdAt: Date | null
  }

  export type QuestionMaxAggregateOutputType = {
    id: number | null
    text: string | null
    timeLimit: number | null
    type: $Enums.QuestionType | null
    order: number | null
    pollId: number | null
    createdAt: Date | null
  }

  export type QuestionCountAggregateOutputType = {
    id: number
    text: number
    timeLimit: number
    type: number
    order: number
    pollId: number
    createdAt: number
    _all: number
  }


  export type QuestionAvgAggregateInputType = {
    id?: true
    timeLimit?: true
    order?: true
    pollId?: true
  }

  export type QuestionSumAggregateInputType = {
    id?: true
    timeLimit?: true
    order?: true
    pollId?: true
  }

  export type QuestionMinAggregateInputType = {
    id?: true
    text?: true
    timeLimit?: true
    type?: true
    order?: true
    pollId?: true
    createdAt?: true
  }

  export type QuestionMaxAggregateInputType = {
    id?: true
    text?: true
    timeLimit?: true
    type?: true
    order?: true
    pollId?: true
    createdAt?: true
  }

  export type QuestionCountAggregateInputType = {
    id?: true
    text?: true
    timeLimit?: true
    type?: true
    order?: true
    pollId?: true
    createdAt?: true
    _all?: true
  }

  export type QuestionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Question to aggregate.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Questions
    **/
    _count?: true | QuestionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: QuestionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: QuestionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: QuestionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: QuestionMaxAggregateInputType
  }

  export type GetQuestionAggregateType<T extends QuestionAggregateArgs> = {
        [P in keyof T & keyof AggregateQuestion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateQuestion[P]>
      : GetScalarType<T[P], AggregateQuestion[P]>
  }




  export type QuestionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: QuestionWhereInput
    orderBy?: QuestionOrderByWithAggregationInput | QuestionOrderByWithAggregationInput[]
    by: QuestionScalarFieldEnum[] | QuestionScalarFieldEnum
    having?: QuestionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: QuestionCountAggregateInputType | true
    _avg?: QuestionAvgAggregateInputType
    _sum?: QuestionSumAggregateInputType
    _min?: QuestionMinAggregateInputType
    _max?: QuestionMaxAggregateInputType
  }

  export type QuestionGroupByOutputType = {
    id: number
    text: string
    timeLimit: number
    type: $Enums.QuestionType
    order: number
    pollId: number
    createdAt: Date
    _count: QuestionCountAggregateOutputType | null
    _avg: QuestionAvgAggregateOutputType | null
    _sum: QuestionSumAggregateOutputType | null
    _min: QuestionMinAggregateOutputType | null
    _max: QuestionMaxAggregateOutputType | null
  }

  type GetQuestionGroupByPayload<T extends QuestionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<QuestionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof QuestionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], QuestionGroupByOutputType[P]>
            : GetScalarType<T[P], QuestionGroupByOutputType[P]>
        }
      >
    >


  export type QuestionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    timeLimit?: boolean
    type?: boolean
    order?: boolean
    pollId?: boolean
    createdAt?: boolean
    poll?: boolean | PollDefaultArgs<ExtArgs>
    options?: boolean | Question$optionsArgs<ExtArgs>
    results?: boolean | Question$resultsArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["question"]>



  export type QuestionSelectScalar = {
    id?: boolean
    text?: boolean
    timeLimit?: boolean
    type?: boolean
    order?: boolean
    pollId?: boolean
    createdAt?: boolean
  }

  export type QuestionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "timeLimit" | "type" | "order" | "pollId" | "createdAt", ExtArgs["result"]["question"]>
  export type QuestionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    poll?: boolean | PollDefaultArgs<ExtArgs>
    options?: boolean | Question$optionsArgs<ExtArgs>
    results?: boolean | Question$resultsArgs<ExtArgs>
    _count?: boolean | QuestionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $QuestionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Question"
    objects: {
      poll: Prisma.$PollPayload<ExtArgs>
      options: Prisma.$OptionPayload<ExtArgs>[]
      results: Prisma.$ResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      text: string
      timeLimit: number
      type: $Enums.QuestionType
      order: number
      pollId: number
      createdAt: Date
    }, ExtArgs["result"]["question"]>
    composites: {}
  }

  type QuestionGetPayload<S extends boolean | null | undefined | QuestionDefaultArgs> = $Result.GetResult<Prisma.$QuestionPayload, S>

  type QuestionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<QuestionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: QuestionCountAggregateInputType | true
    }

  export interface QuestionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Question'], meta: { name: 'Question' } }
    /**
     * Find zero or one Question that matches the filter.
     * @param {QuestionFindUniqueArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends QuestionFindUniqueArgs>(args: SelectSubset<T, QuestionFindUniqueArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Question that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {QuestionFindUniqueOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends QuestionFindUniqueOrThrowArgs>(args: SelectSubset<T, QuestionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends QuestionFindFirstArgs>(args?: SelectSubset<T, QuestionFindFirstArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Question that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindFirstOrThrowArgs} args - Arguments to find a Question
     * @example
     * // Get one Question
     * const question = await prisma.question.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends QuestionFindFirstOrThrowArgs>(args?: SelectSubset<T, QuestionFindFirstOrThrowArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Questions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Questions
     * const questions = await prisma.question.findMany()
     * 
     * // Get first 10 Questions
     * const questions = await prisma.question.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const questionWithIdOnly = await prisma.question.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends QuestionFindManyArgs>(args?: SelectSubset<T, QuestionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Question.
     * @param {QuestionCreateArgs} args - Arguments to create a Question.
     * @example
     * // Create one Question
     * const Question = await prisma.question.create({
     *   data: {
     *     // ... data to create a Question
     *   }
     * })
     * 
     */
    create<T extends QuestionCreateArgs>(args: SelectSubset<T, QuestionCreateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Questions.
     * @param {QuestionCreateManyArgs} args - Arguments to create many Questions.
     * @example
     * // Create many Questions
     * const question = await prisma.question.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends QuestionCreateManyArgs>(args?: SelectSubset<T, QuestionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Question.
     * @param {QuestionDeleteArgs} args - Arguments to delete one Question.
     * @example
     * // Delete one Question
     * const Question = await prisma.question.delete({
     *   where: {
     *     // ... filter to delete one Question
     *   }
     * })
     * 
     */
    delete<T extends QuestionDeleteArgs>(args: SelectSubset<T, QuestionDeleteArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Question.
     * @param {QuestionUpdateArgs} args - Arguments to update one Question.
     * @example
     * // Update one Question
     * const question = await prisma.question.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends QuestionUpdateArgs>(args: SelectSubset<T, QuestionUpdateArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Questions.
     * @param {QuestionDeleteManyArgs} args - Arguments to filter Questions to delete.
     * @example
     * // Delete a few Questions
     * const { count } = await prisma.question.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends QuestionDeleteManyArgs>(args?: SelectSubset<T, QuestionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Questions
     * const question = await prisma.question.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends QuestionUpdateManyArgs>(args: SelectSubset<T, QuestionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Question.
     * @param {QuestionUpsertArgs} args - Arguments to update or create a Question.
     * @example
     * // Update or create a Question
     * const question = await prisma.question.upsert({
     *   create: {
     *     // ... data to create a Question
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Question we want to update
     *   }
     * })
     */
    upsert<T extends QuestionUpsertArgs>(args: SelectSubset<T, QuestionUpsertArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Questions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionCountArgs} args - Arguments to filter Questions to count.
     * @example
     * // Count the number of Questions
     * const count = await prisma.question.count({
     *   where: {
     *     // ... the filter for the Questions we want to count
     *   }
     * })
    **/
    count<T extends QuestionCountArgs>(
      args?: Subset<T, QuestionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], QuestionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends QuestionAggregateArgs>(args: Subset<T, QuestionAggregateArgs>): Prisma.PrismaPromise<GetQuestionAggregateType<T>>

    /**
     * Group by Question.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {QuestionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends QuestionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: QuestionGroupByArgs['orderBy'] }
        : { orderBy?: QuestionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, QuestionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetQuestionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Question model
   */
  readonly fields: QuestionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Question.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__QuestionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    poll<T extends PollDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PollDefaultArgs<ExtArgs>>): Prisma__PollClient<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    options<T extends Question$optionsArgs<ExtArgs> = {}>(args?: Subset<T, Question$optionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    results<T extends Question$resultsArgs<ExtArgs> = {}>(args?: Subset<T, Question$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Question model
   */
  interface QuestionFieldRefs {
    readonly id: FieldRef<"Question", 'Int'>
    readonly text: FieldRef<"Question", 'String'>
    readonly timeLimit: FieldRef<"Question", 'Int'>
    readonly type: FieldRef<"Question", 'QuestionType'>
    readonly order: FieldRef<"Question", 'Int'>
    readonly pollId: FieldRef<"Question", 'Int'>
    readonly createdAt: FieldRef<"Question", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Question findUnique
   */
  export type QuestionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findUniqueOrThrow
   */
  export type QuestionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question findFirst
   */
  export type QuestionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findFirstOrThrow
   */
  export type QuestionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Question to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question findMany
   */
  export type QuestionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter, which Questions to fetch.
     */
    where?: QuestionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Questions to fetch.
     */
    orderBy?: QuestionOrderByWithRelationInput | QuestionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Questions.
     */
    cursor?: QuestionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Questions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Questions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Questions.
     */
    distinct?: QuestionScalarFieldEnum | QuestionScalarFieldEnum[]
  }

  /**
   * Question create
   */
  export type QuestionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to create a Question.
     */
    data: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
  }

  /**
   * Question createMany
   */
  export type QuestionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Questions.
     */
    data: QuestionCreateManyInput | QuestionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Question update
   */
  export type QuestionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The data needed to update a Question.
     */
    data: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
    /**
     * Choose, which Question to update.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question updateMany
   */
  export type QuestionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Questions.
     */
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyInput>
    /**
     * Filter which Questions to update
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to update.
     */
    limit?: number
  }

  /**
   * Question upsert
   */
  export type QuestionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * The filter to search for the Question to update in case it exists.
     */
    where: QuestionWhereUniqueInput
    /**
     * In case the Question found by the `where` argument doesn't exist, create a new Question with this data.
     */
    create: XOR<QuestionCreateInput, QuestionUncheckedCreateInput>
    /**
     * In case the Question was found with the provided `where` argument, update it with this data.
     */
    update: XOR<QuestionUpdateInput, QuestionUncheckedUpdateInput>
  }

  /**
   * Question delete
   */
  export type QuestionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
    /**
     * Filter which Question to delete.
     */
    where: QuestionWhereUniqueInput
  }

  /**
   * Question deleteMany
   */
  export type QuestionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Questions to delete
     */
    where?: QuestionWhereInput
    /**
     * Limit how many Questions to delete.
     */
    limit?: number
  }

  /**
   * Question.options
   */
  export type Question$optionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Option
     */
    select?: OptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Option
     */
    omit?: OptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OptionInclude<ExtArgs> | null
    where?: OptionWhereInput
    orderBy?: OptionOrderByWithRelationInput | OptionOrderByWithRelationInput[]
    cursor?: OptionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OptionScalarFieldEnum | OptionScalarFieldEnum[]
  }

  /**
   * Question.results
   */
  export type Question$resultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    where?: ResultWhereInput
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    cursor?: ResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Question without action
   */
  export type QuestionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Question
     */
    select?: QuestionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Question
     */
    omit?: QuestionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: QuestionInclude<ExtArgs> | null
  }


  /**
   * Model Option
   */

  export type AggregateOption = {
    _count: OptionCountAggregateOutputType | null
    _avg: OptionAvgAggregateOutputType | null
    _sum: OptionSumAggregateOutputType | null
    _min: OptionMinAggregateOutputType | null
    _max: OptionMaxAggregateOutputType | null
  }

  export type OptionAvgAggregateOutputType = {
    id: number | null
    questionId: number | null
  }

  export type OptionSumAggregateOutputType = {
    id: number | null
    questionId: number | null
  }

  export type OptionMinAggregateOutputType = {
    id: number | null
    text: string | null
    isCorrect: boolean | null
    questionId: number | null
    createdAt: Date | null
  }

  export type OptionMaxAggregateOutputType = {
    id: number | null
    text: string | null
    isCorrect: boolean | null
    questionId: number | null
    createdAt: Date | null
  }

  export type OptionCountAggregateOutputType = {
    id: number
    text: number
    isCorrect: number
    questionId: number
    createdAt: number
    _all: number
  }


  export type OptionAvgAggregateInputType = {
    id?: true
    questionId?: true
  }

  export type OptionSumAggregateInputType = {
    id?: true
    questionId?: true
  }

  export type OptionMinAggregateInputType = {
    id?: true
    text?: true
    isCorrect?: true
    questionId?: true
    createdAt?: true
  }

  export type OptionMaxAggregateInputType = {
    id?: true
    text?: true
    isCorrect?: true
    questionId?: true
    createdAt?: true
  }

  export type OptionCountAggregateInputType = {
    id?: true
    text?: true
    isCorrect?: true
    questionId?: true
    createdAt?: true
    _all?: true
  }

  export type OptionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Option to aggregate.
     */
    where?: OptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Options to fetch.
     */
    orderBy?: OptionOrderByWithRelationInput | OptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Options
    **/
    _count?: true | OptionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OptionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OptionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OptionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OptionMaxAggregateInputType
  }

  export type GetOptionAggregateType<T extends OptionAggregateArgs> = {
        [P in keyof T & keyof AggregateOption]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOption[P]>
      : GetScalarType<T[P], AggregateOption[P]>
  }




  export type OptionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OptionWhereInput
    orderBy?: OptionOrderByWithAggregationInput | OptionOrderByWithAggregationInput[]
    by: OptionScalarFieldEnum[] | OptionScalarFieldEnum
    having?: OptionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OptionCountAggregateInputType | true
    _avg?: OptionAvgAggregateInputType
    _sum?: OptionSumAggregateInputType
    _min?: OptionMinAggregateInputType
    _max?: OptionMaxAggregateInputType
  }

  export type OptionGroupByOutputType = {
    id: number
    text: string
    isCorrect: boolean
    questionId: number
    createdAt: Date
    _count: OptionCountAggregateOutputType | null
    _avg: OptionAvgAggregateOutputType | null
    _sum: OptionSumAggregateOutputType | null
    _min: OptionMinAggregateOutputType | null
    _max: OptionMaxAggregateOutputType | null
  }

  type GetOptionGroupByPayload<T extends OptionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OptionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OptionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OptionGroupByOutputType[P]>
            : GetScalarType<T[P], OptionGroupByOutputType[P]>
        }
      >
    >


  export type OptionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    text?: boolean
    isCorrect?: boolean
    questionId?: boolean
    createdAt?: boolean
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["option"]>



  export type OptionSelectScalar = {
    id?: boolean
    text?: boolean
    isCorrect?: boolean
    questionId?: boolean
    createdAt?: boolean
  }

  export type OptionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "text" | "isCorrect" | "questionId" | "createdAt", ExtArgs["result"]["option"]>
  export type OptionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $OptionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Option"
    objects: {
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      text: string
      isCorrect: boolean
      questionId: number
      createdAt: Date
    }, ExtArgs["result"]["option"]>
    composites: {}
  }

  type OptionGetPayload<S extends boolean | null | undefined | OptionDefaultArgs> = $Result.GetResult<Prisma.$OptionPayload, S>

  type OptionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OptionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OptionCountAggregateInputType | true
    }

  export interface OptionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Option'], meta: { name: 'Option' } }
    /**
     * Find zero or one Option that matches the filter.
     * @param {OptionFindUniqueArgs} args - Arguments to find a Option
     * @example
     * // Get one Option
     * const option = await prisma.option.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OptionFindUniqueArgs>(args: SelectSubset<T, OptionFindUniqueArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Option that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OptionFindUniqueOrThrowArgs} args - Arguments to find a Option
     * @example
     * // Get one Option
     * const option = await prisma.option.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OptionFindUniqueOrThrowArgs>(args: SelectSubset<T, OptionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Option that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionFindFirstArgs} args - Arguments to find a Option
     * @example
     * // Get one Option
     * const option = await prisma.option.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OptionFindFirstArgs>(args?: SelectSubset<T, OptionFindFirstArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Option that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionFindFirstOrThrowArgs} args - Arguments to find a Option
     * @example
     * // Get one Option
     * const option = await prisma.option.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OptionFindFirstOrThrowArgs>(args?: SelectSubset<T, OptionFindFirstOrThrowArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Options that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Options
     * const options = await prisma.option.findMany()
     * 
     * // Get first 10 Options
     * const options = await prisma.option.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const optionWithIdOnly = await prisma.option.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OptionFindManyArgs>(args?: SelectSubset<T, OptionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Option.
     * @param {OptionCreateArgs} args - Arguments to create a Option.
     * @example
     * // Create one Option
     * const Option = await prisma.option.create({
     *   data: {
     *     // ... data to create a Option
     *   }
     * })
     * 
     */
    create<T extends OptionCreateArgs>(args: SelectSubset<T, OptionCreateArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Options.
     * @param {OptionCreateManyArgs} args - Arguments to create many Options.
     * @example
     * // Create many Options
     * const option = await prisma.option.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OptionCreateManyArgs>(args?: SelectSubset<T, OptionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Option.
     * @param {OptionDeleteArgs} args - Arguments to delete one Option.
     * @example
     * // Delete one Option
     * const Option = await prisma.option.delete({
     *   where: {
     *     // ... filter to delete one Option
     *   }
     * })
     * 
     */
    delete<T extends OptionDeleteArgs>(args: SelectSubset<T, OptionDeleteArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Option.
     * @param {OptionUpdateArgs} args - Arguments to update one Option.
     * @example
     * // Update one Option
     * const option = await prisma.option.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OptionUpdateArgs>(args: SelectSubset<T, OptionUpdateArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Options.
     * @param {OptionDeleteManyArgs} args - Arguments to filter Options to delete.
     * @example
     * // Delete a few Options
     * const { count } = await prisma.option.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OptionDeleteManyArgs>(args?: SelectSubset<T, OptionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Options
     * const option = await prisma.option.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OptionUpdateManyArgs>(args: SelectSubset<T, OptionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Option.
     * @param {OptionUpsertArgs} args - Arguments to update or create a Option.
     * @example
     * // Update or create a Option
     * const option = await prisma.option.upsert({
     *   create: {
     *     // ... data to create a Option
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Option we want to update
     *   }
     * })
     */
    upsert<T extends OptionUpsertArgs>(args: SelectSubset<T, OptionUpsertArgs<ExtArgs>>): Prisma__OptionClient<$Result.GetResult<Prisma.$OptionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Options.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionCountArgs} args - Arguments to filter Options to count.
     * @example
     * // Count the number of Options
     * const count = await prisma.option.count({
     *   where: {
     *     // ... the filter for the Options we want to count
     *   }
     * })
    **/
    count<T extends OptionCountArgs>(
      args?: Subset<T, OptionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OptionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Option.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OptionAggregateArgs>(args: Subset<T, OptionAggregateArgs>): Prisma.PrismaPromise<GetOptionAggregateType<T>>

    /**
     * Group by Option.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OptionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OptionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OptionGroupByArgs['orderBy'] }
        : { orderBy?: OptionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OptionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOptionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Option model
   */
  readonly fields: OptionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Option.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OptionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Option model
   */
  interface OptionFieldRefs {
    readonly id: FieldRef<"Option", 'Int'>
    readonly text: FieldRef<"Option", 'String'>
    readonly isCorrect: FieldRef<"Option", 'Boolean'>
    readonly questionId: FieldRef<"Option", 'Int'>
    readonly createdAt: FieldRef<"Option", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Option findUnique
   */
  export type OptionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Option
     */
    select?: OptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Option
     */
    omit?: OptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OptionInclude<ExtArgs> | null
    /**
     * Filter, which Option to fetch.
     */
    where: OptionWhereUniqueInput
  }

  /**
   * Option findUniqueOrThrow
   */
  export type OptionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Option
     */
    select?: OptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Option
     */
    omit?: OptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OptionInclude<ExtArgs> | null
    /**
     * Filter, which Option to fetch.
     */
    where: OptionWhereUniqueInput
  }

  /**
   * Option findFirst
   */
  export type OptionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Option
     */
    select?: OptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Option
     */
    omit?: OptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OptionInclude<ExtArgs> | null
    /**
     * Filter, which Option to fetch.
     */
    where?: OptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Options to fetch.
     */
    orderBy?: OptionOrderByWithRelationInput | OptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Options.
     */
    cursor?: OptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Options.
     */
    distinct?: OptionScalarFieldEnum | OptionScalarFieldEnum[]
  }

  /**
   * Option findFirstOrThrow
   */
  export type OptionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Option
     */
    select?: OptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Option
     */
    omit?: OptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OptionInclude<ExtArgs> | null
    /**
     * Filter, which Option to fetch.
     */
    where?: OptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Options to fetch.
     */
    orderBy?: OptionOrderByWithRelationInput | OptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Options.
     */
    cursor?: OptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Options.
     */
    distinct?: OptionScalarFieldEnum | OptionScalarFieldEnum[]
  }

  /**
   * Option findMany
   */
  export type OptionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Option
     */
    select?: OptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Option
     */
    omit?: OptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OptionInclude<ExtArgs> | null
    /**
     * Filter, which Options to fetch.
     */
    where?: OptionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Options to fetch.
     */
    orderBy?: OptionOrderByWithRelationInput | OptionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Options.
     */
    cursor?: OptionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Options from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Options.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Options.
     */
    distinct?: OptionScalarFieldEnum | OptionScalarFieldEnum[]
  }

  /**
   * Option create
   */
  export type OptionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Option
     */
    select?: OptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Option
     */
    omit?: OptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OptionInclude<ExtArgs> | null
    /**
     * The data needed to create a Option.
     */
    data: XOR<OptionCreateInput, OptionUncheckedCreateInput>
  }

  /**
   * Option createMany
   */
  export type OptionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Options.
     */
    data: OptionCreateManyInput | OptionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Option update
   */
  export type OptionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Option
     */
    select?: OptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Option
     */
    omit?: OptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OptionInclude<ExtArgs> | null
    /**
     * The data needed to update a Option.
     */
    data: XOR<OptionUpdateInput, OptionUncheckedUpdateInput>
    /**
     * Choose, which Option to update.
     */
    where: OptionWhereUniqueInput
  }

  /**
   * Option updateMany
   */
  export type OptionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Options.
     */
    data: XOR<OptionUpdateManyMutationInput, OptionUncheckedUpdateManyInput>
    /**
     * Filter which Options to update
     */
    where?: OptionWhereInput
    /**
     * Limit how many Options to update.
     */
    limit?: number
  }

  /**
   * Option upsert
   */
  export type OptionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Option
     */
    select?: OptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Option
     */
    omit?: OptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OptionInclude<ExtArgs> | null
    /**
     * The filter to search for the Option to update in case it exists.
     */
    where: OptionWhereUniqueInput
    /**
     * In case the Option found by the `where` argument doesn't exist, create a new Option with this data.
     */
    create: XOR<OptionCreateInput, OptionUncheckedCreateInput>
    /**
     * In case the Option was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OptionUpdateInput, OptionUncheckedUpdateInput>
  }

  /**
   * Option delete
   */
  export type OptionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Option
     */
    select?: OptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Option
     */
    omit?: OptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OptionInclude<ExtArgs> | null
    /**
     * Filter which Option to delete.
     */
    where: OptionWhereUniqueInput
  }

  /**
   * Option deleteMany
   */
  export type OptionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Options to delete
     */
    where?: OptionWhereInput
    /**
     * Limit how many Options to delete.
     */
    limit?: number
  }

  /**
   * Option without action
   */
  export type OptionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Option
     */
    select?: OptionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Option
     */
    omit?: OptionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OptionInclude<ExtArgs> | null
  }


  /**
   * Model Session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionAvgAggregateOutputType = {
    id: number | null
    currentQuestion: number | null
    pollId: number | null
    organizerId: number | null
  }

  export type SessionSumAggregateOutputType = {
    id: number | null
    currentQuestion: number | null
    pollId: number | null
    organizerId: number | null
  }

  export type SessionMinAggregateOutputType = {
    id: number | null
    pin: string | null
    status: $Enums.SessionStatus | null
    progressionMode: $Enums.ProgressionMode | null
    currentQuestion: number | null
    pollId: number | null
    organizerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionMaxAggregateOutputType = {
    id: number | null
    pin: string | null
    status: $Enums.SessionStatus | null
    progressionMode: $Enums.ProgressionMode | null
    currentQuestion: number | null
    pollId: number | null
    organizerId: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    pin: number
    status: number
    progressionMode: number
    currentQuestion: number
    pollId: number
    organizerId: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type SessionAvgAggregateInputType = {
    id?: true
    currentQuestion?: true
    pollId?: true
    organizerId?: true
  }

  export type SessionSumAggregateInputType = {
    id?: true
    currentQuestion?: true
    pollId?: true
    organizerId?: true
  }

  export type SessionMinAggregateInputType = {
    id?: true
    pin?: true
    status?: true
    progressionMode?: true
    currentQuestion?: true
    pollId?: true
    organizerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    pin?: true
    status?: true
    progressionMode?: true
    currentQuestion?: true
    pollId?: true
    organizerId?: true
    createdAt?: true
    updatedAt?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    pin?: true
    status?: true
    progressionMode?: true
    currentQuestion?: true
    pollId?: true
    organizerId?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Session to aggregate.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SessionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SessionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type SessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SessionWhereInput
    orderBy?: SessionOrderByWithAggregationInput | SessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: SessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _avg?: SessionAvgAggregateInputType
    _sum?: SessionSumAggregateInputType
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: number
    pin: string
    status: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion: number
    pollId: number
    organizerId: number
    createdAt: Date
    updatedAt: Date
    _count: SessionCountAggregateOutputType | null
    _avg: SessionAvgAggregateOutputType | null
    _sum: SessionSumAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends SessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type SessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    pin?: boolean
    status?: boolean
    progressionMode?: boolean
    currentQuestion?: boolean
    pollId?: boolean
    organizerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    poll?: boolean | PollDefaultArgs<ExtArgs>
    organizer?: boolean | UserDefaultArgs<ExtArgs>
    results?: boolean | Session$resultsArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["session"]>



  export type SessionSelectScalar = {
    id?: boolean
    pin?: boolean
    status?: boolean
    progressionMode?: boolean
    currentQuestion?: boolean
    pollId?: boolean
    organizerId?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type SessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "pin" | "status" | "progressionMode" | "currentQuestion" | "pollId" | "organizerId" | "createdAt" | "updatedAt", ExtArgs["result"]["session"]>
  export type SessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    poll?: boolean | PollDefaultArgs<ExtArgs>
    organizer?: boolean | UserDefaultArgs<ExtArgs>
    results?: boolean | Session$resultsArgs<ExtArgs>
    _count?: boolean | SessionCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Session"
    objects: {
      poll: Prisma.$PollPayload<ExtArgs>
      organizer: Prisma.$UserPayload<ExtArgs>
      results: Prisma.$ResultPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      pin: string
      status: $Enums.SessionStatus
      progressionMode: $Enums.ProgressionMode
      currentQuestion: number
      pollId: number
      organizerId: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type SessionGetPayload<S extends boolean | null | undefined | SessionDefaultArgs> = $Result.GetResult<Prisma.$SessionPayload, S>

  type SessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface SessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Session'], meta: { name: 'Session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {SessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SessionFindUniqueArgs>(args: SelectSubset<T, SessionFindUniqueArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SessionFindUniqueOrThrowArgs>(args: SelectSubset<T, SessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SessionFindFirstArgs>(args?: SelectSubset<T, SessionFindFirstArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SessionFindFirstOrThrowArgs>(args?: SelectSubset<T, SessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SessionFindManyArgs>(args?: SelectSubset<T, SessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {SessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends SessionCreateArgs>(args: SelectSubset<T, SessionCreateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {SessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SessionCreateManyArgs>(args?: SelectSubset<T, SessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {SessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends SessionDeleteArgs>(args: SelectSubset<T, SessionDeleteArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {SessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SessionUpdateArgs>(args: SelectSubset<T, SessionUpdateArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {SessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SessionDeleteManyArgs>(args?: SelectSubset<T, SessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SessionUpdateManyArgs>(args: SelectSubset<T, SessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {SessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends SessionUpsertArgs>(args: SelectSubset<T, SessionUpsertArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends SessionCountArgs>(
      args?: Subset<T, SessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SessionGroupByArgs['orderBy'] }
        : { orderBy?: SessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Session model
   */
  readonly fields: SessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    poll<T extends PollDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PollDefaultArgs<ExtArgs>>): Prisma__PollClient<$Result.GetResult<Prisma.$PollPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    organizer<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    results<T extends Session$resultsArgs<ExtArgs> = {}>(args?: Subset<T, Session$resultsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Session model
   */
  interface SessionFieldRefs {
    readonly id: FieldRef<"Session", 'Int'>
    readonly pin: FieldRef<"Session", 'String'>
    readonly status: FieldRef<"Session", 'SessionStatus'>
    readonly progressionMode: FieldRef<"Session", 'ProgressionMode'>
    readonly currentQuestion: FieldRef<"Session", 'Int'>
    readonly pollId: FieldRef<"Session", 'Int'>
    readonly organizerId: FieldRef<"Session", 'Int'>
    readonly createdAt: FieldRef<"Session", 'DateTime'>
    readonly updatedAt: FieldRef<"Session", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Session findUnique
   */
  export type SessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findUniqueOrThrow
   */
  export type SessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session findFirst
   */
  export type SessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findFirstOrThrow
   */
  export type SessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Session to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session findMany
   */
  export type SessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter, which Sessions to fetch.
     */
    where?: SessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Sessions to fetch.
     */
    orderBy?: SessionOrderByWithRelationInput | SessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Sessions.
     */
    cursor?: SessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * Session create
   */
  export type SessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to create a Session.
     */
    data: XOR<SessionCreateInput, SessionUncheckedCreateInput>
  }

  /**
   * Session createMany
   */
  export type SessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Sessions.
     */
    data: SessionCreateManyInput | SessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Session update
   */
  export type SessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The data needed to update a Session.
     */
    data: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
    /**
     * Choose, which Session to update.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session updateMany
   */
  export type SessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Sessions.
     */
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyInput>
    /**
     * Filter which Sessions to update
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to update.
     */
    limit?: number
  }

  /**
   * Session upsert
   */
  export type SessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * The filter to search for the Session to update in case it exists.
     */
    where: SessionWhereUniqueInput
    /**
     * In case the Session found by the `where` argument doesn't exist, create a new Session with this data.
     */
    create: XOR<SessionCreateInput, SessionUncheckedCreateInput>
    /**
     * In case the Session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SessionUpdateInput, SessionUncheckedUpdateInput>
  }

  /**
   * Session delete
   */
  export type SessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
    /**
     * Filter which Session to delete.
     */
    where: SessionWhereUniqueInput
  }

  /**
   * Session deleteMany
   */
  export type SessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Sessions to delete
     */
    where?: SessionWhereInput
    /**
     * Limit how many Sessions to delete.
     */
    limit?: number
  }

  /**
   * Session.results
   */
  export type Session$resultsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    where?: ResultWhereInput
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    cursor?: ResultWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Session without action
   */
  export type SessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Session
     */
    select?: SessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Session
     */
    omit?: SessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SessionInclude<ExtArgs> | null
  }


  /**
   * Model Result
   */

  export type AggregateResult = {
    _count: ResultCountAggregateOutputType | null
    _avg: ResultAvgAggregateOutputType | null
    _sum: ResultSumAggregateOutputType | null
    _min: ResultMinAggregateOutputType | null
    _max: ResultMaxAggregateOutputType | null
  }

  export type ResultAvgAggregateOutputType = {
    id: number | null
    sessionId: number | null
    questionId: number | null
    score: number | null
  }

  export type ResultSumAggregateOutputType = {
    id: number | null
    sessionId: number | null
    questionId: number | null
    score: number | null
  }

  export type ResultMinAggregateOutputType = {
    id: number | null
    sessionId: number | null
    questionId: number | null
    participantId: string | null
    score: number | null
    answeredAt: Date | null
  }

  export type ResultMaxAggregateOutputType = {
    id: number | null
    sessionId: number | null
    questionId: number | null
    participantId: string | null
    score: number | null
    answeredAt: Date | null
  }

  export type ResultCountAggregateOutputType = {
    id: number
    sessionId: number
    questionId: number
    participantId: number
    optionIds: number
    score: number
    answeredAt: number
    _all: number
  }


  export type ResultAvgAggregateInputType = {
    id?: true
    sessionId?: true
    questionId?: true
    score?: true
  }

  export type ResultSumAggregateInputType = {
    id?: true
    sessionId?: true
    questionId?: true
    score?: true
  }

  export type ResultMinAggregateInputType = {
    id?: true
    sessionId?: true
    questionId?: true
    participantId?: true
    score?: true
    answeredAt?: true
  }

  export type ResultMaxAggregateInputType = {
    id?: true
    sessionId?: true
    questionId?: true
    participantId?: true
    score?: true
    answeredAt?: true
  }

  export type ResultCountAggregateInputType = {
    id?: true
    sessionId?: true
    questionId?: true
    participantId?: true
    optionIds?: true
    score?: true
    answeredAt?: true
    _all?: true
  }

  export type ResultAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Result to aggregate.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Results
    **/
    _count?: true | ResultCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ResultAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ResultSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ResultMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ResultMaxAggregateInputType
  }

  export type GetResultAggregateType<T extends ResultAggregateArgs> = {
        [P in keyof T & keyof AggregateResult]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateResult[P]>
      : GetScalarType<T[P], AggregateResult[P]>
  }




  export type ResultGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ResultWhereInput
    orderBy?: ResultOrderByWithAggregationInput | ResultOrderByWithAggregationInput[]
    by: ResultScalarFieldEnum[] | ResultScalarFieldEnum
    having?: ResultScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ResultCountAggregateInputType | true
    _avg?: ResultAvgAggregateInputType
    _sum?: ResultSumAggregateInputType
    _min?: ResultMinAggregateInputType
    _max?: ResultMaxAggregateInputType
  }

  export type ResultGroupByOutputType = {
    id: number
    sessionId: number
    questionId: number
    participantId: string
    optionIds: JsonValue
    score: number
    answeredAt: Date
    _count: ResultCountAggregateOutputType | null
    _avg: ResultAvgAggregateOutputType | null
    _sum: ResultSumAggregateOutputType | null
    _min: ResultMinAggregateOutputType | null
    _max: ResultMaxAggregateOutputType | null
  }

  type GetResultGroupByPayload<T extends ResultGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ResultGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ResultGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ResultGroupByOutputType[P]>
            : GetScalarType<T[P], ResultGroupByOutputType[P]>
        }
      >
    >


  export type ResultSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    sessionId?: boolean
    questionId?: boolean
    participantId?: boolean
    optionIds?: boolean
    score?: boolean
    answeredAt?: boolean
    session?: boolean | SessionDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["result"]>



  export type ResultSelectScalar = {
    id?: boolean
    sessionId?: boolean
    questionId?: boolean
    participantId?: boolean
    optionIds?: boolean
    score?: boolean
    answeredAt?: boolean
  }

  export type ResultOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "sessionId" | "questionId" | "participantId" | "optionIds" | "score" | "answeredAt", ExtArgs["result"]["result"]>
  export type ResultInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    session?: boolean | SessionDefaultArgs<ExtArgs>
    question?: boolean | QuestionDefaultArgs<ExtArgs>
  }

  export type $ResultPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Result"
    objects: {
      session: Prisma.$SessionPayload<ExtArgs>
      question: Prisma.$QuestionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      sessionId: number
      questionId: number
      participantId: string
      optionIds: Prisma.JsonValue
      score: number
      answeredAt: Date
    }, ExtArgs["result"]["result"]>
    composites: {}
  }

  type ResultGetPayload<S extends boolean | null | undefined | ResultDefaultArgs> = $Result.GetResult<Prisma.$ResultPayload, S>

  type ResultCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ResultFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ResultCountAggregateInputType | true
    }

  export interface ResultDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Result'], meta: { name: 'Result' } }
    /**
     * Find zero or one Result that matches the filter.
     * @param {ResultFindUniqueArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ResultFindUniqueArgs>(args: SelectSubset<T, ResultFindUniqueArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Result that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ResultFindUniqueOrThrowArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ResultFindUniqueOrThrowArgs>(args: SelectSubset<T, ResultFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Result that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultFindFirstArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ResultFindFirstArgs>(args?: SelectSubset<T, ResultFindFirstArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Result that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultFindFirstOrThrowArgs} args - Arguments to find a Result
     * @example
     * // Get one Result
     * const result = await prisma.result.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ResultFindFirstOrThrowArgs>(args?: SelectSubset<T, ResultFindFirstOrThrowArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Results that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Results
     * const results = await prisma.result.findMany()
     * 
     * // Get first 10 Results
     * const results = await prisma.result.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const resultWithIdOnly = await prisma.result.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ResultFindManyArgs>(args?: SelectSubset<T, ResultFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Result.
     * @param {ResultCreateArgs} args - Arguments to create a Result.
     * @example
     * // Create one Result
     * const Result = await prisma.result.create({
     *   data: {
     *     // ... data to create a Result
     *   }
     * })
     * 
     */
    create<T extends ResultCreateArgs>(args: SelectSubset<T, ResultCreateArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Results.
     * @param {ResultCreateManyArgs} args - Arguments to create many Results.
     * @example
     * // Create many Results
     * const result = await prisma.result.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ResultCreateManyArgs>(args?: SelectSubset<T, ResultCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Result.
     * @param {ResultDeleteArgs} args - Arguments to delete one Result.
     * @example
     * // Delete one Result
     * const Result = await prisma.result.delete({
     *   where: {
     *     // ... filter to delete one Result
     *   }
     * })
     * 
     */
    delete<T extends ResultDeleteArgs>(args: SelectSubset<T, ResultDeleteArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Result.
     * @param {ResultUpdateArgs} args - Arguments to update one Result.
     * @example
     * // Update one Result
     * const result = await prisma.result.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ResultUpdateArgs>(args: SelectSubset<T, ResultUpdateArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Results.
     * @param {ResultDeleteManyArgs} args - Arguments to filter Results to delete.
     * @example
     * // Delete a few Results
     * const { count } = await prisma.result.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ResultDeleteManyArgs>(args?: SelectSubset<T, ResultDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Results.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Results
     * const result = await prisma.result.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ResultUpdateManyArgs>(args: SelectSubset<T, ResultUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Result.
     * @param {ResultUpsertArgs} args - Arguments to update or create a Result.
     * @example
     * // Update or create a Result
     * const result = await prisma.result.upsert({
     *   create: {
     *     // ... data to create a Result
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Result we want to update
     *   }
     * })
     */
    upsert<T extends ResultUpsertArgs>(args: SelectSubset<T, ResultUpsertArgs<ExtArgs>>): Prisma__ResultClient<$Result.GetResult<Prisma.$ResultPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Results.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultCountArgs} args - Arguments to filter Results to count.
     * @example
     * // Count the number of Results
     * const count = await prisma.result.count({
     *   where: {
     *     // ... the filter for the Results we want to count
     *   }
     * })
    **/
    count<T extends ResultCountArgs>(
      args?: Subset<T, ResultCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ResultCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Result.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ResultAggregateArgs>(args: Subset<T, ResultAggregateArgs>): Prisma.PrismaPromise<GetResultAggregateType<T>>

    /**
     * Group by Result.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ResultGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ResultGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ResultGroupByArgs['orderBy'] }
        : { orderBy?: ResultGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ResultGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetResultGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Result model
   */
  readonly fields: ResultFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Result.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ResultClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    session<T extends SessionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SessionDefaultArgs<ExtArgs>>): Prisma__SessionClient<$Result.GetResult<Prisma.$SessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    question<T extends QuestionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, QuestionDefaultArgs<ExtArgs>>): Prisma__QuestionClient<$Result.GetResult<Prisma.$QuestionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Result model
   */
  interface ResultFieldRefs {
    readonly id: FieldRef<"Result", 'Int'>
    readonly sessionId: FieldRef<"Result", 'Int'>
    readonly questionId: FieldRef<"Result", 'Int'>
    readonly participantId: FieldRef<"Result", 'String'>
    readonly optionIds: FieldRef<"Result", 'Json'>
    readonly score: FieldRef<"Result", 'Int'>
    readonly answeredAt: FieldRef<"Result", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Result findUnique
   */
  export type ResultFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result findUniqueOrThrow
   */
  export type ResultFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result findFirst
   */
  export type ResultFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Results.
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Results.
     */
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Result findFirstOrThrow
   */
  export type ResultFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Result to fetch.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Results.
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Results.
     */
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Result findMany
   */
  export type ResultFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter, which Results to fetch.
     */
    where?: ResultWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Results to fetch.
     */
    orderBy?: ResultOrderByWithRelationInput | ResultOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Results.
     */
    cursor?: ResultWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Results from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Results.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Results.
     */
    distinct?: ResultScalarFieldEnum | ResultScalarFieldEnum[]
  }

  /**
   * Result create
   */
  export type ResultCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * The data needed to create a Result.
     */
    data: XOR<ResultCreateInput, ResultUncheckedCreateInput>
  }

  /**
   * Result createMany
   */
  export type ResultCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Results.
     */
    data: ResultCreateManyInput | ResultCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Result update
   */
  export type ResultUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * The data needed to update a Result.
     */
    data: XOR<ResultUpdateInput, ResultUncheckedUpdateInput>
    /**
     * Choose, which Result to update.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result updateMany
   */
  export type ResultUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Results.
     */
    data: XOR<ResultUpdateManyMutationInput, ResultUncheckedUpdateManyInput>
    /**
     * Filter which Results to update
     */
    where?: ResultWhereInput
    /**
     * Limit how many Results to update.
     */
    limit?: number
  }

  /**
   * Result upsert
   */
  export type ResultUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * The filter to search for the Result to update in case it exists.
     */
    where: ResultWhereUniqueInput
    /**
     * In case the Result found by the `where` argument doesn't exist, create a new Result with this data.
     */
    create: XOR<ResultCreateInput, ResultUncheckedCreateInput>
    /**
     * In case the Result was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ResultUpdateInput, ResultUncheckedUpdateInput>
  }

  /**
   * Result delete
   */
  export type ResultDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
    /**
     * Filter which Result to delete.
     */
    where: ResultWhereUniqueInput
  }

  /**
   * Result deleteMany
   */
  export type ResultDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Results to delete
     */
    where?: ResultWhereInput
    /**
     * Limit how many Results to delete.
     */
    limit?: number
  }

  /**
   * Result without action
   */
  export type ResultDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Result
     */
    select?: ResultSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Result
     */
    omit?: ResultOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ResultInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const PollScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    organizerId: 'organizerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PollScalarFieldEnum = (typeof PollScalarFieldEnum)[keyof typeof PollScalarFieldEnum]


  export const QuestionScalarFieldEnum: {
    id: 'id',
    text: 'text',
    timeLimit: 'timeLimit',
    type: 'type',
    order: 'order',
    pollId: 'pollId',
    createdAt: 'createdAt'
  };

  export type QuestionScalarFieldEnum = (typeof QuestionScalarFieldEnum)[keyof typeof QuestionScalarFieldEnum]


  export const OptionScalarFieldEnum: {
    id: 'id',
    text: 'text',
    isCorrect: 'isCorrect',
    questionId: 'questionId',
    createdAt: 'createdAt'
  };

  export type OptionScalarFieldEnum = (typeof OptionScalarFieldEnum)[keyof typeof OptionScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    pin: 'pin',
    status: 'status',
    progressionMode: 'progressionMode',
    currentQuestion: 'currentQuestion',
    pollId: 'pollId',
    organizerId: 'organizerId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const ResultScalarFieldEnum: {
    id: 'id',
    sessionId: 'sessionId',
    questionId: 'questionId',
    participantId: 'participantId',
    optionIds: 'optionIds',
    score: 'score',
    answeredAt: 'answeredAt'
  };

  export type ResultScalarFieldEnum = (typeof ResultScalarFieldEnum)[keyof typeof ResultScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const UserOrderByRelevanceFieldEnum: {
    email: 'email',
    password: 'password',
    name: 'name'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const PollOrderByRelevanceFieldEnum: {
    title: 'title',
    description: 'description'
  };

  export type PollOrderByRelevanceFieldEnum = (typeof PollOrderByRelevanceFieldEnum)[keyof typeof PollOrderByRelevanceFieldEnum]


  export const QuestionOrderByRelevanceFieldEnum: {
    text: 'text'
  };

  export type QuestionOrderByRelevanceFieldEnum = (typeof QuestionOrderByRelevanceFieldEnum)[keyof typeof QuestionOrderByRelevanceFieldEnum]


  export const OptionOrderByRelevanceFieldEnum: {
    text: 'text'
  };

  export type OptionOrderByRelevanceFieldEnum = (typeof OptionOrderByRelevanceFieldEnum)[keyof typeof OptionOrderByRelevanceFieldEnum]


  export const SessionOrderByRelevanceFieldEnum: {
    pin: 'pin'
  };

  export type SessionOrderByRelevanceFieldEnum = (typeof SessionOrderByRelevanceFieldEnum)[keyof typeof SessionOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const ResultOrderByRelevanceFieldEnum: {
    participantId: 'participantId'
  };

  export type ResultOrderByRelevanceFieldEnum = (typeof ResultOrderByRelevanceFieldEnum)[keyof typeof ResultOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'QuestionType'
   */
  export type EnumQuestionTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QuestionType'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'SessionStatus'
   */
  export type EnumSessionStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'SessionStatus'>
    


  /**
   * Reference to a field of type 'ProgressionMode'
   */
  export type EnumProgressionModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ProgressionMode'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    polls?: PollListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    polls?: PollOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    polls?: PollListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type PollWhereInput = {
    AND?: PollWhereInput | PollWhereInput[]
    OR?: PollWhereInput[]
    NOT?: PollWhereInput | PollWhereInput[]
    id?: IntFilter<"Poll"> | number
    title?: StringFilter<"Poll"> | string
    description?: StringNullableFilter<"Poll"> | string | null
    organizerId?: IntFilter<"Poll"> | number
    createdAt?: DateTimeFilter<"Poll"> | Date | string
    updatedAt?: DateTimeFilter<"Poll"> | Date | string
    organizer?: XOR<UserScalarRelationFilter, UserWhereInput>
    questions?: QuestionListRelationFilter
    sessions?: SessionListRelationFilter
  }

  export type PollOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    organizer?: UserOrderByWithRelationInput
    questions?: QuestionOrderByRelationAggregateInput
    sessions?: SessionOrderByRelationAggregateInput
    _relevance?: PollOrderByRelevanceInput
  }

  export type PollWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PollWhereInput | PollWhereInput[]
    OR?: PollWhereInput[]
    NOT?: PollWhereInput | PollWhereInput[]
    title?: StringFilter<"Poll"> | string
    description?: StringNullableFilter<"Poll"> | string | null
    organizerId?: IntFilter<"Poll"> | number
    createdAt?: DateTimeFilter<"Poll"> | Date | string
    updatedAt?: DateTimeFilter<"Poll"> | Date | string
    organizer?: XOR<UserScalarRelationFilter, UserWhereInput>
    questions?: QuestionListRelationFilter
    sessions?: SessionListRelationFilter
  }, "id">

  export type PollOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PollCountOrderByAggregateInput
    _avg?: PollAvgOrderByAggregateInput
    _max?: PollMaxOrderByAggregateInput
    _min?: PollMinOrderByAggregateInput
    _sum?: PollSumOrderByAggregateInput
  }

  export type PollScalarWhereWithAggregatesInput = {
    AND?: PollScalarWhereWithAggregatesInput | PollScalarWhereWithAggregatesInput[]
    OR?: PollScalarWhereWithAggregatesInput[]
    NOT?: PollScalarWhereWithAggregatesInput | PollScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Poll"> | number
    title?: StringWithAggregatesFilter<"Poll"> | string
    description?: StringNullableWithAggregatesFilter<"Poll"> | string | null
    organizerId?: IntWithAggregatesFilter<"Poll"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Poll"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Poll"> | Date | string
  }

  export type QuestionWhereInput = {
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    id?: IntFilter<"Question"> | number
    text?: StringFilter<"Question"> | string
    timeLimit?: IntFilter<"Question"> | number
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    order?: IntFilter<"Question"> | number
    pollId?: IntFilter<"Question"> | number
    createdAt?: DateTimeFilter<"Question"> | Date | string
    poll?: XOR<PollScalarRelationFilter, PollWhereInput>
    options?: OptionListRelationFilter
    results?: ResultListRelationFilter
  }

  export type QuestionOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    timeLimit?: SortOrder
    type?: SortOrder
    order?: SortOrder
    pollId?: SortOrder
    createdAt?: SortOrder
    poll?: PollOrderByWithRelationInput
    options?: OptionOrderByRelationAggregateInput
    results?: ResultOrderByRelationAggregateInput
    _relevance?: QuestionOrderByRelevanceInput
  }

  export type QuestionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: QuestionWhereInput | QuestionWhereInput[]
    OR?: QuestionWhereInput[]
    NOT?: QuestionWhereInput | QuestionWhereInput[]
    text?: StringFilter<"Question"> | string
    timeLimit?: IntFilter<"Question"> | number
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    order?: IntFilter<"Question"> | number
    pollId?: IntFilter<"Question"> | number
    createdAt?: DateTimeFilter<"Question"> | Date | string
    poll?: XOR<PollScalarRelationFilter, PollWhereInput>
    options?: OptionListRelationFilter
    results?: ResultListRelationFilter
  }, "id">

  export type QuestionOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    timeLimit?: SortOrder
    type?: SortOrder
    order?: SortOrder
    pollId?: SortOrder
    createdAt?: SortOrder
    _count?: QuestionCountOrderByAggregateInput
    _avg?: QuestionAvgOrderByAggregateInput
    _max?: QuestionMaxOrderByAggregateInput
    _min?: QuestionMinOrderByAggregateInput
    _sum?: QuestionSumOrderByAggregateInput
  }

  export type QuestionScalarWhereWithAggregatesInput = {
    AND?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    OR?: QuestionScalarWhereWithAggregatesInput[]
    NOT?: QuestionScalarWhereWithAggregatesInput | QuestionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Question"> | number
    text?: StringWithAggregatesFilter<"Question"> | string
    timeLimit?: IntWithAggregatesFilter<"Question"> | number
    type?: EnumQuestionTypeWithAggregatesFilter<"Question"> | $Enums.QuestionType
    order?: IntWithAggregatesFilter<"Question"> | number
    pollId?: IntWithAggregatesFilter<"Question"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Question"> | Date | string
  }

  export type OptionWhereInput = {
    AND?: OptionWhereInput | OptionWhereInput[]
    OR?: OptionWhereInput[]
    NOT?: OptionWhereInput | OptionWhereInput[]
    id?: IntFilter<"Option"> | number
    text?: StringFilter<"Option"> | string
    isCorrect?: BoolFilter<"Option"> | boolean
    questionId?: IntFilter<"Option"> | number
    createdAt?: DateTimeFilter<"Option"> | Date | string
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
  }

  export type OptionOrderByWithRelationInput = {
    id?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    questionId?: SortOrder
    createdAt?: SortOrder
    question?: QuestionOrderByWithRelationInput
    _relevance?: OptionOrderByRelevanceInput
  }

  export type OptionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: OptionWhereInput | OptionWhereInput[]
    OR?: OptionWhereInput[]
    NOT?: OptionWhereInput | OptionWhereInput[]
    text?: StringFilter<"Option"> | string
    isCorrect?: BoolFilter<"Option"> | boolean
    questionId?: IntFilter<"Option"> | number
    createdAt?: DateTimeFilter<"Option"> | Date | string
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
  }, "id">

  export type OptionOrderByWithAggregationInput = {
    id?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    questionId?: SortOrder
    createdAt?: SortOrder
    _count?: OptionCountOrderByAggregateInput
    _avg?: OptionAvgOrderByAggregateInput
    _max?: OptionMaxOrderByAggregateInput
    _min?: OptionMinOrderByAggregateInput
    _sum?: OptionSumOrderByAggregateInput
  }

  export type OptionScalarWhereWithAggregatesInput = {
    AND?: OptionScalarWhereWithAggregatesInput | OptionScalarWhereWithAggregatesInput[]
    OR?: OptionScalarWhereWithAggregatesInput[]
    NOT?: OptionScalarWhereWithAggregatesInput | OptionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Option"> | number
    text?: StringWithAggregatesFilter<"Option"> | string
    isCorrect?: BoolWithAggregatesFilter<"Option"> | boolean
    questionId?: IntWithAggregatesFilter<"Option"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Option"> | Date | string
  }

  export type SessionWhereInput = {
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    id?: IntFilter<"Session"> | number
    pin?: StringFilter<"Session"> | string
    status?: EnumSessionStatusFilter<"Session"> | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFilter<"Session"> | $Enums.ProgressionMode
    currentQuestion?: IntFilter<"Session"> | number
    pollId?: IntFilter<"Session"> | number
    organizerId?: IntFilter<"Session"> | number
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    poll?: XOR<PollScalarRelationFilter, PollWhereInput>
    organizer?: XOR<UserScalarRelationFilter, UserWhereInput>
    results?: ResultListRelationFilter
  }

  export type SessionOrderByWithRelationInput = {
    id?: SortOrder
    pin?: SortOrder
    status?: SortOrder
    progressionMode?: SortOrder
    currentQuestion?: SortOrder
    pollId?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    poll?: PollOrderByWithRelationInput
    organizer?: UserOrderByWithRelationInput
    results?: ResultOrderByRelationAggregateInput
    _relevance?: SessionOrderByRelevanceInput
  }

  export type SessionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    pin?: string
    AND?: SessionWhereInput | SessionWhereInput[]
    OR?: SessionWhereInput[]
    NOT?: SessionWhereInput | SessionWhereInput[]
    status?: EnumSessionStatusFilter<"Session"> | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFilter<"Session"> | $Enums.ProgressionMode
    currentQuestion?: IntFilter<"Session"> | number
    pollId?: IntFilter<"Session"> | number
    organizerId?: IntFilter<"Session"> | number
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
    poll?: XOR<PollScalarRelationFilter, PollWhereInput>
    organizer?: XOR<UserScalarRelationFilter, UserWhereInput>
    results?: ResultListRelationFilter
  }, "id" | "pin">

  export type SessionOrderByWithAggregationInput = {
    id?: SortOrder
    pin?: SortOrder
    status?: SortOrder
    progressionMode?: SortOrder
    currentQuestion?: SortOrder
    pollId?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: SessionCountOrderByAggregateInput
    _avg?: SessionAvgOrderByAggregateInput
    _max?: SessionMaxOrderByAggregateInput
    _min?: SessionMinOrderByAggregateInput
    _sum?: SessionSumOrderByAggregateInput
  }

  export type SessionScalarWhereWithAggregatesInput = {
    AND?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    OR?: SessionScalarWhereWithAggregatesInput[]
    NOT?: SessionScalarWhereWithAggregatesInput | SessionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Session"> | number
    pin?: StringWithAggregatesFilter<"Session"> | string
    status?: EnumSessionStatusWithAggregatesFilter<"Session"> | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeWithAggregatesFilter<"Session"> | $Enums.ProgressionMode
    currentQuestion?: IntWithAggregatesFilter<"Session"> | number
    pollId?: IntWithAggregatesFilter<"Session"> | number
    organizerId?: IntWithAggregatesFilter<"Session"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Session"> | Date | string
  }

  export type ResultWhereInput = {
    AND?: ResultWhereInput | ResultWhereInput[]
    OR?: ResultWhereInput[]
    NOT?: ResultWhereInput | ResultWhereInput[]
    id?: IntFilter<"Result"> | number
    sessionId?: IntFilter<"Result"> | number
    questionId?: IntFilter<"Result"> | number
    participantId?: StringFilter<"Result"> | string
    optionIds?: JsonFilter<"Result">
    score?: IntFilter<"Result"> | number
    answeredAt?: DateTimeFilter<"Result"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
  }

  export type ResultOrderByWithRelationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    participantId?: SortOrder
    optionIds?: SortOrder
    score?: SortOrder
    answeredAt?: SortOrder
    session?: SessionOrderByWithRelationInput
    question?: QuestionOrderByWithRelationInput
    _relevance?: ResultOrderByRelevanceInput
  }

  export type ResultWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    sessionId_questionId_participantId?: ResultSessionIdQuestionIdParticipantIdCompoundUniqueInput
    AND?: ResultWhereInput | ResultWhereInput[]
    OR?: ResultWhereInput[]
    NOT?: ResultWhereInput | ResultWhereInput[]
    sessionId?: IntFilter<"Result"> | number
    questionId?: IntFilter<"Result"> | number
    participantId?: StringFilter<"Result"> | string
    optionIds?: JsonFilter<"Result">
    score?: IntFilter<"Result"> | number
    answeredAt?: DateTimeFilter<"Result"> | Date | string
    session?: XOR<SessionScalarRelationFilter, SessionWhereInput>
    question?: XOR<QuestionScalarRelationFilter, QuestionWhereInput>
  }, "id" | "sessionId_questionId_participantId">

  export type ResultOrderByWithAggregationInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    participantId?: SortOrder
    optionIds?: SortOrder
    score?: SortOrder
    answeredAt?: SortOrder
    _count?: ResultCountOrderByAggregateInput
    _avg?: ResultAvgOrderByAggregateInput
    _max?: ResultMaxOrderByAggregateInput
    _min?: ResultMinOrderByAggregateInput
    _sum?: ResultSumOrderByAggregateInput
  }

  export type ResultScalarWhereWithAggregatesInput = {
    AND?: ResultScalarWhereWithAggregatesInput | ResultScalarWhereWithAggregatesInput[]
    OR?: ResultScalarWhereWithAggregatesInput[]
    NOT?: ResultScalarWhereWithAggregatesInput | ResultScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Result"> | number
    sessionId?: IntWithAggregatesFilter<"Result"> | number
    questionId?: IntWithAggregatesFilter<"Result"> | number
    participantId?: StringWithAggregatesFilter<"Result"> | string
    optionIds?: JsonWithAggregatesFilter<"Result">
    score?: IntWithAggregatesFilter<"Result"> | number
    answeredAt?: DateTimeWithAggregatesFilter<"Result"> | Date | string
  }

  export type UserCreateInput = {
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    polls?: PollCreateNestedManyWithoutOrganizerInput
    sessions?: SessionCreateNestedManyWithoutOrganizerInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    polls?: PollUncheckedCreateNestedManyWithoutOrganizerInput
    sessions?: SessionUncheckedCreateNestedManyWithoutOrganizerInput
  }

  export type UserUpdateInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    polls?: PollUpdateManyWithoutOrganizerNestedInput
    sessions?: SessionUpdateManyWithoutOrganizerNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    polls?: PollUncheckedUpdateManyWithoutOrganizerNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutOrganizerNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PollCreateInput = {
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutPollsInput
    questions?: QuestionCreateNestedManyWithoutPollInput
    sessions?: SessionCreateNestedManyWithoutPollInput
  }

  export type PollUncheckedCreateInput = {
    id?: number
    title: string
    description?: string | null
    organizerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutPollInput
    sessions?: SessionUncheckedCreateNestedManyWithoutPollInput
  }

  export type PollUpdateInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutPollsNestedInput
    questions?: QuestionUpdateManyWithoutPollNestedInput
    sessions?: SessionUpdateManyWithoutPollNestedInput
  }

  export type PollUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    organizerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutPollNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutPollNestedInput
  }

  export type PollCreateManyInput = {
    id?: number
    title: string
    description?: string | null
    organizerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PollUpdateManyMutationInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PollUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    organizerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionCreateInput = {
    text: string
    timeLimit: number
    type: $Enums.QuestionType
    order: number
    createdAt?: Date | string
    poll: PollCreateNestedOneWithoutQuestionsInput
    options?: OptionCreateNestedManyWithoutQuestionInput
    results?: ResultCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateInput = {
    id?: number
    text: string
    timeLimit: number
    type: $Enums.QuestionType
    order: number
    pollId: number
    createdAt?: Date | string
    options?: OptionUncheckedCreateNestedManyWithoutQuestionInput
    results?: ResultUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poll?: PollUpdateOneRequiredWithoutQuestionsNestedInput
    options?: OptionUpdateManyWithoutQuestionNestedInput
    results?: ResultUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    order?: IntFieldUpdateOperationsInput | number
    pollId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: OptionUncheckedUpdateManyWithoutQuestionNestedInput
    results?: ResultUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionCreateManyInput = {
    id?: number
    text: string
    timeLimit: number
    type: $Enums.QuestionType
    order: number
    pollId: number
    createdAt?: Date | string
  }

  export type QuestionUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    order?: IntFieldUpdateOperationsInput | number
    pollId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OptionCreateInput = {
    text: string
    isCorrect?: boolean
    createdAt?: Date | string
    question: QuestionCreateNestedOneWithoutOptionsInput
  }

  export type OptionUncheckedCreateInput = {
    id?: number
    text: string
    isCorrect?: boolean
    questionId: number
    createdAt?: Date | string
  }

  export type OptionUpdateInput = {
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionUpdateOneRequiredWithoutOptionsNestedInput
  }

  export type OptionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    questionId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OptionCreateManyInput = {
    id?: number
    text: string
    isCorrect?: boolean
    questionId: number
    createdAt?: Date | string
  }

  export type OptionUpdateManyMutationInput = {
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OptionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    questionId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionCreateInput = {
    pin: string
    status?: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    poll: PollCreateNestedOneWithoutSessionsInput
    organizer: UserCreateNestedOneWithoutSessionsInput
    results?: ResultCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateInput = {
    id?: number
    pin: string
    status?: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion?: number
    pollId: number
    organizerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    results?: ResultUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionUpdateInput = {
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poll?: PollUpdateOneRequiredWithoutSessionsNestedInput
    organizer?: UserUpdateOneRequiredWithoutSessionsNestedInput
    results?: ResultUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    pollId?: IntFieldUpdateOperationsInput | number
    organizerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: ResultUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionCreateManyInput = {
    id?: number
    pin: string
    status?: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion?: number
    pollId: number
    organizerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionUpdateManyMutationInput = {
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    pollId?: IntFieldUpdateOperationsInput | number
    organizerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultCreateInput = {
    participantId: string
    optionIds: JsonNullValueInput | InputJsonValue
    score?: number
    answeredAt?: Date | string
    session: SessionCreateNestedOneWithoutResultsInput
    question: QuestionCreateNestedOneWithoutResultsInput
  }

  export type ResultUncheckedCreateInput = {
    id?: number
    sessionId: number
    questionId: number
    participantId: string
    optionIds: JsonNullValueInput | InputJsonValue
    score?: number
    answeredAt?: Date | string
  }

  export type ResultUpdateInput = {
    participantId?: StringFieldUpdateOperationsInput | string
    optionIds?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneRequiredWithoutResultsNestedInput
    question?: QuestionUpdateOneRequiredWithoutResultsNestedInput
  }

  export type ResultUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    questionId?: IntFieldUpdateOperationsInput | number
    participantId?: StringFieldUpdateOperationsInput | string
    optionIds?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultCreateManyInput = {
    id?: number
    sessionId: number
    questionId: number
    participantId: string
    optionIds: JsonNullValueInput | InputJsonValue
    score?: number
    answeredAt?: Date | string
  }

  export type ResultUpdateManyMutationInput = {
    participantId?: StringFieldUpdateOperationsInput | string
    optionIds?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    questionId?: IntFieldUpdateOperationsInput | number
    participantId?: StringFieldUpdateOperationsInput | string
    optionIds?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PollListRelationFilter = {
    every?: PollWhereInput
    some?: PollWhereInput
    none?: PollWhereInput
  }

  export type SessionListRelationFilter = {
    every?: SessionWhereInput
    some?: SessionWhereInput
    none?: SessionWhereInput
  }

  export type PollOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    password?: SortOrder
    name?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type QuestionListRelationFilter = {
    every?: QuestionWhereInput
    some?: QuestionWhereInput
    none?: QuestionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type QuestionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PollOrderByRelevanceInput = {
    fields: PollOrderByRelevanceFieldEnum | PollOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PollCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PollAvgOrderByAggregateInput = {
    id?: SortOrder
    organizerId?: SortOrder
  }

  export type PollMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PollMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PollSumOrderByAggregateInput = {
    id?: SortOrder
    organizerId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[]
    notIn?: $Enums.QuestionType[]
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type PollScalarRelationFilter = {
    is?: PollWhereInput
    isNot?: PollWhereInput
  }

  export type OptionListRelationFilter = {
    every?: OptionWhereInput
    some?: OptionWhereInput
    none?: OptionWhereInput
  }

  export type ResultListRelationFilter = {
    every?: ResultWhereInput
    some?: ResultWhereInput
    none?: ResultWhereInput
  }

  export type OptionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ResultOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type QuestionOrderByRelevanceInput = {
    fields: QuestionOrderByRelevanceFieldEnum | QuestionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type QuestionCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    timeLimit?: SortOrder
    type?: SortOrder
    order?: SortOrder
    pollId?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionAvgOrderByAggregateInput = {
    id?: SortOrder
    timeLimit?: SortOrder
    order?: SortOrder
    pollId?: SortOrder
  }

  export type QuestionMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    timeLimit?: SortOrder
    type?: SortOrder
    order?: SortOrder
    pollId?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    timeLimit?: SortOrder
    type?: SortOrder
    order?: SortOrder
    pollId?: SortOrder
    createdAt?: SortOrder
  }

  export type QuestionSumOrderByAggregateInput = {
    id?: SortOrder
    timeLimit?: SortOrder
    order?: SortOrder
    pollId?: SortOrder
  }

  export type EnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[]
    notIn?: $Enums.QuestionType[]
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type QuestionScalarRelationFilter = {
    is?: QuestionWhereInput
    isNot?: QuestionWhereInput
  }

  export type OptionOrderByRelevanceInput = {
    fields: OptionOrderByRelevanceFieldEnum | OptionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OptionCountOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    questionId?: SortOrder
    createdAt?: SortOrder
  }

  export type OptionAvgOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
  }

  export type OptionMaxOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    questionId?: SortOrder
    createdAt?: SortOrder
  }

  export type OptionMinOrderByAggregateInput = {
    id?: SortOrder
    text?: SortOrder
    isCorrect?: SortOrder
    questionId?: SortOrder
    createdAt?: SortOrder
  }

  export type OptionSumOrderByAggregateInput = {
    id?: SortOrder
    questionId?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[]
    notIn?: $Enums.SessionStatus[]
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }

  export type EnumProgressionModeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProgressionMode | EnumProgressionModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProgressionMode[]
    notIn?: $Enums.ProgressionMode[]
    not?: NestedEnumProgressionModeFilter<$PrismaModel> | $Enums.ProgressionMode
  }

  export type SessionOrderByRelevanceInput = {
    fields: SessionOrderByRelevanceFieldEnum | SessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SessionCountOrderByAggregateInput = {
    id?: SortOrder
    pin?: SortOrder
    status?: SortOrder
    progressionMode?: SortOrder
    currentQuestion?: SortOrder
    pollId?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionAvgOrderByAggregateInput = {
    id?: SortOrder
    currentQuestion?: SortOrder
    pollId?: SortOrder
    organizerId?: SortOrder
  }

  export type SessionMaxOrderByAggregateInput = {
    id?: SortOrder
    pin?: SortOrder
    status?: SortOrder
    progressionMode?: SortOrder
    currentQuestion?: SortOrder
    pollId?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionMinOrderByAggregateInput = {
    id?: SortOrder
    pin?: SortOrder
    status?: SortOrder
    progressionMode?: SortOrder
    currentQuestion?: SortOrder
    pollId?: SortOrder
    organizerId?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type SessionSumOrderByAggregateInput = {
    id?: SortOrder
    currentQuestion?: SortOrder
    pollId?: SortOrder
    organizerId?: SortOrder
  }

  export type EnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[]
    notIn?: $Enums.SessionStatus[]
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }

  export type EnumProgressionModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProgressionMode | EnumProgressionModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProgressionMode[]
    notIn?: $Enums.ProgressionMode[]
    not?: NestedEnumProgressionModeWithAggregatesFilter<$PrismaModel> | $Enums.ProgressionMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProgressionModeFilter<$PrismaModel>
    _max?: NestedEnumProgressionModeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type SessionScalarRelationFilter = {
    is?: SessionWhereInput
    isNot?: SessionWhereInput
  }

  export type ResultOrderByRelevanceInput = {
    fields: ResultOrderByRelevanceFieldEnum | ResultOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ResultSessionIdQuestionIdParticipantIdCompoundUniqueInput = {
    sessionId: number
    questionId: number
    participantId: string
  }

  export type ResultCountOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    participantId?: SortOrder
    optionIds?: SortOrder
    score?: SortOrder
    answeredAt?: SortOrder
  }

  export type ResultAvgOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    score?: SortOrder
  }

  export type ResultMaxOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    participantId?: SortOrder
    score?: SortOrder
    answeredAt?: SortOrder
  }

  export type ResultMinOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    participantId?: SortOrder
    score?: SortOrder
    answeredAt?: SortOrder
  }

  export type ResultSumOrderByAggregateInput = {
    id?: SortOrder
    sessionId?: SortOrder
    questionId?: SortOrder
    score?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type PollCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<PollCreateWithoutOrganizerInput, PollUncheckedCreateWithoutOrganizerInput> | PollCreateWithoutOrganizerInput[] | PollUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: PollCreateOrConnectWithoutOrganizerInput | PollCreateOrConnectWithoutOrganizerInput[]
    createMany?: PollCreateManyOrganizerInputEnvelope
    connect?: PollWhereUniqueInput | PollWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<SessionCreateWithoutOrganizerInput, SessionUncheckedCreateWithoutOrganizerInput> | SessionCreateWithoutOrganizerInput[] | SessionUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutOrganizerInput | SessionCreateOrConnectWithoutOrganizerInput[]
    createMany?: SessionCreateManyOrganizerInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type PollUncheckedCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<PollCreateWithoutOrganizerInput, PollUncheckedCreateWithoutOrganizerInput> | PollCreateWithoutOrganizerInput[] | PollUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: PollCreateOrConnectWithoutOrganizerInput | PollCreateOrConnectWithoutOrganizerInput[]
    createMany?: PollCreateManyOrganizerInputEnvelope
    connect?: PollWhereUniqueInput | PollWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutOrganizerInput = {
    create?: XOR<SessionCreateWithoutOrganizerInput, SessionUncheckedCreateWithoutOrganizerInput> | SessionCreateWithoutOrganizerInput[] | SessionUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutOrganizerInput | SessionCreateOrConnectWithoutOrganizerInput[]
    createMany?: SessionCreateManyOrganizerInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PollUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<PollCreateWithoutOrganizerInput, PollUncheckedCreateWithoutOrganizerInput> | PollCreateWithoutOrganizerInput[] | PollUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: PollCreateOrConnectWithoutOrganizerInput | PollCreateOrConnectWithoutOrganizerInput[]
    upsert?: PollUpsertWithWhereUniqueWithoutOrganizerInput | PollUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: PollCreateManyOrganizerInputEnvelope
    set?: PollWhereUniqueInput | PollWhereUniqueInput[]
    disconnect?: PollWhereUniqueInput | PollWhereUniqueInput[]
    delete?: PollWhereUniqueInput | PollWhereUniqueInput[]
    connect?: PollWhereUniqueInput | PollWhereUniqueInput[]
    update?: PollUpdateWithWhereUniqueWithoutOrganizerInput | PollUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: PollUpdateManyWithWhereWithoutOrganizerInput | PollUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: PollScalarWhereInput | PollScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<SessionCreateWithoutOrganizerInput, SessionUncheckedCreateWithoutOrganizerInput> | SessionCreateWithoutOrganizerInput[] | SessionUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutOrganizerInput | SessionCreateOrConnectWithoutOrganizerInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutOrganizerInput | SessionUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: SessionCreateManyOrganizerInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutOrganizerInput | SessionUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutOrganizerInput | SessionUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PollUncheckedUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<PollCreateWithoutOrganizerInput, PollUncheckedCreateWithoutOrganizerInput> | PollCreateWithoutOrganizerInput[] | PollUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: PollCreateOrConnectWithoutOrganizerInput | PollCreateOrConnectWithoutOrganizerInput[]
    upsert?: PollUpsertWithWhereUniqueWithoutOrganizerInput | PollUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: PollCreateManyOrganizerInputEnvelope
    set?: PollWhereUniqueInput | PollWhereUniqueInput[]
    disconnect?: PollWhereUniqueInput | PollWhereUniqueInput[]
    delete?: PollWhereUniqueInput | PollWhereUniqueInput[]
    connect?: PollWhereUniqueInput | PollWhereUniqueInput[]
    update?: PollUpdateWithWhereUniqueWithoutOrganizerInput | PollUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: PollUpdateManyWithWhereWithoutOrganizerInput | PollUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: PollScalarWhereInput | PollScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutOrganizerNestedInput = {
    create?: XOR<SessionCreateWithoutOrganizerInput, SessionUncheckedCreateWithoutOrganizerInput> | SessionCreateWithoutOrganizerInput[] | SessionUncheckedCreateWithoutOrganizerInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutOrganizerInput | SessionCreateOrConnectWithoutOrganizerInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutOrganizerInput | SessionUpsertWithWhereUniqueWithoutOrganizerInput[]
    createMany?: SessionCreateManyOrganizerInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutOrganizerInput | SessionUpdateWithWhereUniqueWithoutOrganizerInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutOrganizerInput | SessionUpdateManyWithWhereWithoutOrganizerInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPollsInput = {
    create?: XOR<UserCreateWithoutPollsInput, UserUncheckedCreateWithoutPollsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPollsInput
    connect?: UserWhereUniqueInput
  }

  export type QuestionCreateNestedManyWithoutPollInput = {
    create?: XOR<QuestionCreateWithoutPollInput, QuestionUncheckedCreateWithoutPollInput> | QuestionCreateWithoutPollInput[] | QuestionUncheckedCreateWithoutPollInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutPollInput | QuestionCreateOrConnectWithoutPollInput[]
    createMany?: QuestionCreateManyPollInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type SessionCreateNestedManyWithoutPollInput = {
    create?: XOR<SessionCreateWithoutPollInput, SessionUncheckedCreateWithoutPollInput> | SessionCreateWithoutPollInput[] | SessionUncheckedCreateWithoutPollInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPollInput | SessionCreateOrConnectWithoutPollInput[]
    createMany?: SessionCreateManyPollInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type QuestionUncheckedCreateNestedManyWithoutPollInput = {
    create?: XOR<QuestionCreateWithoutPollInput, QuestionUncheckedCreateWithoutPollInput> | QuestionCreateWithoutPollInput[] | QuestionUncheckedCreateWithoutPollInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutPollInput | QuestionCreateOrConnectWithoutPollInput[]
    createMany?: QuestionCreateManyPollInputEnvelope
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
  }

  export type SessionUncheckedCreateNestedManyWithoutPollInput = {
    create?: XOR<SessionCreateWithoutPollInput, SessionUncheckedCreateWithoutPollInput> | SessionCreateWithoutPollInput[] | SessionUncheckedCreateWithoutPollInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPollInput | SessionCreateOrConnectWithoutPollInput[]
    createMany?: SessionCreateManyPollInputEnvelope
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type UserUpdateOneRequiredWithoutPollsNestedInput = {
    create?: XOR<UserCreateWithoutPollsInput, UserUncheckedCreateWithoutPollsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPollsInput
    upsert?: UserUpsertWithoutPollsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPollsInput, UserUpdateWithoutPollsInput>, UserUncheckedUpdateWithoutPollsInput>
  }

  export type QuestionUpdateManyWithoutPollNestedInput = {
    create?: XOR<QuestionCreateWithoutPollInput, QuestionUncheckedCreateWithoutPollInput> | QuestionCreateWithoutPollInput[] | QuestionUncheckedCreateWithoutPollInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutPollInput | QuestionCreateOrConnectWithoutPollInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutPollInput | QuestionUpsertWithWhereUniqueWithoutPollInput[]
    createMany?: QuestionCreateManyPollInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutPollInput | QuestionUpdateWithWhereUniqueWithoutPollInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutPollInput | QuestionUpdateManyWithWhereWithoutPollInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type SessionUpdateManyWithoutPollNestedInput = {
    create?: XOR<SessionCreateWithoutPollInput, SessionUncheckedCreateWithoutPollInput> | SessionCreateWithoutPollInput[] | SessionUncheckedCreateWithoutPollInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPollInput | SessionCreateOrConnectWithoutPollInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutPollInput | SessionUpsertWithWhereUniqueWithoutPollInput[]
    createMany?: SessionCreateManyPollInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutPollInput | SessionUpdateWithWhereUniqueWithoutPollInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutPollInput | SessionUpdateManyWithWhereWithoutPollInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type QuestionUncheckedUpdateManyWithoutPollNestedInput = {
    create?: XOR<QuestionCreateWithoutPollInput, QuestionUncheckedCreateWithoutPollInput> | QuestionCreateWithoutPollInput[] | QuestionUncheckedCreateWithoutPollInput[]
    connectOrCreate?: QuestionCreateOrConnectWithoutPollInput | QuestionCreateOrConnectWithoutPollInput[]
    upsert?: QuestionUpsertWithWhereUniqueWithoutPollInput | QuestionUpsertWithWhereUniqueWithoutPollInput[]
    createMany?: QuestionCreateManyPollInputEnvelope
    set?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    disconnect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    delete?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    connect?: QuestionWhereUniqueInput | QuestionWhereUniqueInput[]
    update?: QuestionUpdateWithWhereUniqueWithoutPollInput | QuestionUpdateWithWhereUniqueWithoutPollInput[]
    updateMany?: QuestionUpdateManyWithWhereWithoutPollInput | QuestionUpdateManyWithWhereWithoutPollInput[]
    deleteMany?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
  }

  export type SessionUncheckedUpdateManyWithoutPollNestedInput = {
    create?: XOR<SessionCreateWithoutPollInput, SessionUncheckedCreateWithoutPollInput> | SessionCreateWithoutPollInput[] | SessionUncheckedCreateWithoutPollInput[]
    connectOrCreate?: SessionCreateOrConnectWithoutPollInput | SessionCreateOrConnectWithoutPollInput[]
    upsert?: SessionUpsertWithWhereUniqueWithoutPollInput | SessionUpsertWithWhereUniqueWithoutPollInput[]
    createMany?: SessionCreateManyPollInputEnvelope
    set?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    disconnect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    delete?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    connect?: SessionWhereUniqueInput | SessionWhereUniqueInput[]
    update?: SessionUpdateWithWhereUniqueWithoutPollInput | SessionUpdateWithWhereUniqueWithoutPollInput[]
    updateMany?: SessionUpdateManyWithWhereWithoutPollInput | SessionUpdateManyWithWhereWithoutPollInput[]
    deleteMany?: SessionScalarWhereInput | SessionScalarWhereInput[]
  }

  export type PollCreateNestedOneWithoutQuestionsInput = {
    create?: XOR<PollCreateWithoutQuestionsInput, PollUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: PollCreateOrConnectWithoutQuestionsInput
    connect?: PollWhereUniqueInput
  }

  export type OptionCreateNestedManyWithoutQuestionInput = {
    create?: XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput> | OptionCreateWithoutQuestionInput[] | OptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: OptionCreateOrConnectWithoutQuestionInput | OptionCreateOrConnectWithoutQuestionInput[]
    createMany?: OptionCreateManyQuestionInputEnvelope
    connect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
  }

  export type ResultCreateNestedManyWithoutQuestionInput = {
    create?: XOR<ResultCreateWithoutQuestionInput, ResultUncheckedCreateWithoutQuestionInput> | ResultCreateWithoutQuestionInput[] | ResultUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutQuestionInput | ResultCreateOrConnectWithoutQuestionInput[]
    createMany?: ResultCreateManyQuestionInputEnvelope
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
  }

  export type OptionUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput> | OptionCreateWithoutQuestionInput[] | OptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: OptionCreateOrConnectWithoutQuestionInput | OptionCreateOrConnectWithoutQuestionInput[]
    createMany?: OptionCreateManyQuestionInputEnvelope
    connect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
  }

  export type ResultUncheckedCreateNestedManyWithoutQuestionInput = {
    create?: XOR<ResultCreateWithoutQuestionInput, ResultUncheckedCreateWithoutQuestionInput> | ResultCreateWithoutQuestionInput[] | ResultUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutQuestionInput | ResultCreateOrConnectWithoutQuestionInput[]
    createMany?: ResultCreateManyQuestionInputEnvelope
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
  }

  export type EnumQuestionTypeFieldUpdateOperationsInput = {
    set?: $Enums.QuestionType
  }

  export type PollUpdateOneRequiredWithoutQuestionsNestedInput = {
    create?: XOR<PollCreateWithoutQuestionsInput, PollUncheckedCreateWithoutQuestionsInput>
    connectOrCreate?: PollCreateOrConnectWithoutQuestionsInput
    upsert?: PollUpsertWithoutQuestionsInput
    connect?: PollWhereUniqueInput
    update?: XOR<XOR<PollUpdateToOneWithWhereWithoutQuestionsInput, PollUpdateWithoutQuestionsInput>, PollUncheckedUpdateWithoutQuestionsInput>
  }

  export type OptionUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput> | OptionCreateWithoutQuestionInput[] | OptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: OptionCreateOrConnectWithoutQuestionInput | OptionCreateOrConnectWithoutQuestionInput[]
    upsert?: OptionUpsertWithWhereUniqueWithoutQuestionInput | OptionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: OptionCreateManyQuestionInputEnvelope
    set?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    disconnect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    delete?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    connect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    update?: OptionUpdateWithWhereUniqueWithoutQuestionInput | OptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: OptionUpdateManyWithWhereWithoutQuestionInput | OptionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: OptionScalarWhereInput | OptionScalarWhereInput[]
  }

  export type ResultUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<ResultCreateWithoutQuestionInput, ResultUncheckedCreateWithoutQuestionInput> | ResultCreateWithoutQuestionInput[] | ResultUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutQuestionInput | ResultCreateOrConnectWithoutQuestionInput[]
    upsert?: ResultUpsertWithWhereUniqueWithoutQuestionInput | ResultUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: ResultCreateManyQuestionInputEnvelope
    set?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    disconnect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    delete?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    update?: ResultUpdateWithWhereUniqueWithoutQuestionInput | ResultUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: ResultUpdateManyWithWhereWithoutQuestionInput | ResultUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: ResultScalarWhereInput | ResultScalarWhereInput[]
  }

  export type OptionUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput> | OptionCreateWithoutQuestionInput[] | OptionUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: OptionCreateOrConnectWithoutQuestionInput | OptionCreateOrConnectWithoutQuestionInput[]
    upsert?: OptionUpsertWithWhereUniqueWithoutQuestionInput | OptionUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: OptionCreateManyQuestionInputEnvelope
    set?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    disconnect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    delete?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    connect?: OptionWhereUniqueInput | OptionWhereUniqueInput[]
    update?: OptionUpdateWithWhereUniqueWithoutQuestionInput | OptionUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: OptionUpdateManyWithWhereWithoutQuestionInput | OptionUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: OptionScalarWhereInput | OptionScalarWhereInput[]
  }

  export type ResultUncheckedUpdateManyWithoutQuestionNestedInput = {
    create?: XOR<ResultCreateWithoutQuestionInput, ResultUncheckedCreateWithoutQuestionInput> | ResultCreateWithoutQuestionInput[] | ResultUncheckedCreateWithoutQuestionInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutQuestionInput | ResultCreateOrConnectWithoutQuestionInput[]
    upsert?: ResultUpsertWithWhereUniqueWithoutQuestionInput | ResultUpsertWithWhereUniqueWithoutQuestionInput[]
    createMany?: ResultCreateManyQuestionInputEnvelope
    set?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    disconnect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    delete?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    update?: ResultUpdateWithWhereUniqueWithoutQuestionInput | ResultUpdateWithWhereUniqueWithoutQuestionInput[]
    updateMany?: ResultUpdateManyWithWhereWithoutQuestionInput | ResultUpdateManyWithWhereWithoutQuestionInput[]
    deleteMany?: ResultScalarWhereInput | ResultScalarWhereInput[]
  }

  export type QuestionCreateNestedOneWithoutOptionsInput = {
    create?: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutOptionsInput
    connect?: QuestionWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type QuestionUpdateOneRequiredWithoutOptionsNestedInput = {
    create?: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutOptionsInput
    upsert?: QuestionUpsertWithoutOptionsInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutOptionsInput, QuestionUpdateWithoutOptionsInput>, QuestionUncheckedUpdateWithoutOptionsInput>
  }

  export type PollCreateNestedOneWithoutSessionsInput = {
    create?: XOR<PollCreateWithoutSessionsInput, PollUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: PollCreateOrConnectWithoutSessionsInput
    connect?: PollWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutSessionsInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type ResultCreateNestedManyWithoutSessionInput = {
    create?: XOR<ResultCreateWithoutSessionInput, ResultUncheckedCreateWithoutSessionInput> | ResultCreateWithoutSessionInput[] | ResultUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutSessionInput | ResultCreateOrConnectWithoutSessionInput[]
    createMany?: ResultCreateManySessionInputEnvelope
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
  }

  export type ResultUncheckedCreateNestedManyWithoutSessionInput = {
    create?: XOR<ResultCreateWithoutSessionInput, ResultUncheckedCreateWithoutSessionInput> | ResultCreateWithoutSessionInput[] | ResultUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutSessionInput | ResultCreateOrConnectWithoutSessionInput[]
    createMany?: ResultCreateManySessionInputEnvelope
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
  }

  export type EnumSessionStatusFieldUpdateOperationsInput = {
    set?: $Enums.SessionStatus
  }

  export type EnumProgressionModeFieldUpdateOperationsInput = {
    set?: $Enums.ProgressionMode
  }

  export type PollUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<PollCreateWithoutSessionsInput, PollUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: PollCreateOrConnectWithoutSessionsInput
    upsert?: PollUpsertWithoutSessionsInput
    connect?: PollWhereUniqueInput
    update?: XOR<XOR<PollUpdateToOneWithWhereWithoutSessionsInput, PollUpdateWithoutSessionsInput>, PollUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateOneRequiredWithoutSessionsNestedInput = {
    create?: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutSessionsInput
    upsert?: UserUpsertWithoutSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutSessionsInput, UserUpdateWithoutSessionsInput>, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type ResultUpdateManyWithoutSessionNestedInput = {
    create?: XOR<ResultCreateWithoutSessionInput, ResultUncheckedCreateWithoutSessionInput> | ResultCreateWithoutSessionInput[] | ResultUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutSessionInput | ResultCreateOrConnectWithoutSessionInput[]
    upsert?: ResultUpsertWithWhereUniqueWithoutSessionInput | ResultUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: ResultCreateManySessionInputEnvelope
    set?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    disconnect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    delete?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    update?: ResultUpdateWithWhereUniqueWithoutSessionInput | ResultUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: ResultUpdateManyWithWhereWithoutSessionInput | ResultUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: ResultScalarWhereInput | ResultScalarWhereInput[]
  }

  export type ResultUncheckedUpdateManyWithoutSessionNestedInput = {
    create?: XOR<ResultCreateWithoutSessionInput, ResultUncheckedCreateWithoutSessionInput> | ResultCreateWithoutSessionInput[] | ResultUncheckedCreateWithoutSessionInput[]
    connectOrCreate?: ResultCreateOrConnectWithoutSessionInput | ResultCreateOrConnectWithoutSessionInput[]
    upsert?: ResultUpsertWithWhereUniqueWithoutSessionInput | ResultUpsertWithWhereUniqueWithoutSessionInput[]
    createMany?: ResultCreateManySessionInputEnvelope
    set?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    disconnect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    delete?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    connect?: ResultWhereUniqueInput | ResultWhereUniqueInput[]
    update?: ResultUpdateWithWhereUniqueWithoutSessionInput | ResultUpdateWithWhereUniqueWithoutSessionInput[]
    updateMany?: ResultUpdateManyWithWhereWithoutSessionInput | ResultUpdateManyWithWhereWithoutSessionInput[]
    deleteMany?: ResultScalarWhereInput | ResultScalarWhereInput[]
  }

  export type SessionCreateNestedOneWithoutResultsInput = {
    create?: XOR<SessionCreateWithoutResultsInput, SessionUncheckedCreateWithoutResultsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutResultsInput
    connect?: SessionWhereUniqueInput
  }

  export type QuestionCreateNestedOneWithoutResultsInput = {
    create?: XOR<QuestionCreateWithoutResultsInput, QuestionUncheckedCreateWithoutResultsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutResultsInput
    connect?: QuestionWhereUniqueInput
  }

  export type SessionUpdateOneRequiredWithoutResultsNestedInput = {
    create?: XOR<SessionCreateWithoutResultsInput, SessionUncheckedCreateWithoutResultsInput>
    connectOrCreate?: SessionCreateOrConnectWithoutResultsInput
    upsert?: SessionUpsertWithoutResultsInput
    connect?: SessionWhereUniqueInput
    update?: XOR<XOR<SessionUpdateToOneWithWhereWithoutResultsInput, SessionUpdateWithoutResultsInput>, SessionUncheckedUpdateWithoutResultsInput>
  }

  export type QuestionUpdateOneRequiredWithoutResultsNestedInput = {
    create?: XOR<QuestionCreateWithoutResultsInput, QuestionUncheckedCreateWithoutResultsInput>
    connectOrCreate?: QuestionCreateOrConnectWithoutResultsInput
    upsert?: QuestionUpsertWithoutResultsInput
    connect?: QuestionWhereUniqueInput
    update?: XOR<XOR<QuestionUpdateToOneWithWhereWithoutResultsInput, QuestionUpdateWithoutResultsInput>, QuestionUncheckedUpdateWithoutResultsInput>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumQuestionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[]
    notIn?: $Enums.QuestionType[]
    not?: NestedEnumQuestionTypeFilter<$PrismaModel> | $Enums.QuestionType
  }

  export type NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.QuestionType | EnumQuestionTypeFieldRefInput<$PrismaModel>
    in?: $Enums.QuestionType[]
    notIn?: $Enums.QuestionType[]
    not?: NestedEnumQuestionTypeWithAggregatesFilter<$PrismaModel> | $Enums.QuestionType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumQuestionTypeFilter<$PrismaModel>
    _max?: NestedEnumQuestionTypeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumSessionStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[]
    notIn?: $Enums.SessionStatus[]
    not?: NestedEnumSessionStatusFilter<$PrismaModel> | $Enums.SessionStatus
  }

  export type NestedEnumProgressionModeFilter<$PrismaModel = never> = {
    equals?: $Enums.ProgressionMode | EnumProgressionModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProgressionMode[]
    notIn?: $Enums.ProgressionMode[]
    not?: NestedEnumProgressionModeFilter<$PrismaModel> | $Enums.ProgressionMode
  }

  export type NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SessionStatus | EnumSessionStatusFieldRefInput<$PrismaModel>
    in?: $Enums.SessionStatus[]
    notIn?: $Enums.SessionStatus[]
    not?: NestedEnumSessionStatusWithAggregatesFilter<$PrismaModel> | $Enums.SessionStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumSessionStatusFilter<$PrismaModel>
    _max?: NestedEnumSessionStatusFilter<$PrismaModel>
  }

  export type NestedEnumProgressionModeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ProgressionMode | EnumProgressionModeFieldRefInput<$PrismaModel>
    in?: $Enums.ProgressionMode[]
    notIn?: $Enums.ProgressionMode[]
    not?: NestedEnumProgressionModeWithAggregatesFilter<$PrismaModel> | $Enums.ProgressionMode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumProgressionModeFilter<$PrismaModel>
    _max?: NestedEnumProgressionModeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type PollCreateWithoutOrganizerInput = {
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionCreateNestedManyWithoutPollInput
    sessions?: SessionCreateNestedManyWithoutPollInput
  }

  export type PollUncheckedCreateWithoutOrganizerInput = {
    id?: number
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutPollInput
    sessions?: SessionUncheckedCreateNestedManyWithoutPollInput
  }

  export type PollCreateOrConnectWithoutOrganizerInput = {
    where: PollWhereUniqueInput
    create: XOR<PollCreateWithoutOrganizerInput, PollUncheckedCreateWithoutOrganizerInput>
  }

  export type PollCreateManyOrganizerInputEnvelope = {
    data: PollCreateManyOrganizerInput | PollCreateManyOrganizerInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutOrganizerInput = {
    pin: string
    status?: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    poll: PollCreateNestedOneWithoutSessionsInput
    results?: ResultCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutOrganizerInput = {
    id?: number
    pin: string
    status?: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion?: number
    pollId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    results?: ResultUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutOrganizerInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutOrganizerInput, SessionUncheckedCreateWithoutOrganizerInput>
  }

  export type SessionCreateManyOrganizerInputEnvelope = {
    data: SessionCreateManyOrganizerInput | SessionCreateManyOrganizerInput[]
    skipDuplicates?: boolean
  }

  export type PollUpsertWithWhereUniqueWithoutOrganizerInput = {
    where: PollWhereUniqueInput
    update: XOR<PollUpdateWithoutOrganizerInput, PollUncheckedUpdateWithoutOrganizerInput>
    create: XOR<PollCreateWithoutOrganizerInput, PollUncheckedCreateWithoutOrganizerInput>
  }

  export type PollUpdateWithWhereUniqueWithoutOrganizerInput = {
    where: PollWhereUniqueInput
    data: XOR<PollUpdateWithoutOrganizerInput, PollUncheckedUpdateWithoutOrganizerInput>
  }

  export type PollUpdateManyWithWhereWithoutOrganizerInput = {
    where: PollScalarWhereInput
    data: XOR<PollUpdateManyMutationInput, PollUncheckedUpdateManyWithoutOrganizerInput>
  }

  export type PollScalarWhereInput = {
    AND?: PollScalarWhereInput | PollScalarWhereInput[]
    OR?: PollScalarWhereInput[]
    NOT?: PollScalarWhereInput | PollScalarWhereInput[]
    id?: IntFilter<"Poll"> | number
    title?: StringFilter<"Poll"> | string
    description?: StringNullableFilter<"Poll"> | string | null
    organizerId?: IntFilter<"Poll"> | number
    createdAt?: DateTimeFilter<"Poll"> | Date | string
    updatedAt?: DateTimeFilter<"Poll"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutOrganizerInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutOrganizerInput, SessionUncheckedUpdateWithoutOrganizerInput>
    create: XOR<SessionCreateWithoutOrganizerInput, SessionUncheckedCreateWithoutOrganizerInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutOrganizerInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutOrganizerInput, SessionUncheckedUpdateWithoutOrganizerInput>
  }

  export type SessionUpdateManyWithWhereWithoutOrganizerInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutOrganizerInput>
  }

  export type SessionScalarWhereInput = {
    AND?: SessionScalarWhereInput | SessionScalarWhereInput[]
    OR?: SessionScalarWhereInput[]
    NOT?: SessionScalarWhereInput | SessionScalarWhereInput[]
    id?: IntFilter<"Session"> | number
    pin?: StringFilter<"Session"> | string
    status?: EnumSessionStatusFilter<"Session"> | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFilter<"Session"> | $Enums.ProgressionMode
    currentQuestion?: IntFilter<"Session"> | number
    pollId?: IntFilter<"Session"> | number
    organizerId?: IntFilter<"Session"> | number
    createdAt?: DateTimeFilter<"Session"> | Date | string
    updatedAt?: DateTimeFilter<"Session"> | Date | string
  }

  export type UserCreateWithoutPollsInput = {
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionCreateNestedManyWithoutOrganizerInput
  }

  export type UserUncheckedCreateWithoutPollsInput = {
    id?: number
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutOrganizerInput
  }

  export type UserCreateOrConnectWithoutPollsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPollsInput, UserUncheckedCreateWithoutPollsInput>
  }

  export type QuestionCreateWithoutPollInput = {
    text: string
    timeLimit: number
    type: $Enums.QuestionType
    order: number
    createdAt?: Date | string
    options?: OptionCreateNestedManyWithoutQuestionInput
    results?: ResultCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutPollInput = {
    id?: number
    text: string
    timeLimit: number
    type: $Enums.QuestionType
    order: number
    createdAt?: Date | string
    options?: OptionUncheckedCreateNestedManyWithoutQuestionInput
    results?: ResultUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutPollInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutPollInput, QuestionUncheckedCreateWithoutPollInput>
  }

  export type QuestionCreateManyPollInputEnvelope = {
    data: QuestionCreateManyPollInput | QuestionCreateManyPollInput[]
    skipDuplicates?: boolean
  }

  export type SessionCreateWithoutPollInput = {
    pin: string
    status?: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutSessionsInput
    results?: ResultCreateNestedManyWithoutSessionInput
  }

  export type SessionUncheckedCreateWithoutPollInput = {
    id?: number
    pin: string
    status?: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion?: number
    organizerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    results?: ResultUncheckedCreateNestedManyWithoutSessionInput
  }

  export type SessionCreateOrConnectWithoutPollInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutPollInput, SessionUncheckedCreateWithoutPollInput>
  }

  export type SessionCreateManyPollInputEnvelope = {
    data: SessionCreateManyPollInput | SessionCreateManyPollInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPollsInput = {
    update: XOR<UserUpdateWithoutPollsInput, UserUncheckedUpdateWithoutPollsInput>
    create: XOR<UserCreateWithoutPollsInput, UserUncheckedCreateWithoutPollsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPollsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPollsInput, UserUncheckedUpdateWithoutPollsInput>
  }

  export type UserUpdateWithoutPollsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUpdateManyWithoutOrganizerNestedInput
  }

  export type UserUncheckedUpdateWithoutPollsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutOrganizerNestedInput
  }

  export type QuestionUpsertWithWhereUniqueWithoutPollInput = {
    where: QuestionWhereUniqueInput
    update: XOR<QuestionUpdateWithoutPollInput, QuestionUncheckedUpdateWithoutPollInput>
    create: XOR<QuestionCreateWithoutPollInput, QuestionUncheckedCreateWithoutPollInput>
  }

  export type QuestionUpdateWithWhereUniqueWithoutPollInput = {
    where: QuestionWhereUniqueInput
    data: XOR<QuestionUpdateWithoutPollInput, QuestionUncheckedUpdateWithoutPollInput>
  }

  export type QuestionUpdateManyWithWhereWithoutPollInput = {
    where: QuestionScalarWhereInput
    data: XOR<QuestionUpdateManyMutationInput, QuestionUncheckedUpdateManyWithoutPollInput>
  }

  export type QuestionScalarWhereInput = {
    AND?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    OR?: QuestionScalarWhereInput[]
    NOT?: QuestionScalarWhereInput | QuestionScalarWhereInput[]
    id?: IntFilter<"Question"> | number
    text?: StringFilter<"Question"> | string
    timeLimit?: IntFilter<"Question"> | number
    type?: EnumQuestionTypeFilter<"Question"> | $Enums.QuestionType
    order?: IntFilter<"Question"> | number
    pollId?: IntFilter<"Question"> | number
    createdAt?: DateTimeFilter<"Question"> | Date | string
  }

  export type SessionUpsertWithWhereUniqueWithoutPollInput = {
    where: SessionWhereUniqueInput
    update: XOR<SessionUpdateWithoutPollInput, SessionUncheckedUpdateWithoutPollInput>
    create: XOR<SessionCreateWithoutPollInput, SessionUncheckedCreateWithoutPollInput>
  }

  export type SessionUpdateWithWhereUniqueWithoutPollInput = {
    where: SessionWhereUniqueInput
    data: XOR<SessionUpdateWithoutPollInput, SessionUncheckedUpdateWithoutPollInput>
  }

  export type SessionUpdateManyWithWhereWithoutPollInput = {
    where: SessionScalarWhereInput
    data: XOR<SessionUpdateManyMutationInput, SessionUncheckedUpdateManyWithoutPollInput>
  }

  export type PollCreateWithoutQuestionsInput = {
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutPollsInput
    sessions?: SessionCreateNestedManyWithoutPollInput
  }

  export type PollUncheckedCreateWithoutQuestionsInput = {
    id?: number
    title: string
    description?: string | null
    organizerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    sessions?: SessionUncheckedCreateNestedManyWithoutPollInput
  }

  export type PollCreateOrConnectWithoutQuestionsInput = {
    where: PollWhereUniqueInput
    create: XOR<PollCreateWithoutQuestionsInput, PollUncheckedCreateWithoutQuestionsInput>
  }

  export type OptionCreateWithoutQuestionInput = {
    text: string
    isCorrect?: boolean
    createdAt?: Date | string
  }

  export type OptionUncheckedCreateWithoutQuestionInput = {
    id?: number
    text: string
    isCorrect?: boolean
    createdAt?: Date | string
  }

  export type OptionCreateOrConnectWithoutQuestionInput = {
    where: OptionWhereUniqueInput
    create: XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput>
  }

  export type OptionCreateManyQuestionInputEnvelope = {
    data: OptionCreateManyQuestionInput | OptionCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type ResultCreateWithoutQuestionInput = {
    participantId: string
    optionIds: JsonNullValueInput | InputJsonValue
    score?: number
    answeredAt?: Date | string
    session: SessionCreateNestedOneWithoutResultsInput
  }

  export type ResultUncheckedCreateWithoutQuestionInput = {
    id?: number
    sessionId: number
    participantId: string
    optionIds: JsonNullValueInput | InputJsonValue
    score?: number
    answeredAt?: Date | string
  }

  export type ResultCreateOrConnectWithoutQuestionInput = {
    where: ResultWhereUniqueInput
    create: XOR<ResultCreateWithoutQuestionInput, ResultUncheckedCreateWithoutQuestionInput>
  }

  export type ResultCreateManyQuestionInputEnvelope = {
    data: ResultCreateManyQuestionInput | ResultCreateManyQuestionInput[]
    skipDuplicates?: boolean
  }

  export type PollUpsertWithoutQuestionsInput = {
    update: XOR<PollUpdateWithoutQuestionsInput, PollUncheckedUpdateWithoutQuestionsInput>
    create: XOR<PollCreateWithoutQuestionsInput, PollUncheckedCreateWithoutQuestionsInput>
    where?: PollWhereInput
  }

  export type PollUpdateToOneWithWhereWithoutQuestionsInput = {
    where?: PollWhereInput
    data: XOR<PollUpdateWithoutQuestionsInput, PollUncheckedUpdateWithoutQuestionsInput>
  }

  export type PollUpdateWithoutQuestionsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutPollsNestedInput
    sessions?: SessionUpdateManyWithoutPollNestedInput
  }

  export type PollUncheckedUpdateWithoutQuestionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    organizerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    sessions?: SessionUncheckedUpdateManyWithoutPollNestedInput
  }

  export type OptionUpsertWithWhereUniqueWithoutQuestionInput = {
    where: OptionWhereUniqueInput
    update: XOR<OptionUpdateWithoutQuestionInput, OptionUncheckedUpdateWithoutQuestionInput>
    create: XOR<OptionCreateWithoutQuestionInput, OptionUncheckedCreateWithoutQuestionInput>
  }

  export type OptionUpdateWithWhereUniqueWithoutQuestionInput = {
    where: OptionWhereUniqueInput
    data: XOR<OptionUpdateWithoutQuestionInput, OptionUncheckedUpdateWithoutQuestionInput>
  }

  export type OptionUpdateManyWithWhereWithoutQuestionInput = {
    where: OptionScalarWhereInput
    data: XOR<OptionUpdateManyMutationInput, OptionUncheckedUpdateManyWithoutQuestionInput>
  }

  export type OptionScalarWhereInput = {
    AND?: OptionScalarWhereInput | OptionScalarWhereInput[]
    OR?: OptionScalarWhereInput[]
    NOT?: OptionScalarWhereInput | OptionScalarWhereInput[]
    id?: IntFilter<"Option"> | number
    text?: StringFilter<"Option"> | string
    isCorrect?: BoolFilter<"Option"> | boolean
    questionId?: IntFilter<"Option"> | number
    createdAt?: DateTimeFilter<"Option"> | Date | string
  }

  export type ResultUpsertWithWhereUniqueWithoutQuestionInput = {
    where: ResultWhereUniqueInput
    update: XOR<ResultUpdateWithoutQuestionInput, ResultUncheckedUpdateWithoutQuestionInput>
    create: XOR<ResultCreateWithoutQuestionInput, ResultUncheckedCreateWithoutQuestionInput>
  }

  export type ResultUpdateWithWhereUniqueWithoutQuestionInput = {
    where: ResultWhereUniqueInput
    data: XOR<ResultUpdateWithoutQuestionInput, ResultUncheckedUpdateWithoutQuestionInput>
  }

  export type ResultUpdateManyWithWhereWithoutQuestionInput = {
    where: ResultScalarWhereInput
    data: XOR<ResultUpdateManyMutationInput, ResultUncheckedUpdateManyWithoutQuestionInput>
  }

  export type ResultScalarWhereInput = {
    AND?: ResultScalarWhereInput | ResultScalarWhereInput[]
    OR?: ResultScalarWhereInput[]
    NOT?: ResultScalarWhereInput | ResultScalarWhereInput[]
    id?: IntFilter<"Result"> | number
    sessionId?: IntFilter<"Result"> | number
    questionId?: IntFilter<"Result"> | number
    participantId?: StringFilter<"Result"> | string
    optionIds?: JsonFilter<"Result">
    score?: IntFilter<"Result"> | number
    answeredAt?: DateTimeFilter<"Result"> | Date | string
  }

  export type QuestionCreateWithoutOptionsInput = {
    text: string
    timeLimit: number
    type: $Enums.QuestionType
    order: number
    createdAt?: Date | string
    poll: PollCreateNestedOneWithoutQuestionsInput
    results?: ResultCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutOptionsInput = {
    id?: number
    text: string
    timeLimit: number
    type: $Enums.QuestionType
    order: number
    pollId: number
    createdAt?: Date | string
    results?: ResultUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutOptionsInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
  }

  export type QuestionUpsertWithoutOptionsInput = {
    update: XOR<QuestionUpdateWithoutOptionsInput, QuestionUncheckedUpdateWithoutOptionsInput>
    create: XOR<QuestionCreateWithoutOptionsInput, QuestionUncheckedCreateWithoutOptionsInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutOptionsInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutOptionsInput, QuestionUncheckedUpdateWithoutOptionsInput>
  }

  export type QuestionUpdateWithoutOptionsInput = {
    text?: StringFieldUpdateOperationsInput | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poll?: PollUpdateOneRequiredWithoutQuestionsNestedInput
    results?: ResultUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutOptionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    order?: IntFieldUpdateOperationsInput | number
    pollId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: ResultUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type PollCreateWithoutSessionsInput = {
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    organizer: UserCreateNestedOneWithoutPollsInput
    questions?: QuestionCreateNestedManyWithoutPollInput
  }

  export type PollUncheckedCreateWithoutSessionsInput = {
    id?: number
    title: string
    description?: string | null
    organizerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
    questions?: QuestionUncheckedCreateNestedManyWithoutPollInput
  }

  export type PollCreateOrConnectWithoutSessionsInput = {
    where: PollWhereUniqueInput
    create: XOR<PollCreateWithoutSessionsInput, PollUncheckedCreateWithoutSessionsInput>
  }

  export type UserCreateWithoutSessionsInput = {
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    polls?: PollCreateNestedManyWithoutOrganizerInput
  }

  export type UserUncheckedCreateWithoutSessionsInput = {
    id?: number
    email: string
    password: string
    name: string
    createdAt?: Date | string
    updatedAt?: Date | string
    polls?: PollUncheckedCreateNestedManyWithoutOrganizerInput
  }

  export type UserCreateOrConnectWithoutSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
  }

  export type ResultCreateWithoutSessionInput = {
    participantId: string
    optionIds: JsonNullValueInput | InputJsonValue
    score?: number
    answeredAt?: Date | string
    question: QuestionCreateNestedOneWithoutResultsInput
  }

  export type ResultUncheckedCreateWithoutSessionInput = {
    id?: number
    questionId: number
    participantId: string
    optionIds: JsonNullValueInput | InputJsonValue
    score?: number
    answeredAt?: Date | string
  }

  export type ResultCreateOrConnectWithoutSessionInput = {
    where: ResultWhereUniqueInput
    create: XOR<ResultCreateWithoutSessionInput, ResultUncheckedCreateWithoutSessionInput>
  }

  export type ResultCreateManySessionInputEnvelope = {
    data: ResultCreateManySessionInput | ResultCreateManySessionInput[]
    skipDuplicates?: boolean
  }

  export type PollUpsertWithoutSessionsInput = {
    update: XOR<PollUpdateWithoutSessionsInput, PollUncheckedUpdateWithoutSessionsInput>
    create: XOR<PollCreateWithoutSessionsInput, PollUncheckedCreateWithoutSessionsInput>
    where?: PollWhereInput
  }

  export type PollUpdateToOneWithWhereWithoutSessionsInput = {
    where?: PollWhereInput
    data: XOR<PollUpdateWithoutSessionsInput, PollUncheckedUpdateWithoutSessionsInput>
  }

  export type PollUpdateWithoutSessionsInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutPollsNestedInput
    questions?: QuestionUpdateManyWithoutPollNestedInput
  }

  export type PollUncheckedUpdateWithoutSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    organizerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutPollNestedInput
  }

  export type UserUpsertWithoutSessionsInput = {
    update: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
    create: XOR<UserCreateWithoutSessionsInput, UserUncheckedCreateWithoutSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutSessionsInput, UserUncheckedUpdateWithoutSessionsInput>
  }

  export type UserUpdateWithoutSessionsInput = {
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    polls?: PollUpdateManyWithoutOrganizerNestedInput
  }

  export type UserUncheckedUpdateWithoutSessionsInput = {
    id?: IntFieldUpdateOperationsInput | number
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    polls?: PollUncheckedUpdateManyWithoutOrganizerNestedInput
  }

  export type ResultUpsertWithWhereUniqueWithoutSessionInput = {
    where: ResultWhereUniqueInput
    update: XOR<ResultUpdateWithoutSessionInput, ResultUncheckedUpdateWithoutSessionInput>
    create: XOR<ResultCreateWithoutSessionInput, ResultUncheckedCreateWithoutSessionInput>
  }

  export type ResultUpdateWithWhereUniqueWithoutSessionInput = {
    where: ResultWhereUniqueInput
    data: XOR<ResultUpdateWithoutSessionInput, ResultUncheckedUpdateWithoutSessionInput>
  }

  export type ResultUpdateManyWithWhereWithoutSessionInput = {
    where: ResultScalarWhereInput
    data: XOR<ResultUpdateManyMutationInput, ResultUncheckedUpdateManyWithoutSessionInput>
  }

  export type SessionCreateWithoutResultsInput = {
    pin: string
    status?: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    poll: PollCreateNestedOneWithoutSessionsInput
    organizer: UserCreateNestedOneWithoutSessionsInput
  }

  export type SessionUncheckedCreateWithoutResultsInput = {
    id?: number
    pin: string
    status?: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion?: number
    pollId: number
    organizerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateOrConnectWithoutResultsInput = {
    where: SessionWhereUniqueInput
    create: XOR<SessionCreateWithoutResultsInput, SessionUncheckedCreateWithoutResultsInput>
  }

  export type QuestionCreateWithoutResultsInput = {
    text: string
    timeLimit: number
    type: $Enums.QuestionType
    order: number
    createdAt?: Date | string
    poll: PollCreateNestedOneWithoutQuestionsInput
    options?: OptionCreateNestedManyWithoutQuestionInput
  }

  export type QuestionUncheckedCreateWithoutResultsInput = {
    id?: number
    text: string
    timeLimit: number
    type: $Enums.QuestionType
    order: number
    pollId: number
    createdAt?: Date | string
    options?: OptionUncheckedCreateNestedManyWithoutQuestionInput
  }

  export type QuestionCreateOrConnectWithoutResultsInput = {
    where: QuestionWhereUniqueInput
    create: XOR<QuestionCreateWithoutResultsInput, QuestionUncheckedCreateWithoutResultsInput>
  }

  export type SessionUpsertWithoutResultsInput = {
    update: XOR<SessionUpdateWithoutResultsInput, SessionUncheckedUpdateWithoutResultsInput>
    create: XOR<SessionCreateWithoutResultsInput, SessionUncheckedCreateWithoutResultsInput>
    where?: SessionWhereInput
  }

  export type SessionUpdateToOneWithWhereWithoutResultsInput = {
    where?: SessionWhereInput
    data: XOR<SessionUpdateWithoutResultsInput, SessionUncheckedUpdateWithoutResultsInput>
  }

  export type SessionUpdateWithoutResultsInput = {
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poll?: PollUpdateOneRequiredWithoutSessionsNestedInput
    organizer?: UserUpdateOneRequiredWithoutSessionsNestedInput
  }

  export type SessionUncheckedUpdateWithoutResultsInput = {
    id?: IntFieldUpdateOperationsInput | number
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    pollId?: IntFieldUpdateOperationsInput | number
    organizerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionUpsertWithoutResultsInput = {
    update: XOR<QuestionUpdateWithoutResultsInput, QuestionUncheckedUpdateWithoutResultsInput>
    create: XOR<QuestionCreateWithoutResultsInput, QuestionUncheckedCreateWithoutResultsInput>
    where?: QuestionWhereInput
  }

  export type QuestionUpdateToOneWithWhereWithoutResultsInput = {
    where?: QuestionWhereInput
    data: XOR<QuestionUpdateWithoutResultsInput, QuestionUncheckedUpdateWithoutResultsInput>
  }

  export type QuestionUpdateWithoutResultsInput = {
    text?: StringFieldUpdateOperationsInput | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poll?: PollUpdateOneRequiredWithoutQuestionsNestedInput
    options?: OptionUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutResultsInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    order?: IntFieldUpdateOperationsInput | number
    pollId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: OptionUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type PollCreateManyOrganizerInput = {
    id?: number
    title: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type SessionCreateManyOrganizerInput = {
    id?: number
    pin: string
    status?: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion?: number
    pollId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PollUpdateWithoutOrganizerInput = {
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUpdateManyWithoutPollNestedInput
    sessions?: SessionUpdateManyWithoutPollNestedInput
  }

  export type PollUncheckedUpdateWithoutOrganizerInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    questions?: QuestionUncheckedUpdateManyWithoutPollNestedInput
    sessions?: SessionUncheckedUpdateManyWithoutPollNestedInput
  }

  export type PollUncheckedUpdateManyWithoutOrganizerInput = {
    id?: IntFieldUpdateOperationsInput | number
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutOrganizerInput = {
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    poll?: PollUpdateOneRequiredWithoutSessionsNestedInput
    results?: ResultUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutOrganizerInput = {
    id?: IntFieldUpdateOperationsInput | number
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    pollId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: ResultUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutOrganizerInput = {
    id?: IntFieldUpdateOperationsInput | number
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    pollId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type QuestionCreateManyPollInput = {
    id?: number
    text: string
    timeLimit: number
    type: $Enums.QuestionType
    order: number
    createdAt?: Date | string
  }

  export type SessionCreateManyPollInput = {
    id?: number
    pin: string
    status?: $Enums.SessionStatus
    progressionMode: $Enums.ProgressionMode
    currentQuestion?: number
    organizerId: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type QuestionUpdateWithoutPollInput = {
    text?: StringFieldUpdateOperationsInput | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: OptionUpdateManyWithoutQuestionNestedInput
    results?: ResultUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateWithoutPollInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    options?: OptionUncheckedUpdateManyWithoutQuestionNestedInput
    results?: ResultUncheckedUpdateManyWithoutQuestionNestedInput
  }

  export type QuestionUncheckedUpdateManyWithoutPollInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    timeLimit?: IntFieldUpdateOperationsInput | number
    type?: EnumQuestionTypeFieldUpdateOperationsInput | $Enums.QuestionType
    order?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SessionUpdateWithoutPollInput = {
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    organizer?: UserUpdateOneRequiredWithoutSessionsNestedInput
    results?: ResultUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateWithoutPollInput = {
    id?: IntFieldUpdateOperationsInput | number
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    organizerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    results?: ResultUncheckedUpdateManyWithoutSessionNestedInput
  }

  export type SessionUncheckedUpdateManyWithoutPollInput = {
    id?: IntFieldUpdateOperationsInput | number
    pin?: StringFieldUpdateOperationsInput | string
    status?: EnumSessionStatusFieldUpdateOperationsInput | $Enums.SessionStatus
    progressionMode?: EnumProgressionModeFieldUpdateOperationsInput | $Enums.ProgressionMode
    currentQuestion?: IntFieldUpdateOperationsInput | number
    organizerId?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OptionCreateManyQuestionInput = {
    id?: number
    text: string
    isCorrect?: boolean
    createdAt?: Date | string
  }

  export type ResultCreateManyQuestionInput = {
    id?: number
    sessionId: number
    participantId: string
    optionIds: JsonNullValueInput | InputJsonValue
    score?: number
    answeredAt?: Date | string
  }

  export type OptionUpdateWithoutQuestionInput = {
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OptionUncheckedUpdateWithoutQuestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OptionUncheckedUpdateManyWithoutQuestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    text?: StringFieldUpdateOperationsInput | string
    isCorrect?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultUpdateWithoutQuestionInput = {
    participantId?: StringFieldUpdateOperationsInput | string
    optionIds?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    session?: SessionUpdateOneRequiredWithoutResultsNestedInput
  }

  export type ResultUncheckedUpdateWithoutQuestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    participantId?: StringFieldUpdateOperationsInput | string
    optionIds?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultUncheckedUpdateManyWithoutQuestionInput = {
    id?: IntFieldUpdateOperationsInput | number
    sessionId?: IntFieldUpdateOperationsInput | number
    participantId?: StringFieldUpdateOperationsInput | string
    optionIds?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultCreateManySessionInput = {
    id?: number
    questionId: number
    participantId: string
    optionIds: JsonNullValueInput | InputJsonValue
    score?: number
    answeredAt?: Date | string
  }

  export type ResultUpdateWithoutSessionInput = {
    participantId?: StringFieldUpdateOperationsInput | string
    optionIds?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
    question?: QuestionUpdateOneRequiredWithoutResultsNestedInput
  }

  export type ResultUncheckedUpdateWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    questionId?: IntFieldUpdateOperationsInput | number
    participantId?: StringFieldUpdateOperationsInput | string
    optionIds?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ResultUncheckedUpdateManyWithoutSessionInput = {
    id?: IntFieldUpdateOperationsInput | number
    questionId?: IntFieldUpdateOperationsInput | number
    participantId?: StringFieldUpdateOperationsInput | string
    optionIds?: JsonNullValueInput | InputJsonValue
    score?: IntFieldUpdateOperationsInput | number
    answeredAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}