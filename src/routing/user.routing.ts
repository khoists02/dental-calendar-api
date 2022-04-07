import { Express, Request, Response } from "express";
import {
  createUserSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";
import {
  authenticatedUserHandler,
  createUserHandler,
  logoutHandler,
} from "../controller/user.controller";
import { requiresUser, validateRequest } from "../middleware";
import {
  createUserSchema,
  createUserSessionSchema,
} from "../schema/user.schema";

const UserRoute = (app: Express) => {
  app.get("/healthcheck", (req: Request, res: Response) => res.sendStatus(200));

  // Register User
  app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

  // Login
  app.post(
    "/api/authenticate",
    validateRequest(createUserSessionSchema),
    createUserSessionHandler
  );

  // logout
  app.post("/api/logout", requiresUser, logoutHandler);

  // Get User
  app.get("/api/authenticatedUser", requiresUser, authenticatedUserHandler);

  // Get the user's sessions
  app.get("/api/sessions", requiresUser, getUserSessionsHandler);
};

export default UserRoute;
