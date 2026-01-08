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

        const listings = await prisma.partsListing.findMany({
            include: {
                seller: {
                    select: { id: true, fullName: true, email: true },
                },
            },
            orderBy: { createdAt: "desc" },
            take: 100,
        });

        return NextResponse.json({ listings });
    } catch (error) {
        console.error("Error fetching parts listings:", error);
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
