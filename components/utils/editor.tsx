"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { cn } from "@/lib/utils";

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

    const editor = useCreateBlockNote({
        initialContent : value ? JSON.parse(value) : undefined,
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
