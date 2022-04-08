import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { nanoid } from "nanoid";

export interface GroupDocument extends mongoose.Document {
  groupId: string;
  groupName: string;
  userOwner: UserDocument["_id"];
  userIds: string[];
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema = new mongoose.Schema(
  {
    groupId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(10),
    },
    userIds: { type: Array },
    userOwner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    groupName: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Group = mongoose.model<GroupDocument>("Group", GroupSchema);

export default Group;
