"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    sku?: string;
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
}

interface ShopContextType {
    trinityProducts: Product[];
    merchProducts: Product[];
    isLoading: boolean;
    cart: CartItem[];
    cartTotal: number;
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, qty: number) => void;
    clearCart: () => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
    const [trinityProducts, setTrinityProducts] = useState<Product[]>([]);
    const [merchProducts, setMerchProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [cart, setCart] = useState<CartItem[]>([]);

    useEffect(() => {
        fetchProducts();
        // Load cart from local storage if needed
        const savedCart = localStorage.getItem('pgtc_cart');
        if (savedCart) setCart(JSON.parse(savedCart));
    }, []);

    useEffect(() => {
        localStorage.setItem('pgtc_cart', JSON.stringify(cart));
    }, [cart]);

    const fetchProducts = async () => {
        try {
            const res = await fetch("/api/store/products");
            if (res.ok) {
                const data = await res.json();
                const allProducts: any[] = data.products || [];

                const transformed = allProducts.map(p => ({
                    id: p.id,
                    name: p.name,
                    description: p.description,
                    price: p.price, // Keep as number
                    image: parseImage(p.images),
                    category: p.category
                }));

                setTrinityProducts(transformed.filter((p: Product) => p.category === 'TRINITY'));
                setMerchProducts(transformed.filter((p: Product) => ['APPAREL', 'ACCESSORIES', 'STICKERS'].includes(p.category)));
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const parseImage = (json: string) => {
        try {
            const arr = JSON.parse(json);
            return arr[0] || "";
        } catch {
            return json || "";
        }
    };

    const addToCart = (item: CartItem) => {
        setCart(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, item];
        });
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(i => i.id !== id));
    };

    const updateQuantity = (id: string, qty: number) => {
        if (qty < 1) return;
        setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
    };

    const clearCart = () => setCart([]);

    const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

    return (
        <ShopContext.Provider value={{
            trinityProducts,
            merchProducts,
            isLoading,
            cart,
            cartTotal,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart
        }}>
            {children}
        </ShopContext.Provider>
    );
}

export function useShop() {
    const context = useContext(ShopContext);
    if (context === undefined) {
        throw new Error('useShop must be used within a ShopProvider');
    }
    return context;
}
