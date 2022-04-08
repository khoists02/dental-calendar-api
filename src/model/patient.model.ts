import mongoose from "mongoose";
import { nanoid } from "nanoid";
import { UserDocument } from "./user.model";

export interface PatientDocument extends mongoose.Document {
  patientId: string;
  patientName: string;
  patientDob: Date;
  patientPhone: string;
  refererDoctor: string;
  userId: UserDocument["_id"];
  groupId: string;
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
    groupId: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    patientName: { type: String },
    patientPhone: { type: String },
    refererDoctor: { type: String },
    patientDob: { type: Date },
  },
  { timestamps: true }
);

const Patient = mongoose.model<PatientDocument>("Patient", PatientSchema);

export default Patient;
