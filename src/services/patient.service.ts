import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Patient, { PatientDocument } from "../model/patient.model";

export function createPatient(input: DocumentDefinition<PatientDocument>) {
  return Patient.create(input);
}

export function findPatient(
  query: FilterQuery<PatientDocument>,
  options: QueryOptions = { lean: true }
) {
  return Patient.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<PatientDocument>,
  update: UpdateQuery<PatientDocument>,
  options: QueryOptions
) {
  return Patient.findOneAndUpdate(query, update, options);
}

export function deletePatient(query: FilterQuery<PatientDocument>) {
  return Patient.deleteOne(query);
}

export async function findPatients(query: FilterQuery<PatientDocument>) {
  return Patient.find(query).lean();
}
