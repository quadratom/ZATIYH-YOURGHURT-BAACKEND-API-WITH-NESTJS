import * as bcrypt from 'bcrypt';
import { User } from './user.schema';

export type ScreenedUserType = Omit<User, 'passwords' | 'tokens' | '__v'>;

export async function comparePassword(candidatePassword: string) {
  try {
    const comparePassword = await bcrypt.compare(
      candidatePassword,
      this.password,
    );
    return comparePassword;
  } catch (error) {
    throw error;
  }
}

// To Stop Password Field from being returned
export function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  //   delete obj.tokens;
  //   delete obj.__v;
  return obj;
}

// to return only allowed fields to client
export function screenFields(): ScreenedUserType {
  const obj = this.toObject();
  delete obj.password;
  //   delete obj.tokens;
  //   delete obj.__v;
  return obj;
}
