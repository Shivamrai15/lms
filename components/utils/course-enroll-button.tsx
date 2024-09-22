"use client";
import { formatPrice } from '@/lib/format';
import { Button } from '../ui/button';
import { useState } from 'react';
import axios from 'axios';

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

    const [loading, setLoading] = useState(false);

    const onClick = async()=>{
        try {
            setLoading(true);
            await axios.post(`/api/courses/${courseId}/checkout`)
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <Button
            className='h-14 bg-violet-600 hover:bg-violet-700/90 rounded-none font-semibold'
            onClick={onClick}
            disabled = {loading || disabled}
        >
            Enroll for {formatPrice(price)}
        </Button>
    )
}
