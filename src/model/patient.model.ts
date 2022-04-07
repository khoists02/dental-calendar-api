import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { CalendarDocument } from "./calendar.model";
import { UserDocument } from "./user.model";

export interface PatientDocument extends mongoose.Document {
  patientId: string;
  patientName: string;
  patientDob: Date;
  patientPhone: string;
  refererDoctor: string;
  calendarId: CalendarDocument["_id"];
  userId: UserDocument["_id"];
  createdAt: Date;
  updatedAt: Date;
}

const PatientSchema = new mongoose.Schema(
  {
    patientId: {
      type: String,
      required: true,
      unique: true,
      default: () => nanoid(20),
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    calendarId: { type: mongoose.Schema.Types.ObjectId, ref: "Calendar" },
    patientName: { type: String },
    patientPhone: { type: String },
    refererDoctor: { type: String },
    patientDob: { type: Date },
  },
  { timestamps: true }
);

const Patient = mongoose.model<PatientDocument>("Patient", PatientSchema);

export default Patient;
