import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
    Check,
    Eye,
    EyeIcon,
    MoreHorizontal,
    MoreVertical,
    PencilIcon,
    PlusCircle,
    Trash2,
} from "lucide-react";

import AuthLayout from "@/layouts/AuthLayout";
import { Separator } from "@/components/ui/separator";
import { TableCell, TableRow } from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/components/data-table";
import { Dialog } from "@/components/ui/dialog";
import Swal from "sweetalert2";

const header = [
    { name: "#", className: "w-10 text-center" },
    { name: "No Resi" },
    { name: "Nama Pemohon", className: "" },
    { name: "Layanan", className: "" },
    { name: "No HP", className: "" },
    { name: "Alamat", className: "" },
    { name: "Status", className: "" },
    { name: "Status Pengambilan", className: "text-center" },
];

function Resi({ permohonan }) {
    const { post } = useForm();

    const statusPengambilan = (item) => {
        Swal.fire({
            title: "Apakah resi telah diambil?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#2c6beb",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("resi.post", item.id));
            }
        });
    };
    return (
        <AuthLayout>
            <Head title="Resi" />
            <div className="w-full p-5 space-y-4 bg-white rounded-md shadow-md">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">Resi</h2>
                </div>
                <Separator />

                <DataTable
                    data={permohonan}
                    header={header}
                    link={"resi.index"}
                >
                    {permohonan.data.length !== 0 ? (
                        permohonan.data.map((item, index) => (
                            <TableRow key={permohonan.from + index}>
                                <TableCell className="text-center">
                                    {permohonan.from + index}
                                </TableCell>
                                <TableCell className="text-center">
                                    {item.no_resi}
                                </TableCell>
                                <TableCell>
                                    {item.masyarakat.user.name}
                                </TableCell>
                                <TableCell>
                                    {item.layanan.nama_layanan}
                                </TableCell>
                                <TableCell>{item.masyarakat.no_hp}</TableCell>
                                <TableCell>{item.masyarakat.alamat}</TableCell>
                                <TableCell>
                                    <span
                                        className={`capitalize px-3 py-1 text-white rounded-md ${
                                            item.status === "selesai"
                                                ? "bg-primary"
                                                : item.status === "menunggu"
                                                ? "bg-orange-500"
                                                : "bg-red-500"
                                        }`}
                                    >
                                        {item.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                    {item.status_pengambilan === "0" ? (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                statusPengambilan(item)
                                            }
                                            className="p-1 text-white rounded-full bg-primary"
                                        >
                                            <Check />
                                        </button>
                                    ) : (
                                        <span>resi sudah diambil</span>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                className="text-center"
                                colSpan={header.length}
                            >
                                Tidak ada data untuk ditampilkan
                            </TableCell>
                        </TableRow>
                    )}
                </DataTable>
            </div>
        </AuthLayout>
    );
}

export default Resi;
