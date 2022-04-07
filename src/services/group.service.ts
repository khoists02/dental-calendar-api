import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Group, { GroupDocument } from "../model/group.model";

export function createGroup(input: DocumentDefinition<GroupDocument>) {
  return Group.create(input);
}

export function findGroup(
  query: FilterQuery<GroupDocument>,
  options: QueryOptions = { lean: true }
) {
  return Group.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<GroupDocument>,
  update: UpdateQuery<GroupDocument>,
  options: QueryOptions
) {
  return Group.findOneAndUpdate(query, update, options);
}

export function deleteGroup(query: FilterQuery<GroupDocument>) {
  return Group.deleteOne(query);
}

export async function findGroups(query: FilterQuery<GroupDocument>) {
  return Group.find(query).lean();
}
