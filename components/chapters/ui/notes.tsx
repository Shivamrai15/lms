"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon } from "lucide-react";
import { NotesForm } from "../forms/notes.form";
import { useNotes } from "@/hooks/use-notes";
import NoteCard from "./note-card";
import Image from "next/image";


interface NotesProps {
    chapterId: string;
    courseId: string;
}

export const Notes = ({
    chapterId,
    courseId
} : NotesProps ) => {

    const { notes, createNote } = useNotes();
    
    const [isCreating, setIsCreating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    return (
        <div className="w-full pt-6 pb-10 px-6">
            <div className="max-w-3xl w-full mx-auto">
                <div className="w-full">
                    {
                        isCreating ? (
                            <NotesForm
                                addNote={createNote}
                                onCancel={()=>setIsCreating(false)}
                                chapterId={chapterId}
                                courseId={courseId}
                            />
                        ) : (
                            <Button
                                className="w-full h-12 rounded-none border-2 border-zinc-400 font-semibold text-zinc-700 justify-between"
                                variant="outline"
                                onClick={()=>setIsCreating(true)}
                            >
                                <span>
                                    Create your note
                                </span>
                                <PencilIcon className="h-5 w-5"/>
                            </Button>
                        )
                    }
                </div>
                {
                    !!notes.length ? (
                        <div className="space-y-8 mt-20">
                            <h1 className="mb-6 text-xl md:text-3xl font-bold text-zinc-800">Your Notes</h1>
                            {notes.map((note)=>(
                                <NoteCard
                                    chapterId={chapterId}
                                    courseId={courseId}
                                    note={note}
                                    key={note.id}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="w-full flex items-center justify-center">
                            <div className="relative max-w-md w-full aspect-square">
                                <Image
                                    src="/assets/3841705_80457.svg"
                                    fill
                                    alt=""
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    )
                }
            </div>

        </div>
    )
}
