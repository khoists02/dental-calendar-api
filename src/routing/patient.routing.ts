import { Express } from "express";
import {
  createPatientHandler,
  deletePatientHandler,
  getPatientHandler,
  getPatientsHandler,
  updatePatientHandler,
} from "../controller/patient.controller";
import { requiresUser, validateRequest } from "../middleware";
import {
  createPatientSchema,
  deletePatientSchema,
  updatePatientSchema,
} from "../schema/patient.schema";
const PatientRoute = (app: Express) => {
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
};

export default PatientRoute;
