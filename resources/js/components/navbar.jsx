import React from "react";
import { Link, usePage } from "@inertiajs/react";
import { Menu } from "lucide-react";

import MobileNavbar from "@/components/mobile-navbar";
import { navigationsGuest } from "@/data/navigations-guest";
import { cn } from "@/lib/utils";

function Navbar() {
    const { ziggy, mpp } = usePage().props;

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
                            src="/logo-a-besar.png"
                            alt="Logo A Besar"
                            className="w-8 h-9"
                        />
                        <img
                            src={`/storage/${mpp?.logo}`}
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
                    {navigationsGuest.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "text-sm font-semibold leading-6 text-gray-900",
                                ziggy.location === item.href ||
                                    ziggy.location.includes(route.href)
                                    ? "text-primary"
                                    : "text-gray-900"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link
                        href={route("login")}
                        className="px-4 py-2 text-sm font-semibold leading-6 text-white rounded-md bg-primary hover:bg-primary/80"
                    >
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
