"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useShop } from "@/context/ShopContext";
import { Loader2, CheckCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
    const { cart, cartTotal, clearCart } = useShop();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
    const router = useRouter();

    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API/Gateway
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsLoading(false);
        setStep('success');
        clearCart();
        toast.success("Order placed successfully!");
    };

    if (cart.length === 0 && step !== 'success') {
        router.push('/cart');
        return null;
    }

    if (step === 'success') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center p-4">
                <div className="h-24 w-24 text-green-500 mb-6">
                    <CheckCircle className="h-full w-full" />
                </div>
                <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
                <p className="text-muted-foreground mb-8 max-w-md">
                    Thank you for your purchase. We have sent a confirmation email to your inbox.
                    <br />Order ID: #{Math.floor(Math.random() * 1000000)}
                </p>
                <div className="flex gap-4">
                    <Link href="/dashboard">
                        <Button variant="outline">View Order</Button>
                    </Link>
                    <Link href="/store">
                        <Button className="gradient-primary border-0">Continue Shopping</Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />

            <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
                <div className="mb-8">
                    <Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-4">
                        <ArrowLeft className="h-4 w-4" /> Back to Cart
                    </Link>
                    <h1 className="text-3xl font-bold">Checkout</h1>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Form Section */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Shipping */}
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">1</span>
                                Shipping Details
                            </h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>First Name</Label>
                                    <Input placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Last Name</Label>
                                    <Input placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input type="email" placeholder="john@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label>Address</Label>
                                <Input placeholder="123 Street Name" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>City</Label>
                                    <Input placeholder="Mumbai" />
                                </div>
                                <div className="space-y-2">
                                    <Label>Postal Code</Label>
                                    <Input placeholder="400001" />
                                </div>
                            </div>
                        </div>

                        {/* Payment */}
                        <div className="space-y-4 pt-8 border-t border-border">
                            <h2 className="text-xl font-semibold flex items-center gap-2">
                                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">2</span>
                                Payment Method
                            </h2>
                            <div className="p-4 border border-primary/20 bg-primary/5 rounded-lg">
                                <p className="font-semibold">Razorpay / UPI / Card</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    You will be redirected to the secure payment gateway.
                                </p>
                            </div>
                        </div>

                        <Button
                            onClick={handlePayment}
                            disabled={isLoading}
                            className="w-full h-12 gradient-primary border-0 text-lg"
                        >
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Pay ₹{cartTotal.toLocaleString()}
                        </Button>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="rounded-xl border border-border bg-card p-6 sticky top-24">
                            <h3 className="font-semibold mb-4">Your Order ({cart.length} items)</h3>
                            <div className="space-y-4 mb-6">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-3">
                                        <div className="h-12 w-12 rounded bg-muted flex-shrink-0 overflow-hidden">
                                            <img src={item.image || "/images/placeholder.jpg"} className="h-full w-full object-cover" />
                                        </div>
                                        <div className="flex-1 text-sm">
                                            <p className="font-medium line-clamp-1">{item.name}</p>
                                            <p className="text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="text-sm font-semibold">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-border flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>₹{cartTotal.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
