import React from "react";
import { Head, Link } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { pickBy } from "lodash";

import GuestLayout from "@/layouts/GuestLayout";
import Footer from "@/components/footer";
import Pagination from "@/components/pagination";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import moment from "moment/moment";

function DetailBerita({ berita }) {
    return (
        <GuestLayout>
            <Head title="Berita" />
            <div className="relative">
                <div className="grid grid-cols-3 gap-5 p-10">
                    <div className="col-span-3 ">
                        <div href={route("home.berita.detail", berita.slug)}>
                            <div className="flex flex-col p-5 mb-10 bg-white rounded-md shadow-lg">
                                <img
                                    src={`/storage/${berita.thumbnail}`}
                                    alt=""
                                    className="object-cover w-full h-40 lg:h-[400px] rounded-md bg-slate-200 "
                                />
                                <h1 className="mt-5 text-xl font-bold">
                                    {berita.judul}
                                </h1>
                                <h2 className="text-xs underline text-primary">
                                    {moment(berita.created_at).format(
                                        "DD-MM-YYYY"
                                    )}{" "}
                                    | Admin
                                </h2>
                                <div
                                    className="mt-5 text-justify"
                                    dangerouslySetInnerHTML={{
                                        __html: berita.isi,
                                    }}
                                />
                            </div>
                        </div>

                        <Link
                            href={route("home.berita.index")}
                            className="px-3 py-1 text-white bg-red-500 rounded-md"
                        >
                            Kembali
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </GuestLayout>
    );
}

export default DetailBerita;
