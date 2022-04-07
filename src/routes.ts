import { Express, Request, Response } from "express";
import {
  createPostHandler,
  updatePostHandler,
  getPostHandler,
  deletePostHandler,
  getPostsHandler,
} from "./controller/post.controller";
import { createUserHandler } from "./controller/user.controller";
import {
  createUserSessionHandler,
  invalidateUserSessionHandler,
  getUserSessionsHandler,
} from "./controller/session.controller";
import { validateRequest, requiresUser } from "./middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "./schema/user.schema";
import {
  createPostSchema,
  updatePostSchema,
  deletePostSchema,
} from "./schema/post.schema";
import {
  createGroupSchema,
  deleteGroupSchema,
  updateGroupSchema,
} from "./schema/group.schema";
import {
  createGroupHandler,
  deleteGroupHandler,
  getGroupHandler,
  getGroupsHandler,
  updateGroupHandler,
} from "./controller/group.controller";
import {
  createCalendarSchema,
  deleteCalendarSchema,
  updateCalendarSchema,
} from "./schema/calendar.schema";
import {
  updateCalendarHandler,
  getCalendarHandler,
  getCalendarsHandler,
  deleteCalendarHandler,
  createCalendarHandler,
} from "./controller/calendar.controller";
import { inviteUserGroupsSchema } from "./schema/user_group.schema";
import { invitedUserGroupHandler } from "./controller/user_group.controller";
import {
  createPatientSchema,
  deletePatientSchema,
  updatePatientSchema,
} from "./schema/patient.schema";
import {
  createPatientHandler,
  deletePatientHandler,
  getPatientHandler,
  getPatientsHandler,
  updatePatientHandler,
} from "./controller/patient.controller";

export default function (app: Express) {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register user
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/sessions",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // Get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);

  // Logout
  app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);

  // Create a post
  app.post(
    "/api/posts",
    [requiresUser, validateRequest(createPostSchema)],
    createPostHandler
  );

  // Get all posts
  app.get("/api/posts", requiresUser, getPostsHandler);

  // Update a post
  app.put(
    "/api/posts/:postId",
    [requiresUser, validateRequest(updatePostSchema)],
    updatePostHandler
  );

  // Get a post
  app.get("/api/posts/:postId", getPostHandler);

  // Delete a post
  app.delete(
    "/api/posts/:postId",
    [requiresUser, validateRequest(deletePostSchema)],
    deletePostHandler
  );

  // Groups routes

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

  // Calendars route

  // Create a Calendar
  app.post(
    "/api/calendars/:groupId",
    [requiresUser, validateRequest(createCalendarSchema)],
    createCalendarHandler
  );

  // Get all Calendar
  app.get("/api/calendars/:groupId", requiresUser, getCalendarsHandler);

  // Update a Calendar
  app.put(
    "/api/calendars/:calendarId/:groupId",
    [requiresUser, validateRequest(updateCalendarSchema)],
    updateCalendarHandler
  );

  // Get a Calendar
  app.get(
    "/api/calendars/:calendarId/:groupId",
    requiresUser,
    getCalendarHandler
  );

  // Delete a Calendar
  app.delete(
    "/api/calendars/:calendarId",
    [requiresUser, validateRequest(deleteCalendarSchema)],
    deleteCalendarHandler
  );

  // UserGroup routes
  app.put(
    "/api/userGroups/:groupId",
    [requiresUser, validateRequest(inviteUserGroupsSchema)],
    invitedUserGroupHandler
  );

  // patient routes

  app.post(
    "/api/patients",
    [requiresUser, validateRequest(createPatientSchema)],
    createPatientHandler
  );

  // Get all patient
  app.get("/api/patients", requiresUser, getPatientsHandler);

  // Update a patient
  app.put(
    "/api/patients/:patientId",
    [requiresUser, validateRequest(updatePatientSchema)],
    updatePatientHandler
  );

  // Get a patient
  app.get("/api/patients/:patientId", requiresUser, getPatientHandler);

  // Delete a patient
  app.delete(
    "/api/patients/:patientId",
    [requiresUser, validateRequest(deletePatientSchema)],
    deletePatientHandler
  );
}
