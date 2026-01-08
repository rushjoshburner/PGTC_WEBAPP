"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";

const membershipBenefits = [
    "Access to Member Directory",
    "Post Parts & Accessories Listings",
    "View Verified Car Listings",
    "Member Discount on Merchandise",
];

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1); // 1 = details, 2 = car info
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        password: "",
        city: "",
        carModel: "",
        carYear: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (step === 1) {
            // Validate step 1
            if (!formData.fullName || !formData.email || !formData.password) {
                toast.error("Please fill in all required fields");
                return;
            }
            if (formData.password.length < 8) {
                toast.error("Password must be at least 8 characters");
                return;
            }
            setStep(2);
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    carYear: formData.carYear ? parseInt(formData.carYear) : undefined,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Registration failed");
            }

            toast.success("Account created! Please sign in.");
            router.push("/login");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-background">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#001E50]/20 via-transparent to-[#E2001A]/10" />

            <div className="w-full max-w-4xl relative z-10 grid md:grid-cols-2 gap-6">
                {/* Benefits Card */}
                <Card className="hidden md:flex flex-col justify-center border-0 bg-gradient-to-br from-[#001E50] to-[#0066B1]">
                    <CardHeader>
                        <CardTitle className="text-2xl text-white">Join Polo GT Club</CardTitle>
                        <CardDescription className="text-white/70">
                            Be part of India&apos;s premier Polo GT community
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {membershipBenefits.map((benefit) => (
                                <li key={benefit} className="flex items-center gap-3 text-white/90">
                                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center">
                                        <Check className="h-3 w-3 text-green-400" />
                                    </div>
                                    <span>{benefit}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-8 p-4 rounded-lg bg-white/10">
                            <div className="text-sm text-white/70 mb-1">Membership starts at</div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-white">₹500</span>
                                <span className="text-white/70">/year</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Registration Form */}
                <Card className="border-border">
                    <CardHeader className="text-center">
                        <Link href="/" className="mx-auto mb-4 md:hidden">
                            <div className="w-14 h-14 rounded-full gradient-primary flex items-center justify-center">
                                <span className="text-white font-bold text-2xl">GT</span>
                            </div>
                        </Link>
                        <CardTitle className="text-2xl">
                            {step === 1 ? "Create Account" : "Your Car Details"}
                        </CardTitle>
                        <CardDescription>
                            {step === 1
                                ? "Enter your details to get started"
                                : "Tell us about your Polo GT (optional)"}
                        </CardDescription>

                        {/* Step indicator */}
                        <div className="flex items-center justify-center gap-2 mt-4">
                            <div className={`h-2 w-8 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
                            <div className={`h-2 w-8 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                        </div>
                    </CardHeader>

                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            {step === 1 ? (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name *</Label>
                                        <Input
                                            id="fullName"
                                            placeholder="Amit Sharma"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="amit@example.com"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Phone Number</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            placeholder="+91 98765 43210"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password">Password *</Label>
                                        <div className="relative">
                                            <Input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Min 8 characters"
                                                value={formData.password}
                                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                                required
                                            />
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="icon"
                                                className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                                                onClick={() => setShowPassword(!showPassword)}
                                            >
                                                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                            </Button>
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            Must include uppercase, lowercase, and a number
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            id="city"
                                            placeholder="Mumbai"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="carModel">Car Model</Label>
                                        <Select
                                            value={formData.carModel}
                                            onValueChange={(value) => setFormData({ ...formData, carModel: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select your model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="GT_TSI">Polo GT TSI</SelectItem>
                                                <SelectItem value="GT_TDI">Polo GT TDI</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="carYear">Year of Manufacture</Label>
                                        <Select
                                            value={formData.carYear}
                                            onValueChange={(value) => setFormData({ ...formData, carYear: value })}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select year" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {Array.from({ length: 12 }, (_, i) => 2024 - i).map((year) => (
                                                    <SelectItem key={year} value={year.toString()}>
                                                        {year}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}
                        </CardContent>

                        <CardFooter className="flex flex-col gap-4">
                            <div className="flex gap-3 w-full">
                                {step === 2 && (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => setStep(1)}
                                    >
                                        Back
                                    </Button>
                                )}
                                <Button
                                    type="submit"
                                    className={`gradient-primary border-0 ${step === 1 ? "w-full" : "flex-1"}`}
                                    disabled={isLoading}
                                >
                                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    {step === 1 ? "Continue" : "Create Account"}
                                </Button>
                            </div>

                            <p className="text-sm text-center text-muted-foreground">
                                Already have an account?{" "}
                                <Link href="/login" className="text-primary hover:underline font-medium">
                                    Sign In
                                </Link>
                            </p>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
