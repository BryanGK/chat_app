import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const authenticateToken = (req: Request, res: Response, next: Function) => {
  const cookieHeader = req.headers['cookie'];
  if (!cookieHeader) return res.sendStatus(401);

  const regex = /(?<=access_token=)[^]+/;
  const match = regex.exec(cookieHeader);
  const token = match ? match[0] : '';

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
