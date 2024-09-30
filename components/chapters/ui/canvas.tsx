"use client";

import { Excalidraw } from "@excalidraw/excalidraw";
import "./style.css";

interface CanvasProps {
    chapterId: string;
}

export const Canvas = ({
    chapterId
} : CanvasProps ) => {


    return (
        <div className="h-full">
            <Excalidraw
                isCollaborating={false}
                theme="light"
            />
        </div>
    )
}
