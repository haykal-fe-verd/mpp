import { navigationsGuest } from "@/data/navigations-guest";
import { Link } from "@inertiajs/react";
import React from "react";

function Footer() {
    return (
        <footer className="border-t">
            {/* <div className="flex flex-col items-start w-full px-5 py-20 mx-auto lg:items-center lg:justify-between lg:flex-row lg:px-40">
                <h1 className="text-3xl font-bold">MPP Kab. Aceh Besar</h1>
                <div>
                    <p className="mt-10 font-semibold">Useful links</p>
                    <ul className="pl-5 list-disc">
                        {navigationsGuest.map((item) => (
                            <li key={item.label}>
                                <Link href={item.href}>{item.label}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div> */}
            <div className="flex items-center justify-center py-5 text-white capitalize bg-primary">
                Copyright &copy; RIDHATUR RAHMAH {new Date().getFullYear()}
            </div>
        </footer>
    );
}

export default Footer;
