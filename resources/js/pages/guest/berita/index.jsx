import React from "react";
import { Head } from "@inertiajs/react";
import { router } from "@inertiajs/react";
import { pickBy } from "lodash";

import GuestLayout from "@/layouts/GuestLayout";
import Footer from "@/components/footer";
import Pagination from "@/components/pagination";
import CardBerita from "@/components/card-berita";
import { Loader2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function Berita({ berita, pengumuman }) {
    const [isLoading, setIsLoading] = React.useState(false);
    const [search, setSearch] = React.useState("");
    const [searchChanged, setSearchChanged] = React.useState(false);

    // handle search
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
        router.get(route("home.berita.index"), pickBy({ search }), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => setIsLoading(false),
        });
    };

    return (
        <GuestLayout>
            <Head title="Berita" />
            <div className="relative">
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-200 opacity-75">
                        <Loader2 className="animate-spin" />
                    </div>
                )}
                <div className="grid grid-cols-3 gap-5 p-10">
                    <div className="col-span-3 mb-10">
                        <h1 className="text-2xl font-bold text-center underline decoration-wavy decoration-primary">
                            Berita terbaru
                        </h1>
                    </div>
                    <div className="col-span-3 lg:col-span-2">
                        {berita.data.map((item) => (
                            <CardBerita item={item} />
                        ))}

                        <Pagination links={berita.links} />
                    </div>
                    <div className="col-span-3 lg:col-span-1">
                        <div className="p-5 mb-5 bg-white rounded-md shadow-lg">
                            <div className="relative w-full rounded-md">
                                <div className="absolute inset-y-0 left-0 flex items-center p-3 pointer-events-none rounded-tl-md rounded-bl-md bg-primary">
                                    <Search className="text-white" />
                                </div>
                                <Input
                                    name="search"
                                    id="search"
                                    autoComplete="search"
                                    type="search"
                                    placeholder="Search something..."
                                    className="pl-14"
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="p-5 bg-white rounded-md shadow-lg">
                            <h1 className="text-lg font-semibold">
                                Pengumuman
                            </h1>
                            <div
                                className="mt-5"
                                dangerouslySetInnerHTML={{
                                    __html: pengumuman.pengumuman,
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </GuestLayout>
    );
}

export default Berita;
