"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Mail, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsLoading(false);
        setSent(true);
        toast.success("Reset link sent to your email");
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-md bg-card border border-border p-8 rounded-xl shadow-lg">
                    <div className="mb-8 text-center">
                        <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
                        <p className="text-muted-foreground">
                            Enter your email to receive a password reset link
                        </p>
                    </div>

                    {sent ? (
                        <div className="text-center space-y-6 animate-in fade-in">
                            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                                <Mail className="h-8 w-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold">Check your email</h3>
                                <p className="text-sm text-muted-foreground mt-1">
                                    We sent a link to <span className="text-foreground font-medium">{email}</span>
                                </p>
                            </div>
                            <Button variant="outline" className="w-full" onClick={() => setSent(false)}>
                                Try another email
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label>Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        type="email"
                                        placeholder="john@example.com"
                                        className="pl-10 h-11"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <Button type="submit" className="w-full h-11 gradient-primary border-0" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin mr-2" /> : "Send Reset Link"}
                            </Button>

                            <div className="text-center">
                                <Link href="/login" className="text-sm text-muted-foreground hover:text-primary flex items-center justify-center gap-1">
                                    <ArrowLeft className="h-3 w-3" /> Back to Login
                                </Link>
                            </div>
                        </form>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
