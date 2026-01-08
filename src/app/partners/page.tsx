import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, MapPin, Phone, Star } from "lucide-react";

// Trinity Car Parts and other performance partners
const partners = [
    {
        id: "trinity",
        name: "Trinity Car Parts",
        type: "Performance Parts",
        description: "Premium performance parts and tuning solutions for Polo GT TSI & TDI. Authorized dealer for top brands.",
        services: ["Exhaust Systems", "Air Intakes", "Suspension", "ECU Tuning", "Brake Upgrades"],
        location: "Mumbai, Maharashtra",
        phone: "+91 98765 43210",
        website: "https://trinitycarparts.com",
        rating: 4.8,
        isFeatured: true,
        discount: "10% off for club members",
    },
    {
        id: "stage3",
        name: "Stage 3 Motorsports",
        type: "Tuning Specialist",
        description: "Expert ECU remapping and Stage 1/2/3 upgrades for VW Group vehicles.",
        services: ["ECU Remapping", "Stage Upgrades", "Dyno Testing", "Custom Tunes"],
        location: "Bangalore, Karnataka",
        phone: "+91 99887 76655",
        website: "https://stage3motorsports.in",
        rating: 4.9,
        isFeatured: true,
        discount: "Free dyno run with Stage 1+",
    },
    {
        id: "racecraft",
        name: "RaceCraft India",
        type: "Suspension & Handling",
        description: "Specialists in coilovers, lowering springs, and handling upgrades.",
        services: ["Coilovers", "Lowering Springs", "Sway Bars", "Wheel Alignment"],
        location: "Delhi NCR",
        phone: "+91 88776 65544",
        website: "https://racecraft.in",
        rating: 4.7,
        isFeatured: false,
        discount: "5% off on orders above ₹25,000",
    },
    {
        id: "autohausgt",
        name: "AutoHaus GT",
        type: "Service Center",
        description: "Authorized service and maintenance for Volkswagen vehicles with genuine parts.",
        services: ["Full Service", "DSG Service", "AC Service", "Brake Service"],
        location: "Pune, Maharashtra",
        phone: "+91 77665 54433",
        website: "https://autohausgt.com",
        rating: 4.6,
        isFeatured: false,
        discount: "15% on first service",
    },
];

export default function PartnersPage() {
    const featuredPartners = partners.filter((p) => p.isFeatured);
    const otherPartners = partners.filter((p) => !p.isFeatured);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold mb-4">Performance Partners</h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Trusted workshops and parts suppliers recommended by the Polo GT community.
                            Members get exclusive discounts!
                        </p>
                    </div>

                    {/* Featured Partners */}
                    <div className="mb-12">
                        <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                            <Star className="h-5 w-5 text-yellow-500" />
                            Featured Partners
                        </h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {featuredPartners.map((partner) => (
                                <Card key={partner.id} className="overflow-hidden border-primary/30">
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold">{partner.name}</h3>
                                                <Badge variant="secondary" className="mt-1">{partner.type}</Badge>
                                            </div>
                                            <div className="flex items-center gap-1 text-yellow-500">
                                                <Star className="h-4 w-4 fill-current" />
                                                <span className="font-medium">{partner.rating}</span>
                                            </div>
                                        </div>

                                        <p className="text-muted-foreground mb-4">{partner.description}</p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {partner.services.map((service) => (
                                                <Badge key={service} variant="outline" className="text-xs">
                                                    {service}
                                                </Badge>
                                            ))}
                                        </div>

                                        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20 mb-4">
                                            <p className="text-sm text-green-500 font-medium">🎁 {partner.discount}</p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row gap-3 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                {partner.location}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Phone className="h-4 w-4" />
                                                {partner.phone}
                                            </span>
                                        </div>

                                        <a href={partner.website} target="_blank" rel="noopener noreferrer" className="mt-4 block">
                                            <Button className="w-full gradient-primary border-0">
                                                Visit Website
                                                <ExternalLink className="ml-2 h-4 w-4" />
                                            </Button>
                                        </a>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Other Partners */}
                    <div>
                        <h2 className="text-xl font-semibold mb-6">All Partners</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherPartners.map((partner) => (
                                <Card key={partner.id}>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-start mb-3">
                                            <h3 className="font-semibold">{partner.name}</h3>
                                            <div className="flex items-center gap-1 text-yellow-500 text-sm">
                                                <Star className="h-3 w-3 fill-current" />
                                                <span>{partner.rating}</span>
                                            </div>
                                        </div>

                                        <Badge variant="secondary" className="mb-3 text-xs">{partner.type}</Badge>

                                        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                            {partner.description}
                                        </p>

                                        <div className="p-2 rounded bg-green-500/10 mb-4">
                                            <p className="text-xs text-green-500">{partner.discount}</p>
                                        </div>

                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mb-4">
                                            <MapPin className="h-3 w-3" />
                                            {partner.location}
                                        </div>

                                        <a href={partner.website} target="_blank" rel="noopener noreferrer">
                                            <Button variant="outline" size="sm" className="w-full">
                                                View Details
                                                <ExternalLink className="ml-2 h-3 w-3" />
                                            </Button>
                                        </a>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Become Partner CTA */}
                    <div className="mt-12 text-center p-8 rounded-lg bg-card border border-border">
                        <h3 className="text-xl font-semibold mb-2">Want to Partner with Polo GT Club?</h3>
                        <p className="text-muted-foreground mb-4">
                            Get exposure to 500+ active Polo GT owners across India
                        </p>
                        <a href="mailto:partners@pologtclub.com">
                            <Button variant="outline">Contact Us</Button>
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
