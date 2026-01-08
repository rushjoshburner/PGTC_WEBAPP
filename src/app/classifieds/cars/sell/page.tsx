"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ImageUpload from "@/components/ui/image-upload";
import { Loader2, Car, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SellCarPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState(1);
    const [images, setImages] = useState<string[]>([]);

    const [formData, setFormData] = useState({
        variant: "",
        year: "",
        kilometers: "",
        ownership: "",
        color: "",
        askingPrice: "",
        modifications: "",
        description: "",
        city: "",
        state: "",
        registrationNumber: ""
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!formData.variant || !formData.askingPrice || !formData.city) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch("/api/classifieds/cars/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    year: parseInt(formData.year),
                    kilometers: parseInt(formData.kilometers),
                    askingPrice: parseFloat(formData.askingPrice),
                    images: JSON.stringify(images),
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to create listing");
            }

            toast.success("Listing Submitted Successfully!");
            router.push("/classifieds/cars");
        } catch (error) {
            toast.error(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    if (step === 3) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
                <div className="h-24 w-24 text-green-500 mb-6">
                    <CheckCircle className="h-full w-full" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Listing Submitted!</h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Your Polo GT listing has been submitted for review. Our team will verify the details and approve it within 24 hours.
                </p>
                <div className="flex gap-4">
                    <Button onClick={() => router.push("/dashboard/listings")} variant="outline">View My Listings</Button>
                    <Button onClick={() => router.push("/classifieds/cars")} className="gradient-primary border-0">Back to Showroom</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <PageHeader
                title="Sell Your Polo GT"
                subtitle="Reach thousands of enthusiasts instantly"
                bg="/images/hero-bg.jpg"
                parentPage="Classifieds"
                parentLink="/classifieds/cars"
            />

            <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
                <div className="bg-card border border-border rounded-xl p-8">
                    <div className="mb-8">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                            <span>Vehicle Details</span>
                            <span>Step {step} of 2</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: step === 1 ? "50%" : "100%" }}
                            />
                        </div>
                    </div>

                    <form onSubmit={step === 1 ? (e) => { e.preventDefault(); setStep(2); } : handleSubmit} className="space-y-6">

                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>Variant</Label>
                                        <Select onValueChange={(v) => setFormData({ ...formData, variant: v })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Variant" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="GT_TSI">GT TSI</SelectItem>
                                                <SelectItem value="GT_TDI">GT TDI</SelectItem>
                                                <SelectItem value="GTI">GTI</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Year</Label>
                                        <Input
                                            type="number"
                                            placeholder="2018"
                                            value={formData.year}
                                            onChange={e => setFormData({ ...formData, year: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Kilometers Driven</Label>
                                        <Input
                                            type="number"
                                            placeholder="45000"
                                            value={formData.kilometers}
                                            onChange={e => setFormData({ ...formData, kilometers: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Ownership</Label>
                                        <Select onValueChange={(v) => setFormData({ ...formData, ownership: v })}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Ownership" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="FIRST">1st Owner</SelectItem>
                                                <SelectItem value="SECOND">2nd Owner</SelectItem>
                                                <SelectItem value="THIRD_PLUS">3rd+ Owner</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Registration Number</Label>
                                    <Input
                                        placeholder="MH 01 AB 1234"
                                        value={formData.registrationNumber}
                                        onChange={e => setFormData({ ...formData, registrationNumber: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label>City</Label>
                                        <Input
                                            placeholder="Mumbai"
                                            value={formData.city}
                                            onChange={e => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Asking Price (₹)</Label>
                                        <Input
                                            type="number"
                                            placeholder="750000"
                                            value={formData.askingPrice}
                                            onChange={e => setFormData({ ...formData, askingPrice: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <Button type="submit" className="w-full h-12">Next Step</Button>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                                <div className="space-y-2">
                                    <Label>Upload Photos (Max 5)</Label>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                        {/* Use same ImageUpload component as admin but allow multiple logic or use simplified for now */}
                                        <div className="col-span-2 md:col-span-4 p-8 border-2 border-dashed border-border rounded-lg text-center bg-muted/20">
                                            <Car className="h-10 w-10 mx-auto text-muted-foreground mb-2" />
                                            <p className="text-sm text-muted-foreground">Photos help sell faster. Add clear shots of exterior and interior.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label>Description</Label>
                                    <Textarea
                                        placeholder="Tell buyers about your car's condition, service history, and reason for selling..."
                                        className="h-32"
                                        value={formData.description}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Modifications (Optional)</Label>
                                    <Textarea
                                        placeholder="List any aftermarket parts or tuning..."
                                        value={formData.modifications}
                                        onChange={e => setFormData({ ...formData, modifications: e.target.value })}
                                    />
                                </div>

                                <div className="flex gap-4">
                                    <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/2 h-12">Back</Button>
                                    <Button type="submit" className="w-1/2 h-12 gradient-primary border-0" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="animate-spin" /> : "Submit Listing"}
                                    </Button>
                                </div>
                            </div>
                        )}
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
}
