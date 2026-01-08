import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get stats
        const [
            totalUsers,
            activeMembers,
            partsListings,
            pendingCars,
            totalOrders,
        ] = await Promise.all([
            prisma.user.count(),
            prisma.membership.count({ where: { status: "ACTIVE" } }),
            prisma.partsListing.count({ where: { status: "AVAILABLE" } }),
            prisma.carListing.count({ where: { submissionStatus: "PENDING" } }),
            prisma.order.count(),
        ]);

        // Calculate monthly revenue (simplified - sum of membership amounts this month)
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);

        const memberships = await prisma.membership.findMany({
            where: {
                createdAt: { gte: startOfMonth },
            },
            select: { amount: true },
        });

        const monthlyRevenue = memberships.reduce((sum, m) => sum + m.amount, 0);

        return NextResponse.json({
            totalUsers,
            activeMembers,
            totalListings: partsListings,
            pendingApprovals: pendingCars,
            totalOrders,
            monthlyRevenue,
        });
    } catch (error) {
        console.error("Error fetching admin stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch stats" },
            { status: 500 }
        );
    }
}
