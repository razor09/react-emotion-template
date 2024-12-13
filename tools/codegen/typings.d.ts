export type TypeOfCodegen = 'component' | 'mocks' | 'store'

export type TypeOfFile = TypeOfCodegen | 'typings'

export type ValidProcessArgs = [TypeOfCodegen, ...string[]]
