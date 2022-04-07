import { Express } from "express";
import {
  createGroupHandler,
  deleteGroupHandler,
  getGroupHandler,
  getGroupsHandler,
  updateGroupHandler,
} from "../controller/group.controller";
import { requiresUser, validateRequest } from "../middleware";
import {
  createGroupSchema,
  deleteGroupSchema,
  updateGroupSchema,
} from "../schema/group.schema";

const GroupRoute = (app: Express) => {
  // Create a Group
  app.post(
    "/api/groups",
    [requiresUser, validateRequest(createGroupSchema)],
    createGroupHandler
  );

  // Get all groups
  app.get("/api/groups", requiresUser, getGroupsHandler);

  // Update a group
  app.put(
    "/api/groups/:groupId",
    [requiresUser, validateRequest(updateGroupSchema)],
    updateGroupHandler
  );

  // Get a group
  app.get("/api/groups/:groupId", requiresUser, getGroupHandler);

  // Delete a group
  app.delete(
    "/api/groups/:groupId",
    [requiresUser, validateRequest(deleteGroupSchema)],
    deleteGroupHandler
  );
};

export default GroupRoute;
