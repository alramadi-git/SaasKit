type tUndefinable<t> = t | undefined;

type tNullable<t> = t | null;

type tNullish<t> = tUndefinable<t> | tNullable<t>;

export type { tUndefinable, tNullable, tNullish };
