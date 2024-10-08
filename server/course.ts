"use server";

import { db } from "@/lib/db";

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
        
        const course = await db.course.findUnique({
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
                                description : true
                            }
                        }
                    }
                },
                _count : {
                    select : {
                        purchases : true,
                        ratings : true,
                    }
                }
            }
        });

        return course;

    } catch (error) {
        return null;
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