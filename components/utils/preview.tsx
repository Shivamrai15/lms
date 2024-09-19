"use client";

import { useCreateBlockNote } from "@blocknote/react";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

interface PreviewProps {
    value: string;   
}

const Preview = ({
    value
} : PreviewProps ) => {

    const editor = useCreateBlockNote({
        initialContent : value ? JSON.parse(value) : undefined,
    });

    return (
        <div className="min-h-60 h-auto bg-white">
            <BlockNoteView
                editor={editor}
                theme="light"
                editable={false}
            />
        </div>
    )
}

export default Preview;