"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Circle, CircleCheck } from "lucide-react";


export const RoleForm = () => {

    const router = useRouter();
    const [role, setRole] = useState<"LEARNER"|"TUTOR">("LEARNER");
    const [isLoading, setIsLoading] = useState(false);

    const onSumbit = async()=>{
        try {
            setIsLoading(true)
            await axios.patch("/api/user/role", {role});
            router.refresh();
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col items-center justify-center py-20 gap-y-8 px-6">
            <div className="w-40 aspect-square shrink-0 relative">
                <Image
                    src={ role==="LEARNER" ? "/assets/student.png" : "/assets/teacher.png"}
                    alt="Image"
                    fill
                    className="object-contain"
                />
            </div>
            <h1 className="text-xl md:text-3xl font-bold text-zinc-700">
                Select your role
            </h1>
            <div className="space-y-3 flex flex-col">
                <Button 
                    className="h-14 w-72 md:w-96 rounded-none border-zinc-800 border-2 text-lg font-semibold text-zinc-700 justify-start"
                    variant="outline"
                    onClick={()=>setRole("LEARNER")}
                    disabled={isLoading}
                >
                    {role === "LEARNER" ? <CircleCheck/> : <Circle/>}
                    <span className="ml-4">Student</span>
                </Button>
                <Button 
                    className="h-14 w-72 md:w-96 rounded-none border-zinc-800 border-2 text-lg font-semibold text-zinc-700 justify-start"
                    variant="outline"
                    onClick={()=>setRole("TUTOR")}
                    disabled={isLoading}
                >
                    {role === "TUTOR" ? <CircleCheck/> : <Circle/>}
                    <span className="ml-4">Tutor</span>
                </Button>
            </div>
            <Button 
                className="h-14 w-72 md:w-96 bg-neutral-800 hover:bg-neutral-700 rounded-none text-lg font-semibold"
                variant="default"
                onClick={onSumbit}
                disabled={isLoading}
            >
                Next
            </Button>
        </div>
    )
}
