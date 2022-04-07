import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";
import Calendar, { CalendarDocument } from "../model/calendar.model";

export function createCalendar(input: DocumentDefinition<CalendarDocument>) {
  return Calendar.create(input);
}

export function findCalendar(
  query: FilterQuery<CalendarDocument>,
  options: QueryOptions = { lean: true }
) {
  return Calendar.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<CalendarDocument>,
  update: UpdateQuery<CalendarDocument>,
  options: QueryOptions
) {
  return Calendar.findOneAndUpdate(query, update, options);
}

export function deleteCalendar(query: FilterQuery<CalendarDocument>) {
  return Calendar.deleteOne(query);
}

export async function findCalendars(query: FilterQuery<CalendarDocument>) {
  return Calendar.find(query).lean();
}
