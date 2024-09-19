"use client";

import {
    useEffect,
    useRef,
    useState
} from "react";
import { Categories } from "@/components/category/categories";
import { Features } from "@/components/utils/features";


export const FeatureSubPage = () => {

    const divRef = useRef<HTMLElement>(null);
    const [divHeight, setDivHeight] = useState(0);
    const [screenHeight, setScreenHeight] = useState(0);

    useEffect(() => {
        if (divRef.current) {
            setDivHeight(divRef.current.offsetHeight);
            setScreenHeight(window.innerHeight);
        }
        const handleResize = () => {
            setScreenHeight(window.innerHeight);
        };
      
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <section 
            ref={divRef}
            className="min-h-full bg-white sticky rounded-t-3xl md:rounded-t-[5rem] px-6 py-8 pb-12"
            style={{top : (-divHeight+screenHeight)}}
        >
            <div className="max-w-6xl w-full mx-auto">
                <Categories/>
                <Features />
            </div>   
        </section>
    )
}
