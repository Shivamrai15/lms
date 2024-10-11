"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import axios from 'axios';
import { toast } from 'sonner';
import { formatPrice } from '@/lib/format';
import { Button } from '../ui/button';

interface CourseEnrollButtonProps {
    price : number;
    courseId: string;
    disabled?: boolean;
    coupon?: string; 
}

export const CourseEnrollButton = ({
    courseId,
    price,
    coupon,
    disabled
} : CourseEnrollButtonProps) => {

    const router = useRouter();
    const session = useSession();
    const [loading, setLoading] = useState(false);

    const onClick = async()=>{

        if (session.status==="unauthenticated") {
            router.push("/login");
            return;
        }

        try {
            setLoading(true);
            const response =  await axios.post(`/api/courses/${courseId}/checkout`, { coupon : coupon });
            window.location.assign(response.data.url)
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <Button
            className='h-14 bg-green-600 hover:bg-green-600/90 rounded-none font-semibold'
            onClick={onClick}
            disabled = {loading || disabled}
        >
            Enroll for {formatPrice(price)}
        </Button>
    )
}
