import { Request, Response } from "express";
import { get, omit } from "lodash";
import { createUser, findUser } from "../services/user.service";
import log from "../logger";

export async function createUserHandler(req: Request, res: Response) {
  try {
    const user = await createUser(req.body);
    return res.send(omit(user.toJSON(), "password"));
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}

export async function authenticatedUserHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const user = await findUser({ _id: userId });

    if (!user) {
      return res.sendStatus(400);
    }

    return res.send(user);
  } catch (e: any) {
    log.error(e);
    return res.status(409).send(e.message);
  }
}
