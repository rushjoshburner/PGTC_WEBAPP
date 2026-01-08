"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, User, Car, ShoppingBag, CreditCard, Plus, ArrowRight, Crown } from "lucide-react";

export default function DashboardPage() {
    const { data: session, status } = useSession();

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!session) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <main className="flex-1 pt-24 pb-12 flex items-center justify-center">
                    <Card className="max-w-md mx-4">
                        <CardHeader className="text-center">
                            <CardTitle>Sign In Required</CardTitle>
                            <CardDescription>
                                Please sign in to access your dashboard
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Link href="/login">
                                <Button className="w-full gradient-primary border-0">
                                    Sign In
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </main>
                <Footer />
            </div>
        );
    }

    const isMember = session.user?.isMember;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-4">
                    {/* Welcome Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-bold">
                                Welcome, {session.user?.name?.split(" ")[0]}!
                            </h1>
                            {isMember ? (
                                <Badge className="bg-primary/20 text-primary border-primary/30">
                                    <Crown className="h-3 w-3 mr-1" />
                                    Member
                                </Badge>
                            ) : (
                                <Badge variant="secondary">Free Account</Badge>
                            )}
                        </div>
                        <p className="text-muted-foreground">
                            Manage your listings, orders, and profile
                        </p>
                    </div>

                    {/* Membership CTA (if not member) */}
                    {!isMember && (
                        <Card className="mb-8 border-primary/30 bg-gradient-to-r from-primary/10 to-transparent">
                            <CardContent className="flex flex-col sm:flex-row items-center justify-between p-6 gap-4">
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Upgrade to Member</h3>
                                    <p className="text-sm text-muted-foreground">
                                        Post listings, view car classifieds, and get exclusive discounts
                                    </p>
                                </div>
                                <Link href="/membership">
                                    <Button className="gradient-primary border-0 whitespace-nowrap">
                                        Get Membership
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    )}

                    {/* Quick Actions */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        <Link href="/classifieds/parts/new">
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                        <Plus className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">Post Listing</h3>
                                    <p className="text-sm text-muted-foreground">Sell parts & accessories</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/classifieds/parts">
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                        <Car className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">Browse Parts</h3>
                                    <p className="text-sm text-muted-foreground">Find parts you need</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/store">
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                        <ShoppingBag className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">Merchandise</h3>
                                    <p className="text-sm text-muted-foreground">Shop club gear</p>
                                </CardContent>
                            </Card>
                        </Link>

                        <Link href="/profile">
                            <Card className="hover:border-primary/50 transition-colors cursor-pointer h-full">
                                <CardContent className="p-6 flex flex-col items-center text-center">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                                        <User className="h-6 w-6 text-primary" />
                                    </div>
                                    <h3 className="font-semibold">My Profile</h3>
                                    <p className="text-sm text-muted-foreground">Update your details</p>
                                </CardContent>
                            </Card>
                        </Link>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* My Listings */}
                        <Card className="lg:col-span-2">
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle>My Listings</CardTitle>
                                    <Link href="/dashboard/listings">
                                        <Button variant="ghost" size="sm">View All</Button>
                                    </Link>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center py-8 text-muted-foreground">
                                    <Car className="h-12 w-12 mx-auto mb-4 opacity-50" />
                                    <p>You haven&apos;t posted any listings yet</p>
                                    <Link href="/classifieds/parts/new" className="mt-4 inline-block">
                                        <Button variant="outline" size="sm">
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create Your First Listing
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Membership Status */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <CreditCard className="h-5 w-5" />
                                    Membership
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {isMember ? (
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Status</span>
                                            <Badge className="bg-green-500/20 text-green-500">Active</Badge>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Plan</span>
                                            <span className="font-medium">Annual</span>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-muted-foreground">Renewal</span>
                                            <span className="font-medium">Auto</span>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center py-4">
                                        <p className="text-muted-foreground mb-4">
                                            Unlock all features with membership
                                        </p>
                                        <Link href="/membership">
                                            <Button className="w-full gradient-primary border-0">
                                                Get Membership - ₹500/yr
                                            </Button>
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
