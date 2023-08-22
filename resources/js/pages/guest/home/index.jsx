import React from "react";
import { Head, Link } from "@inertiajs/react";
import { BadgeCheck, Search, Smartphone, Volume2 } from "lucide-react";

import GuestLayout from "@/layouts/GuestLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function Home() {
    return (
        <GuestLayout>
            <Head title="Home" />
            {/* hero */}
            <section className="grid items-center grid-cols-12 gap-5 m-10 lg:my-40">
                <div className="col-span-12 lg:col-span-4 lg:col-start-2">
                    <h2 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-primary">
                        Mal Pelayanan Publik Kab. Aceh Besar
                    </h2>
                    <p className="mt-5 text-muted-foreground">
                        tempat berlangsungnya penyelenggaraan pelayanan publik
                        dalam rangka menyediakan pelayanan yang cepat, mudah,
                        terjangkau dan nyaman
                    </p>
                </div>
                <div className="col-span-12 lg:col-span-4 lg:col-start-8">
                    <Label
                        htmlFor="search"
                        className={cn(
                            "bg-primary text-white py-1 px-4 rounded-md"
                        )}
                    >
                        Layanan apa yang anda butuhkan?
                    </Label>
                    <div className="relative w-full rounded-md ">
                        <button
                            type="button"
                            className="absolute inset-y-0 left-0 flex items-center p-5 rounded-tl-md rounded-bl-md bg-primary"
                        >
                            <Search className="text-white" />
                        </button>
                        <Input
                            type="search"
                            id="search"
                            name="search"
                            placeholder="Cari layanan atau instansi ..."
                            className={cn("h-16 mt-2 shadow-lg pl-20")}
                        />
                    </div>
                    <div className="flex items-center justify-between mt-5 ">
                        <Link href="#" className="flex flex-col text-center">
                            <h1 className="text-3xl font-bold text-primary">
                                21
                            </h1>
                            <p className="mt-2">Instansi</p>
                        </Link>
                        <Link href="#" className="flex flex-col text-center">
                            <h1 className="text-3xl font-bold text-primary">
                                1000
                            </h1>
                            <p className="mt-2">Layanan</p>
                        </Link>
                        <div className="flex flex-col text-center">
                            <h1 className="text-3xl font-bold text-primary">
                                100000
                            </h1>
                            <p className="mt-2">Masyarakat Terlayani</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* alur */}
            <section className="py-20 text-center text-white bg-primary lg:px-72">
                <h1 className="text-5xl font">Bagaimana Alur Layanannya ?</h1>
                <div className="relative flex flex-col items-center justify-between w-full gap-10 mt-20 lg:flex-row">
                    <div className="flex flex-col items-center justify-center text-center">
                        <Smartphone className="w-20 h-20" />
                        <h5 className="mt-10 text-xl font-semibold">
                            Daftar Antrian
                        </h5>
                        <p>
                            Anda dapat mendaftar secara online menggunakan
                            aplikasi web
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <Volume2 className="w-20 h-20" />
                        <h5 className="mt-10 text-xl font-semibold">
                            Menunggu Panggilan
                        </h5>
                        <p>
                            Pemberitahuan panggilan dapat dilakukan secara
                            audio, visual dan notif di email
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <BadgeCheck className="w-20 h-20" />
                        <h5 className="mt-10 text-xl font-semibold">Selesai</h5>
                        <p>
                            Selamat layanan yang anda butuhkan sudah terlayani
                        </p>
                    </div>
                </div>
            </section>

            {/* daftar instansi */}
            <section className="py-20 text-center lg:px-72">
                <h1 className="text-5xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-primary via-sky-500 to-black">
                    Daftar Instansi Tersedia
                </h1>

                <div className="flex items-center justify-center p-5 mt-20">
                    <ScrollArea className="border rounded-md shadow-2xl shadow-primary/20 border-primary">
                        <div className="flex w-full p-5 space-x-10 rounded-md">
                            {[...Array(10)].map((item) => (
                                <Card
                                    className={cn(
                                        "w-[360px] lg:w-96 text-center border-primary"
                                    )}
                                >
                                    <CardHeader
                                        className={cn(
                                            "flex items-center gap-5"
                                        )}
                                    >
                                        <CardTitle>Nama Instansi</CardTitle>
                                        <img
                                            src="/logo.png"
                                            className="rounded-full w-36 h-36"
                                        />
                                    </CardHeader>
                                    <CardContent>
                                        <p>Descripsi Instansi</p>
                                        <p className="px-4 py-2 mt-5 text-center text-white rounded-md bg-primary">
                                            Total Pelayanan
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </section>

            {/* pengaduan/laporan */}
            <section className="relative flex items-center justify-center h-screen lg:h-[700px]">
                <img
                    src="/background.jpeg"
                    alt=""
                    className="absolute inset-0 object-cover object-right w-full h-full lg:object-fill -z-10"
                />
                <div className="absolute inset-0 hidden w-full h-full lg:block backdrop-blur-sm -z-10"></div>
                <div className="p-10">
                    <h1 className="text-6xl font-semibold text-white">
                        Mal Pelayanan Publik <br /> Kab. Aceh Besar
                    </h1>
                    <p className="my-10 text-justify text-muted">
                        Melayani tampa pungli dan gratifikasi, apabila menemukan
                        pelayanan yang menyimpang silahkan melaporkan melalui
                        menu pengaduan atau klik tombol dibawah ini.
                    </p>
                    <Link
                        href="#"
                        className="px-4 py-2 text-white border border-red-500 rounded-md hover:shadow-lg hover:shadow-red-500/50"
                    >
                        Laporkan
                    </Link>
                </div>
            </section>

            {/* footer */}
            <footer>
                <div className="flex flex-col items-start w-full px-5 py-20 mx-auto lg:items-center lg:justify-between lg:flex-row lg:px-40">
                    <h1 className="text-3xl font-bold">MPP Kab. Aceh Besar</h1>
                    <div>
                        <p className="mt-10 font-semibold">Useful links</p>
                        <ul className="pl-5 list-disc">
                            <li>haha</li>
                            <li>haha</li>
                            <li>haha</li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center justify-center py-5 text-white capitalize bg-primary">
                    Copyright &copy; RIDHATUR RAHMAH {new Date().getFullYear()}
                </div>
            </footer>
        </GuestLayout>
    );
}

export default Home;
