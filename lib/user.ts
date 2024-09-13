import { db } from "./db";

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ 
            where: { id },
            include : {
                profile : {
                    select : {
                        id: true
                    }
                }
            }
        });
        return user;
    } catch {
        return null;
    }
};