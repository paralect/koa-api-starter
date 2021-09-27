import bcrypt from 'bcrypt';

export const getHashSync = (text) => {
  return bcrypt.hashSync(text, 10);
};
