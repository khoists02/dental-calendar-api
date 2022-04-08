import { array, object, string } from "yup";

const payload = {
  body: object({
    groupName: string().required("GroupName is required"),
    userIds: array(),
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
