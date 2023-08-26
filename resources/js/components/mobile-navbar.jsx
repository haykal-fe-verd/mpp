import React from "react";
import { Menu } from "lucide-react";
import { Link } from "@inertiajs/react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function MobileNavbar() {
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const navigation = [
        { name: "Beranda", href: route("home") },
        { name: "Daftar Instansi", href: "#" },
        { name: "Daftar Layanan", href: "#" },
        { name: "Tentang MPP", href: "#" },
        { name: "Daftar", href: route("register") },
    ];

    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="md:hidden" />
            </SheetTrigger>
            <SheetContent side="left" className="p-5 text-white bg-blue-950">
                <Link
                    href={route("home")}
                    className="-m-1.5 p-1.5 flex items-center gap-5"
                >
                    <img src="/logo.jpeg" alt="Logo" className="w-10 h-10" />
                    <h1 className="text-2xl font-bold tracking-tighter">
                        MPP Kab. Aceh Besar
                    </h1>
                </Link>
                <div className="flex flex-col mt-16 space-y-5">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm leading-6 "
                        >
                            {item.name}
                        </Link>
                    ))}

                    <Link
                        href={route("login")}
                        className="text-sm font-semibold leading-6"
                    >
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </SheetContent>
        </Sheet>
    );
}

export default MobileNavbar;
