import { Request, Response } from "express";
import { get } from "lodash";
import log from "../logger";
import {
  createCalendar,
  findCalendar,
  findAndUpdate,
  deleteCalendar,
  findCalendars,
} from "../services/calendar.service";
import { findPatient } from "../services/patient.service";

export async function createCalendarHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const groupId = get(req, "params.groupId");
  const body = req.body;

  if (body.patientId) {
    const patient = await findPatient({ patientId: body.patientId });
    if (!patient) {
      return res.sendStatus(400);
    }
  }

  const calendar = await createCalendar({
    ...body,
    user: userId,
    group: groupId,
  });

  return res.send(calendar);
}

export async function updateCalendarHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const calendarId = get(req, "params.calendarId");
    const groupId = get(req, "params.groupId");
    const update = req.body;

    const calendar = await findCalendar({ calendarId });

    if (!calendar) {
      return res.sendStatus(404);
    }

    if (
      String(calendar.user) !== userId &&
      String(calendar.group) !== groupId
    ) {
      return res.sendStatus(401);
    }

    if (update.patientId) {
      const patient = await findPatient({ patientId: update.patientId });
      if (!patient) {
        return res.sendStatus(404);
      }
    }

    const updateCalendar = await findAndUpdate({ calendarId }, update, {
      new: true,
    });

    return res.send(updateCalendar);
  } catch (error) {
    log.error(error);
  }
}
export async function getCalendarHandler(req: Request, res: Response) {
  const groupId = get(req, "params.groupId");
  const calendarId = get(req, "params.calendarId");
  const calendar = await findCalendar({ groupId, calendarId });

  if (!calendar) {
    return res.sendStatus(404);
  }

  return res.send(calendar);
}

export async function deleteCalendarHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const groupId = get(req, "params.groupId");
  const calendarId = get(req, "params.calendarId");

  const calendar = await findCalendar({ groupId, calendarId });

  if (!calendar) {
    return res.sendStatus(404);
  }

  if (
    String(calendar.user) !== String(userId) ||
    String(calendar.group) !== String(groupId)
  ) {
    return res.sendStatus(401);
  }

  await deleteCalendar({ calendarId });

  return res.sendStatus(200);
}

export async function getCalendarsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const groupId = get(req, "params.groupId");
  const calendars = await findCalendars({
    user: userId,
    group: groupId,
    valid: true,
  });

  return res.send(calendars);
}
