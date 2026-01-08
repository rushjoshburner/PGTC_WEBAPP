import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const [cars, parts] = await Promise.all([
            prisma.carListing.findMany({
                where: { sellerId: session.user.id },
                orderBy: { createdAt: "desc" },
            }),
            prisma.partsListing.findMany({
                where: { sellerId: session.user.id },
                orderBy: { createdAt: "desc" },
            }),
        ]);

        return NextResponse.json({
            cars,
            parts,
        });
    } catch (error) {
        console.error("Error fetching user listings:", error);
        return NextResponse.json(
            { error: "Failed to fetch listings" },
            { status: 500 }
        );
    }
}
