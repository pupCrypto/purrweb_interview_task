/**
 * Return an environment variable typed value from `process.env`.
 * It also supports a default value in case of `undefined`.
 *
 * The function will follow these steps to take a typed value:
 * 1. First it will try to get the env value from `process.env`.
 * 2. Then if `undefined` then it try with the default environment variable value if defined.
 * 3. Otherwise if the default value is `undefined` then it will return the Javascript default values:
 *     - Boolean: `false`
 *     - String: `""`
 *     - Number: `0`
 *
 * @param name string Environment variable name.
 * @param defaults an Optional default environment variable value when not found.
 * @returns env Typed value of the environment variable.
 */
import { EMPTY_STRING } from './const';

function env(name: string, defaults?: string): string;
function env(name: string, defaults?: boolean): boolean;
function env(name: string, defaults?: number): number;
function env(
  name: string,
  defaults?: string | boolean | number,
): string | boolean | number {
  const val: string =
    typeof process === 'undefined'
      ? EMPTY_STRING
      : (process.env && process.env[name]) || EMPTY_STRING;

  switch (typeof defaults) {
    case 'number': {
      if (!name || val.length === 0) return defaults || 0;
      return Number.isNaN(val) ? defaults || 0 : Number(val);
    }
    case 'boolean':
      switch (val) {
        case '0':
        case 'false':
        case 'FALSE':
          return false;
        case '1':
        case 'true':
        case 'TRUE':
          return true;
        default: {
          return defaults || false;
        }
      }
    case 'string':
    default:
      if (!name) return defaults || EMPTY_STRING;
      return val || defaults || EMPTY_STRING;
  }
}

export default env;
