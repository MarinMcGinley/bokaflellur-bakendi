import { Request, Response } from 'express';

export const errorHelper = async (
  req: Request,
  res: Response,
  func: (reqx: Request, resx: Response) => Promise<Response>
) => {
  try {
    await func(req, res);
  } catch (e) {
    console.error({ error: e });
    if ((e as Error).message) {
      if ((e as Error).message === 'Forbidden') {
        return res.status(403).send({
          status: 403,
          message: (e as Error).message,
        });
      }
      return res.status(400).send({
        status: 400,
        message: (e as Error).message,
      });
    } else {
      return res.status(500).send({
        status: 500,
        message: e,
      });
    }
  }
};
