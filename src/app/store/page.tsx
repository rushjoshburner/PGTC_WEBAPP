import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// This would be fetched from database in production
const products = [
    {
        id: "1",
        name: "Polo GT Club T-Shirt",
        description: "Premium cotton tee with embroidered logo",
        price: 999,
        memberPrice: 799,
        image: null,
        category: "APPAREL",
        isNewArrival: true,
    },
    {
        id: "2",
        name: "GT Club Cap",
        description: "Adjustable snapback with club logo",
        price: 599,
        memberPrice: 499,
        image: null,
        category: "ACCESSORIES",
        isNewArrival: false,
    },
    {
        id: "3",
        name: "Polo GT Sticker Pack",
        description: "Set of 5 premium vinyl stickers",
        price: 299,
        memberPrice: 249,
        image: null,
        category: "STICKERS",
        isNewArrival: true,
    },
    {
        id: "4",
        name: "Club Keychain",
        description: "Metal keychain with GT logo",
        price: 399,
        memberPrice: 349,
        image: null,
        category: "ACCESSORIES",
        isNewArrival: false,
    },
];

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 0,
    }).format(price);
};

export default function StorePage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 pt-24 pb-12">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-bold mb-4">Club Merchandise</h1>
                        <p className="text-muted-foreground max-w-xl mx-auto">
                            Rep the club with official Polo GT merchandise. Members get exclusive discounts!
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <Card key={product.id} className="overflow-hidden hover:border-primary/50 transition-colors group">
                                <div className="aspect-square bg-muted relative overflow-hidden flex items-center justify-center">
                                    <span className="text-6xl">👕</span>
                                    {product.isNewArrival && (
                                        <Badge className="absolute top-3 left-3 bg-accent text-accent-foreground">
                                            New
                                        </Badge>
                                    )}
                                </div>
                                <CardContent className="p-4">
                                    <h3 className="font-semibold line-clamp-1 mb-1 group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                                        {product.description}
                                    </p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-lg font-bold text-primary">
                                            {formatPrice(product.memberPrice)}
                                        </span>
                                        <span className="text-sm text-muted-foreground line-through">
                                            {formatPrice(product.price)}
                                        </span>
                                    </div>
                                    <Badge variant="secondary" className="mt-2 text-xs">
                                        Member Price
                                    </Badge>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Coming Soon Notice */}
                    <div className="text-center mt-12 p-8 rounded-lg bg-card border border-border">
                        <h3 className="text-xl font-semibold mb-2">More Products Coming Soon!</h3>
                        <p className="text-muted-foreground">
                            We&apos;re adding new merchandise regularly. Check back soon for jackets, hoodies, and more.
                        </p>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
