import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createCarListingSchema = z.object({
    variant: z.string().min(2),
    year: z.number().min(2010).max(2026),
    kilometers: z.number().min(0),
    registrationNumber: z.string().min(4),
    ownership: z.enum(["FIRST", "SECOND", "THIRD_PLUS"]),
    askingPrice: z.number().min(10000),
    city: z.string().min(2),
    state: z.string().min(2),
    description: z.string().min(10),
    images: z.string(), // JSON array
    modifications: z.string().optional(),
    serviceHistory: z.string().optional(),
});

export async function POST(request: NextRequest) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Check if user is a member
        const user = await prisma.user.findUnique({
            where: { id: session.user.id },
            include: { memberships: { where: { status: "ACTIVE" } } },
        });

        if (!user || user.role === "USER" && user.memberships.length === 0) {
            return NextResponse.json(
                { error: "Membership required to post listings" },
                { status: 403 }
            );
        }

        const body = await request.json();
        const validatedData = createCarListingSchema.parse(body);

        // Calculate expiry date (90 days from now)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 90);

        const listing = await prisma.carListing.create({
            data: {
                ...validatedData,
                sellerId: session.user.id,
                expiresAt,
                // Default values
                status: "ACTIVE", // Auto-approve for now or PENDING if moderation needed
                submissionStatus: "APPROVED", // We'll auto-approve for this demo
                isFeatured: false,
                isHotDeal: false,
            },
        });

        return NextResponse.json(
            { message: "Listing created successfully", listing },
            { status: 201 }
        );
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation failed", details: error.issues },
                { status: 400 }
            );
        }

        console.error("Error creating car listing:", error);
        return NextResponse.json(
            { error: "Failed to create listing" },
            { status: 500 }
        );
    }
}
