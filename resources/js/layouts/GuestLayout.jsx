import React from "react";
import { usePage } from "@inertiajs/react";

import Navbar from "@/components/navbar";

function GuestLayout({ children }) {
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
                confirmButtonColor: "#2c6beb",
            });
        }
    }, [sessions]);

    return (
        <main>
            <Navbar />
            <div>{children}</div>
        </main>
    );
}

export default GuestLayout;
