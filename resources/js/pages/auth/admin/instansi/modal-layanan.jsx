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

function ModalLayanan({ isEdit, onSubmit, setData, data, errors, processing }) {
    return (
        <DialogContent className="">
            <DialogHeader>
                <DialogTitle>
                    {isEdit ? "Edit" : "Tambah"} Layanan
                    <Separator className="my-5" />
                </DialogTitle>
                <form onSubmit={onSubmit} className="space-y-5">
                    {/* nama_layanan */}
                    <div>
                        <Label htmlFor="nama_layanan">
                            Nama Layanan
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="nama_layanan"
                            name="nama_layanan"
                            className="mt-2"
                            value={data.nama_layanan}
                            onChange={(e) =>
                                setData("nama_layanan", e.target.value)
                            }
                        />
                        <InputError message={errors.nama_layanan} />
                    </div>

                    {/* deskripsi_layanan */}
                    <div>
                        <Label htmlFor="deskripsi_layanan">
                            Deskripsi Layanan
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Textarea
                            className="mt-2 bg-white"
                            id="deskripsi_layanan"
                            name="deskripsi_layanan"
                            value={data.deskripsi_layanan}
                            onChange={(e) =>
                                setData("deskripsi_layanan", e.target.value)
                            }
                        />

                        <InputError message={errors.deskripsi_layanan} />
                    </div>
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

export default ModalLayanan;
