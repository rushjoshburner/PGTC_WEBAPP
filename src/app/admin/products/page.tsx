"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import ImageUpload from "@/components/ui/image-upload";

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    sku: string;
}

export default function AdminProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        price: "",
        description: "",
        category: "APPAREL",
        imageUrl: "",
        sku: ""
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        const res = await fetch("/api/admin/products");
        if (res.ok) {
            const data = await res.json();
            setProducts(data.products || []);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("/api/admin/products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                setIsCreating(false);
                fetchProducts();
                setFormData({ name: "", price: "", description: "", category: "APPAREL", imageUrl: "", sku: "" });
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Product Management</h1>
                <Button onClick={() => setIsCreating(!isCreating)}>
                    <Plus className="mr-2 h-4 w-4" /> Add Product
                </Button>
            </div>

            {isCreating && (
                <Card className="mb-8">
                    <CardHeader><CardTitle>New Product</CardTitle></CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input placeholder="Name" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                            <Input placeholder="Price" type="number" value={formData.price} onChange={e => setFormData({ ...formData, price: e.target.value })} required />
                            <Input placeholder="Description" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} required />
                            <ImageUpload
                                value={formData.imageUrl}
                                onChange={(url) => setFormData({ ...formData, imageUrl: url })}
                                onRemove={() => setFormData({ ...formData, imageUrl: "" })}
                            />
                            {/* <Input placeholder="Image URL" value={formData.imageUrl} onChange={e => setFormData({ ...formData, imageUrl: e.target.value })} /> */}
                            <Input placeholder="SKU (Optional)" value={formData.sku} onChange={e => setFormData({ ...formData, sku: e.target.value })} />
                            <select
                                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                value={formData.category}
                                onChange={e => setFormData({ ...formData, category: e.target.value })}
                            >
                                <option value="APPAREL">Apparel</option>
                                <option value="ACCESSORIES">Accessories</option>
                                <option value="STICKERS">Stickers</option>
                                <option value="TRINITY">Trinity (Service/Part)</option>
                            </select>
                            <Button type="submit">Save Product</Button>
                        </form>
                    </CardContent>
                </Card>
            )}

            <div className="grid gap-4">
                {products.map(p => (
                    <Card key={p.id}>
                        <CardContent className="flex justify-between items-center p-4">
                            <div>
                                <div className="font-bold">{p.name}</div>
                                <div className="text-sm text-gray-500">{p.sku} • {p.category}</div>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="font-bold">₹{p.price}</span>
                                <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
