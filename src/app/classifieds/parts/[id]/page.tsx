"use client";

import { useState, useEffect, use } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, MapPin, Tag, Phone } from "lucide-react";
import Link from "next/link";

interface PartPageProps {
    params: Promise<{ id: string }>;
}

export default function PartDetailsPage({ params }: PartPageProps) {
    const { id } = use(params);
    const [part, setPart] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchPart();
    }, [id]);

    const fetchPart = async () => {
        try {
            const res = await fetch(`/api/classifieds/parts`);
            if (res.ok) {
                const data = await res.json();
                const found = data.listings.find((p: any) => p.id === id);
                setPart(found);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    const parseImages = (imagesJson: string): string[] => {
        try {
            return JSON.parse(imagesJson);
        } catch {
            return [];
        }
    };

    const images = part ? parseImages(part.images) : [];

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!part) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <h2 className="text-xl font-bold">Part not found</h2>
                    <Link href="/classifieds/parts"><Button>Back to Market</Button></Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-square rounded-xl overflow-hidden bg-muted border border-border">
                                <img
                                    src={images[0] || "/images/placeholder-part.jpg"}
                                    alt={part.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-6">
                            <div>
                                <Badge variant="secondary" className="mb-2">{part.category.replace("_", " ")}</Badge>
                                <h1 className="text-2xl md:text-3xl font-bold mb-2">{part.title}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" /> {part.city}, {part.state}
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-primary">
                                ₹{part.price.toLocaleString()}
                            </div>

                            <div className="space-y-2 pt-4 border-t border-border">
                                <h3 className="font-semibold text-lg">Description</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {part.description}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground pt-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4" />
                                    List Date: {new Date(part.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Tag className="h-4 w-4" />
                                    Condition: Used
                                </div>
                            </div>

                            <div className="pt-6">
                                <Button size="lg" className="w-full gradient-primary border-0 text-lg">
                                    <Phone className="mr-2 h-5 w-5" /> Contact Seller
                                </Button>
                                {part.seller && (
                                    <p className="text-xs text-center text-muted-foreground mt-3">
                                        Seller: {part.seller.fullName}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
