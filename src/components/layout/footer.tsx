"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

export function Footer() {
    const [email, setEmail] = useState("");
    const [isSubscribing, setIsSubscribing] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) {
            toast.error("Please enter your email.");
            return;
        }

        setIsSubscribing(true);
        // Simulating API call
        setTimeout(() => {
            toast.success("Subscribed! You'll hear from us soon.");
            setEmail("");
            setIsSubscribing(false);
        }, 1000);
    };

    return (
        <footer className="bg-black border-t border-white/10 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <Image
                                src="/pgtc-logo.png"
                                alt="PGTC Logo"
                                width={32}
                                height={32}
                                className="object-contain"
                            />
                            <span className="font-display font-bold text-white">PGTC MUMBAI</span>
                        </div>
                        <p className="text-gray-500 text-sm font-body">
                            Fueling the car culture in Mumbai since 2021. We don&apos;t just drive; we belong.
                        </p>
                    </div>

                    {/* The Garage */}
                    <div>
                        <h4 className="text-white font-display text-sm uppercase mb-6">The Garage</h4>
                        <ul className="space-y-4 text-sm text-gray-400 font-body">
                            <li><Link href="/partners" className="hover:text-red-500 transition-colors">Trinity Performance</Link></li>
                            <li><Link href="/store" className="hover:text-red-500 transition-colors">Official Merch</Link></li>
                            <li><Link href="/classifieds" className="hover:text-red-500 transition-colors">Parts Classifieds</Link></li>
                            <li><Link href="/classifieds" className="hover:text-red-500 transition-colors">Showroom</Link></li>
                        </ul>
                    </div>

                    {/* Clubhouse */}
                    <div>
                        <h4 className="text-white font-display text-sm uppercase mb-6">Clubhouse</h4>
                        <ul className="space-y-4 text-sm text-gray-400 font-body">
                            <li><Link href="/register" className="hover:text-red-500 transition-colors">Membership Benefits</Link></li>
                            <li><Link href="/about" className="hover:text-red-500 transition-colors">Events Calendar</Link></li>
                            <li><Link href="/about" className="hover:text-red-500 transition-colors">Gallery</Link></li>
                            <li><Link href="/contact" className="hover:text-red-500 transition-colors">Contact Us</Link></li>
                        </ul>
                    </div>

                    {/* Stay Tuned */}
                    <div>
                        <h4 className="text-white font-display text-sm uppercase mb-6">Stay Tuned</h4>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="bg-[#1A1A1A] border border-white/10 text-white px-4 py-3 text-sm focus:outline-none focus:border-red-600 transition-colors rounded-sm font-body"
                            />
                            <button
                                type="submit"
                                disabled={isSubscribing}
                                className="bg-white text-black px-4 py-3 text-xs font-bold uppercase font-display hover:bg-gray-200 transition-colors disabled:opacity-70 disabled:cursor-wait"
                            >
                                {isSubscribing ? "Subscribing..." : "Subscribe"}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-600 text-xs font-body">© {new Date().getFullYear()} Polo GT Club Mumbai. All rights reserved.</p>
                    <div className="flex gap-6 text-gray-600 text-xs font-body uppercase tracking-wider">
                        <a href="https://www.instagram.com/pologtclubmumbai/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a>
                        <a href="https://www.youtube.com/@pologtclubmumbai" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">YouTube</a>
                        <a href="#" className="hover:text-white transition-colors">Twitter</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
