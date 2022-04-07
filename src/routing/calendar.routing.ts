import { Express } from "express";
import {
  createCalendarHandler,
  deleteCalendarHandler,
  getCalendarHandler,
  getCalendarsHandler,
  updateCalendarHandler,
} from "../controller/calendar.controller";
import { requiresUser, validateRequest } from "../middleware";
import {
  createCalendarSchema,
  deleteCalendarSchema,
  updateCalendarSchema,
} from "../schema/calendar.schema";
const CalendarRoute = (app: Express) => {
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
};

export default CalendarRoute;
