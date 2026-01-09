
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth"; // Assuming authOptions is exported from here, need to verify path
import { z } from "zod";

// Schema for Event creation
const eventSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    date: z.string().or(z.date()), // Accept string from JSON, convert to Date
    location: z.string().min(2, "Location is required"),
    description: z.string().optional(),
    imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
    registrationLink: z.string().url("Invalid link URL").optional().or(z.literal("")),
    isActive: z.boolean().default(true),
});

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const showAll = searchParams.get("all") === "true";

        // If 'all' is not true, only show active events (for public frontend)
        const where = showAll ? {} : { isActive: true };

        const events = await prisma.event.findMany({
            where,
            orderBy: { date: "desc" },
        });

        return NextResponse.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        return NextResponse.json(
            { error: "Failed to fetch events" },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        // Check authentication and admin role
        // NOTE: We'll need to check the exact path for authOptions and session structure
        // For now, assuming basic session check. 
        // In a real app we'd check role === 'ADMIN' or 'MODERATOR'

        const session = await getServerSession(authOptions);

        // Strict Admin Check
        if (!session || !session.user || session.user.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized: Admins only" }, { status: 401 });
        }

        const body = await request.json();
        const validatedData = eventSchema.parse(body);

        const event = await prisma.event.create({
            data: {
                title: validatedData.title,
                date: new Date(validatedData.date),
                location: validatedData.location,
                description: validatedData.description,
                imageUrl: validatedData.imageUrl || null,
                registrationLink: validatedData.registrationLink || null,
                isActive: validatedData.isActive,
            },
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { error: "Validation failed", details: error.issues },
                { status: 400 }
            );
        }
        console.error("Error creating event:", error);
        return NextResponse.json(
            { error: "Failed to create event" },
            { status: 500 }
        );
    }
}
