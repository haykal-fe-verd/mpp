import React from "react";
import { Head, Link, router, usePage } from "@inertiajs/react";
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
import Footer from "@/components/footer";
import { pickBy } from "lodash";

function Home({
    totalInstansi,
    totalLayanan,
    totalMasyarakatTerlayani,
    searchResult,
}) {
    const { mpp, instansi } = usePage().props;

    const [isLoading, setIsLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [searchChanged, setSearchChanged] = React.useState(false);

    React.useEffect(() => {
        if (searchChanged) {
            const delaySearch = setTimeout(() => {
                getData();
            }, 300);

            return () => {
                clearTimeout(delaySearch);
            };
        }
        setSearchChanged(true);
    }, [search, setSearchChanged]);

    const getData = () => {
        setIsLoading(true);
        router.get(route("home"), pickBy({ search }), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    };
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
                            placeholder="Cari layanan ..."
                            className={cn("h-16 mt-2 shadow-lg pl-20")}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <div
                            className={`absolute ${
                                search ? "block" : "hidden"
                            } w-full mt-2 p-2 bg-white border rounded-lg shadow-lg`}
                        >
                            <ScrollArea className="h-64 ">
                                <div className="flex flex-col">
                                    {searchResult?.map((item) => {
                                        return (
                                            <Link
                                                href={route(
                                                    "home.detail.layanan.index",
                                                    item.id
                                                )}
                                                key={item.id}
                                                className="p-2 my-2 rounded-md hover:bg-primary hover:text-white"
                                            >
                                                {item.nama_layanan}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mt-5 ">
                        <Link href="#" className="flex flex-col text-center">
                            <h1 className="text-3xl font-bold text-primary">
                                {totalInstansi}
                            </h1>
                            <p className="mt-2">Instansi</p>
                        </Link>
                        <Link href="#" className="flex flex-col text-center">
                            <h1 className="text-3xl font-bold text-primary">
                                {totalLayanan}
                            </h1>
                            <p className="mt-2">Layanan</p>
                        </Link>
                        <div className="flex flex-col text-center">
                            <h1 className="text-3xl font-bold text-primary">
                                {totalMasyarakatTerlayani}
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
                            Daftar Akun
                        </h5>
                        <p>
                            Anda dapat mendaftar secara online menggunakan
                            aplikasi web
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <Volume2 className="w-20 h-20" />
                        <h5 className="mt-10 text-xl font-semibold">
                            Pilih Layanan
                        </h5>
                        <p>
                            Pilih layanan yang ingin anda ajukan pada MPP Kab.
                            Aceh Besar
                        </p>
                    </div>
                    <div className="flex flex-col items-center justify-center text-center">
                        <BadgeCheck className="w-20 h-20" />
                        <h5 className="mt-10 text-xl font-semibold">Selesai</h5>
                        <p>Anda akan mendapatkan resi yang bisa anda cetak </p>
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
                            {instansi.map((item, index) => (
                                <Card
                                    className={cn(
                                        "w-[360px] lg:w-96 text-center border-primary"
                                    )}
                                    key={index}
                                >
                                    <CardHeader
                                        className={cn(
                                            "flex items-center gap-5"
                                        )}
                                    >
                                        <CardTitle>
                                            {item.nama_instansi}
                                        </CardTitle>
                                        <img
                                            src={`/storage/${item.logo}`}
                                            className="rounded-full w-36 h-36"
                                        />
                                    </CardHeader>
                                    <CardContent>
                                        <p>{item.profil_instansi}</p>
                                        <p className="px-4 py-2 mt-5 text-center text-white rounded-md bg-primary">
                                            {item.layanan.length} Layanan
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
            <section className="relative flex items-center justify-center h-screen lg:h-[900px]">
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
                        href={route("pengaduan.index")}
                        className="px-4 py-2 text-white border border-red-500 rounded-md hover:shadow-lg hover:shadow-red-500/50"
                    >
                        Laporkan
                    </Link>
                </div>
            </section>

            <Footer />
        </GuestLayout>
    );
}

export default Home;
