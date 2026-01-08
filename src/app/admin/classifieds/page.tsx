"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { Loader2, Check, X, Eye, Car, Wrench } from "lucide-react";

interface PartsListing {
    id: string;
    title: string;
    category: string;
    price: number;
    city: string;
    status: string;
    createdAt: string;
    seller: { fullName: string };
}

interface CarListing {
    id: string;
    variant: string;
    year: number;
    askingPrice: number;
    city: string;
    submissionStatus: string;
    status: string;
    createdAt: string;
    seller: { fullName: string };
}

export default function ClassifiedsAdminPage() {
    const [partsListings, setPartsListings] = useState<PartsListing[]>([]);
    const [carListings, setCarListings] = useState<CarListing[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchListings();
    }, []);

    const fetchListings = async () => {
        try {
            const [partsRes, carsRes] = await Promise.all([
                fetch("/api/admin/classifieds/parts"),
                fetch("/api/admin/classifieds/cars"),
            ]);

            if (partsRes.ok) {
                const data = await partsRes.json();
                setPartsListings(data.listings || []);
            }

            if (carsRes.ok) {
                const data = await carsRes.json();
                setCarListings(data.listings || []);
            }
        } catch (error) {
            console.error("Error fetching listings:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleCarApproval = async (carId: string, action: "approve" | "reject") => {
        try {
            const res = await fetch(`/api/admin/classifieds/cars/${carId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action }),
            });

            if (res.ok) {
                toast.success(`Car listing ${action === "approve" ? "approved" : "rejected"}`);
                fetchListings();
            } else {
                toast.error("Action failed");
            }
        } catch {
            toast.error("Action failed");
        }
    };

    const formatPrice = (price: number) => {
        if (price >= 100000) {
            return `₹${(price / 100000).toFixed(1)}L`;
        }
        return `₹${price.toLocaleString("en-IN")}`;
    };

    const pendingCars = carListings.filter((c) => c.submissionStatus === "PENDING");

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Classifieds</h1>
                <p className="text-muted-foreground">Manage parts and car listings</p>
            </div>

            {/* Pending Approvals Alert */}
            {pendingCars.length > 0 && (
                <Card className="mb-6 border-orange-500/30 bg-orange-500/10">
                    <CardContent className="p-4 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Car className="h-5 w-5 text-orange-500" />
                            <div>
                                <p className="font-medium">Pending Car Approvals</p>
                                <p className="text-sm text-muted-foreground">
                                    {pendingCars.length} car listing(s) awaiting review
                                </p>
                            </div>
                        </div>
                        <Badge className="bg-orange-500">{pendingCars.length}</Badge>
                    </CardContent>
                </Card>
            )}

            <Tabs defaultValue="cars" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="cars" className="gap-2">
                        <Car className="h-4 w-4" />
                        Cars
                        {pendingCars.length > 0 && (
                            <Badge variant="destructive" className="ml-1 h-5 px-1.5">
                                {pendingCars.length}
                            </Badge>
                        )}
                    </TabsTrigger>
                    <TabsTrigger value="parts" className="gap-2">
                        <Wrench className="h-4 w-4" />
                        Parts
                    </TabsTrigger>
                </TabsList>

                {/* Cars Tab */}
                <TabsContent value="cars">
                    <Card>
                        <CardHeader>
                            <CardTitle>Car Listings ({carListings.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Car</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Seller</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {carListings.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                No car listings
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        carListings.map((car) => (
                                            <TableRow key={car.id}>
                                                <TableCell className="font-medium">
                                                    {car.year} Polo {car.variant.replace("_", " ")}
                                                </TableCell>
                                                <TableCell>{formatPrice(car.askingPrice)}</TableCell>
                                                <TableCell>{car.city}</TableCell>
                                                <TableCell>{car.seller.fullName}</TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            car.submissionStatus === "PENDING"
                                                                ? "bg-orange-500/20 text-orange-500"
                                                                : car.submissionStatus === "APPROVED"
                                                                    ? "bg-green-500/20 text-green-500"
                                                                    : "bg-red-500/20 text-red-500"
                                                        }
                                                    >
                                                        {car.submissionStatus}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="icon">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                        {car.submissionStatus === "PENDING" && (
                                                            <>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-green-500 hover:text-green-600"
                                                                    onClick={() => handleCarApproval(car.id, "approve")}
                                                                >
                                                                    <Check className="h-4 w-4" />
                                                                </Button>
                                                                <Button
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="text-red-500 hover:text-red-600"
                                                                    onClick={() => handleCarApproval(car.id, "reject")}
                                                                >
                                                                    <X className="h-4 w-4" />
                                                                </Button>
                                                            </>
                                                        )}
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Parts Tab */}
                <TabsContent value="parts">
                    <Card>
                        <CardHeader>
                            <CardTitle>Parts Listings ({partsListings.length})</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Title</TableHead>
                                        <TableHead>Category</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Location</TableHead>
                                        <TableHead>Seller</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {partsListings.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                                                No parts listings
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        partsListings.map((part) => (
                                            <TableRow key={part.id}>
                                                <TableCell className="font-medium">{part.title}</TableCell>
                                                <TableCell>{part.category.replace("_", " ")}</TableCell>
                                                <TableCell>{formatPrice(part.price)}</TableCell>
                                                <TableCell>{part.city}</TableCell>
                                                <TableCell>{part.seller.fullName}</TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary">{part.status}</Badge>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
