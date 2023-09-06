import React from "react";
import { Head, usePage } from "@inertiajs/react";
import GuestLayout from "@/layouts/GuestLayout";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";

function DetailInstansi({ data }) {
    console.log("🚀  data:", data);
    return (
        <GuestLayout>
            <Head title="Detail Instansi" />
            <div className="w-full bg-primary">
                <div className="flex flex-col items-center justify-center py-10 mx-auto text-white max-w-7xl">
                    <img
                        src={`/storage/${data.logo}`}
                        alt="Logo"
                        className="w-40 h-40 rounded-full"
                    />
                    <h1 className="mt-3 text-2xl font-bold">
                        {data.nama_instansi}
                    </h1>
                    <p>{data.profil_instansi}</p>
                </div>
            </div>
            <div className="p-5 mx-auto">
                <p className="">{data.telepon}</p>
                <p className="">{data.faks}</p>
                <p className="">{data.email}</p>
                <p className="">{data.website}</p>
                <p className="">{data.alamat}</p>
            </div>

            <Footer />
        </GuestLayout>
    );
}

export default DetailInstansi;
