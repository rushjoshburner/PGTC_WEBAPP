"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our different product categories
export type ProductType = 'trinity' | 'torque' | 'parts' | 'merch';

export interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    image: string;
    tag?: string; // e.g. "Performance", "Verified"
    category: ProductType;
}

interface ShopContextType {
    trinityProducts: Product[];
    torqueCars: Product[];
    usedParts: Product[];
    merchProducts: Product[];
    addProduct: (product: Product) => void;
    deleteProduct: (id: string, category: ProductType) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Initial Data
const INITIAL_TRINITY: Product[] = [
    { id: 't1', name: "Stage 1 & 2 Remaps", description: "Custom ECU tuning for Indian fuel quality. +35HP gains.", price: "From ₹18,000", image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2600&auto=format&fit=crop", category: 'trinity' },
    { id: 't2', name: "Suspension Setup", description: "Authorized dealers for Bilstein, KW, and Cobra lowering springs.", price: "On Request", image: "", category: 'trinity' },
    { id: 't3', name: "Exhaust Systems", description: "Borla, Remus, and custom full-system fabrication.", price: "From ₹25,000", image: "", category: 'trinity' },
    { id: 't4', name: "Big Turbo Kits", description: "IS20/IS38 swaps for the 1.0 TSI and 1.2 TSI engines.", price: "From ₹1.2L", image: "", category: 'trinity' }
];

const INITIAL_TORQUE: Product[] = [
    { id: 'c1', name: "2016 Polo GTI (1.8)", description: "Stage 2 APR, KW V3, 45k kms", price: "₹16.5L", image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2500&auto=format&fit=crop", category: 'torque', tag: 'Verified' },
    { id: 'c2', name: "2019 Polo GT TSI", description: "Stock, Single Owner, 22k kms", price: "₹9.2L", image: "https://images.unsplash.com/photo-1609520505218-742184b3b223?q=80&w=2670&auto=format&fit=crop", category: 'torque', tag: 'Verified' },
    { id: 'c3', name: "2015 Polo GT TDI", description: "Stage 1 Diesel, 17\" Rims, 60k kms", price: "₹6.8L", image: "https://images.unsplash.com/photo-1503376763036-066120622c74?q=80&w=2670&auto=format&fit=crop", category: 'torque', tag: 'Verified' }
];

const INITIAL_MERCH: Product[] = [
    { id: 'm1', name: "PGTC 'Stealth' Hoodie", description: "Heavyweight cotton, oversized fit.", price: "₹2,499", image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?q=80&w=2670&auto=format&fit=crop", category: 'merch' },
    { id: 'm2', name: "Box Logo Tee - Black", description: "Classic fit, screen printed.", price: "₹999", image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2670&auto=format&fit=crop", category: 'merch' },
    { id: 'm3', name: "Remove Before Flight Keytag", description: "Embroidered keytag.", price: "₹299", image: "https://images.unsplash.com/photo-1542282088-fe8426682b8f?q=80&w=2500&auto=format&fit=crop", category: 'merch' },
    { id: 'm4', name: "Windshield Banner", description: "Matte white vinyl.", price: "₹499", image: "https://images.unsplash.com/photo-1609520505218-742184b3b223?q=80&w=2670&auto=format&fit=crop", category: 'merch' }
];

const INITIAL_PARTS: Product[] = []; // Initially empty/restricted

export function ShopProvider({ children }: { children: ReactNode }) {
    const [trinityProducts, setTrinityProducts] = useState<Product[]>(INITIAL_TRINITY);
    const [torqueCars, setTorqueCars] = useState<Product[]>(INITIAL_TORQUE);
    const [usedParts, setUsedParts] = useState<Product[]>(INITIAL_PARTS);
    const [merchProducts, setMerchProducts] = useState<Product[]>(INITIAL_MERCH);

    const addProduct = (product: Product) => {
        switch (product.category) {
            case 'trinity':
                setTrinityProducts([...trinityProducts, product]);
                break;
            case 'torque':
                setTorqueCars([...torqueCars, product]);
                break;
            case 'parts':
                setUsedParts([...usedParts, product]);
                break;
            case 'merch':
                setMerchProducts([...merchProducts, product]);
                break;
        }
    };

    const deleteProduct = (id: string, category: ProductType) => {
        switch (category) {
            case 'trinity':
                setTrinityProducts(trinityProducts.filter(p => p.id !== id));
                break;
            case 'torque':
                setTorqueCars(torqueCars.filter(p => p.id !== id));
                break;
            case 'parts':
                setUsedParts(usedParts.filter(p => p.id !== id));
                break;
            case 'merch':
                setMerchProducts(merchProducts.filter(p => p.id !== id));
                break;
        }
    };

    return (
        <ShopContext.Provider value={{ trinityProducts, torqueCars, usedParts, merchProducts, addProduct, deleteProduct }}>
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
