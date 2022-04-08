import { Express } from "express";
import UserRoute from "./routing/user.routing";
import PostRoute from "./routing/post.routing";
import GroupRoute from "./routing/group.routing";
import CalendarRoute from "./routing/calendar.routing";
import PatientRoute from "./routing/patient.routing";

export default function (app: Express) {
  UserRoute(app);

  PostRoute(app);

  GroupRoute(app);

  CalendarRoute(app);

  PatientRoute(app);
}
