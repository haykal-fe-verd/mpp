import InputError from "@/components/input-error";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

function Persyaratan({ persyaratan, errors, setData }) {
    return (
        <div className="p-5">
            <h1 className="text-2xl font-bold text-center underline decoration-wavy decoration-primary">
                Persyaratan
            </h1>

            <div className="flex flex-col mt-10 lg:justify-between lg:flex-row">
                <ul className="list-disc">
                    {persyaratan.map((item, index) => (
                        <li key={index}>{item.nama_persyaratan}</li>
                    ))}
                </ul>

                <div>
                    {/* berkas persyaratan */}
                    <Label htmlFor="file">
                        Berkas Persyaratan
                        <span className="text-rose-500">*</span>
                    </Label>
                    <Input
                        type="file"
                        id="file"
                        name="file"
                        className="mt-2"
                        onChange={(e) => setData("file", e.target.files[0])}
                    />
                    <InputError message={errors.file} />
                </div>
            </div>

            <p className="mt-10">
                <span className="text-red-500">*</span>Note : Untuk setiap
                persyaratan disatukan dalam bentuk .zip maksimal 2mb.
            </p>
        </div>
    );
}

export default Persyaratan;
