import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, description, price, category, imageUrl, sku } = body; // Simplified

        const product = await prisma.product.create({
            data: {
                name,
                description,
                price: parseFloat(price),
                memberPrice: parseFloat(price), // Default to same price for now
                category,
                images: JSON.stringify([imageUrl]), // Storing as JSON string array as per schema comment
                sku: sku || `SKU-${Date.now()}`, // Auto-gen if missing
            },
        });

        return NextResponse.json({ product });
    } catch (error) {
        console.error("Error creating product:", error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}

export async function GET() {
    // Admin list might need all products regardless of status
    try {
        const products = await prisma.product.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json({ products });
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
    }
}
