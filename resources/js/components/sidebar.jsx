import React from "react";
import { Link, usePage } from "@inertiajs/react";

import { cn } from "@/lib/utils";
import { navigations } from "@/data/navigations";
import { Separator } from "@/components/ui/separator";

function Sidebar() {
    const { ziggy, auth, mpp } = usePage().props;

    const role = auth?.user?.role;

    const filteredNavigations = navigations.filter(
        (route) => !route.role || route.role.includes(role)
    );

    return (
        <div className="flex flex-col h-full py-4 space-y-4 text-white bg-slate-900 ">
            <div className="flex-1 px-3 py-2">
                <Link
                    href={route("dashboard")}
                    className="flex flex-col items-center justify-center text-center"
                >
                    <img
                        src={`/storage/${mpp.logo}`}
                        loading="lazy"
                        className="relative rounded-full w-44 h-44"
                    />
                    <h1 className="text-base font-bold uppercase">
                        MPP Aceh Besar
                    </h1>
                    <h2 className="text-xs">Mal Pelayanan Publik</h2>
                    <h3 className="mt-3 text-xl font-bold uppercase">
                        MAL PELAYANAN PUBLIK Kabupaten Aceh Besar
                    </h3>
                </Link>

                <Separator className="my-5" />

                <div className="space-y-1">
                    {filteredNavigations.map((route) => (
                        <div key={route.href}>
                            <Link
                                key={route.href}
                                href={route.href}
                                className={cn(
                                    "flex justify-start w-full p-3 text-sm font-medium transition duration-100 rounded-lg cursor-pointer group hover:text-white hover:bg-primary/10",
                                    ziggy.location === route.href
                                        ? "text-white bg-primary"
                                        : "text-zinc-400"
                                )}
                            >
                                <div className="flex items-center flex-1">
                                    <route.icon
                                        className={cn("h-5 w-5 mr-3")}
                                    />
                                    {route.label}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
