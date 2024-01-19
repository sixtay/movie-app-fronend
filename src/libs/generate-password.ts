import crypto from 'crypto';

export const generatePassword = (length: number) => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+[]{}|;:',.<>/?";
  let password = '';
  while (password.length < length) {
    const bytes = crypto.randomBytes(1);
    const index = bytes[0] % charset.length;
    if (index < charset.length) {
      password += charset[index];
    }
  }
  return password;
};
