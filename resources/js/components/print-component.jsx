import React from "react";
import { usePage } from "@inertiajs/react";

const PrintComponent = React.forwardRef((props, ref) => {
    const { data } = props;
    console.log("🚀  data:", data);

    const { mpp } = usePage().props;

    return (
        <div ref={ref} className="print-table">
            <div>
                <div className="flex items-center justify-between pt-5">
                    <div className="flex items-center justify-end w-1/4">
                        <img
                            src={`storage/${mpp.logo}`}
                            alt="Logo Kop"
                            height={100}
                            width={100}
                        />
                    </div>
                    <div className="w-full text-center ">
                        <h1 className="text-xl font-bold">
                            MAL PELAYANAN PUBLIK
                        </h1>
                        <h1 className="text-lg font-bold">
                            KABUPATEN ACEH BESAR
                        </h1>
                        <p className="text-md">
                            Jl. Medan B. Aceh No.85, Lambaro, Kec. Ingin Jaya,
                            Kab. Aceh Besar, 23116
                        </p>
                        <p className="text-xs">
                            Email : mpp.acehbesar@gmail.com
                        </p>
                    </div>
                </div>
                <hr className="mx-5 mt-5 border-gray-500" />
                <hr className="mx-5 mt-1 border-gray-500" />
            </div>
            <div className="mt-5 font-bold text-center underline uppercase">
                TANDA TERIMA BERKAS PENDAFTARAN
            </div>
            <div className="flex-1 mx-5 mt-14">
                <table>
                    <tbody>
                        <tr>
                            <td className="w-1/3">Nomor</td>
                            <td>: {data?.no_resi}</td>
                        </tr>
                        <tr>
                            <td>Nama</td>
                            <td>: {data?.masyarakat?.user?.name}</td>
                        </tr>
                        <tr>
                            <td>ALamat</td>
                            <td>: {data?.masyarakat?.alamat}</td>
                        </tr>
                        <tr>
                            <td>No Telp/HP</td>
                            <td>: {data?.masyarakat?.no_hp}</td>
                        </tr>
                        <tr>
                            <td>Jenis Layanan</td>
                            <td>
                                :{" "}
                                <span className="font-semibold">
                                    {data?.layanan?.nama_layanan}
                                </span>
                            </td>
                        </tr>
                        <tr>
                            <td>Jenis Pengajuan</td>
                            <td>: Baru</td>
                        </tr>
                        <tr>
                            <td>Persyaratan</td>
                            <td>:</td>
                        </tr>
                    </tbody>
                </table>
                <p className="mt-5 px-14">
                    <ul className="list-decimal">
                        {data?.layanan?.persyaratan.map((item, index) => (
                            <li key={index}>{item.nama_persyaratan}</li>
                        ))}
                    </ul>
                </p>
            </div>
            <div className="absolute bottom-0 w-full">
                <p className="mx-5 text-justify">
                    NB: <br />
                    1. Tanda terima berikas ini tidak merupakan dokumen
                    perizinan Kabupaten Aceh Besar. <br />
                    2. Apabila persyaratan administrasi, fisik lengkap dan benar
                    akan di proses.
                </p>
                <p className="w-full p-5 mt-5 text-center text-white bg-primary">
                    surat dibuat melalui aplikasi mal pelayan publik kabupaten
                    aceh besar
                </p>
            </div>
        </div>
    );
});

export default PrintComponent;
