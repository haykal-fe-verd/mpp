import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
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

function Berita() {
    const { berita } = usePage().props;
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
        judul: "",
        isi: "",
        thumbnail: "",
    });

    const onSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            post(route("berita.update", data.slug), {
                onSuccess: () => {
                    setOpenModal(false), setIsEdit(false), reset();
                },
            });
        } else {
            post(route("berita.store"), {
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
            slug: item.slug,
            judul: item.judul,
            isi: item.isi,
            thumbnail: item.thumbnail,
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
                destroy(route("berita.destroy", item.slug));
                reset();
            }
        });
    };

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Judul", className: "" },
        { name: "Isi", className: "" },
        { name: "Thubmnail", className: "" },
        { name: "@", className: "text-center" },
    ];

    return (
        <AuthLayout>
            <Dialog
                open={openModal}
                onOpenChange={(isOpen) => {
                    setOpenModal(isOpen);
                    if (!isOpen) {
                        setIsEdit(false);
                        reset();
                    }
                }}
            >
                <Head title="Berita" />
                <div className="w-full p-5 space-y-4 bg-white rounded-md shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Berita
                        </h2>
                    </div>
                    <Separator />

                    <Button
                        className={cn("gap-2")}
                        onClick={() => setOpenModal(true)}
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>Tambah Berita</span>
                    </Button>

                    <DataTable
                        data={berita}
                        header={header}
                        link={"berita.index"}
                    >
                        {berita.data.length !== 0 ? (
                            berita.data.map((item, index) => (
                                <TableRow key={berita.from + index}>
                                    <TableCell className="text-center">
                                        {berita.from + index}
                                    </TableCell>
                                    <TableCell>{item.judul}</TableCell>
                                    <TableCell>
                                        <div
                                            className="text-justify"
                                            dangerouslySetInnerHTML={{
                                                __html:
                                                    item.isi.substring(0, 200) +
                                                    (item.isi.length > 200
                                                        ? "..."
                                                        : ""),
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <img
                                            src={`/storage/${item.thumbnail}`}
                                            alt="Thumbnail"
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

export default Berita;
