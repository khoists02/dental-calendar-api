import { object, array, string } from "yup";

const payload = {
  body: object({
    userIds: array(),
  }),
};

export const inviteUserGroupsSchema = object({
  ...payload,
});
