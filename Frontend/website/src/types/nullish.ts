type tUndefinable<tType> = tType | undefined;

type tNullable<tType> = tType | null;

type tNullish<tType> = tUndefinable<tType> | tNullable<tType>;

export type { tUndefinable, tNullable, tNullish };
