const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        console.log("Attempting to connect to database...");

        // Test Read
        const countStart = await prisma.user.count();
        console.log(`Initial User Count: ${countStart}`);

        // Test Write
        const email = `test-verify-${Date.now()}@example.com`;
        console.log(`Attempting to create user: ${email}`);

        const newUser = await prisma.user.create({
            data: {
                email: email,
                password: "hashedpassword123",
                fullName: "Verification Bot",
                role: "USER"
            }
        });

        console.log("Write Successful! User ID:", newUser.id);

        // Cleanup
        await prisma.user.delete({ where: { id: newUser.id } });
        console.log("Cleanup Successful!");

    } catch (e) {
        console.error("Connection/Write Failed:", e);
    } finally {
        await prisma.$disconnect();
    }
}

main();
