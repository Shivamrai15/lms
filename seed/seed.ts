const { PrismaClient } = require("@prisma/client");
// import { PrismaClient } from "@prisma/client";

const database = new PrismaClient();

async function main () {
    try {
        
        const categories = [
            { name : "Development" },
            { name : "Business" },
            { name : "Design" },
            { name : "Finance & Accounting" },
            { name : "Marketing" }
        ];

        const subcategories = [
            { 
                name: "Development", 
                sub: [
                    { name: "Web Development" },
                    { name: "Data Science" },
                    { name: "Mobile Development" },
                    { name: "Programming Languages" },
                    { name: "Database Design" }
                ] 
            },
            { 
                name: "Business", 
                sub: [
                    { name: "Entrepreneurship" },
                    { name: "Management & Leadership" },
                    { name: "Business Strategy" },
                    { name: "Operations" },
                    { name: "Project Management" }
                ] 
            },
            { 
                name: "Design", 
                sub: [
                    { name: "Graphic Design" },
                    { name: "User Experience (UX) Design" },
                    { name: "User Interface (UI) Design" },
                    { name: "Web Design" },
                    { name: "3D & Animation" }
                ] 
            },
            { 
                name: "Finance & Accounting", 
                sub: [
                    { name: "Financial Management" },
                    { name: "Investing & Trading" },
                    { name: "Corporate Finance" },
                    { name: "Accounting Fundamentals" },
                    { name: "Taxation" }
                ] 
            },
            { 
                name: "Marketing", 
                sub: [
                    { name: "Digital Marketing" },
                    { name: "Content Marketing" },
                    { name: "Branding" },
                    { name: "Social Media Marketing" },
                    { name: "SEO (Search Engine Optimization)" }
                ] 
            }
        ];

        await database.category.createMany({
            data : categories
        });

        const catRes = await database.category.findMany({});

        await Promise.all(subcategories.map(async(sub)=>{
            const cat = catRes.find((cat)=>cat.name === sub.name);
            if (cat) {

                const data = sub.sub.map((item)=>({
                    categoryId : cat.id,
                    name : item.name
                }));

                return (await database.subCategory.createMany({
                    data : data
                }));
            }
        }));

        console.log("Successfully seeded");

    } catch (error) {
        console.log("SEEDING ERROR")
    } finally {
        await database.$disconnect();
    }
}

main();