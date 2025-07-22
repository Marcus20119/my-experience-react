import type { AnyObject } from 'antd/es/_util/type';
import type { Dayjs } from 'dayjs';

type Primitive = boolean | null | number | string | undefined;

export type DeepPartial<T> = T extends Primitive
  ? T
  : { [P in keyof T]?: DeepPartial<T[P]> };

export type DeepReadonly<T> = T extends object
  ? { readonly [K in keyof T]: DeepReadonly<T[K]> }
  : T;

export type IntersectionEachUnion<T, U> = T extends T
  ? U extends U
    ? T & U
    : never
  : never;

export type ChangeDayjsToString<T extends AnyObject> = {
  [K in keyof T]: T[K] extends Dayjs ? string : T[K];
};

export type Maybe<T> = null | T | undefined;
