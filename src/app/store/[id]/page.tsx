"use client";

import { useState, useEffect, use } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { useShop } from "@/context/ShopContext";
import { Loader2, ShoppingCart, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

// Use 'any' to bypass complexity of unwrapping searchParams in Next.js 15 for now if needed,
// but standard params usage is:
interface ProductPageProps {
    params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
    // Unwrap params using React.use()
    const { id } = use(params);

    const { addToCart } = useShop();
    const [product, setProduct] = useState<any>(null); // Ideally separate fetch
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // In a real app with large inventory, we'd fetch /api/store/products/${id}
        // For now, let's try to find it in the context or fetch it if context is empty
        // But since we are on a dedicated page, fetching fresh data is safer.
        fetchProduct();
    }, [id]);

    const fetchProduct = async () => {
        try {
            // We will create this specific endpoint or just fetch all and find (fetching all is inefficient but works for small inventory)
            // Let's rely on the API we made: /api/store/products
            // Or better: filter client side if we assume ShopContext has it?
            // Let's do a direct fetch for reliability:
            const res = await fetch(`/api/store/products`);
            if (res.ok) {
                const data = await res.json();
                const found = data.products.find((p: any) => p.id === id);
                setProduct(found);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
                <Footer />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <h2 className="text-xl font-bold">Product not found</h2>
                    <Link href="/store"><Button>Return to Store</Button></Link>
                </div>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <PageHeader
                title={product.name}
                subtitle={product.category}
                bg="/images/hero-bg.jpg"
                parentPage="Store"
                parentLink="/store"
            />

            <main className="flex-1 py-12 container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                            <img
                                src={product.images || "/images/placeholder-product.jpg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                            <p className="text-2xl font-bold text-primary">₹{product.price.toLocaleString()}</p>
                            <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
                        </div>

                        <div className="prose max-w-none text-gray-400">
                            <p>{product.description}</p>
                        </div>

                        <div className="pt-6 border-t border-gray-800">
                            <div className="flex flex-col gap-4">
                                <Button
                                    size="lg"
                                    className="w-full md:w-auto text-lg px-8"
                                    onClick={() => {
                                        addToCart({
                                            id: product.id,
                                            name: product.name,
                                            price: product.price,
                                            image: product.images,
                                            quantity: 1
                                        });
                                        toast.success("Added to cart!");
                                    }}
                                >
                                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                                </Button>
                                <p className="text-sm text-gray-500 flex items-center">
                                    <Check className="h-4 w-4 mr-2 text-green-500" />
                                    In stock and ready to ship
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
