import { Nullable, Optional, Undefinable } from "./optional";

function isNullOrUndefined<T>(value: T): value is T {
  return value === null || value === undefined;
}

export abstract class Maybe<A> {
  public static of<B>(value: Optional<B>): Maybe<B> {
    return isNullOrUndefined(value) ? new None<B>() : new Some<B>(value);
  }

  public static empty<B>(): Maybe<B> {
    return new None<B>();
  }

  public abstract isEmpty(): boolean;

  public abstract get(): A;

  public abstract getOrElse(other: A): A;

  public abstract getOrThrow(error: Error): A;

  public abstract getOrNull(): Nullable<A>;

  public abstract getOrUndefined(): Undefinable<A>;

  public abstract is(value: A): boolean;

  public abstract map<B>(fn: (value: A) => B): Maybe<B>;
}

export class Some<A> extends Maybe<A> {
  private readonly value: A;

  public constructor(value: A) {
    super();

    if (isNullOrUndefined(value)) {
      throw new Error("Can't construct 'Some' with an empty value");
    }

    this.value = value;
  }

  public isEmpty(): boolean {
    return false;
  }

  public get(): A {
    return this.value;
  }

  public getOrElse(): A {
    return this.value;
  }

  public getOrThrow(): A {
    return this.value;
  }

  public getOrNull(): Nullable<A> {
    return this.value;
  }

  public getOrUndefined(): Undefinable<A> {
    return this.value;
  }

  public is(value: A): boolean {
    return this.value === value;
  }

  public map<B>(fn: (value: A) => B): Maybe<B> {
    return Maybe.of(fn(this.value));
  }
}

export class None<A> extends Maybe<A> {
  public isEmpty(): boolean {
    return true;
  }

  public get(): A {
    throw new Error("Can't get a value on 'None'");
  }

  public getOrElse(other: A): A {
    return other;
  }

  public getOrThrow(error: Error): A {
    throw error;
  }

  public getOrNull(): Nullable<A> {
    return null;
  }

  public getOrUndefined(): Undefinable<A> {
    return undefined;
  }

  public is(): boolean {
    return false;
  }

  public map<B>(): Maybe<B> {
    return new None<B>();
  }
}
