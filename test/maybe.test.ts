import { Maybe, Some } from "../src/maybe";

describe("Maybe", () => {
  describe("Some()", () => {
    it("should throw constructing error", () => {
      expect(() => new Some((null as unknown) as string)).toThrowError("Can't construct 'Some' with an empty value");
    });
  });

  describe("isEmpty()", () => {
    it("should return true for undefined", () => {
      const maybe = Maybe.of(undefined);
      expect(maybe.isEmpty()).toBeTruthy();
    });

    it("should return true for null", () => {
      const maybe = Maybe.of(null);
      expect(maybe.isEmpty()).toBeTruthy();
    });

    it("should return false when it is not empty", () => {
      const maybe = Maybe.of("foo");
      expect(maybe.isEmpty()).toBeFalsy();
    });
  });

  describe("get()", () => {
    it("should return value when it is not empty", () => {
      const maybe = Maybe.of("foo");
      expect(maybe.get()).toBe("foo");
    });

    it("should throw an error when it is empty", () => {
      const maybe = Maybe.empty();
      expect(() => maybe.get()).toThrowError("Can't get a value on 'None'");
    });
  });

  describe("getOrElse()", () => {
    it("should return value when it is not empty", () => {
      const maybe = Maybe.of("foo");
      expect(maybe.getOrElse("bar")).toBe("foo");
    });

    it("should return other when it is empty", () => {
      const maybe = Maybe.empty();
      expect(maybe.getOrElse("bar")).toBe("bar");
    });
  });

  describe("getOrThrow()", () => {
    it("should return value when it is not empty", () => {
      const maybe = Maybe.of("foo");
      expect(maybe.getOrThrow(new Error("a value is not defined"))).toBe("foo");
    });

    it("should return undefined when it is empty", () => {
      const maybe = Maybe.empty();
      expect(() => maybe.getOrThrow(new Error("a value is not defined"))).toThrowError("a value is not defined");
    });
  });

  describe("getOrNull()", () => {
    it("should return value when it is not empty", () => {
      const maybe = Maybe.of("foo");
      expect(maybe.getOrNull()).toBe("foo");
    });

    it("should return null when it is empty", () => {
      const maybe = Maybe.empty();
      expect(maybe.getOrNull()).toBeNull();
    });
  });

  describe("getOrUndefined()", () => {
    it("should return value when it is not empty", () => {
      const maybe = Maybe.of("foo");
      expect(maybe.getOrUndefined()).toBe("foo");
    });

    it("should return undefined when it is empty", () => {
      const maybe = Maybe.empty();
      expect(maybe.getOrUndefined()).toBeUndefined();
    });
  });

  describe("is()", () => {
    it("should return true when it is equal 'foo'", () => {
      const maybe = Maybe.of("foo");
      expect(maybe.is("foo")).toBeTruthy();
    });

    it("should return false when it is not equal 'foo'", () => {
      const maybe = Maybe.of("bar");
      expect(maybe.is("foo")).toBeFalsy();
    });

    it("should return false when it is empty", () => {
      const maybe = Maybe.empty();
      expect(maybe.is("foo")).toBeFalsy();
    });
  });

  describe("map()", () => {
    it("should return value when it is not empty", () => {
      const maybe = Maybe.of({ a: { b: "foo" } });
      expect(
        maybe
          .map((v) => v.a)
          .map((v) => v.b)
          .get(),
      ).toBe("foo");
    });

    it("should map over empty", () => {
      const maybe = Maybe.empty();
      expect(maybe.map((v) => v).isEmpty()).toBeTruthy();
    });
  });
});
