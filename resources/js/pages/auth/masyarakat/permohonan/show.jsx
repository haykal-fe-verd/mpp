import React from "react";
import AsyncSelect from "react-select/async";
import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

function Show({ showData }) {
    return (
        <DialogContent className="max-w-lg lg:max-w-5xl">
            <DialogHeader>
                <DialogTitle>
                    Detail Permohonan
                    <Separator className="my-5" />
                </DialogTitle>
                <div>
                    <table>
                        <tbody>
                            <tr>
                                <td className="wfull lg:w-1/2">NIK</td>
                                <td className="wfull lg:w-1/2">
                                    : {showData.masyarakat.nik}
                                </td>
                            </tr>
                            <tr>
                                <td className="wfull lg:w-1/2">Nama</td>
                                <td className="wfull lg:w-1/2">
                                    : {showData.masyarakat.user.name}
                                </td>
                            </tr>
                            <tr>
                                <td className="wfull lg:w-1/2">
                                    Jenis Kelamin
                                </td>
                                <td className="wfull lg:w-1/2">
                                    : {showData.masyarakat.jenis_kelamin}
                                </td>
                            </tr>
                            <tr>
                                <td className="wfull lg:w-1/2">
                                    Tanggal Lahir
                                </td>
                                <td className="wfull lg:w-1/2">
                                    : {showData.masyarakat.tanggal_lahir}
                                </td>
                            </tr>
                            <tr>
                                <td className="wfull lg:w-1/2">Tempat Lahir</td>
                                <td className="wfull lg:w-1/2">
                                    : {showData.masyarakat.tempat_lahir}
                                </td>
                            </tr>
                            <tr>
                                <td className="wfull lg:w-1/2">No HP</td>
                                <td className="wfull lg:w-1/2">
                                    : {showData.masyarakat.no_hp}
                                </td>
                            </tr>
                            <tr>
                                <td className="wfull lg:w-1/2">Alamat</td>
                                <td className="wfull lg:w-1/2">
                                    : {showData.masyarakat.alamat}
                                </td>
                            </tr>
                            <tr>
                                <td className="wfull lg:w-1/2">Berkas Saya</td>
                                <td className="wfull lg:w-1/2">
                                    :{" "}
                                    <a
                                        href={`/storage/${showData.file}`}
                                        target="_blank"
                                        download
                                        className="underline text-primary decoration-wavy"
                                    >
                                        lihat/download
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Separator className="my-5" />

                    <table>
                        <tbody>
                            <tr className="w-full">
                                <td className="wfull lg:w-1/2">Nama Layanan</td>
                                <td className="wfull lg:w-1/2">
                                    : {showData.layanan.nama_layanan}
                                </td>
                            </tr>
                            <tr>
                                <td className="wfull lg:w-1/2">
                                    Deskripsi Layanan
                                </td>
                                <td className="wfull lg:w-1/2">
                                    : {showData.layanan.deskripsi_layanan}
                                </td>
                            </tr>
                            <tr>
                                <td className="wfull lg:w-1/2">Instansi</td>
                                <td className="wfull lg:w-1/2">
                                    : {showData.layanan.instansi.nama_instansi}
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <Separator className="my-5" />

                    {showData.pesan && (
                        <div className="mb-5">
                            Pesan Admin : <br />
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: showData.pesan,
                                }}
                            />
                        </div>
                    )}
                    <span
                        className={`capitalize px-3 py-1 text-white rounded-md ${
                            showData.status === "selesai"
                                ? "bg-primary"
                                : showData.status === "menunggu"
                                ? "bg-orange-500"
                                : "bg-red-500"
                        }`}
                    >
                        {showData.status}
                    </span>
                </div>
            </DialogHeader>
        </DialogContent>
    );
}

export default Show;
