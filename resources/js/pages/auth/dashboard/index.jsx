import React from "react";
import { Head, usePage } from "@inertiajs/react";

import AuthLayout from "@/layouts/AuthLayout";
import AdminDashboard from "./partials/admin";
import MasyarakatDashboard from "./partials/masyarakat";

function Dashboard({
    totalInstansi,
    totalLayanan,
    totalBerita,
    totalPengaduan,
    chartAdmin,
    totalPermohonanSaya,
    chartMasyarakat,
    bulan,
}) {
    const { auth } = usePage().props;
    return (
        <AuthLayout>
            <Head title="Dashboard" />
            {auth.user?.role === "admin" ? (
                <AdminDashboard
                    totalInstansi={totalInstansi}
                    totalLayanan={totalLayanan}
                    totalBerita={totalBerita}
                    totalPengaduan={totalPengaduan}
                    chartAdmin={chartAdmin}
                    bulan={bulan}
                />
            ) : (
                <MasyarakatDashboard
                    totalInstansi={totalInstansi}
                    totalLayanan={totalLayanan}
                    totalPermohonanSaya={totalPermohonanSaya}
                    chartMasyarakat={chartMasyarakat}
                    bulan={bulan}
                />
            )}
        </AuthLayout>
    );
}

export default Dashboard;
