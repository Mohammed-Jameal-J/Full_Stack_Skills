import prisma from "@/lib/prisma";

async function main() {
    await prisma.user.upsert({
        where: { email: "jameal@gmail.com" },
        update: {},
        create: {
            email: "jameal@gmail.com",
            name: "Jameal"
        }

    })
    await prisma.user.upsert({
        where: { email: "anees@gmail.com" },
        update: {},
        create: {
            email: "anees@gmail.com",
            name: "Anees"
        }
    })
    console.log("seeding Complted");   
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })