import { AccessDenied } from 'src/errors';
import Auth from './auth';

export function strictUserValidation(auth: Auth, userId: number) {
  if (auth.user.id !== userId) {
    throw new AccessDenied();
  }
}
