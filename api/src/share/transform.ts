import { TransformFnParams } from 'class-transformer';

export const toTrimString = ({ value }: TransformFnParams): string => {
  return value ? value.trim() : value;
};
