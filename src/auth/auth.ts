import { ExtractJwt, Strategy, VerifyCallback } from 'passport-jwt';
import passport, { AuthenticateCallback } from 'passport';
import { findUserByEmail, findUserById } from './users';
import express, { NextFunction } from 'express';
import { Request, Response } from 'express';
import { loginValidation } from '../validation/userValidation';
import { errorHelper } from '../APIs/helpers';
import { sign } from 'jsonwebtoken';
import { User } from '../types/zod';
import { comparePasswords } from './crypt';

const tokenLifetime = 60 * 60 * 24 * 7 * 4; // 28 dagar

const app = express();
app.use(express.json());

const opt = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET ?? 'secret',
};

const strategy: VerifyCallback = async (payload, done) => {
  const user = await findUserById(payload.id);
  if (user) {
    return done(null, user);
  } else {
    return done(null, false);
  }
};

passport.use(new Strategy(opt, strategy));

app.use(passport.initialize());

export const requireAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user && (req.user as User).role === 'admin') {
    return next();
  }

  return res.status(403).send({ status: 403, message: 'Forbidden' });
};

export const requireAdminOrPersonalUser = (userId: number, user: any) => {
  if (
    !((user && (user as User).role === 'admin') || (user as User).id === userId)
  ) {
    throw new Error('Forbidden');
  }
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) =>
  passport.authenticate(
    'jwt',
    { session: false },
    (
      err: Parameters<AuthenticateCallback>[0],
      user: Parameters<AuthenticateCallback>[1],
      info: Parameters<AuthenticateCallback>[2]
    ) => {
      if (err) {
        return next(err);
      }

      if (!user) {
        console.error({ info, message: 'SOMETHING WRONG WITH TOKEN' });
        const error =
          info && (info as any).name === 'TokenExpiredError'
            ? 'expired token'
            : 'invalid token';

        return res.status(401).send({ status: 401, message: error });
      }

      req.user = user;
      return next();
    }
  )(req, res, next);

export const loginRoute = async (req: Request, res: Response) => {
  errorHelper(req, res, async (req, res) => {
    const { email, password } = req.body;

    loginValidation(email, password);

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(401).send({ status: 401, message: 'No such user' });
    }

    const passwordIsCorrect = await comparePasswords(password, user.password);

    if (passwordIsCorrect) {
      const payload = { id: user.id };
      const tokenOptions = { expiresIn: Number(tokenLifetime) };
      const token = sign(payload, opt.secretOrKey, tokenOptions);

      delete user.password;

      return res.json({
        user,
        token,
        expiresIn: Number(tokenLifetime),
      });
    }

    return res.status(401).send({ status: 401, message: 'Invalid password' });
  });
};

export default app;
