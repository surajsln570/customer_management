'use client';
import { useEffect, type ReactNode } from "react";
import Image from "next/image";

export default function DashboardLayout({
    children,
}: {
    children: ReactNode;
}) {

    return (
        <div className="relative min-h-screen bg-slate-50 overflow-hidden">
            {/* Watermark */}
            <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-0 select-none">
                <Image
                    src="/watermark.jpg"
                    alt="Watermark"
                    width={500}
                    height={500}
                    priority
                    className="opacity-10 w-full object-cover"
                />
            </div>

            <main className="relative z-10">
                {children}
            </main>
        </div>
    );
}