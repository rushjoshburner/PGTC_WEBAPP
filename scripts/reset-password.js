
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetPassword() {
    const args = process.argv.slice(2);
    if (args.length !== 2) {
        console.log('Usage: node scripts/reset-password.js <email> <new_password>');
        process.exit(1);
    }

    const [email, password] = args;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        console.log(`✅ Password updated for ${user.email}`);
    } catch (error) {
        console.error('Error updating password:', error);
    } finally {
        await prisma.$disconnect();
    }
}

resetPassword();
