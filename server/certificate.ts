"use server";

import { db } from "@/lib/db";

export const getCertificateById = async(id: string)=>{
    try {
        
        const certificate = await db.cerificate.findUnique({
            where : {
                id 
            },
            include : {
                user : {
                    select : {
                        name : true,
                        id : true
                    }
                },
                course : {
                    select : {
                        title : true,
                        tutor : {
                            select : {
                                name : true
                            }
                        }
                    }
                }
            }
        });

        return certificate;

    } catch (error) {
        console.error("CERTIFICATE SERVER API ERRRO", error);
        return null;
    }
}