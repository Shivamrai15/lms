"use server";

import { db } from "@/lib/db";
import { Chapter } from "@prisma/client";

export const getChapterById = async(chapterId: string, courseId: string)=>{
    try {
        
        const chapter = await db.chapter.findUnique({
            where : {
                id : chapterId,
                courseId: courseId
            },
            include : {
                attachments: true,
                quiz : true
            }
        });

        return chapter;

    } catch (error) {
        return null;
    }
}

interface GetChapterProps {
    userId: string;
    courseId: string;
    chapterId : string;
}

export const getChapter = async({
    chapterId,
    courseId,
    userId
} : GetChapterProps)=> {
    try {
        
        const purchase = await db.purchase.findUnique({
            where : {
                userId_courseId : {
                    userId,
                    courseId
                }
            }
        });

        const course = await db.course.findUnique({
            where : {
                    isPublished : true,
                    id : courseId
            },
            select : {
                price : true,
                image : true,
                _count : {
                    select : {
                        purchases : true,
                        ratings : true
                    }
                },
                shortDescription : true,
                updatedAt : true,
                tutor : {
                    select : {
                        name : true,
                        image : true,
                        profile : {
                            select : {
                                description : true,
                                headline : true,
                                facebookLink : true,
                                githubLink : true,
                                websiteLink : true,
                                linkedinLink : true,
                                twitterLink : true,
                                youtubeLink : true
                            }
                        }
                    }
                }
            }
        });

        const chapter = await db.chapter.findUnique({
            where : {
                id: chapterId,
                isPublished :true
            },
            include : {
                attachments : true,
                notes : {
                    where : {
                        userId
                    },
                    orderBy : {
                        time : "asc"
                    }
                },
            }
        });

        let nextChapter : Chapter|null = null;

        if (!chapter || !course) {
            throw new Error("Chapter or course not found");
        }

        if (chapter.isFree || purchase) {
            nextChapter = await db.chapter.findFirst({
                where : {
                    courseId,
                    isPublished : true,
                    position : {
                        gt : chapter.position
                    }
                },
                orderBy : {
                    position : "asc"
                }
            });
        }

        const userProgress = await db.userProgress.findUnique({
            where : {
                userId_chapterId : {
                    userId,
                    chapterId
                }
            }
        });

        return  {
            chapter,
            course,
            nextChapter,
            userProgress,
            purchase
        }

    } catch (error) {
        return  {
            chapter : null,
            course : null,
            nextChapter : null,
            userProgress: null,
            purchase : null,
        }
    }
}


export const getQuiz = async(courseId: string, userId: string, chapterId: string)=>{
    try {
        
        const course = await db.course.findUnique({
            where : {
                id : courseId,
                tutorId : userId
            },
            select : {
                id : true
            }
        });

        if (!course) {
            return null;
        }

        const quiz = await db.quiz.findUnique({
            where : {
                chapterId
            },
            include : {
                questions : {
                    include : {
                        options : {
                            orderBy : {
                                createdAt : "asc"
                            }
                        }
                    },
                    orderBy : {
                        position : "asc"
                    }
                }
            }
        });

        return quiz;

    } catch (error) {
        return null 
    }
}