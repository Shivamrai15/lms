"use server";

import { db } from "@/lib/db";
import { getUserProgressCount } from "./progress";
import { Course, SubCategory } from "@prisma/client";
import { addDays, format, subDays } from 'date-fns';



type CoursesWithProgressAndCategory = Course & {
    subCategory : SubCategory;
    _count: {
        chapters: number;
    };
    progress : number|null
}

type DashboardCourses = {
    completedCourses : CoursesWithProgressAndCategory[];
    coursesInProgress :CoursesWithProgressAndCategory[];
}

export const getDashboardCourses = async (userId: string):Promise<DashboardCourses> => {
    try {
        
        const purchasedCourses = await db.purchase.findMany({
            where : {
                userId
            },
            select : {
                course : {
                    include : {
                        subCategory: true,
                        _count : {
                            select : {
                                chapters : {
                                    where : {
                                        isPublished : true
                                    }
                                }
                            }
                        }
                    },
                }
            }
        });


        const courses = purchasedCourses.map((purchase)=>purchase.course) as CoursesWithProgressAndCategory[] ;
        await Promise.all(courses.map(async(course)=>{
            const progress = await getUserProgressCount(userId, course.id);
            course["progress"] = progress;
        }));

        const completedCourses = courses.filter((courses)=>courses.progress===100);
        const coursesInProgress = courses.filter((courses)=>(courses.progress ?? 0) < 100 );
        
        return {
            completedCourses,
            coursesInProgress
        }

    } catch (error) {
        console.error("DASHBOARD SERVER API ERROR", error);
        return {
            completedCourses : [],
            coursesInProgress : [],
        }
    }
}

export type ChapterCompletion = {
    day: string;
    chapters: number;
};

export const chaptersCompletedInPast = async (userId: string)=>{
    try {
        
        const sevenDaysAgo = subDays(new Date(), 7);
        const completedChapters = await db.userProgress.findMany({
            where: {
                userId: userId,
                isCompleted: true,
                updatedAt: {
                    gte: sevenDaysAgo,
                },
            },
            orderBy: {
                updatedAt: 'asc',
            },
        });


        const groupedByDate = completedChapters.reduce<Record<string, number>>((acc, record) => {
            const date = record.updatedAt.toISOString().split('T')[0]; // Extract the date part (YYYY-MM-DD)
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += 1;
            return acc;
        }, {});

        const result: ChapterCompletion[] = [];

        for (let i = 0; i <= 7; i++) {
            const currentDate = addDays(sevenDaysAgo, i);
            const day = format(currentDate, 'EEE');
            const dateKey = format(currentDate, 'yyyy-MM-dd');
        
            result.push({
              day,
              chapters: groupedByDate[dateKey] || 0,
            });
        }
        return result;


    } catch (error) {
        console.error("DASHBOARD SERVER API ERROR", error);
        return null;
    }
}


export type TimeSpent = {
    day: string;
    time: number;
};

export const timeSpendByUser = async(userId: string) => {
    try {
        
        const today = new Date();
        const sevenDaysAgo = subDays(today, 7);
        const userProgress = await db.userProgress.findMany({
            where: {
                userId: userId,
                isCompleted: true,
                updatedAt: {
                    gte: sevenDaysAgo,
                },
            },
            include: {
                chapter: {
                    select : {
                        id: true,
                        duration: true
                    }
                },
            },
            orderBy: {
                updatedAt: 'asc',
            },
        });

        const groupedByDate = userProgress.reduce<Record<string, number>>((acc, record) => {
            const date = record.updatedAt.toISOString().split('T')[0];
            const duration = record.chapter.duration || 0;
            if (!acc[date]) {
                acc[date] = 0;
            }
            acc[date] += duration;
            return acc;
        }, {});

        const result: TimeSpent[] = [];

        for (let i = 0; i <= 7; i++) {
            const currentDate = addDays(sevenDaysAgo, i);
            const day = format(currentDate, 'EEE');
            const dateKey = format(currentDate, 'yyyy-MM-dd');

            result.push({
                day,
                time: ((groupedByDate[dateKey] || 0)/3600),
            });
        }

        return result;

    } catch (error) {
        return null;
    }
}