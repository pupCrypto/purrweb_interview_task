import { createHash } from 'crypto';

export function genSha256Hex(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

export function isNull(obj: object | null | undefined): boolean {
  return obj === null || obj === undefined;
}

export function isNotNull(obj): boolean {
  return !isNull(obj);
}
