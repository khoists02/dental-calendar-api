import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { GroupDocument } from "./group.model";

export interface UserGroupDocument extends mongoose.Document {
  userOwner: UserDocument["_id"];
  groupId: string;
  userIds: [UserDocument["_id"]];
  createdAt: Date;
  updatedAt: Date;
}

const UserGroupSchema = new mongoose.Schema(
  {
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    groupId: { type: String },
    userIds: { type: [mongoose.Schema.Types.ObjectId] },
  },
  {
    timestamps: true,
  }
);

const UserGroup = mongoose.model<UserGroupDocument>(
  "UserGroup",
  UserGroupSchema
);

export default UserGroup;
