"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import 'react-quill/dist/quill.snow.css';

interface PreviewProps {
    value: string;   
}

export const Preview = ({
    value
} : PreviewProps ) => {

    const ReactQuill = useMemo(()=>dynamic(()=>import("react-quill"), {ssr:false}), []);

    return (
        <div className="bg-white">
            <ReactQuill
                theme="snow"
                style={{ border: 'none' }}
                readOnly
                defaultValue={value}
                modules={{ toolbar: false }}
            />
        </div>
    )
}