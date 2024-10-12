"use client";

import { Button } from "@/components/ui/button";

interface DownloadCertificateButtonProps {
    certificateId: string;
    certificate : string;
    disabled : boolean;
}


export const DownloadCertificateButton = ({
    certificate,
    certificateId,
    disabled
} : DownloadCertificateButtonProps ) => {
    
    const downloadSVG = () => {
        const blob = new Blob([certificate], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);
    
        const link = document.createElement('a');
        link.href = url;
        link.download = `LC-${certificateId}.svg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };
    
    return (
        <Button
            disabled={disabled}
            variant="secondary"
            onClick={downloadSVG}
        >
            Download
        </Button>
    )
}
