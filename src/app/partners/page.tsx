"use client";

import { useShop } from '@/context/ShopContext';
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/ui/page-header";
import { Gauge } from 'lucide-react';

const ASSETS = {
    trinityBg: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2600&auto=format&fit=crop"
};

export default function PartnersPage() {
    const { trinityProducts } = useShop();

    return (
        <div className="bg-[#0A0A0A] min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                <PageHeader
                    title="Trinity Performance"
                    subtitle="The bleeding edge of German Engineering. Official partners for APR, Bilstein, and Brembo."
                    bg={ASSETS.trinityBg}
                />

                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {trinityProducts.map((service) => (
                            <div key={service.id} className="bg-[#1A1A1A] border border-white/10 p-8 rounded-sm hover:border-red-600/50 transition-colors group">
                                <div className="flex justify-between items-start mb-4">
                                    <Gauge className="text-red-600" size={24} />
                                    <span className="text-xs font-body text-gray-500">{service.price}</span>
                                </div>
                                <h3 className="text-2xl font-display text-white mb-2">{service.name}</h3>
                                <p className="text-gray-400 font-body mb-6">{service.description}</p>
                                <button className="text-white text-xs font-bold uppercase tracking-widest border-b border-red-600 pb-1 hover:text-red-500">Enquire Now</button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
