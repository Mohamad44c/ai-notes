import prisma from "@/lib/db/prisma";
import {
  createNoteSchema,
  deleteNoteSchema,
  updateNoteSchema,
} from "@/lib/validation/note";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  try {
    const body = await req.json(); // contains the title and note content to be stored in the database
    const parseResult = createNoteSchema.safeParse(body); // will check if the req body adheres to the note schema

    if (!parseResult.success) {
      console.log(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { title, content } = parseResult.data;
    const { userId } = auth();

    if (!userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const note = await prisma.note.create({
      data: {
        title,
        content,
        userId,
      },
    });

    return Response.json({ note }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const parseResult = updateNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.log(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id, title, content } = parseResult.data;

    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }
    const { userId } = auth();

    if (!userId || userId !== note.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updatedNote = await prisma.note.update({
      where: { id },
      data: {
        title,
        content,
      },
    });

    return Response.json({ updatedNote }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const parseResult = deleteNoteSchema.safeParse(body);

    if (!parseResult.success) {
      console.log(parseResult.error);
      return Response.json({ error: "Invalid input" }, { status: 400 });
    }

    const { id } = parseResult.data;

    const note = await prisma.note.findUnique({ where: { id } });

    if (!note) {
      return Response.json({ error: "Note not found" }, { status: 404 });
    }
    const { userId } = auth();

    if (!userId || userId !== note.userId) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await prisma.note.delete({
      where: { id },
    });

    return Response.json({ message: "Note Deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
