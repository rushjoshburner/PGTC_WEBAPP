"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Plus, MapPin, Calendar, Filter } from "lucide-react";

const categories = [
    { value: "ENGINE_PARTS", label: "Engine Parts" },
    { value: "BODY_PARTS", label: "Body Parts" },
    { value: "INTERIOR", label: "Interior" },
    { value: "ELECTRONICS", label: "Electronics" },
    { value: "WHEELS_TIRES", label: "Wheels & Tires" },
    { value: "OTHER", label: "Other" },
];

interface Listing {
    id: string;
    title: string;
    category: string;
    price: number;
    city: string;
    state: string;
    images: string;
    createdAt: string;
    seller: {
        fullName: string;
        city: string;
    };
}

export default function ClassifiedsPage() {
    const [listings, setListings] = useState<Listing[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        fetchListings();
    }, [category]);

    const fetchListings = async () => {
        setIsLoading(true);
        try {
            const params = new URLSearchParams();
            if (category) params.set("category", category);
            if (search) params.set("search", search);

            const res = await fetch(`/api/classifieds/parts?${params}`);
            const data = await res.json();
            setListings(data.listings || []);
        } catch (error) {
            console.error("Error fetching listings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0,
        }).format(price);
    };

    const getCategoryLabel = (value: string) => {
        return categories.find((c) => c.value === value)?.label || value;
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
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">Parts & Accessories</h1>
                            <p className="text-muted-foreground">
                                Find genuine parts from fellow Polo GT owners
                            </p>
                        </div>
                        <Link href="/classifieds/parts/new">
                            <Button className="gradient-primary border-0">
                                <Plus className="mr-2 h-4 w-4" />
                                Post Listing
                            </Button>
                        </Link>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-8">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search parts..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && fetchListings()}
                                className="pl-10"
                            />
                        </div>
                        <Select value={category || "all"} onValueChange={(v) => setCategory(v === "all" ? "" : v)}>
                            <SelectTrigger className="w-full sm:w-48">
                                <Filter className="mr-2 h-4 w-4" />
                                <SelectValue placeholder="All Categories" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Categories</SelectItem>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Listings Grid */}
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <Card key={i} className="overflow-hidden animate-pulse">
                                    <div className="aspect-square bg-muted" />
                                    <CardContent className="p-4">
                                        <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                                        <div className="h-6 bg-muted rounded w-1/2" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : listings.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔧</div>
                            <h3 className="text-xl font-semibold mb-2">No listings found</h3>
                            <p className="text-muted-foreground mb-6">
                                Be the first to post a listing in this category!
                            </p>
                            <Link href="/classifieds/parts/new">
                                <Button className="gradient-primary border-0">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Post Listing
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {listings.map((listing) => {
                                const images = parseImages(listing.images);
                                return (
                                    <Link key={listing.id} href={`/classifieds/parts/${listing.id}`}>
                                        <Card className="overflow-hidden hover:border-primary/50 transition-colors group">
                                            <div className="aspect-square bg-muted relative overflow-hidden">
                                                {images[0] ? (
                                                    <img
                                                        src={images[0]}
                                                        alt={listing.title}
                                                        className="object-cover w-full h-full group-hover:scale-105 transition-transform"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-4xl">
                                                        🔧
                                                    </div>
                                                )}
                                                <Badge className="absolute top-3 left-3 bg-background/80 text-foreground">
                                                    {getCategoryLabel(listing.category)}
                                                </Badge>
                                            </div>
                                            <CardContent className="p-4">
                                                <h3 className="font-semibold line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                                                    {listing.title}
                                                </h3>
                                                <p className="text-xl font-bold text-primary mb-3">
                                                    {formatPrice(listing.price)}
                                                </p>
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="h-3 w-3" />
                                                        {listing.city}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar className="h-3 w-3" />
                                                        {new Date(listing.createdAt).toLocaleDateString("en-IN", {
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
                </div>
            </main>

            <Footer />
        </div>
    );
}
