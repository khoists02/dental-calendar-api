import { object, string } from "yup";

const payload = {
  body: object({
    patientName: string().required("Patient name is required"),
    patientDob: string(),
    calendarId: string().required("Calendar not found !!!"),
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
