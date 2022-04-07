import { object, string, array } from "yup";

const payload = {
  body: object({
    patientName: string().required("Patient name is required"),
    patientDob: string(),
    calendarIds: array().min(1).required(),
    patientPhone: string().required("Patient Phone is required"),
    refererDoctor: string(),
  }),
};

const params = {
  params: object({
    patientId: string().required("Patient Id is required"),
  }),
};

export const createPatientSchema = object({
  ...payload,
});

export const updatePatientSchema = object({
  ...params,
  ...payload,
});

export const deletePatientSchema = object({
  ...params,
});
