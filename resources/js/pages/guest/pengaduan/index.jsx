import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import { Check, ChevronsUpDown, Loader2, Send } from "lucide-react";
import Select from "react-select";

import GuestLayout from "@/layouts/GuestLayout";
import Footer from "@/components/footer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
    Select as UiSelect,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

function Pengaduan() {
    const { mpp, instansi } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm();

    React.useEffect(() => {
        return () => {
            reset();
        };
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("pengaduan.store"), {
            preserveScroll: true,
            preserveState: true,
            onFinish: () => reset(),
        });
    };

    const options = instansi.map((item) => {
        return {
            value: item.id,
            label: `${item.nama_instansi}`,
        };
    });

    return (
        <GuestLayout>
            <Head title="Pengaduan" />
            <div>
                <form
                    onSubmit={onSubmit}
                    className="container grid grid-cols-2 my-20"
                >
                    <div className="flex items-center justify-center col-span-2 p-5 bg-white rounded-l-lg lg:col-span-1">
                        <img src="/logo-background.png" alt="" />
                    </div>
                    <div className="col-span-2 p-5 space-y-5 bg-white rounded-r-lg lg:col-span-1">
                        <h1 className="text-2xl font-bold underline decoration-primary decoration-wavy">
                            Pengaduan
                        </h1>

                        {/* jenis */}
                        <div>
                            <Label htmlFor="jenis">
                                Jenis
                                <span className="text-rose-500">*</span>
                            </Label>
                            <UiSelect
                                onValueChange={(e) => setData("jenis", e)}
                            >
                                <SelectTrigger className="mt-2 bg-white">
                                    <SelectValue placeholder="Pilih jenis aduan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="aduan">Aduan</SelectItem>
                                    <SelectItem value="saran">Saran</SelectItem>
                                </SelectContent>
                            </UiSelect>

                            <InputError message={errors.jenis} />
                        </div>

                        {/* instansi_id */}
                        <div>
                            <Label htmlFor="instansi_id">
                                Instansi
                                <span className="text-rose-500">*</span>
                            </Label>

                            <Select
                                id="instansi_id"
                                name="instansi_id"
                                options={options}
                                isClearable
                                isSearchable
                                placeholder="Pilih instansi yang ingin diberi saran/pengaduan"
                                onChange={(selectedOption) =>
                                    setData("instansi_id", selectedOption.value)
                                }
                            />

                            <InputError message={errors.instansi_id} />
                        </div>

                        {/* nama */}
                        <div>
                            <Label htmlFor="nama">
                                Nama
                                <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="nama"
                                name="nama"
                                className="mt-2"
                                onChange={(e) =>
                                    setData("nama", e.target.value)
                                }
                            />
                            <InputError message={errors.nama} />
                        </div>

                        {/* email */}
                        <div>
                            <Label htmlFor="email">
                                Email
                                <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="email"
                                name="email"
                                className="mt-2"
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* no_hp */}
                        <div>
                            <Label htmlFor="no_hp">
                                No HP
                                <span className="text-rose-500">*</span>
                            </Label>
                            <Input
                                type="text"
                                id="no_hp"
                                name="no_hp"
                                className="mt-2"
                                onChange={(e) =>
                                    setData("no_hp", e.target.value)
                                }
                            />
                            <InputError message={errors.no_hp} />
                        </div>

                        {/* alamat */}
                        <div>
                            <Label htmlFor="alamat">
                                Alamat
                                <span className="text-rose-500">*</span>
                            </Label>
                            <Textarea
                                className="mt-2 bg-white"
                                id="alamat"
                                name="alamat"
                                onChange={(e) =>
                                    setData("alamat", e.target.value)
                                }
                            />

                            <InputError message={errors.alamat} />
                        </div>

                        {/* pengaduan */}
                        <div>
                            <Label htmlFor="pengaduan">
                                Isi Pengaduan/Saran
                                <span className="text-rose-500">*</span>
                            </Label>
                            <Textarea
                                className="mt-2 bg-white"
                                id="pengaduan"
                                name="pengaduan"
                                onChange={(e) =>
                                    setData("pengaduan", e.target.value)
                                }
                            />

                            <InputError message={errors.pengaduan} />
                        </div>

                        <Button
                            className="flex items-center justify-center gap-3"
                            disabled={processing}
                        >
                            {processing ? (
                                <Loader2 className="animate-spin" />
                            ) : (
                                <Send />
                            )}
                            Kirim
                        </Button>
                    </div>
                </form>
            </div>
            <Footer />
        </GuestLayout>
    );
}

export default Pengaduan;
