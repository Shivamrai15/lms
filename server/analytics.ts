import { db } from "@/lib/db";
import { Course, Purchase } from "@prisma/client";

type PurchaseWithCourse =  Purchase & {
    course : Course;
}

export const groupByCourse = ( purchases : PurchaseWithCourse[] )=>{
    const grouped : { [courseTitle: string]: number} = {};
    purchases.forEach((purchase)=>{
        const courseTitle = purchase.course.title
        if (!grouped[courseTitle]) {
            grouped[courseTitle] = 0;
        }
        grouped[courseTitle] += purchase.course.price!;
    });


    return grouped;
}


export const getAnalytics = async ( tutorId: string ) => {
    try {
        
        const purchases = await db.purchase.findMany({
            where : {
                course : {
                    tutorId
                }
            },
            include : {
                course : true
            }
        });

        const groupedEarning = groupByCourse(purchases);
        const data = Object.entries(groupedEarning).map(([courseTitle, total])=>({name: courseTitle, total}));


        const totalRevenue = data.reduce((acc, curr)=>{
            return acc+curr.total
        }, 0);

        const totalSales = purchases.length;

        return {
            data,
            totalRevenue,
            totalSales
        }

    } catch (error) {
        console.error("ANALYTICS API ERROR", error);
        return {
            data : [],
            totalRevenue : 0,
            totalSales : 0
        };
    }
}