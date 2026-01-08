"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Lock } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        toast.success("Password reset successfully");
        router.push("/login");
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-card border border-border p-8 rounded-xl shadow-lg">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
                        <p className="text-muted-foreground">
                            Create a new password for your account
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label>New Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="password" placeholder="••••••••" className="pl-10 h-11" required />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Confirm Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input type="password" placeholder="••••••••" className="pl-10 h-11" required />
                            </div>
                        </div>

                        <Button type="submit" className="w-full h-11 gradient-primary border-0 mt-4" disabled={isLoading}>
                            {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Update Password"}
                        </Button>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
