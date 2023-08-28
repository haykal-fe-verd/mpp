import React from "react";
import { Head, usePage } from "@inertiajs/react";
import GuestLayout from "@/layouts/GuestLayout";
import Footer from "@/components/footer";

function About() {
    const { mpp } = usePage().props;

    return (
        <GuestLayout>
            <Head title="Tentang MPP" />
            <div className="p-5 mx-auto max-w-7xl">
                <div className="flex flex-col items-center justify-between lg:flex-row">
                    <div className="w-full h-full">
                        <img
                            src={`/storage/${mpp?.logo}`}
                            alt="Logo"
                            className="w-[300px] h-[300px]"
                        />
                    </div>

                    <div className="w-full h-full">
                        <h1 className="text-4xl font-semibold">Apa itu MPP?</h1>
                        <p className="mt-10 text-justify">
                            {mpp.deskripsi_mpp}
                        </p>
                    </div>
                </div>
                <div className="w-full mt-20">
                    <h1 className="text-4xl font-semibold">
                        Kenapa harus MPP?
                    </h1>
                    <p className="mt-10 text-justify">{mpp.kenapa_harus_mpp}</p>
                </div>
            </div>
            <div className="mt-20 bg-primary">
                <div className="flex flex-col items-center justify-center py-20 mx-auto text-white max-w-7xl">
                    <h1 className="text-xl font-semibold">
                        Instansi mana saja yang terintegrasi?
                    </h1>

                    <p className="mt-5">
                        Kami akan terus menambah setiap layanan yang diperlukan
                        oleh masyarakat dalam satu atap di Aplikasi MPP ini.
                    </p>
                </div>
            </div>
            <Footer />
        </GuestLayout>
    );
}

export default About;
