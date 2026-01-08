"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Menu, X, User, LogOut, LayoutDashboard, Users, ShoppingBag } from "lucide-react";
import { useState, useEffect } from "react";

const navLinks = [
    { href: "/store", label: "PGTC Merch" },
    { href: "/partners", label: "Trinity Car Parts" },
    { href: "/classifieds/cars", label: "Torque Shift Motors" },
    { href: "/classifieds", label: "PGTC Buy Sell" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
];

export function Header() {
    const { data: session } = useSession();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/10' : 'bg-black/50 backdrop-blur-sm'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 flex items-center gap-3 cursor-pointer group">
                        <div className="relative w-12 h-12 flex items-center justify-center">
                            <Image
                                src="/pgtc-logo.png"
                                alt="PGTC Logo"
                                width={48}
                                height={48}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-white leading-none tracking-wider">PGTC</span>
                            <span className="text-[10px] text-gray-400 tracking-[0.2em] uppercase font-body">Mumbai</span>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="text-gray-300 hover:text-white px-2 py-2 rounded-md text-xs font-medium transition-colors font-body uppercase tracking-wide whitespace-nowrap"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    {/* Auth Section */}
                    <div className="flex items-center gap-3">
                        {session ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                                        <Avatar className="h-9 w-9">
                                            <AvatarFallback className="bg-primary text-primary-foreground font-display">
                                                {session.user?.name?.charAt(0).toUpperCase() || "U"}
                                            </AvatarFallback>
                                        </Avatar>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56 bg-[#1A1A1A] border-white/10">
                                    <div className="flex items-center justify-start gap-2 p-2">
                                        <div className="flex flex-col space-y-1 leading-none">
                                            <p className="font-display font-medium">{session.user?.name}</p>
                                            <p className="text-xs text-muted-foreground font-body">{session.user?.email}</p>
                                        </div>
                                    </div>
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem asChild>
                                        <Link href="/dashboard" className="cursor-pointer font-body">
                                            <LayoutDashboard className="mr-2 h-4 w-4" />
                                            Dashboard
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/profile" className="cursor-pointer font-body">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    {session.user?.role === "ADMIN" && (
                                        <DropdownMenuItem asChild>
                                            <Link href="/admin" className="cursor-pointer font-body">
                                                <Users className="mr-2 h-4 w-4" />
                                                Admin Panel
                                            </Link>
                                        </DropdownMenuItem>
                                    )}
                                    <DropdownMenuSeparator className="bg-white/10" />
                                    <DropdownMenuItem
                                        onClick={() => signOut()}
                                        className="cursor-pointer text-red-500 focus:text-red-500 font-body"
                                    >
                                        <LogOut className="mr-2 h-4 w-4" />
                                        Sign Out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <>
                                <Link href="/login" className="hidden sm:block">
                                    <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white font-body">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/register">
                                    <button className="bg-[#E7222E] hover:bg-red-700 text-white px-6 py-2 rounded-sm font-display text-xs font-bold uppercase tracking-wider skew-x-[-10deg] transition-all hover:scale-105">
                                        <span className="block skew-x-[10deg]">Join Club</span>
                                    </button>
                                </Link>
                            </>
                        )}

                        {/* Cart Icon */}
                        <Link href="/cart" className="relative group p-2 text-gray-400 hover:text-white transition-colors">
                            <ShoppingBag className="h-5 w-5" />
                            {/* We could use context here to show count, but for simplicity let's just show the icon or we can wrap header in context */}
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="md:hidden text-gray-400 hover:text-white p-2"
                        >
                            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileOpen && (
                <div className="md:hidden bg-black/95 backdrop-blur-xl border-b border-white/10">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-gray-300 hover:text-white block px-3 py-4 rounded-md text-base font-bold font-display uppercase border-b border-white/5"
                            >
                                {link.label}
                            </Link>
                        ))}
                        {!session && (
                            <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="text-gray-300 hover:text-white block px-3 py-4 rounded-md text-base font-bold font-display uppercase border-b border-white/5"
                            >
                                Sign In
                            </Link>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}
