"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { cn } from "@/lib/utils";
import { useEdgeStore } from "@/providers/edgestore.provider";

interface EditorProps {
    onChange : ( value: string )=>void;
    value: string;
    className? : string;   
}

const Editor = ({
    onChange,
    value,
    className
} : EditorProps ) => {

    const { edgestore } = useEdgeStore();

    const handleUpload = async (file: File) => {
        const res = await edgestore.publicFiles.upload({
            file
        });
        return res.url;
    }

    const editor = useCreateBlockNote({
        initialContent : value ? JSON.parse(value) : undefined,
        uploadFile : handleUpload
    });

    return (
        <div className={cn(
            "min-h-60 h-auto bg-white w-full",
            className
        )}>
            <BlockNoteView
                editor={editor}
                theme="light"
                onChange={()=>onChange(JSON.stringify(editor.document, null, 2))}
            />
        </div>
    )
}

export default Editor;
