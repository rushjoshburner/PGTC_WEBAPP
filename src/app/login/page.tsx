"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                redirect: false,
            });

            if (result?.error) {
                toast.error("Invalid email or password");
            } else {
                toast.success("Welcome back!");
                router.push("/dashboard");
                router.refresh();
            }
        } catch {
            toast.error("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#001E50]/20 via-transparent to-[#E2001A]/10" />

            <Card className="w-full max-w-md relative z-10 border-border">
                <CardHeader className="text-center pt-8 pb-4">
                    <Link href="/" className="mx-auto mb-6 block transition-transform hover:scale-105 duration-300">
                        <div className="relative w-24 h-24 mx-auto flex items-center justify-center filter drop-shadow-[0_0_15px_rgba(226,0,26,0.3)]">
                            <Image
                                src="/pgtc-logo.png"
                                alt="PGTC Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </Link>
                    <CardTitle className="text-3xl font-display font-bold tracking-tight mb-2">Welcome Back</CardTitle>
                    <CardDescription className="text-base font-body">Sign in to your Polo GT Club account</CardDescription>
                </CardHeader>

                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-5 px-8">
                        <div className="space-y-1.5">
                            <Label htmlFor="email" className="text-foreground/80 font-medium">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                required
                                className="h-11 bg-muted/30 border-input/50 focus:border-primary/50 focus:ring-primary/20 transition-all font-body"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="password" className="text-foreground/80 font-medium">Password</Label>
                                <Link href="/forgot-password" className="text-xs font-semibold text-primary hover:text-primary/80 transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    className="h-11 pr-10 bg-muted/30 border-input/50 focus:border-primary/50 focus:ring-primary/20 transition-all font-body"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full px-3 text-muted-foreground hover:text-foreground hover:bg-transparent transition-colors"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col gap-5 px-8 pb-8 pt-2">
                        <Button
                            type="submit"
                            className="w-full h-11 text-base font-semibold gradient-primary border-0 shadow-[0_4px_14px_0_rgba(226,0,26,0.39)] hover:shadow-[0_6px_20px_rgba(226,0,26,0.23)] hover:-translate-y-0.5 transition-all duration-200"
                            disabled={isLoading}
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Sign In
                        </Button>

                        <p className="text-sm text-center text-muted-foreground font-body">
                            Don&apos;t have an account?{" "}
                            <Link href="/register" className="text-primary hover:text-primary/80 hover:underline font-semibold transition-colors">
                                Join the Club
                            </Link>
                        </p>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
