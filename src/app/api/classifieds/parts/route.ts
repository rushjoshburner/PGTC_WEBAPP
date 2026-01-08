import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET all parts listings (public)
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get("category");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");
        const city = searchParams.get("city");
        const search = searchParams.get("search");
        const page = parseInt(searchParams.get("page") || "1");
        const limit = 12;

        const where: Record<string, unknown> = {
            status: "AVAILABLE",
        };

        if (category) {
            where.category = category;
        }

        if (minPrice || maxPrice) {
            where.price = {};
            if (minPrice) (where.price as Record<string, number>).gte = parseFloat(minPrice);
            if (maxPrice) (where.price as Record<string, number>).lte = parseFloat(maxPrice);
        }

        if (city) {
            where.city = { contains: city };
        }

        if (search) {
            where.OR = [
                { title: { contains: search } },
                { description: { contains: search } },
            ];
        }

        const [listings, total] = await Promise.all([
            prisma.partsListing.findMany({
                where,
                include: {
                    seller: {
                        select: {
                            id: true,
                            fullName: true,
                            city: true,
                            profilePhoto: true,
                        },
                    },
                },
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.partsListing.count({ where }),
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
        console.error("Error fetching parts listings:", error);
        return NextResponse.json(
            { error: "Failed to fetch listings" },
            { status: 500 }
        );
    }
}
