"use client";

import { useShop } from '@/context/ShopContext';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/ui/page-header";
import Link from "next/link";

const ASSETS = {
    merchBg: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop"
};

export default function StorePage() {
    const { merchProducts } = useShop();

    return (
        <div className="bg-[#0A0A0A] min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                <PageHeader
                    title="Club Merch"
                    subtitle="Official apparel and accessories. Wear the badge."
                    bg={ASSETS.merchBg}
                />

                <div className="max-w-7xl mx-auto px-4 py-16">
                    {merchProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-500 font-body">No merchandise available at the moment.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {merchProducts.map((item) => (
                                <Link href={`/store/${item.id}`} key={item.id} className="group cursor-pointer">
                                    <div className="bg-[#1A1A1A] aspect-[3/4] overflow-hidden mb-4 relative">
                                        <img
                                            src={item.image || ASSETS.merchBg}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                                            alt={item.name}
                                        />
                                        <div className="absolute bottom-0 left-0 w-full bg-black/80 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <button className="w-full text-white text-[10px] uppercase font-bold tracking-widest">Add to Cart</button>
                                        </div>
                                    </div>
                                    <h3 className="text-white font-display text-sm mb-1">{item.name}</h3>
                                    <p className="text-gray-500 font-body text-xs">{item.price}</p>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
