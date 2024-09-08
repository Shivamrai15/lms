"use server";

import { db } from "@/lib/db";

export const getAllCategories = async () => {
    try {
        
        const categories = await db.category.findMany({
            orderBy : {
                name : "asc"
            },
        });

        return categories;

    } catch (error) {
        return [];
    }
}