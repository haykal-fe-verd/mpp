import React from "react";
import { Link } from "@inertiajs/react";
import { Menu } from "lucide-react";

import MobileNavbar from "@/components/mobile-navbar";

function Navbar() {
    const navigation = [
        { name: "Beranda", href: route("home") },
        { name: "Daftar Instansi", href: "#" },
        { name: "Daftar Layanan", href: "#" },
        { name: "Tentang MPP", href: "#" },
        { name: "Daftar", href: route("register") },
    ];

    return (
        <header className="sticky inset-x-0 top-0 z-50 bg-white shadow-md">
            <nav
                className="flex items-center justify-between p-6 lg:px-8"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link
                        href={route("home")}
                        className="-m-1.5 p-1.5 flex items-center gap-5"
                    >
                        <img
                            src="/logo.jpeg"
                            alt="Logo"
                            className="w-10 h-10"
                        />
                        <h1 className="text-2xl font-bold tracking-tighter">
                            MPP Kab. Aceh Besar
                        </h1>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <MobileNavbar />
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-gray-900"
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link
                        href={route("login")}
                        className="text-sm font-semibold leading-6 text-gray-900"
                    >
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
