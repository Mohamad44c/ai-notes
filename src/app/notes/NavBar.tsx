"use client";

import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import AddNoteDialog from "@/components/AddEditNoteDialog";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import AIChatButton from "@/components/AIChatButton";
export default function NavBar() {
  const { theme } = useTheme();

  const [showAddEditNoteDialog, setshowAddEditNoteDialog] =
    useState<boolean>(false);

  return (
    <>
      <div className="p-4 shadow">
        <div className="m-auto flex max-w-7xl flex-wrap items-center justify-between gap-3">
          <Link href="/notes" className="flex items-center gap-1">
            <Image src={logo} alt="FlowBrain Logo" width={40} height={40} />
            <span className="font-bold">FlowBrain</span>
          </Link>
          <div className="flex items-center gap-4">
            <Button onClick={() => setshowAddEditNoteDialog(true)}>
              <Plus size={20} className="mr-2" />
              Add Note
            </Button>
            <AIChatButton />
            <ThemeToggleButton />
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                baseTheme: theme === "dark" ? dark : undefined,
                elements: { avatarBox: { width: "2.5rem", height: "2.5rem" } },
              }}
            />
          </div>
        </div>
      </div>
      <AddNoteDialog
        open={showAddEditNoteDialog}
        setOpen={setshowAddEditNoteDialog}
      />
    </>
  );
}
