interface GenericIdentityFn {
  <Type>(arg: Type): Type
}

function identity<Type>(arg: Type): Type {
  return arg
}

const myIdentity: GenericIdentityFn = identity

const t = myIdentity(2)
console.log('t:', t)

type Flatten<T> = T extends any[] ? T[number] : T;

// Extracts out the element type.
type Str = Flatten<string[]>;
// type Str = string

// Leaves the type alone.
type Num = Flatten<number>;
// type Num = number

import './t-im.js'
