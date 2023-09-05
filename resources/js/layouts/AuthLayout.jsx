import React from "react";
import { usePage } from "@inertiajs/react";
import Swal from "sweetalert2";

import Sidebar from "@/components/sidebar";
import Topbar from "@/components/topbar";

function AuthLayout({ children }) {
    const { sessions } = usePage().props;

    React.useEffect(() => {
        if (sessions?.success) {
            Swal.fire({
                icon: "success",
                title: "Berhasil",
                text: sessions.success,
                showConfirmButton: true,
                confirmButtonColor: "#2c6beb",
            });
        }

        if (sessions?.error) {
            Swal.fire({
                icon: "error",
                title: "Gagal",
                text: sessions.error,
                showConfirmButton: true,
                confirmButtonColor: "2c6beb",
            });
        }
    }, [sessions]);

    return (
        <div className="relative h-full">
            <div className="hidden h-full lg:flex lg:w-72 lg:flex-col lg:fixed lg:inset-y-0 z-[50]">
                <Sidebar />
            </div>
            <main className="lg:pl-72">
                <Topbar />
                <div className="m-5">{children}</div>
            </main>
        </div>
    );
}

export default AuthLayout;
