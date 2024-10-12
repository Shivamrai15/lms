"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import {
    Dialog,
    DialogContent,
} from "@/components/ui/dialog"
import { useCertificate } from "@/hooks/use-certificate-modal";
import { Button } from "@/components/ui/button";

export const CertificateModal = () => {
    
    const router = useRouter();
    const { certificateId, isOpen, onClose } = useCertificate();
    
    const onOpenChange = (open: boolean)=>{
        if (!open) {
            onClose();
        }
    }

    return (
        <Dialog
            open={isOpen}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="rounded-xl md:rounded-2xl">
                <div className="w-full py-6">
                    <div className="aspect-square w-64 relative mx-auto">
                        <Image
                            src="/assets/13923470_04_13_21_04.svg"
                            fill
                            alt=""
                            className="object-contain"
                        />
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-center font-bold text-zinc-700 text-xl">Congratulations</h1>
                        <p className="text-sm text-zinc-500 font-medium text-center">You have successfully completed this course</p>
                        <Button
                            className="w-full focus:outline-none outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
                            type="button"
                            onClick={()=>{
                                router.push(`/certificate/${certificateId}`);
                                onClose();
                            }}
                        >
                            Go to Certificate
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
