"use client";

import { useState } from 'react';
import {
    MultiFileDropzone,
    type FileState,
  } from './multi-file-dropzone';
import { useEdgeStore } from '@/providers/edgestore.provider';

interface SongUploadProps {
    onChange : ( url : string ) => void;
    disabled : boolean;
}

export const FileUpload = ({
    onChange,
    disabled
} : SongUploadProps ) => {

    const [fileStates, setFileStates] = useState<FileState[]>([]);
    const { edgestore } = useEdgeStore();

    function updateFileProgress(key: string, progress: FileState['progress']) {
        setFileStates((fileStates) => {
        const newFileStates = structuredClone(fileStates);
        const fileState = newFileStates.find(
            (fileState) => fileState.key === key,
        );
        if (fileState) {
            fileState.progress = progress;
        }
        return newFileStates;
        });
    }

    return (
        <div>
            <MultiFileDropzone
                value={fileStates}
                disabled = {disabled}
                className='w-full'
                onChange={(files) => {
                setFileStates(files);
                }}
                onFilesAdded={async (addedFiles) => {
                setFileStates([...fileStates, ...addedFiles]);
                await Promise.all(
                    addedFiles.map(async (addedFileState) => {
                    try {
                        const res = await edgestore.publicFiles.upload({
                        file: addedFileState.file,
                        onProgressChange: async (progress) => {
                            updateFileProgress(addedFileState.key, progress);
                            if (progress === 100) {
                            await new Promise((resolve) => setTimeout(resolve, 1000));
                            updateFileProgress(addedFileState.key, 'COMPLETE');
                            }
                        },
                        });
                        onChange(res.url);
                        console.log(res);
                    } catch (err) {
                        updateFileProgress(addedFileState.key, 'ERROR');
                    }
                    }),
                );
                }}
            />
    </div>
    )

}