"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface PageHeaderProps {
    title: string;
    subtitle: string;
    bg: string;
    parentPage?: string;
    parentLink?: string;
}

export function PageHeader({ title, subtitle, bg, parentPage = "Home", parentLink = "/" }: PageHeaderProps) {
    return (
        <div className="relative h-[40vh] w-full overflow-hidden bg-black flex items-center">
            <div className="absolute inset-0">
                <img src={bg} alt={title} className="w-full h-full object-cover opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-black/40 to-black/60" />
            </div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
                <Link
                    href={parentLink}
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-xs uppercase font-body tracking-widest"
                >
                    <ArrowLeft size={14} /> Back to {parentPage}
                </Link>
                <h1 className="text-4xl md:text-6xl font-display font-black text-white uppercase mb-2">{title}</h1>
                <p className="text-lg text-gray-400 font-body max-w-2xl">{subtitle}</p>
            </div>
        </div>
    );
}
