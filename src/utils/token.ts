import { v4 as uuidv4 } from 'uuid';

export function generateToken(length: number = 32): string {
  return uuidv4().replace(/-/g, '').substring(0, length);
}

export function generateDownloadToken(): string {
  return uuidv4();
}

export function generateResetToken(): string {
  return generateToken(64);
}
