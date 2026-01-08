"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Calendar, Gauge, User, Filter, AlertCircle } from "lucide-react";

interface CarListing {
    id: string;
    variant: string;
    year: number;
    kilometers: number;
    askingPrice: number;
    city: string;
    state: string;
    images: string;
    ownership: string;
    seller: {
        fullName: string;
    };
    createdAt: string;
}

export default function CarsClassifiedsPage() {
    const [listings, setListings] = useState<CarListing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filters, setFilters] = useState({
        minYear: "",
        maxPrice: "",
        city: "",
    });

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/classifieds/cars");
            if (res.ok) {
                const data = await res.json();
                setListings(data.listings || []);
            }
        } catch (error) {
            console.error("Error fetching car listings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        if (price >= 100000) {
            return `₹${(price / 100000).toFixed(1)}L`;
        }
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const parseImages = (imagesJson: string): string[] => {
        try {
            return JSON.parse(imagesJson);
        } catch {
            return [];
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold mb-2">Cars for Sale</h1>
                        <p className="text-muted-foreground">
                            Verified Polo GTs from trusted club members
                        </p>
                    </div>

                    {/* Info Banner */}
                    <div className="mb-8 p-4 rounded-lg bg-primary/10 border border-primary/20 flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                            <p className="font-medium">Member Verified Listings</p>
                            <p className="text-sm text-muted-foreground">
                                All car listings are reviewed by our team before being published.
                                A 2% commission applies on successful sales.
                            </p>
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mb-8">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by city..."
                                value={filters.city}
                                onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                                className="pl-10"
                            />
                        </div>
                        <Select value={filters.minYear} onValueChange={(v) => setFilters({ ...filters, minYear: v })}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Min Year" />
                            </SelectTrigger>
                            <SelectContent>
                                {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((year) => (
                                    <SelectItem key={year} value={year.toString()}>{year}+</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={filters.maxPrice} onValueChange={(v) => setFilters({ ...filters, maxPrice: v })}>
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Max Price" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="500000">Under ₹5L</SelectItem>
                                <SelectItem value="700000">Under ₹7L</SelectItem>
                                <SelectItem value="1000000">Under ₹10L</SelectItem>
                                <SelectItem value="1500000">Under ₹15L</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Listings */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <Card key={i} className="overflow-hidden animate-pulse">
                                    <div className="aspect-[4/3] bg-muted" />
                                    <CardContent className="p-4">
                                        <div className="h-5 bg-muted rounded w-3/4 mb-2" />
                                        <div className="h-7 bg-muted rounded w-1/2" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : listings.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🚗</div>
                            <h3 className="text-xl font-semibold mb-2">No cars listed yet</h3>
                            <p className="text-muted-foreground mb-6">
                                Be the first to list your Polo GT for sale!
                            </p>
                            <Link href="/classifieds/cars/sell">
                                <Button className="gradient-primary border-0">
                                    Sell Your Car
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {listings.map((car) => {
                                const images = parseImages(car.images);
                                return (
                                    <Link key={car.id} href={`/classifieds/cars/${car.id}`}>
                                        <Card className="overflow-hidden hover:border-primary/50 transition-colors group">
                                            <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                                                {images[0] ? (
                                                    <img
                                                        src={images[0]}
                                                        alt={`Polo ${car.variant}`}
                                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-6xl">
                                                        🚗
                                                    </div>
                                                )}
                                                <Badge className="absolute top-3 left-3 bg-background/80 text-foreground">
                                                    {car.year} • {car.variant.replace("_", " ")}
                                                </Badge>
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
                                                    Polo {car.variant.replace("_", " ")}
                                                </h3>
                                                <p className="text-2xl font-bold text-primary mb-3">
                                                    {formatPrice(car.askingPrice)}
                                                </p>
                                                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <Gauge className="h-3 w-3" />
                                                        {(car.kilometers / 1000).toFixed(0)}k km
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {car.city}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <User className="h-3 w-3" />
                                                        {car.ownership.replace("_", " ")} owner
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(car.createdAt).toLocaleDateString("en-IN", {
                                                            day: "numeric",
                                                            month: "short",
                                                        })}
                                                    </span>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Link>
                                );
                            })}
                        </div>
                    )}

                    {/* Sell CTA */}
                    <div className="mt-12 text-center p-8 rounded-lg bg-card border border-border">
                        <h3 className="text-xl font-semibold mb-2">Looking to Sell Your Polo GT?</h3>
                        <p className="text-muted-foreground mb-4">
                            List your car with the club and reach genuine buyers
                        </p>
                        <Link href="/classifieds/cars/sell">
                            <Button className="gradient-accent border-0">
                                Submit Your Car
                            </Button>
                        </Link>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
