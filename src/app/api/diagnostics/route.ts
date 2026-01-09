import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const start = Date.now();
        console.log("Diagnostic: Starting DB Check...");

        // 1. Check Env Vars (safely)
        const hasDbUrl = !!process.env.DATABASE_URL;
        const hasAuthSecret = !!process.env.NEXTAUTH_SECRET;

        // 2. Test DB Connection
        const userCount = await prisma.user.count();
        const duration = Date.now() - start;

        return NextResponse.json({
            status: "ok",
            message: "Database connected successfully",
            env: {
                hasDatabaseUrl: hasDbUrl,
                hasNextAuthSecret: hasAuthSecret,
                nodeEnv: process.env.NODE_ENV,
            },
            data: {
                userCount,
                latency: `${duration}ms`
            }
        });

    } catch (error) {
        console.error("Diagnostic Failed:", error);
        return NextResponse.json({
            status: "error",
            message: error instanceof Error ? error.message : "Unknown error",
            stack: error instanceof Error ? error.stack : undefined,
            env: {
                hasDatabaseUrl: !!process.env.DATABASE_URL,
                // Do NOT return the actual values, just boolean presence
            }
        }, { status: 200 }); // Return 200 so we can read the JSON, don't 500!
    }
}
