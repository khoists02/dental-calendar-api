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
import { NotFound, UnAuthorize } from "../utils/http.error";

export async function createPatientHandler(req: Request, res: Response) {
  try {
    const userId = get(req, "user._id");
    const body = req.body;

    const group = await findGroup({ groupId: body.groupId });
    if (!group) {
      return NotFound("Group is not found", res);
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
    return NotFound("Patient is not found", res);
  }

  if (String(patient.userId) !== userId) {
    return UnAuthorize(res);
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
    return NotFound("Patient is not found", res);
  }

  return res.send(patient);
}

export async function deletePatientHandler(req: Request, res: Response) {
  const userId = get(req, "user._id");
  const patientId = get(req, "params.patientId");

  const patient = await findPatient({ patientId });

  if (!patient) {
    return NotFound("Patient is not found", res);
  }

  if (String(patient.userId) !== String(userId)) {
    return UnAuthorize(res);
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
