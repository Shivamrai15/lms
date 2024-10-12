"use client";

import { useEffect, useState } from 'react';
import { CertificateModal } from '@/components/modals/certificate.modal';

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
        </>
    )
}
