import { Request, Response } from "express";
import { get } from "lodash";
import { findUserGroup, invitedUsers } from "../services/user_group.service";

export async function invitedUserGroupHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const groupId = get(req, "params.groupId");
  const update = req.body;
  const group = await findUserGroup({ groupId });
  if (!group) {
    res.sendStatus(404);
  }

  if (String(group?.userOwner) !== userId) {
    return res.sendStatus(401);
  }

  const updatedUserGroup = await invitedUsers({ groupId }, update, {
    new: true,
  });

  return res.send(updatedUserGroup);
}
