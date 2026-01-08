"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/ui/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

const orders = [
    {
        id: "ORD-29384",
        date: "2024-03-15",
        total: 2499,
        status: "DELIVERED",
        items: [
            { name: "Polo GT Club Official Tee", qty: 1 },
            { name: "Club Sticker Pack", qty: 2 }
        ]
    },
    {
        id: "ORD-29385",
        date: "2024-04-02",
        total: 12999,
        status: "SHIPPING",
        items: [
            { name: "K&N Air Filter", qty: 1 }
        ]
    }
];

export default function OrdersPage() {
    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <PageHeader
                title="My Orders"
                subtitle="Track your gear and history"
                bg="/images/hero-bg.jpg"
                parentPage="Profile"
                parentLink="/profile"
            />

            <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-card border border-border rounded-xl overflow-hidden">
                            <div className="p-4 border-b border-border bg-muted/30 flex flex-wrap gap-4 justify-between items-center">
                                <div className="flex gap-6 text-sm">
                                    <div>
                                        <p className="text-muted-foreground">Order Placed</p>
                                        <p className="font-medium">{new Date(order.date).toLocaleDateString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Total</p>
                                        <p className="font-medium">₹{order.total.toLocaleString()}</p>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground">Order #</p>
                                        <p className="font-medium">{order.id}</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" size="sm">View Invoice</Button>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex flex-col md:flex-row gap-6 justify-between">
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2 mb-2">
                                            {order.status === 'DELIVERED' && <CheckCircle className="h-5 w-5 text-green-500" />}
                                            {order.status === 'SHIPPING' && <Truck className="h-5 w-5 text-blue-500" />}
                                            <span className="font-bold text-lg capitalize">{order.status.toLowerCase()}</span>
                                        </div>
                                        <div className="space-y-1">
                                            {order.items.map((item, i) => (
                                                <p key={i} className="text-muted-foreground">
                                                    {item.qty}x <span className="text-foreground">{item.name}</span>
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <Button className="w-full md:w-auto">Track Package</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
