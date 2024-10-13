"use client";

import { useEffect, useState } from 'react';
import { CertificateModal } from '@/components/modals/certificate.modal';
import { ReviewModal } from '@/components/modals/review.modal';

export const ModalProvider = () => {
    
    const [ isMounted, setIsMounted ] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    
    return (
        <>
            <CertificateModal />
            <ReviewModal />
        </>
    )
}
