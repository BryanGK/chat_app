import * as bcrypt from 'bcrypt';
import { User } from '../components';
import { UserEntity } from '../database/entity/UserEntity';
import jwt from 'jsonwebtoken';

const authorizeUser = async (input: UserEntity, user: User) => {
  const isAuth = await bcrypt.compare(input.password, user.password);
  if (!isAuth) throw new Error('Incorrect password');

  return jwt.sign(
    JSON.stringify(user),
    process.env.ACCESS_TOKEN_SECRET as string
  );
};

export default authorizeUser;
