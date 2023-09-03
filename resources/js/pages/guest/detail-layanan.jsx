import React from "react";
import { Head, usePage } from "@inertiajs/react";
import GuestLayout from "@/layouts/GuestLayout";
import Footer from "@/components/footer";
import { Separator } from "@/components/ui/separator";

function DetailLayanan({ data }) {
    return (
        <GuestLayout>
            <Head title="Detail Layanan" />
            <div className="w-full bg-primary">
                <div className="flex flex-col items-center justify-center py-10 mx-auto text-white max-w-7xl">
                    <img
                        src={`/storage/${data.instansi.logo}`}
                        alt="Logo"
                        className="w-40 h-40 rounded-full"
                    />
                    <h1 className="mt-3 text-2xl font-bold">
                        {data.instansi.nama_instansi}
                    </h1>
                </div>
            </div>
            <div className="p-5 mx-auto mt-10 max-w-7xl">
                <h1 className="font-bold">Detail Layanan</h1>
                <Separator className="my-5 " />
                <div>
                    Nama Layanan : {data.nama_layanan} <br />
                    Deskripsi : {data.deskripsi_layanan} <br />
                </div>

                <div className="mt-5">
                    <h1 className="font-bold">Persyaratan : </h1>
                    <Separator className="my-5 " />
                    <ul className="list-decimal">
                        {data.persyaratan.map((item) => (
                            <li key={item.id}>{item.nama_persyaratan}</li>
                        ))}
                    </ul>
                </div>
            </div>

            <Footer />
        </GuestLayout>
    );
}

export default DetailLayanan;
