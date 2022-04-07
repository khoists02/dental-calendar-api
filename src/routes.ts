import { Express } from "express";
import { inviteUserGroupsSchema } from "./schema/user_group.schema";
import { invitedUserGroupHandler } from "./controller/user_group.controller";
import UserRoute from "./routing/user.routing";
import PostRoute from "./routing/post.routing";
import GroupRoute from "./routing/group.routing";
import CalendarRoute from "./routing/calendar.routing";
import PatientRoute from "./routing/patient.routing";
import { requiresUser, validateRequest } from "./middleware";

export default function (app: Express) {
  UserRoute(app);

  PostRoute(app);

  GroupRoute(app);

  CalendarRoute(app);

  PatientRoute(app);

  // UserGroup routes
  app.put(
    "/api/userGroups/:groupId",
    [requiresUser, validateRequest(inviteUserGroupsSchema)],
    invitedUserGroupHandler
  );
}
