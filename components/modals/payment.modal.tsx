"use client";

import {
    useRouter,
    usePathname,
    useSearchParams,
} from "next/navigation";
import { useMemo } from "react";
import Lottie from "lottie-react";

import {
    Dialog,
    DialogContent
} from "@/components/ui/dialog";
import { LottieIcons } from "@/components/utils/lottie-icons";
import { Button } from "@/components/ui/button";


export const PaymentModal = () => {

    const pathname = usePathname();
    const router = useRouter()
    const searchParams = useSearchParams();
    const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;
    const pathRegex = /^\/course\/[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}\/view$/;

    const paymentId = searchParams.get("paymentId");
    
    const isPaymentDone = useMemo(()=>{
        if (paymentId && uuidRegex.test(paymentId) && pathRegex.test(pathname)) return true;
        return false;
    }, [pathname, searchParams, paymentId]);


    console.log(isPaymentDone)

    const handleClose = (open: boolean)=>{
        if (!open) {
            router.push(pathname);
        }
    }

    return (
        <Dialog
            open={isPaymentDone}
            onOpenChange={handleClose}
        >
            <DialogContent
                className="max-w-lg w-full"
            >
                <div className="flex flex-col items-center justify-center px-6 pb-4">
                    <div className="size-64">
                        <Lottie
                            animationData={LottieIcons.payment}
                            loop={false}
                        />
                    </div>
                    <div className="w-full space-y-6">
                        <p className="text-sm text-zinc-600 text-pretty text-center">
                            You&apos;ve made a great choice! Your course is now unlocked. Let&apos;s embark on this learning adventure together.
                        </p>
                        <Button
                            className="w-full rounded-md bg-neutral-900 hover:bg-neutral-900/80 focus-visible:ring-0 focus-visible:ring-offset-0"
                            onClick={()=>router.push(pathname)}
                        >
                            Continue
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
