import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";

import AuthLayout from "@/layouts/AuthLayout";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function SettingMpp() {
    const { mpp } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        deskripsi_mpp: mpp.deskripsi_mpp || "",
        kenapa_harus_mpp: mpp.kenapa_harus_mpp || "",
        logo: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("mpp.store"));
    };

    return (
        <AuthLayout>
            <Head title="Setting MPP" />
            <div className="p-5 space-y-4 bg-white rounded-md shadow-md ">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Setting MPP
                    </h2>
                </div>
                <Separator />

                <form onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-2 gap-10">
                        <div className="col-span-2 space-y-5 lg:col-span-1">
                            <div>
                                <Label htmlFor="deskripsi_mpp">
                                    Deskripsi MPP
                                </Label>
                                <Textarea
                                    id="deskripsi_mpp"
                                    name="deskripsi_mpp"
                                    className="mt-2"
                                    value={data.deskripsi_mpp}
                                    onChange={(e) =>
                                        setData("deskripsi_mpp", e.target.value)
                                    }
                                />
                                <InputError message={errors.deskripsi_mpp} />
                            </div>

                            <div>
                                <Label htmlFor="kenapa_harus_mpp">
                                    Kenapa Harus MPP ?
                                </Label>
                                <Textarea
                                    id="kenapa_harus_mpp"
                                    name="kenapa_harus_mpp"
                                    className="mt-2"
                                    value={data.kenapa_harus_mpp}
                                    onChange={(e) =>
                                        setData(
                                            "kenapa_harus_mpp",
                                            e.target.value
                                        )
                                    }
                                />

                                <InputError message={errors.kenapa_harus_mpp} />
                            </div>

                            <div>
                                <Label htmlFor="logo">Logo</Label>
                                <Input
                                    type="file"
                                    id="logo"
                                    name="logo"
                                    onChange={(e) =>
                                        setData("logo", e.target.files[0])
                                    }
                                />
                                <InputError message={errors.logo} />
                            </div>

                            <Button
                                className="flex items-center justify-center gap-3"
                                disabled={processing}
                            >
                                {processing && (
                                    <Loader2 className="animate-spin" />
                                )}
                                Simpan
                            </Button>
                        </div>

                        <div className="flex items-center justify-center col-span-2 lg:col-span-1">
                            <img
                                src={`/storage/${mpp.logo}`}
                                alt="logo"
                                className="rounded-full h-52 w-52"
                            />
                        </div>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}

export default SettingMpp;
