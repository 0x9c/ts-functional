export type Undefinable<T> = T | undefined;
export type Nullable<T> = T | null;
export type Optional<T> = Undefinable<T> | Nullable<T>;
