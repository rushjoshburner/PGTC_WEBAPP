"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Car, ShoppingBag, CreditCard, TrendingUp, Clock } from "lucide-react";

interface DashboardStats {
    totalUsers: number;
    activeMembers: number;
    totalListings: number;
    pendingApprovals: number;
    totalOrders: number;
    monthlyRevenue: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<DashboardStats>({
        totalUsers: 0,
        activeMembers: 0,
        totalListings: 0,
        pendingApprovals: 0,
        totalOrders: 0,
        monthlyRevenue: 0,
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const res = await fetch("/api/admin/stats");
            if (res.ok) {
                const data = await res.json();
                setStats(data);
            }
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const statCards = [
        {
            title: "Total Users",
            value: stats.totalUsers,
            icon: Users,
            description: "Registered users",
            color: "text-blue-500",
        },
        {
            title: "Active Members",
            value: stats.activeMembers,
            icon: CreditCard,
            description: "Paid memberships",
            color: "text-green-500",
        },
        {
            title: "Total Listings",
            value: stats.totalListings,
            icon: Car,
            description: "Parts & cars",
            color: "text-purple-500",
        },
        {
            title: "Pending Approvals",
            value: stats.pendingApprovals,
            icon: Clock,
            description: "Awaiting review",
            color: "text-orange-500",
        },
        {
            title: "Total Orders",
            value: stats.totalOrders,
            icon: ShoppingBag,
            description: "Merchandise orders",
            color: "text-pink-500",
        },
        {
            title: "Monthly Revenue",
            value: `₹${stats.monthlyRevenue.toLocaleString("en-IN")}`,
            icon: TrendingUp,
            description: "This month",
            color: "text-emerald-500",
        },
    ];

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">Overview of your club&apos;s performance</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {statCards.map((stat) => (
                    <Card key={stat.title}>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-5 w-5 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {isLoading ? "..." : stat.value}
                            </div>
                            <p className="text-xs text-muted-foreground">{stat.description}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Latest actions in the system</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { action: "New user registered", time: "2 minutes ago", type: "user" },
                                { action: "Membership purchased", time: "15 minutes ago", type: "payment" },
                                { action: "New part listing", time: "1 hour ago", type: "listing" },
                                { action: "Car sale submitted for approval", time: "2 hours ago", type: "approval" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-primary" />
                                        <span className="text-sm">{item.action}</span>
                                    </div>
                                    <span className="text-xs text-muted-foreground">{item.time}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Pending Tasks</CardTitle>
                        <CardDescription>Items requiring your attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                                <div>
                                    <p className="font-medium">Car Approvals</p>
                                    <p className="text-sm text-muted-foreground">Review submitted cars</p>
                                </div>
                                <Badge variant="secondary">{stats.pendingApprovals}</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                                <div>
                                    <p className="font-medium">Flagged Listings</p>
                                    <p className="text-sm text-muted-foreground">Review reported content</p>
                                </div>
                                <Badge variant="secondary">0</Badge>
                            </div>
                            <div className="flex items-center justify-between p-3 rounded-lg bg-muted">
                                <div>
                                    <p className="font-medium">Expiring Memberships</p>
                                    <p className="text-sm text-muted-foreground">Renewing in 7 days</p>
                                </div>
                                <Badge variant="secondary">0</Badge>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
