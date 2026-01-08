
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === 'list') {
        const users = await prisma.user.findMany({
            select: { id: true, email: true, fullName: true, role: true }
        });
        console.log('--- Registered Users ---');
        if (users.length === 0) {
            console.log('No users found.');
        } else {
            users.forEach(u => console.log(`${u.id} | ${u.email} | ${u.fullName} | ${u.role}`));
        }
        console.log('------------------------');
    } else if (command === 'promote') {
        const email = args[1];
        if (!email) {
            console.log('Please provide an email to promote: node make-admin.js promote <email>');
            return;
        }
        try {
            const user = await prisma.user.update({
                where: { email },
                data: { role: 'ADMIN' }
            });
            console.log(`Successfully promoted ${user.email} to ADMIN.`);
        } catch (e) {
            console.error('Error promoting user:', e.meta?.cause || e.message);
        }
    } else {
        console.log('Usage:');
        console.log('  node scripts/make-admin.js list');
        console.log('  node scripts/make-admin.js promote <email>');
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => await prisma.$disconnect());
