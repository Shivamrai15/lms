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


export const searchCourses = async(query: string)=>{
    try {
        
        const courses = await db.course.findMany({
            where : {
                title : {
                    contains : query,
                    mode : "insensitive"
                },
                isPublished : true
            },
        });

        return courses;

    } catch (error) {
        return [];
    }
}