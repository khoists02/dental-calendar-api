import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { nanoid } from "nanoid";

export interface GroupDocument extends mongoose.Document {
  groupId: string;
  groupName: string;
  user: UserDocument["_id"];
  active: boolean;
  expiredAt: string;
  status: "ACTIVATED" | "EXPIRED" | "TRIAL";
  number: number;
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
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    groupName: { type: String },
    active: { type: Boolean, default: false },
    status: { type: String, default: "TRIAL" },
    expiredAt: { type: String },
    number: { type: Number },
  },
  { timestamps: true }
);

const Group = mongoose.model<GroupDocument>("Group", GroupSchema);

export default Group;
