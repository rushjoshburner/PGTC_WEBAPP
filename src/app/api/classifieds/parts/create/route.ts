import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const createListingSchema = z.object({
    title: z.string().min(5).max(100),
    category: z.enum(["ENGINE_PARTS", "BODY_PARTS", "INTERIOR", "ELECTRONICS", "WHEELS_TIRES", "OTHER"]),
    description: z.string().min(10).max(1000),
    price: z.number().min(0),
    city: z.string().min(2),
    state: z.string().optional(),
    images: z.string(), // JSON array
    contactPreference: z.enum(["PHONE", "EMAIL", "WHATSAPP"]).default("WHATSAPP"),
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
        const validatedData = createListingSchema.parse(body);

        // Calculate expiry date (90 days from now)
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 90);

        const listing = await prisma.partsListing.create({
            data: {
                ...validatedData,
                state: validatedData.state || "",
                sellerId: session.user.id,
                expiresAt,
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

        console.error("Error creating listing:", error);
        return NextResponse.json(
            { error: "Failed to create listing" },
            { status: 500 }
        );
    }
}
