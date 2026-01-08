import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();
        const { action } = body;

        if (!["approve", "reject"].includes(action)) {
            return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }

        const updateData = action === "approve"
            ? {
                submissionStatus: "APPROVED",
                status: "ACTIVE",
                approvedById: session.user.id,
                approvedAt: new Date(),
                expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
            }
            : {
                submissionStatus: "REJECTED",
                status: "REJECTED",
                rejectionReason: body.reason || "Does not meet listing requirements",
            };

        const car = await prisma.carListing.update({
            where: { id },
            data: updateData,
            select: { id: true, variant: true, submissionStatus: true },
        });

        return NextResponse.json({ car });
    } catch (error) {
        console.error("Error updating car listing:", error);
        return NextResponse.json({ error: "Failed to update" }, { status: 500 });
    }
}
