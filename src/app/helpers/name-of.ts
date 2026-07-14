export function nameOf<T>() {
  return new Proxy(
    {},
    { get: (_, property) => property, }
  ) as { [Property in keyof T]: Property };
}