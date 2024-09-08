"use server";

import { db } from "@/lib/db";

export const seed = async () => {
    try {

        const data = [
            {name : "Development"},
            {name : "Business"},
            {name : "Design"},
            {name : "Marketing"},
            {name : "Finance & Accounting"},
            {name : "IT & Software"},
        ];

        await db.category.createMany({
            data
        });

    } catch (error) {
        console.log("Error");
    }
}