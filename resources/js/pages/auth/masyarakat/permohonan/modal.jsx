import React from "react";
import AsyncSelect from "react-select/async";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import InputError from "@/components/input-error";
import { Loader2 } from "lucide-react";
import Persyaratan from "./persyaratan";

function Modal({
    isEdit,
    onSubmit,
    setData,
    data,
    errors,
    processing,
    layanan,
    persyaratan,
    setPersyaratan,
}) {
    const options = layanan.map((item) => {
        return {
            value: item.id,
            label: `${item.instansi.nama_instansi} | ${item.nama_layanan} | ${item.persyaratan.length} Persyaratan`,
            persyaratan: item.persyaratan,
        };
    });

    const filter = (inputValue) => {
        return options.filter((i) =>
            i.label.toLowerCase().includes(inputValue.toLowerCase())
        );
    };

    const loadOptions = (inputValue, callback) => {
        setTimeout(() => {
            callback(filter(inputValue));
        }, 1000);
    };

    return (
        <DialogContent className="h-full max-w-lg lg:max-w-5xl">
            <DialogHeader>
                <DialogTitle>
                    {isEdit ? "Edit" : "Tambah"} Permohonan
                    <Separator className="my-5" />
                </DialogTitle>
                <form
                    onSubmit={onSubmit}
                    className="space-y-5"
                    encType="multipart/form-data"
                >
                    {/* layanan */}
                    <div>
                        <Label htmlFor="layanan_id">
                            Pelayanan
                            <span className="text-rose-500">*</span>
                        </Label>
                        <AsyncSelect
                            id="layanan_id"
                            name="layanan_id"
                            cacheOptions
                            loadOptions={loadOptions}
                            defaultOptions
                            placeholder="Cari pelayanan..."
                            onChange={(selectedOption) => {
                                setData("layanan_id", selectedOption.value);
                                setPersyaratan(selectedOption.persyaratan);
                            }}
                        />
                        <InputError message={errors.layanan_id} />
                    </div>

                    <Separator />

                    {persyaratan && (
                        <Persyaratan
                            persyaratan={persyaratan}
                            errors={errors}
                            setData={setData}
                        />
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
