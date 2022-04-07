import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import UserGroup, { UserGroupDocument } from "../model/user_group.model";

export function findUserGroup(
  query: FilterQuery<UserGroupDocument>,
  options: QueryOptions = { lean: true }
) {
  return UserGroup.findOne(query, {}, options);
}

export function invitedUsers(
  query: FilterQuery<UserGroupDocument>,
  update: UpdateQuery<UserGroupDocument>,
  options: QueryOptions
) {
  return UserGroup.findOneAndUpdate(query, update, options);
}

export function createUserGroup(data: DocumentDefinition<UserGroupDocument>) {
  return UserGroup.create(data);
}
