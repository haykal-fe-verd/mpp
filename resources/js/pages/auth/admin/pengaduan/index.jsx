import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    CheckCheck,
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
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog } from "@/components/ui/dialog";

function Pengaduan() {
    const { pengaduan } = usePage().props;

    const { patch, delete: destroy, reset } = useForm();

    const handleKonfirmasi = (item) => {
        Swal.fire({
            title: "Apakah anda ingin mengkonfirmasi pengaduan ini?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            confirmButtonColor: "#2c6beb",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                patch(route("pengaduan.admin.confirm", item.id));
                reset();
            }
        });
    };

    const handleDelete = (item) => {
        Swal.fire({
            title: "Apakah anda ingin menghapus data?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Ya",
            confirmButtonColor: "#2c6beb",
            cancelButtonText: "Tidak",
        }).then((result) => {
            if (result.isConfirmed) {
                destroy(route("pengaduan.admin.destroy", item.id));
                reset();
            }
        });
    };

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama", className: "" },
        { name: "Email", className: "" },
        { name: "No Hp", className: "" },
        { name: "Instansi", className: "" },
        { name: "Pengaduan", className: "" },
        { name: "Alamat", className: "" },
        { name: "Jenis", className: "" },
        { name: "status", className: "" },
        { name: "@", className: "text-center" },
    ];

    return (
        <AuthLayout>
            <Head title="Pengaduan" />
            <div className="w-full p-5 space-y-4 bg-white rounded-md shadow-md">
                <div>
                    <h2 className="text-2xl font-bold md:text-4xl">
                        Pengaduan
                    </h2>
                </div>

                <Separator />

                <DataTable
                    data={pengaduan}
                    header={header}
                    link={"pengaduan.admin.index"}
                >
                    {pengaduan.data.length !== 0 ? (
                        pengaduan.data.map((item, index) => (
                            <TableRow key={pengaduan.from + index}>
                                <TableCell className="text-center">
                                    {pengaduan.from + index}
                                </TableCell>
                                <TableCell>{item.nama}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.no_hp}</TableCell>
                                <TableCell>
                                    {item.instansi.nama_instansi}
                                </TableCell>
                                <TableCell>
                                    <p
                                        className="text-justify"
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                item.pengaduan.substring(
                                                    0,
                                                    50
                                                ) +
                                                (item.pengaduan.length > 50
                                                    ? "..."
                                                    : ""),
                                        }}
                                    />
                                </TableCell>
                                <TableCell>{item.alamat}</TableCell>
                                <TableCell>
                                    <span
                                        className={`px-3 py-1 bg-primary text-white rounded-md capitalize ${
                                            item.jenis === "aduan"
                                                ? "bg-primary"
                                                : "bg-violet-500"
                                        }`}
                                    >
                                        {item.jenis}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <span
                                        className={`px-3 py-1 rounded-md text-white capitalize shadow-md
                                            ${
                                                item.status === "menunggu"
                                                    ? "bg-red-500"
                                                    : "bg-green-500"
                                            }
                                        `}
                                    >
                                        {item.status}
                                    </span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger>
                                            <MoreVertical className="w-5 h-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleKonfirmasi(item)
                                                }
                                            >
                                                <CheckCheck className="w-4 h-4 mr-3" />
                                                <span>Konfirmasi</span>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    handleDelete(item)
                                                }
                                            >
                                                <Trash2 className="w-4 h-4 mr-3" />
                                                <span>Hapus</span>
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
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

export default Pengaduan;
