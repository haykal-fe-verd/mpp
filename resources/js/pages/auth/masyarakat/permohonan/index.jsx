import React from "react";
import { Head, Link, useForm, usePage } from "@inertiajs/react";
import {
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
import Swal from "sweetalert2";
import { Dialog } from "@/components/ui/dialog";

function MasyarakatPermohonan() {
    const { permohonan } = usePage().props;
    const [openModal, setOpenModal] = React.useState(false);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        delete: destroy,
        reset,
    } = useForm();

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
                destroy(route("permohonan.destroy", item.id));
                reset();
            }
        });
    };

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama Pemohon", className: "" },
        { name: "Layanan", className: "" },
        { name: "No HP", className: "" },
        { name: "Alamat", className: "" },
        { name: "Status", className: "" },
        { name: "@", className: "text-center" },
    ];

    return (
        <AuthLayout>
            <Dialog
                open={openModal}
                onOpenChange={(isOpen) => {
                    setOpenModal(isOpen);
                    if (!isOpen) {
                        reset();
                    }
                }}
            >
                <Head title="Permohonan" />
                <div className="w-full p-5 space-y-4 bg-white rounded-md shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Permohonan
                        </h2>
                    </div>
                    <Separator />

                    <DataTable
                        data={permohonan}
                        header={header}
                        link={"permohonan.index"}
                    >
                        {permohonan.data.length !== 0 ? (
                            permohonan.data.map((item, index) => (
                                <TableRow key={permohonan.from + index}>
                                    <TableCell className="text-center">
                                        {permohonan.from + index}
                                    </TableCell>
                                    <TableCell>
                                        {item.masyarakat.user.name}
                                    </TableCell>
                                    <TableCell>
                                        {item.layanan.nama_layanan}
                                    </TableCell>
                                    <TableCell>
                                        {item.masyarakat.no_hp}
                                    </TableCell>
                                    <TableCell>
                                        {item.masyarakat.alamat}
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={`capitalize px-3 py-1 text-white rounded-md ${
                                                item.status === "selesai"
                                                    ? "bg-primary"
                                                    : "bg-red-500"
                                            }`}
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
            </Dialog>
        </AuthLayout>
    );
}

export default MasyarakatPermohonan;
