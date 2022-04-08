import { Request, Response } from "express";
import { get } from "lodash";
import {
  createGroup,
  findGroup,
  findAndUpdate,
  deleteGroup,
  findGroups,
} from "../services/group.service";
import { NotFound, UnAuthorize } from "../utils/http.error";

export async function createGroupHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const body = req.body;
  const group = await createGroup({ ...body, userOwner: userId });
  return res.send(group);
}

export async function updateGroupHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const groupId = get(req, "params.groupId");
  let update = req.body;

  const group = await findGroup({ groupId });

  if (!group) {
    return NotFound("Group is not found", res);
  }

  if (String(group.userOwner) !== userId) {
    return UnAuthorize(res);
  }

  const updatedGroup = await findAndUpdate({ groupId }, update, { new: true });

  return res.send(updatedGroup);
}
export async function getGroupHandler(req: Request, res: Response) {
  const groupId = get(req, "params.groupId");
  const group = await findGroup({ groupId });

  if (!group) {
    return NotFound("Group is not found", res);
  }

  return res.send(group);
}

export async function deleteGroupHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const groupId = get(req, "params.groupId");

  const group = await findGroup({ groupId });

  if (!group) {
    return NotFound("Group is not found", res);
  }

  if (String(group.userOwner) !== String(userId)) {
    return UnAuthorize(res);
  }

  await deleteGroup({ groupId });

  return res.sendStatus(200);
}

export async function getGroupsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const groups = await findGroups({ user: userId, valid: true });

  return res.send(groups);
}
