import React from "react";
import { Head, usePage } from "@inertiajs/react";
import GuestLayout from "@/layouts/GuestLayout";
import Footer from "@/components/footer";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import DataTable from "@/components/data-table";
import { Dialog } from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import Detail from "./detail";

function DaftarLayanan({ daftarLayanan }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [showData, setShowData] = React.useState(null);

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama Layanan", className: "" },
        { name: "Deskripsi Layanan", className: "" },
        { name: "Persyaratan", className: "text-center" },
    ];

    return (
        <GuestLayout>
            <Head title="Daftar Layanan" />
            <Dialog
                open={openModal}
                onOpenChange={(isOpen) => {
                    setOpenModal(isOpen);
                    if (!isOpen) {
                        setShowData(null);
                    }
                }}
            >
                <div className="p-5 mx-auto mt-10 max-w-7xl">
                    <h1 className="text-2xl font-bold">
                        Berikut adalah daftar layanan yang ada pada MPP Kab.
                        Aceh besar
                    </h1>

                    <div className="p-5 mt-10 bg-white rounded-md">
                        <DataTable
                            data={daftarLayanan}
                            header={header}
                            link={"home.daftar.layanan.index"}
                        >
                            {daftarLayanan.data.length !== 0 ? (
                                daftarLayanan.data.map((item, index) => (
                                    <TableRow key={daftarLayanan.from + index}>
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
                                            <Button
                                                variant="ghost"
                                                className={cn(
                                                    "gap-2 hover:underline"
                                                )}
                                                onClick={() => {
                                                    setShowData(item);
                                                    setOpenModal(true);
                                                }}
                                            >
                                                <span>Lihat</span>
                                            </Button>
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
                <Detail showData={showData} />
            </Dialog>

            <Footer />
        </GuestLayout>
    );
}

export default DaftarLayanan;
