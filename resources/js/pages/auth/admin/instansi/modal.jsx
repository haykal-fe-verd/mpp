import React from "react";

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";

function Modal({ isEdit, onSubmit, setData, data, errors, processing }) {
    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setData("logo", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgPreview = document.getElementById("thumbnailPreview");
                if (imgPreview) {
                    imgPreview.src = reader.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <DialogContent className="">
            <DialogHeader>
                <DialogTitle>
                    {isEdit ? "Edit" : "Tambah"} Instansi
                    <Separator className="my-5" />
                </DialogTitle>
                <form
                    onSubmit={onSubmit}
                    className="space-y-5"
                    encType="multipart/form-data"
                >
                    {/* nama_instansi */}
                    <div>
                        <Label htmlFor="nama_instansi">
                            Nama Instansi
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="nama_instansi"
                            name="nama_instansi"
                            className="mt-2"
                            value={data.nama_instansi}
                            onChange={(e) =>
                                setData("nama_instansi", e.target.value)
                            }
                        />
                        <InputError message={errors.nama_instansi} />
                    </div>

                    {/* profil_instansi */}
                    <div>
                        <Label htmlFor="profil_instansi">
                            Profil Instansi
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Textarea
                            className="mt-2 bg-white"
                            id="profil_instansi"
                            name="profil_instansi"
                            value={data.profil_instansi}
                            onChange={(e) =>
                                setData("profil_instansi", e.target.value)
                            }
                        />

                        <InputError message={errors.profil_instansi} />
                    </div>

                    {/* telepon */}
                    <div>
                        <Label htmlFor="telepon">
                            Telepon Instansi
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="telepon"
                            name="telepon"
                            className="mt-2"
                            value={data.telepon}
                            onChange={(e) => setData("telepon", e.target.value)}
                        />
                        <InputError message={errors.telepon} />
                    </div>

                    {/* email */}
                    <div>
                        <Label htmlFor="email">
                            Email Instansi
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="email"
                            name="email"
                            className="mt-2"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* faks */}
                    <div>
                        <Label htmlFor="faks">
                            Faks
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="faks"
                            name="faks"
                            className="mt-2"
                            value={data.faks}
                            onChange={(e) => setData("faks", e.target.value)}
                        />
                        <InputError message={errors.faks} />
                    </div>

                    {/* website */}
                    <div>
                        <Label htmlFor="website">
                            Website
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="website"
                            name="website"
                            className="mt-2"
                            value={data.website}
                            onChange={(e) => setData("website", e.target.value)}
                        />
                        <InputError message={errors.website} />
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
                            value={data.alamat}
                            onChange={(e) => setData("alamat", e.target.value)}
                        />

                        <InputError message={errors.alamat} />
                    </div>

                    {/* logo */}
                    <div>
                        <Label htmlFor="logo">Logo</Label>
                        <Input
                            type="file"
                            id="logo"
                            name="logo"
                            onChange={handleThumbnailChange}
                        />
                        <InputError message={errors.logo} />
                    </div>

                    {/* preview image */}
                    {data.logo && (
                        <div className="object-cover w-full h-40 rounded-md shadow-lg">
                            <img
                                id="thumbnailPreview"
                                src={`/storage/${data.logo}`}
                                alt="Logo Preview"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}

                    <Button
                        className="flex items-center justify-center gap-3"
                        disabled={processing}
                    >
                        {processing && <Loader2 className="animate-spin" />}
                        Simpan
                    </Button>
                </form>
            </DialogHeader>
        </DialogContent>
    );
}

export default Modal;
