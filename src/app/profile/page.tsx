"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSession } from "next-auth/react";
import { User, Mail, Phone, MapPin, Car, Save } from "lucide-react";
import { toast } from "sonner";

export default function ProfilePage() {
    const { data: session } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    // Mock data based on session or empty
    const [formData, setFormData] = useState({
        fullName: session?.user?.name || "",
        email: session?.user?.email || "",
        phone: "+91 98765 43210",
        city: "Mumbai",
        state: "Maharashtra",
        carModel: "Polo GT TSI",
        carReg: "MH 01 AB 1234"
    });

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsLoading(false);
        toast.success("Profile updated successfully");
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <PageHeader
                title="My Profile"
                subtitle="Manage your account and preferences"
                bg="/images/hero-bg.jpg"
            />

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar / Stats */}
                    <div className="space-y-6">
                        <div className="bg-card border border-border rounded-xl p-6 text-center">
                            <div className="h-24 w-24 rounded-full bg-primary/10 text-primary flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                                {session?.user?.name?.charAt(0) || "U"}
                            </div>
                            <h2 className="font-bold text-xl">{session?.user?.name}</h2>
                            <p className="text-muted-foreground text-sm mb-4">{session?.user?.email}</p>
                            <div className="inline-block bg-primary/20 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                                Club Member
                            </div>
                        </div>
                    </div>

                    {/* Profile Form */}
                    <div className="md:col-span-2">
                        <div className="bg-card border border-border rounded-xl p-8">
                            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                <User className="h-5 w-5 text-primary" /> Personal Details
                            </h3>

                            <form onSubmit={handleSave} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                value={formData.fullName}
                                                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email</Label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                value={formData.email}
                                                disabled
                                                className="pl-10 bg-muted"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone</Label>
                                        <div className="relative">
                                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                value={formData.phone}
                                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>City</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                value={formData.city}
                                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                                className="pl-10"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-border">
                                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                                        <Car className="h-5 w-5 text-primary" /> Car Details
                                    </h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label>Car Model</Label>
                                            <Input
                                                value={formData.carModel}
                                                onChange={e => setFormData({ ...formData, carModel: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Registration Number</Label>
                                            <Input
                                                value={formData.carReg}
                                                onChange={e => setFormData({ ...formData, carReg: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-4 flex justify-end">
                                    <Button type="submit" className="gradient-primary border-0 min-w-[120px]" disabled={isLoading}>
                                        {isLoading ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save Changes</>}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
