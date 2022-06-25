import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: Function) => {
  const cookieHeader = req.headers['cookie'];
  const regex = /(?<=access_token=)[^]+/;
  if (!cookieHeader) return res.sendStatus(401);
  const match = regex.exec(cookieHeader);
  console.log('regex match', match![0]);
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader?.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(
    token as string,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, user) => {
      if (err) return res.sendStatus(403);
      req.body.user = user;
      next();
    }
  );
};

export default authenticateToken;
