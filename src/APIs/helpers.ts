import { Request, Response } from 'express';

export const errorHelper = async (
  req: Request,
  res: Response,
  func: (reqx: Request, resx: Response) => void
) => {
  try {
    // TODO: Why is typescript telling me 'await' is not needed??
    await func(req, res);
  } catch (e) {
    console.error({ error: e });
    if ((e as Error).message) {
      res.status(400).send({
        status: 400,
        message: (e as Error).message,
      });
    } else {
      res.status(500).send({
        status: 500,
        message: e,
      });
    }
  }
};
