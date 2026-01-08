"use client";

import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { ShopProvider } from "@/context/ShopContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <ShopProvider>
                {children}
            </ShopProvider>
            <Toaster position="top-right" richColors />
        </SessionProvider>
    );
}
