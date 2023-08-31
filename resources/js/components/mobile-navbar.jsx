import React from "react";
import { Menu } from "lucide-react";
import { Link, usePage } from "@inertiajs/react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { navigationsGuest } from "@/data/navigations-guest";

function MobileNavbar() {
    const { mpp } = usePage().props;
    const [isMounted, setIsMounted] = React.useState(false);
    React.useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

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
                    <img
                        src={`/storage/${mpp?.logo}`}
                        alt="Logo"
                        className="w-10 h-10"
                    />
                    <h1 className="text-2xl font-bold tracking-tighter">
                        MPP Kab. Aceh Besar
                    </h1>
                </Link>
                <div className="flex flex-col mt-16 space-y-5">
                    {navigationsGuest.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className="text-sm leading-6 "
                        >
                            {item.label}
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
