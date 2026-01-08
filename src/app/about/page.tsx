"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/ui/page-header";

const ASSETS = {
    aboutBg: "https://images.unsplash.com/photo-1493238792015-1a419bac32d3?q=80&w=2670&auto=format&fit=crop"
};

const teamMembers = [
    { name: "Nikhil Changlani", role: "Polo GT Club Founder", bio: "The visionary who started it all. Bringing GT owners together since day one." },
    { name: "Karan Kankodia", role: "Polo GT Club Co-Founder", bio: "Driving the community forward with passion and dedication." },
    { name: "Aniket Deshpande", role: "Torque Shift Motors Founder", bio: "Expert in performance tuning and technical modifications." },
    { name: "Roland Monterio", role: "Trinity Car Parts Founder", bio: "Your trusted source for genuine and performance parts." },
];

export default function AboutPage() {
    return (
        <div className="bg-[#0A0A0A] min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow">
                <PageHeader
                    title="About PGTC"
                    subtitle="Est. 2021. From a WhatsApp group to Mumbai's definitive car collective."
                    bg={ASSETS.aboutBg}
                />

                <div className="max-w-7xl mx-auto px-4 py-16">
                    {/* Story */}
                    <div className="max-w-3xl mx-auto mb-16">
                        <h2 className="text-2xl font-display font-bold mb-4 uppercase text-white">Our Story</h2>
                        <div className="prose prose-invert max-w-none text-gray-400 space-y-4 font-body">
                            <p>
                                Polo GT Club was founded in 2021 by a group of passionate Volkswagen Polo GT
                                owners who wanted to create a community where enthusiasts could connect, share
                                experiences, and help each other.
                            </p>
                            <p>
                                What started as a small WhatsApp group has grown into Mumbai&apos;s largest
                                Polo GT community. We organize regular meetups,
                                track days, road trips, and provide a platform for members to buy and sell
                                parts and cars within a trusted network.
                            </p>
                            <p>
                                Our mission is simple: to celebrate the Volkswagen Polo GT and provide a
                                supportive community for every owner and enthusiast in India.
                            </p>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-[#1A1A1A] border border-white/10 p-6 text-center rounded-sm">
                            <div className="text-4xl mb-4">🤝</div>
                            <h3 className="font-display font-semibold text-lg mb-2 text-white">Community First</h3>
                            <p className="text-sm text-gray-400 font-body">
                                We believe in helping each other and building lasting friendships.
                            </p>
                        </div>
                        <div className="bg-[#1A1A1A] border border-white/10 p-6 text-center rounded-sm">
                            <div className="text-4xl mb-4">✅</div>
                            <h3 className="font-display font-semibold text-lg mb-2 text-white">Trust & Transparency</h3>
                            <p className="text-sm text-gray-400 font-body">
                                Every car listing is verified. Every transaction is within the community.
                            </p>
                        </div>
                        <div className="bg-[#1A1A1A] border border-white/10 p-6 text-center rounded-sm">
                            <div className="text-4xl mb-4">🏎️</div>
                            <h3 className="font-display font-semibold text-lg mb-2 text-white">Passion for Performance</h3>
                            <p className="text-sm text-gray-400 font-body">
                                We love the Polo GT for what it is - a true driver&apos;s car.
                            </p>
                        </div>
                    </div>

                    {/* Team */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-display font-bold text-center mb-8 uppercase text-white">Core Team</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {teamMembers.map((member) => (
                                <div key={member.name} className="bg-[#1A1A1A] border border-white/10 p-6 text-center rounded-sm">
                                    <div className="w-20 h-20 rounded-full bg-white/10 mx-auto mb-4 flex items-center justify-center text-3xl">
                                        👤
                                    </div>
                                    <h3 className="font-display font-semibold text-white">{member.name}</h3>
                                    <p className="text-sm text-red-500 mb-2 font-body">{member.role}</p>
                                    <p className="text-xs text-gray-500 font-body">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-4xl font-display font-black text-red-600 mb-2">500+</div>
                            <div className="text-gray-400 font-body text-sm uppercase tracking-wider">Active Members</div>
                        </div>
                        <div>
                            <div className="text-4xl font-display font-black text-red-600 mb-2">Mumbai</div>
                            <div className="text-gray-400 font-body text-sm uppercase tracking-wider">Base</div>
                        </div>
                        <div>
                            <div className="text-4xl font-display font-black text-red-600 mb-2">50+</div>
                            <div className="text-gray-400 font-body text-sm uppercase tracking-wider">Events Organized</div>
                        </div>
                        <div>
                            <div className="text-4xl font-display font-black text-red-600 mb-2">100+</div>
                            <div className="text-gray-400 font-body text-sm uppercase tracking-wider">Cars Sold</div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
