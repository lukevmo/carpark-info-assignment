import { TransformFnParams } from 'class-transformer';

import { httpBadRequest } from './http-exception';
import { IToNumberOptions } from './common.interface';

export const toTrimString = ({ value }: TransformFnParams): string => {
  return value ? value.trim() : value;
};

export const toNumber = (key: string, value: string, opts: IToNumberOptions = {}): number => {
  const newValue: number = Number.parseFloat(value || String(opts.default));

  if (Number.isNaN(newValue)) {
    httpBadRequest(`${key} must be a number`);
  }

  return newValue;
};
