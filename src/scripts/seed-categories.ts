import { categories } from "@/db/schema"
import { db } from "@/db"

const categoryNames = [
    "Cars and vehicles",
    "Comedy",
    "Education",
    "Gaming",
    "Entertainment",
    "Film and animation",
    "How-to and style",
    "Music",
    "News and politics",
    "People and blogs",
    "Pets and animals",
    "Science and technology",
    "Sports",
    "Travel and events"
]

async function main() {
    console.log("Sending categories...")

    try {
        const values = categoryNames.map((name)=>({
            name,
            description:`Videos related to ${name.toLowerCase()}`
        }))
        await db.insert(categories).values(values)
    } catch (error) {
        console.error("Error seeding categories:",error)
        process.exit(1);
        
    }
    
}

main()