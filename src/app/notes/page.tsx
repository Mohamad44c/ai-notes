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

  return <div>{JSON.stringify(allNotes)}</div>;
}
