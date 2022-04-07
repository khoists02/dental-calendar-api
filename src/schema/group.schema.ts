import { object, string, bool, number } from "yup";

const payload = {
  body: object({
    groupName: string().required("GroupName is required"),
    status: string().required("Status is required").default("TRIAL"),
    active: bool(),
    expiredAt: string(),
    number: number(),
  }),
};

const params = {
  params: object({
    groupId: string().required("GroupId is required"),
  }),
};

export const createGroupSchema = object({
  ...payload,
});

export const updateGroupSchema = object({
  ...params,
  ...payload,
});

export const deleteGroupSchema = object({
  ...params,
});
