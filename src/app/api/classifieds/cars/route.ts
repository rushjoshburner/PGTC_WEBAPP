import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const city = searchParams.get("city");
        const minYear = searchParams.get("minYear");
        const maxPrice = searchParams.get("maxPrice");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = 12;

        const where: Record<string, unknown> = {
            status: "ACTIVE",
            submissionStatus: "APPROVED",
        };

        if (city) {
            where.city = { contains: city };
        }

        if (minYear) {
            where.year = { gte: parseInt(minYear) };
        }

        if (maxPrice) {
            where.askingPrice = { lte: parseFloat(maxPrice) };
        }

        const [listings, total] = await Promise.all([
            prisma.carListing.findMany({
                where,
                include: {
                    seller: {
                        select: {
                            id: true,
                            fullName: true,
                            city: true,
                        },
                    },
                },
                orderBy: [
                    { isFeatured: "desc" },
                    { createdAt: "desc" },
                ],
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.carListing.count({ where }),
        ]);

        return NextResponse.json({
            listings,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error fetching car listings:", error);
        return NextResponse.json(
            { error: "Failed to fetch listings" },
            { status: 500 }
        );
    }
}
