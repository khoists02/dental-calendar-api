import { Request, Response } from "express";
import { get } from "lodash";
import UserGroup from "../model/user_group.model";
import {
  createGroup,
  findGroup,
  findAndUpdate,
  deleteGroup,
  findGroups,
} from "../services/group.service";
import { createUserGroup, findUserGroup } from "../services/user_group.service";

export async function createGroupHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;

  const group = await createGroup({ ...body, user: userId });

  const userGroupModel = new UserGroup({
    userOwner: userId,
    groupId: group.groupId,
    userIds: [],
  });

  await createUserGroup(userGroupModel);
  return res.send(group);
}

export async function updateGroupHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const groupId = get(req, "params.groupId");
  let update = req.body;

  const group = await findGroup({ groupId });

  if (!group) {
    return res.sendStatus(404);
  }

  if (String(group.user) !== userId) {
    return res.sendStatus(401);
  }

  const userGroup = await findUserGroup({ groupId });

  // update number for group
  if (userGroup) {
    const number = userGroup?.userIds.length || 0;
    update = {
      ...update,
      number,
    };
  }

  const updatedGroup = await findAndUpdate({ groupId }, update, { new: true });

  return res.send(updatedGroup);
}
export async function getGroupHandler(req: Request, res: Response) {
  const groupId = get(req, "params.groupId");
  const group = await findGroup({ groupId });

  if (!group) {
    return res.sendStatus(404);
  }

  return res.send(group);
}

export async function deleteGroupHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const groupId = get(req, "params.groupId");

  const group = await findGroup({ groupId });

  if (!group) {
    return res.sendStatus(404);
  }

  if (String(group.user) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deleteGroup({ groupId });

  return res.sendStatus(200);
}

export async function getGroupsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");

  const groups = await findGroups({ user: userId, valid: true });

  return res.send(groups);
}
