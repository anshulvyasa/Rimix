import { NextRequest } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongoose";
import { jsonError, jsonOk, parseJson } from "@/lib/http";
import { Reminder } from "@/models/Reminder";

type RouteContext = {
  params: {
    id: string;
  };
};

type UpdateReminderBody = {
  title?: string;
  description?: string;
  date?: string | null;
  time?: string | null;
  category?: string;
  priority?: "low" | "medium" | "high";
  completed?: boolean;
};

async function getParams(context: any) {
  if (typeof context.then === "function") {
    return (await context).params;
  }
  return context.params;
}

export async function GET(_req: NextRequest, context: RouteContext | Promise<RouteContext>) {
  const params = await getParams(context);
  await connectToDatabase();

  const item = await Reminder.findById(params.id).lean();
  if (!item) return jsonError("Reminder not found", 404);

  return jsonOk(item);
}

export async function PUT(req: NextRequest, context: RouteContext | Promise<RouteContext>) {
  const params = await getParams(context);
  await connectToDatabase();

  const body = await parseJson<UpdateReminderBody>(req);
  if (!body) return jsonError("Invalid JSON body", 400);

  const update: Record<string, unknown> = {};
  if (typeof body.title === "string") update.title = body.title.trim();
  if (typeof body.description === "string") update.description = body.description;
  if (typeof body.date === "string" || body.date === null)
    update.date = body.date || undefined;
  if (typeof body.time === "string" || body.time === null)
    update.time = body.time || undefined;
  if (typeof body.category === "string") update.category = body.category;
  if (typeof body.priority === "string") update.priority = body.priority;
  if (typeof body.completed === "boolean") update.completed = body.completed;

  const item = await Reminder.findByIdAndUpdate(params.id, update, { new: true });
  if (!item) return jsonError("Reminder not found", 404);

  return jsonOk(item);
}

export async function PATCH(req: NextRequest, context: RouteContext | Promise<RouteContext>) {
  return PUT(req, context);
}

export async function DELETE(_req: NextRequest, context: RouteContext | Promise<RouteContext>) {
  const params = await getParams(context);
  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return jsonError("Invalid reminder ID format", 400);
  }

  try {
    const res = await Reminder.findByIdAndDelete(params.id);
    if (!res) return jsonError("Reminder not found", 404);
    return jsonOk({ deleted: true });
  } catch (error) {
    console.error("Error deleting reminder:", error);
    return jsonError("Failed to delete reminder", 500);
  }
}
