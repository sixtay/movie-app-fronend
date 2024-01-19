import { KeyValuePair } from '@/types';
import { isArray, isObject, mapKeys, camelCase } from 'lodash';

export const removeEmpty = (object: KeyValuePair) => {
  let newObj: KeyValuePair = {};
  Object.keys(object).forEach((key: string) => {
    if (object[key]) {
      newObj[key] = object[key];
    }
  });

  return newObj;
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export function convertKeysToCamelCase<T>(obj: T): T {
  if (isArray(obj)) {
    return obj.map((item) => convertKeysToCamelCase(item)) as any as T;
  } else if (isObject(obj)) {
    return mapKeys(obj, (value, key) => camelCase(key)) as any as T;
  }
  return obj;
}
