"use server";

import { db } from "@/lib/db";

export const getUserProfile = async(userId: string )=>{
    try {
        
        const profile = await db.user.findUnique({
            where: {
                id : userId
            },
            select : {
                name : true,
                profile : {
                    select : {
                        headline : true,
                        description : true,
                        dob : true,
                        gender : true
                    }
                }
            }
        });

        return profile;

    } catch (error) {
        return null;
    }
}