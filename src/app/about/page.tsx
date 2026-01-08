import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";

const teamMembers = [
    {
        name: "Raj Mehta",
        role: "Founder & President",
        bio: "Polo GT owner since 2015. Started the club to bring together enthusiasts across India.",
        image: null,
    },
    {
        name: "Amit Sharma",
        role: "Vice President",
        bio: "Automotive engineer with a passion for performance tuning and track days.",
        image: null,
    },
    {
        name: "Priya Patel",
        role: "Events Coordinator",
        bio: "Organizes meetups, drives, and track events across the country.",
        image: null,
    },
    {
        name: "Vikram Singh",
        role: "Technical Lead",
        bio: "Your go-to person for all technical queries about the GT TSI and TDI.",
        image: null,
    },
];

export default function AboutPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-4">
                    {/* Hero */}
                    <div className="text-center mb-16">
                        <h1 className="text-4xl md:text-5xl font-display font-black mb-6 uppercase">About Polo GT Club</h1>
                        <p className="text-lg text-muted-foreground max-w-2xl mx-auto font-body">
                            India&apos;s premier community for Volkswagen Polo GT enthusiasts.
                            Connecting owners, sharing knowledge, and celebrating the machine we all love.
                        </p>
                    </div>

                    {/* Story */}
                    <div className="max-w-3xl mx-auto mb-16">
                        <h2 className="text-2xl font-display font-bold mb-4 uppercase">Our Story</h2>
                        <div className="prose prose-invert max-w-none text-muted-foreground space-y-4 font-body">
                            <p>
                                Polo GT Club was founded in 2018 by a group of passionate Volkswagen Polo GT
                                owners who wanted to create a community where enthusiasts could connect, share
                                experiences, and help each other.
                            </p>
                            <p>
                                What started as a small WhatsApp group has grown into India&apos;s largest
                                Polo GT community with members across 20+ cities. We organize regular meetups,
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
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="text-4xl mb-4">🤝</div>
                                <h3 className="font-display font-semibold text-lg mb-2">Community First</h3>
                                <p className="text-sm text-muted-foreground font-body">
                                    We believe in helping each other and building lasting friendships.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="text-4xl mb-4">✅</div>
                                <h3 className="font-display font-semibold text-lg mb-2">Trust & Transparency</h3>
                                <p className="text-sm text-muted-foreground font-body">
                                    Every car listing is verified. Every transaction is within the community.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="text-center">
                            <CardContent className="p-6">
                                <div className="text-4xl mb-4">🏎️</div>
                                <h3 className="font-display font-semibold text-lg mb-2">Passion for Performance</h3>
                                <p className="text-sm text-muted-foreground font-body">
                                    We love the Polo GT for what it is - a true driver&apos;s car.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Team */}
                    <div className="mb-16">
                        <h2 className="text-2xl font-display font-bold text-center mb-8 uppercase">Core Team</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {teamMembers.map((member) => (
                                <Card key={member.name} className="text-center">
                                    <CardContent className="p-6">
                                        <div className="w-20 h-20 rounded-full bg-primary/20 mx-auto mb-4 flex items-center justify-center text-3xl">
                                            👤
                                        </div>
                                        <h3 className="font-display font-semibold">{member.name}</h3>
                                        <p className="text-sm text-primary mb-2">{member.role}</p>
                                        <p className="text-xs text-muted-foreground font-body">{member.bio}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        <div>
                            <div className="text-4xl font-display font-black text-primary mb-2">500+</div>
                            <div className="text-muted-foreground font-body text-sm uppercase tracking-wider">Active Members</div>
                        </div>
                        <div>
                            <div className="text-4xl font-display font-black text-primary mb-2">20+</div>
                            <div className="text-muted-foreground font-body text-sm uppercase tracking-wider">Cities</div>
                        </div>
                        <div>
                            <div className="text-4xl font-display font-black text-primary mb-2">50+</div>
                            <div className="text-muted-foreground font-body text-sm uppercase tracking-wider">Events Organized</div>
                        </div>
                        <div>
                            <div className="text-4xl font-display font-black text-primary mb-2">100+</div>
                            <div className="text-muted-foreground font-body text-sm uppercase tracking-wider">Cars Sold</div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
