"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";

import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Note } from "@prisma/client";
import { Pencil, Trash } from "lucide-react";
import { usePlayer } from "@/hooks/use-player";
import { NoteEditForm } from "../forms/note-edit.form";
import { useNotes } from "@/hooks/use-notes";
import { toast } from "sonner";
import axios from "axios";

interface NoteCardProps {
    note : Note;
    courseId : string;
    chapterId : string;
}

const timeStamp = (len: number) => {
    const min = Math.floor(len/60);
    const sec = len%60;
    return `${min}:${sec<10 ? "0" : ""}${sec}`;
}

const NoteCard = ({
    chapterId,
    courseId,
    note
} : NoteCardProps ) => {

    const Preview = useMemo(()=>dynamic(()=>import("@/components/utils/preview"), {ssr: false}), []);
    
    const [editing, setEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const { onSeek } = usePlayer();
    const { deleteNote } = useNotes();

    const onDelete = async ()=> {
        try {
            setIsLoading(true);
            await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/notes?id=${note.id}`);
            deleteNote(note.id);
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div className="w-full flex flex-col items-start gap-y-3">
            <div className="flex items-center justify-between w-full">
                <div className="space-y-1 flex flex-col">
                    <Badge 
                        className="w-fit cursor-default md:cursor-pointer"
                        onClick={()=>{
                            if (onSeek) {
                                onSeek(note.time)
                            }
                        }}
                    >
                        {timeStamp(note.time)}
                    </Badge>
                    <span className="text-xs text-zinc-500" >Last updated at {format(note.updatedAt, "hh:mm bb d MMM, yyy")}</span>
                </div>
                <div className="flex items-center gap-x-4">
                    <Button
                        className="h-8 w-8 p-1"
                        variant="secondary"
                        onClick={()=>setEditing((prev)=>!prev)}
                    >
                        <Pencil className="h-5 w-5 text-zinc-700"/>
                    </Button>
                    <Button 
                        className="h-8 w-8 p-1"
                        disabled={isLoading||editing}
                        onClick={onDelete}
                    >
                        <Trash className="h-5 w-5 text-zinc-100"/>
                    </Button>
                </div>
            </div>
            <div className="w-full">
                {
                    editing ? (
                        <NoteEditForm
                            chapterId={chapterId}
                            courseId={courseId}
                            note={note}
                            onCancel={()=>setEditing(false)}
                        />
                    ) : (
                        <Preview
                            value={note.note}
                            className="border-2 py-3 border-zinc-400 px-10"
                        />
                    )
                }
            </div>
        </div>
    )
}

export default NoteCard