"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";
import { cn } from "@/lib/utils";

interface PreviewProps {
    value: string | null; 
    className? : string;
}

const Preview = ({
    value,
    className
} : PreviewProps ) => {

    const editor = useCreateBlockNote({
        initialContent : value ? JSON.parse(value) : undefined,
    });

    return (
        <div className="bg-white">
            <BlockNoteView
                editor={editor}
                theme="light"
                editable={false}
                className={cn(className)}
            />
        </div>
    )
}

export default Preview;