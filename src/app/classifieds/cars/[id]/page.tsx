"use client";

import { useState, useEffect, use } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, MapPin, Gauge, User, Phone, Info } from "lucide-react";
import Link from "next/link";

interface CarPageProps {
    params: Promise<{ id: string }>;
}

export default function CarDetailsPage({ params }: CarPageProps) {
    const { id } = use(params);
    const [car, setCar] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchCar();
    }, [id]);

    const fetchCar = async () => {
        try {
            const res = await fetch(`/api/classifieds/cars`);
            if (res.ok) {
                const data = await res.json();
                const found = data.listings.find((c: any) => c.id === id);
                setCar(found);
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

    const images = car ? parseImages(car.images) : [];

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

    if (!car) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <h2 className="text-xl font-bold">Car not found</h2>
                    <Link href="/classifieds/cars"><Button>Back to Showroom</Button></Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-muted">
                                <img
                                    src={images[0] || "/images/placeholder-car.jpg"}
                                    alt={car.model}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                                {images.slice(1).map((img, i) => (
                                    <div key={i} className="aspect-[4/3] rounded-lg overflow-hidden bg-muted cursor-pointer hover:opacity-80">
                                        <img src={img} className="w-full h-full object-cover" alt="Car view" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Info */}
                        <div className="space-y-6">
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Badge variant="outline">{car.year}</Badge>
                                    <Badge className="bg-primary/20 text-primary border-0">{car.variant.replace("_", " ")}</Badge>
                                </div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-2">Polo {car.variant}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <MapPin className="h-4 w-4" /> {car.city}, {car.state}
                                </div>
                            </div>

                            <div className="text-3xl font-bold text-primary">
                                ₹{(car.askingPrice / 100000).toFixed(2)} Lakhs
                            </div>

                            {/* Specs Grid */}
                            <div className="grid grid-cols-2 gap-4 py-6 border-y border-border">
                                <div className="flex items-center gap-3">
                                    <Gauge className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Kilometers</p>
                                        <p className="font-semibold">{(car.kilometers / 1000).toFixed(1)}k km</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Ownership</p>
                                        <p className="font-semibold">{car.ownership.replace("_", " ")} owner</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Listed Date</p>
                                        <p className="font-semibold">{new Date(car.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Info className="h-5 w-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">Reg. Number</p>
                                        <p className="font-semibold">{car.registrationNumber}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-semibold text-lg">Description</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {car.description}
                                </p>
                            </div>

                            {car.modifications && (
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-lg">Modifications</h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {car.modifications}
                                    </p>
                                </div>
                            )}

                            <div className="pt-4">
                                <Button size="lg" className="w-full gradient-primary border-0 text-lg">
                                    <Phone className="mr-2 h-5 w-5" /> Contact Seller
                                </Button>
                                <p className="text-xs text-center text-muted-foreground mt-3">
                                    Mention "Polo GT Club" when contacting the seller used cars.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
