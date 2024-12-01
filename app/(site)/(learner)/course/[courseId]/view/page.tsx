"use client";

import { LottieIcons } from "@/components/utils/lottie-icons";
import Lottie from "lottie-react";


const ViewCoursePage = () => {
    return (
        <div className='h-full w-full flex items-center justify-center'>
            <div className='max-w-md w-full aspect-square relative'>
                <Lottie
                    animationData={LottieIcons.study}
                />
            </div>
        </div>
    )
}

export default ViewCoursePage