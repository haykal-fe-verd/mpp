import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Dialog } from "@/components/ui/dialog";
import Modal from "./modal";

function Instansi() {
    const { instansi } = usePage().props;
    const [openModal, setOpenModal] = React.useState(false);
    const [isEdit, setIsEdit] = React.useState(false);
    const [isDetail, setIsDetail] = React.useState(false);
    const [detailData, setDetailData] = React.useState(null);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        delete: destroy,
        reset,
    } = useForm({
        id: "",
        nama_instansi: "",
        profil_instansi: "",
        telepon: "",
        email: "",
        faks: "",
        website: "",
        alamat: "",
        logo: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route("instansi.update", data.id), {
                onSuccess: () => {
                    setOpenModal(false),
                        setIsEdit(false),
                        setIsDetail(false),
                        setDetailData(null),
                        reset();
                },
            });
        } else {
            post(route("instansi.store"), {
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
            nama_instansi: item.nama_instansi,
            profil_instansi: item.profil_instansi,
            telepon: item.telepon,
            email: item.email,
            faks: item.faks,
            website: item.website,
            alamat: item.alamat,
            logo: item.logo,
        });
    };

    const handleDetail = (item) => {
        setIsDetail(true);
        setDetailData(item);
        // setOpenModal(true);
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
                destroy(route("instansi.destroy", item.id));
                reset();
            }
        });
    };

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama Instansi", className: "" },
        { name: "Telepon", className: "" },
        { name: "Alamat", className: "" },
        { name: "Logo", className: "" },
        { name: <MoreHorizontal />, className: "text-center" },
    ];

    return (
        <AuthLayout>
            <Dialog
                open={openModal}
                onOpenChange={(isOpen) => {
                    setOpenModal(isOpen);
                    if (!isOpen) {
                        setIsEdit(false);
                        setIsDetail(false);
                        setDetailData(null);
                        reset();
                    }
                }}
            >
                <Head title="Instansi" />
                <div className="w-full p-5 space-y-4 bg-white rounded-md shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Instansi
                        </h2>
                    </div>
                    <Separator />

                    <Button
                        className={cn("gap-2")}
                        onClick={() => setOpenModal(true)}
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>Tambah Instansi</span>
                    </Button>

                    <DataTable
                        data={instansi}
                        header={header}
                        link={"instansi.index"}
                    >
                        {instansi.data.length !== 0 ? (
                            instansi.data.map((item, index) => (
                                <TableRow key={instansi.from + index}>
                                    <TableCell className="text-center">
                                        {instansi.from + index}
                                    </TableCell>
                                    <TableCell>{item.nama_instansi}</TableCell>
                                    <TableCell>{item.telepon}</TableCell>
                                    <TableCell>{item.alamat}</TableCell>
                                    <TableCell>
                                        <img
                                            src={`/storage/${item.logo}`}
                                            alt="LogoInstansi"
                                            className="object-cover w-20 h-20 rounded-md shadow-lg"
                                        />
                                    </TableCell>
                                    <TableCell className="text-center">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="w-5 h-5" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleDetail(item)
                                                    }
                                                >
                                                    <EyeIcon className="w-4 h-4 mr-3" />
                                                    <span>Detail</span>
                                                </DropdownMenuItem>
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

                {/* form */}
                <Modal
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

export default Instansi;
