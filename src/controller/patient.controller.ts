import { Request, Response } from "express";
import { get } from "lodash";
import log from "../logger";
import { findCalendar } from "../services/calendar.service";
import { findGroup } from "../services/group.service";
import {
  createPatient,
  findPatient,
  findAndUpdate,
  deletePatient,
  findPatients,
} from "../services/patient.service";

export async function createPatientHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const body = req.body;

    const group = await findGroup({ groupId: body.groupId });
    if (!group) {
      return res.sendStatus(400);
    }

    const patient = await createPatient({
      ...body,
      userId,
    });

    return res.send(patient);
  } catch (error) {
    log.error(error);
  }
}

export async function updatePatientHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const patientId = get(req, "params.patientId");
  const update = req.body;

  const patient = await findPatient({ patientId });

  if (!patient) {
    return res.sendStatus(404);
  }

  if (String(patient.userId) !== userId) {
    return res.sendStatus(401);
  }
  const updatePatient = await findAndUpdate({ patientId }, update, {
    new: true,
  });

  return res.send(updatePatient);
}
export async function getPatientHandler(req: Request, res: Response) {
  const patientId = get(req, "params.patientId");
  const patient = await findPatient({ patientId });

  if (!patient) {
    return res.sendStatus(404);
  }

  return res.send(patient);
}

export async function deletePatientHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const patientId = get(req, "params.patientId");

  const patient = await findPatient({ patientId });

  if (!patient) {
    return res.sendStatus(404);
  }

  if (String(patient.userId) !== String(userId)) {
    return res.sendStatus(401);
  }

  await deletePatient({ patientId });

  return res.sendStatus(200);
}

export async function getPatientsHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const patients = await findPatients({
    userId,
    valid: true,
  });

  return res.send(patients);
}
