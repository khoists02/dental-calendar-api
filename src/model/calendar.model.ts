import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { GroupDocument } from "./group.model";
import { nanoid } from "nanoid";

export interface CalendarDocument extends mongoose.Document {
  calendarId: string;
  user: UserDocument["_id"];
  group: GroupDocument["_id"];
  title: string;
  description: string;
  status: "PENDING" | "REJECT" | "DONE";
  startAt: Date;
  endAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const CalendarSchema = new mongoose.Schema(
  {
    calendarId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(20),
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    group: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, default: "PENDING" },
    startAt: { type: Date },
    endAt: { type: String },
  },
  { timestamps: true }
);

const Calendar = mongoose.model<CalendarDocument>("Calendar", CalendarSchema);

export default Calendar;
