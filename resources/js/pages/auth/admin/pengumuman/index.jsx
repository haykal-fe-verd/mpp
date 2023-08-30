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
import ReactQuill from "react-quill";

function Pengumuman() {
    const { pengumuman } = usePage().props;
    const { data, setData, post, processing, errors } = useForm({
        pengumuman: pengumuman?.pengumuman ?? "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("pengumuman.store"));
    };

    return (
        <AuthLayout>
            <Head title="Pengumuman" />
            <div className="p-5 space-y-4 bg-white rounded-md shadow-md ">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Pengumuman
                    </h2>
                </div>
                <Separator />

                <form onSubmit={onSubmit} encType="multipart/form-data">
                    <div className="grid grid-cols-2 gap-10">
                        <div className="col-span-2 space-y-5 lg:col-span-1">
                            <div>
                                <Label htmlFor="pengumuman">
                                    Isi Pengumuman
                                </Label>
                                <ReactQuill
                                    theme="snow"
                                    value={data.pengumuman}
                                    onChange={(e) => setData("pengumuman", e)}
                                />
                                <InputError message={errors.pengumuman} />
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
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}

export default Pengumuman;
