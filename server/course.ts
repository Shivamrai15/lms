"use server";

import { db } from "@/lib/db";
import { Course } from "@/types";

export const getCourseById = async(id: string)=> {
    try {
        
        const course = await db.course.findUnique({
            where : {
                id
            },
            include : {
                chapters : {
                    orderBy : {
                        position : "asc" 
                    }
                },
                subCategory : {
                    include : {
                        category : true
                    }
                },
                coupons : {
                    orderBy : {
                        createdAt : "asc"
                    }
                }
            }
        });

        return course;

    } catch (error) {
        return null;
    }
}

export const getCourseByPublicId = async(id: string)=> {
    try {


        const [course, avgRating] = await Promise.all([
            (
                db.course.findUnique({
                    where : {
                        id
                    },
                    include : {
                        chapters : {
                            where : {
                                isPublished : true
                            },
                            orderBy : {
                                position : "asc" 
                            },
                            include : {
                                _count : {
                                    select : {
                                        attachments : true
                                    }
                                }
                            }
                        },
                        subCategory : {
                            include : {
                                category : true
                            }
                        },
                        tutor : {
                            select : {
                                id : true,
                                name : true,
                                image : true,
                                profile : {
                                    select : {
                                        description : true,
                                        headline: true
                                    }
                                },
                                _count :{
                                    select : {
                                        courses : true
                                    }
                                },
                                courses : {
                                    select : {
                                        _count : {
                                            select : {
                                                ratings : true,
                                                purchases : true
                                            }
                                        },
                                    },
                                }
                            }
                        },
                        _count : {
                            select : {
                                purchases : true,
                                ratings : true,
                            }
                        },
                        ratings : {
                            orderBy : {
                                createdAt : "desc"
                            },
                            include : {
                                user : {
                                    select : {
                                        name: true,
                                        image: true
                                    }
                                }
                            },
                            take: 6
                        }
                    }
                })
            ),
            (
                db.rate.aggregate({
                    where: {
                        courseId: id,
                    },
                    _avg: {
                        star: true,
                    },
                })
            )
        ])

        

        return {course, avgRating};

    } catch (error) {
        return {
            course: null,
            avgRating: null
        };
    }
}

export const getCourseAndProgress = async(id: string, userId: string)=> {
    try {
        
        const course = await db.course.findUnique({
            where : {
                id
            },
            include : {
                chapters : {
                    where : {
                        isPublished : true
                    },
                    include : {
                        userProgress : {
                            where : {
                                userId
                            }
                        }
                    },
                    orderBy : {
                        position : "asc" 
                    }
                },
            }
        });

        return course;

    } catch (error) {
        return null;
    }
}

export const getCoursesByTutorId = async (tutorId: string) => {
    try {
        
        const courses = await db.course.findMany({
            where : {
                tutorId
            },
            orderBy : {
                createdAt :"desc"
            }
        });

        return courses

    } catch (error) {
        return [];
    }
}

export const getUserCourses = async(userId: string)=> {
    try {
        
        const courses = await db.purchase.findMany({
            where : {
                userId
            },
            include : {
                course : {
                    include : {
                        ratings : {
                            where : {
                                userId
                            }
                        }
                    }
                }
            }
        });

        return courses;

    } catch (error) {
        return []
    }
}


export const getCoursesByCategoryId = async (categoryId: string) => {
    try {
        
        const courses = await db.subCategory.findUnique({
            where : {
                id : categoryId
            },
            include : {
                courses : true,
                category : true
            }
        });

        return courses

    } catch (error) {
        return null
    }
}


export const searchCourses = async(query: string) : Promise<Course[]> =>{
    try {

        const courses: any = await db.$queryRaw`
            SELECT 
                c.id AS id,
                c.title AS title,
                c.price AS price,
                c.image AS image,
                COUNT(p.id) AS total_purchases,
                COALESCE(AVG(r.star), 0) AS average_rating,
                t.name AS tutor_name
            FROM 
                "Course" c
            LEFT JOIN 
                "Purchase" p ON c.id = p."courseId"
            LEFT JOIN 
                "Rate" r ON c.id = r."courseId"
            LEFT JOIN 
                "User" t ON c."tutorId" = t.id
            WHERE 
                c."isPublished" = true
                AND c.title ILIKE ${`%${query}%`}
            GROUP BY 
                c.id, t.name
            ORDER BY 
                total_purchases DESC
            LIMIT 10;`

        const serializedCourses = courses.map((course: any) => ({
            ...course,
            total_purchases: Number(course.total_purchases),
        }));

        return serializedCourses


    } catch (error) {
        return [];
    }
}