
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function verifyLogin() {
    const email = 'test@gmail.com';
    const password = 'password123';

    console.log(`🔍 Checking login for: ${email}`);

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            console.error('❌ User NOT found in database.');
            return;
        }

        console.log(`✅ User found: ${user.fullName} (${user.id})`);
        console.log(`   Stored Hash: ${user.password.substring(0, 10)}...`);

        const isValid = await bcrypt.compare(password, user.password);

        if (isValid) {
            console.log('✅ Password Match! Login should work.');
        } else {
            console.error('❌ Password Mismatch!');
            console.log('   Re-hashing test password to see difference...');
            const newHash = await bcrypt.hash(password, 10);
            console.log(`   New Hash of 'password123': ${newHash.substring(0, 10)}...`);
        }

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await prisma.$disconnect();
    }
}

verifyLogin();
