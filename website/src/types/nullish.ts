/*! *****************************************************************************
 * Utility types for handling undefined, null, and nullish values in TypeScript.
 ***************************************************************************** */

/**
 * Represents a type that can either hold a value of type `T` or be `undefined`.
 */
type TUndefinable<T> = T | undefined;

/**
 * Represents a type that can either hold a value of type `T` or be `null`.
 */
type TNullable<T> = T | null;

/**
 * Represents a type that can either hold a value of type `T` or be `null` or `undefined`.
 * Combines `TNullable` and `TUndefinable`.
 */
type TNullish<T> = TNullable<T> | TUndefinable<T>;

export type { TUndefinable, TNullable, TNullish };
