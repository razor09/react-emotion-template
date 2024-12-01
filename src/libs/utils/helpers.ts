import { Indentation, Pipe, Property, PropertyOrList } from './typings'

export const compose = <T>(value: T): Pipe<T> => {
  return {
    pipe: (callback) => {
      const result = callback(value)
      return compose(result)
    },
    result: () => value,
  }
}

export const stringify = (value: PropertyOrList, space?: Indentation): string => {
  return JSON.stringify(value, space && null, space)
}

export const toInteger = (value: string): number => {
  return compose(value).pipe(Number).pipe(Math.ceil).pipe(Math.abs).result() || 0
}

export const isArray = (propertyOrList: PropertyOrList): propertyOrList is Property[] => {
  return Array.isArray(propertyOrList)
}
