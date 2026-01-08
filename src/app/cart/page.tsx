"use client";

import { useShop } from "@/context/ShopContext";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { PageHeader } from "@/components/ui/page-header";

export default function CartPage() {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <PageHeader
                title="Your Cart"
                subtitle="Review your gear before checkout"
                bg="/images/hero-bg.jpg"
            />

            <main className="flex-1 container mx-auto px-4 py-12">
                {cart.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-muted mb-6">
                            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
                        <p className="text-muted-foreground mb-8">
                            Looks like you haven't added any gear yet.
                        </p>
                        <Link href="/store">
                            <Button size="lg" className="gradient-primary border-0">
                                Start Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-border bg-muted">
                                        <img
                                            src={item.image || "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop"}
                                            alt={item.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex flex-1 flex-col justify-between">
                                        <div className="flex justify-between">
                                            <div>
                                                <h3 className="font-semibold">{item.name}</h3>
                                                <p className="text-sm text-muted-foreground">Price: ₹{item.price}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-muted-foreground hover:text-red-500"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>

                                        <div className="flex items-center gap-3">
                                            <div className="flex items-center rounded-md border border-border">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-none"
                                                    disabled={item.quantity <= 1}
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 rounded-none"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <div className="ml-auto font-semibold">
                                                ₹{(item.price * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="lg:col-span-1">
                            <div className="rounded-xl border border-border bg-card p-6 sticky top-24">
                                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

                                <div className="space-y-3 pb-6 border-b border-border text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span>₹{cartTotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Shipping</span>
                                        <span className="text-green-500">Free</span>
                                    </div>
                                </div>

                                <div className="flex justify-between py-6 font-bold text-lg">
                                    <span>Total</span>
                                    <span>₹{cartTotal.toLocaleString()}</span>
                                </div>

                                <Link href="/checkout">
                                    <Button className="w-full gradient-primary border-0" size="lg">
                                        Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </Link>

                                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                                    <ShoppingBag className="h-3 w-3" />
                                    Secure Checkout
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
}
