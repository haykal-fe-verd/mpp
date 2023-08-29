import React from "react";
import {
    MoreHorizontal,
    MoreVertical,
    PencilIcon,
    PlusCircle,
    Trash2,
} from "lucide-react";

import AuthLayout from "@/layouts/AuthLayout";
import { Head, useForm } from "@inertiajs/react";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DataTable from "@/components/data-table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Swal from "sweetalert2";
import ModalLayanan from "./modal-layanan";

function DetailInstansi({ instansi }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);

    const {
        data,
        setData,
        post,
        put,
        processing,
        errors,
        delete: destroy,
        reset,
    } = useForm({
        id: "",
        instansi_id: instansi.id,
        nama_layanan: "",
        deskripsi_layanan: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            put(route("layanan.update", data.id), {
                onSuccess: () => {
                    setOpenModal(false), setIsEdit(false), reset();
                },
            });
        } else {
            post(route("layanan.store"), {
                onSuccess: () => {
                    setOpenModal(false), reset();
                },
            });
        }
    };

    const handleEdit = (item) => {
        setIsEdit(true);
        setOpenModal(true);
        setData({
            id: item.id,
            instansi_id: item.instansi_id,
            nama_layanan: item.nama_layanan,
            deskripsi_layanan: item.deskripsi_layanan,
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
                destroy(route("layanan.destroy", item.id));
                reset();
            }
        });
    };

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama Layanan", className: "" },
        { name: "Deskripsi Layanan", className: "" },
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
                <Head title="Detail Instansi" />
                <div className="w-full p-5 bg-white rounded-md shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Detail Instansi - {instansi?.nama_instansi}
                        </h2>
                    </div>
                    <Separator />
                    <div className="flex flex-col justify-between lg:flex-row">
                        <div className="w-full">
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>Nama Instansi</TableCell>
                                        <TableCell>
                                            {instansi?.nama_instansi}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Profil Instansi</TableCell>
                                        <TableCell>
                                            {instansi?.profil_instansi}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Telepon</TableCell>
                                        <TableCell>
                                            {instansi?.telepon}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Faks</TableCell>
                                        <TableCell>{instansi?.faks}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Email</TableCell>
                                        <TableCell>{instansi?.email}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Website</TableCell>
                                        <TableCell>
                                            {instansi?.website}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>Alamat</TableCell>
                                        <TableCell>
                                            {instansi?.alamat}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </div>

                        <div className="flex items-center justify-center w-full lg:w-1/2 lg:justify-end ">
                            <img
                                src={`/storage/${instansi.logo}`}
                                alt="Logo Instansi"
                                className="w-[300px] h-[300px] rounded-full shadow-lg p-5"
                            />
                        </div>
                    </div>

                    <Separator className="mt-16" />

                    <div className="mt-16 space-y-5">
                        <Button
                            className={cn("gap-2")}
                            onClick={() => setOpenModal(true)}
                        >
                            <PlusCircle className="w-5 h-5" />
                            <span>Tambah Layanan</span>
                        </Button>

                        <DataTable data={instansi.layanan} header={header}>
                            {instansi.layanan.length !== 0 ? (
                                instansi.layanan.map((item, index) => (
                                    <TableRow key={instansi.from + index}>
                                        <TableCell className="text-center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {item.nama_layanan}
                                        </TableCell>
                                        <TableCell>
                                            {item.deskripsi_layanan}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger>
                                                    <MoreVertical className="w-5 h-5" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuItem
                                                        onClick={() =>
                                                            handleEdit(item)
                                                        }
                                                    >
                                                        <PencilIcon className="w-4 h-4 mr-3" />
                                                        <span>Edit</span>
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
                </div>

                {/* form */}
                <ModalLayanan
                    isEdit={isEdit}
                    onSubmit={onSubmit}
                    setData={setData}
                    data={data}
                    errors={errors}
                    processing={processing}
                />
            </Dialog>
        </AuthLayout>
    );
}

export default DetailInstansi;
