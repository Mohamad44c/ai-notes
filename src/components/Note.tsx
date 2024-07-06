"use client";

import { Note as NoteModel } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useState } from "react";
import AddEditNoteDialog from "./AddEditNoteDialog";

interface NoteProps {
  note: NoteModel;
}
export default function Note({ note }: NoteProps) {
  const [showEditDiaglog, setShowEditDiaglog] = useState<boolean>(false);

  const wasUpdated = note.updatedAt > note.createdAt;
  const createdUpdateAtTimestamp = (
    wasUpdated ? note.updatedAt : note.createdAt
  ).toDateString();

  return (
    <>
      <Card
        onClick={() => setShowEditDiaglog(true)}
        className="cursor-pointer transition-shadow hover:shadow-lg"
      >
        <CardHeader>
          <CardTitle>{note.title}</CardTitle>
          <CardDescription>
            {createdUpdateAtTimestamp}
            {wasUpdated && " (updated)"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-line">{note.content}</p>
        </CardContent>
      </Card>
      <AddEditNoteDialog
        open={showEditDiaglog}
        setOpen={setShowEditDiaglog}
        noteToEdit={note}
      />
    </>
  );
}
