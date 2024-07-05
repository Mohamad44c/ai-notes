import Note from "@/components/Note";
import prisma from "@/lib/db/prisma";
import { auth } from "@clerk/nextjs/server";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FlowBrain - Notes",
};

export default async function page() {
  const { userId } = auth();

  if (!userId) throw Error("User not defined");

  const allNotes = await prisma.note.findMany({ where: { userId } }); // only fetch notes of the authenticated user

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {allNotes.map((note) => (
        <Note key={note.id} note={note} />
      ))}
      {allNotes.length === 0 && (
        <div className="col-span-full text-center text-xl">
          {"No notes yet!"}
        </div>
      )}
    </div>
  );
}
