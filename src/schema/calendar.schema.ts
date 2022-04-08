import { object, string, date } from "yup";

const payload = {
  body: object({
    title: string().required("Title is required"),
    description: string(),
    patientId: string(),
    status: string().default("PENDING"),
    startAt: date().required("Start At is Required !"),
    endAt: date().required("End At is Required !"),
  }),
};

const params = {
  params: object({
    groupId: string().required("GroupId is required"),
  }),
};

export const createCalendarSchema = object({
  ...payload,
});

export const updateCalendarSchema = object({
  ...params,
  ...payload,
});

export const deleteCalendarSchema = object({
  ...params,
});
