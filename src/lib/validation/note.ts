import { z } from "zod";

export const createNoteSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }), // custom error message to be displayed on the frontend
  content: z.string().optional(),
});

export type CreateNoteSchema = z.infer<typeof createNoteSchema>;
