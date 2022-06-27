import * as bcrypt from 'bcrypt';
import { User } from '../components';
import { UserEntity } from '../database/entity/UserEntity';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const authenticateUser = async (input: User, user: UserEntity) => {
  const isAuth = await bcrypt.compare(input.password, user.password);
  if (!isAuth) throw new Error('Incorrect password');

  const authToken = jwt.sign(
    JSON.stringify(user),
    process.env.ACCESS_TOKEN_SECRET as string
  );

  const authenticatedUser: User = {
    id: user.id,
    username: user.username,
    password: '',
    authToken: authToken,
  };

  return authenticatedUser;
};

export default authenticateUser;
