import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

function Detail({ showData }) {
    console.log("🚀  showData:", showData);
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Detail Instansi</DialogTitle>
                <div className="p-5">
                    <div className="flex flex-col gap-5">
                        <img
                            src={`/storage/${showData?.logo}`}
                            alt="Logo"
                            className="object-cover w-full h-full rounded-full shadow-lg"
                        />
                        <div className="mt-5 text-center">
                            <p className="text-lg font-semibold">
                                {showData.nama_instansi}
                            </p>
                            <p className="my-3">{showData.profil_instansi}</p>
                            <p className="text-xs">{showData.telepon}</p>
                            <p className="text-xs">{showData.email}</p>
                            <p className="text-xs">{showData.faks}</p>
                            <p className="text-xs">{showData.website}</p>
                            <p className="text-xs">{showData.alamat}</p>
                        </div>
                    </div>
                    <Separator className="my-5" />
                    <p className="mt-5 mb-2 underline">Daftar Layanan :</p>
                    <ul className="list-disc">
                        {showData?.layanan?.map((item) => {
                            return <li key={item.id}>{item.nama_layanan}</li>;
                        })}
                    </ul>
                </div>
            </DialogHeader>
        </DialogContent>
    );
}

export default Detail;
