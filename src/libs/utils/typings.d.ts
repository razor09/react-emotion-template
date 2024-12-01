export type Indentation = 2 | 4

export type StringOrNumber = string | number

export type Property = string | number | boolean | null | object

export type PropertyOrList = Property | Property[]

export interface Pipe<T> {
  pipe: <R>(callback: (value: T) => R) => Pipe<R>
  result: () => T
}
