import 'dotenv/config'
import { PrismaClient } from '@/app/generated/prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const connectingString = process.env.DATABASE_URL || "file:./dev.db";

const prisma = new PrismaClient({
    adapter: new PrismaBetterSqlite3({url: connectingString})
})

async function main(){
    await prisma.healthCheck.create({
        data: {
            message: "Working"
        }
    })

    console.log('succesfully');
    
}

main()
    .catch((e)=>{
        console.log(e)
    }).finally(async()=>{
        await prisma.$disconnect()
    })