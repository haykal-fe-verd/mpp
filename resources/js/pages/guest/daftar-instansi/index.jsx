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

function DaftarInstansi({ daftarInstansi }) {
    const [openModal, setOpenModal] = React.useState(false);
    const [showData, setShowData] = React.useState(null);

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Nama Instansi", className: "" },
        { name: "Alamat Instansi", className: "" },
        { name: "Telepon Instansi", className: "" },
        { name: "Detail", className: "text-center" },
    ];

    return (
        <GuestLayout>
            <Head title="Daftar Instansi" />
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
                        Berikut adalah daftar instansi yang ada pada MPP Kab.
                        Aceh besar
                    </h1>

                    <div className="p-5 mt-10 bg-white rounded-md">
                        <DataTable
                            data={daftarInstansi}
                            header={header}
                            link={"home.daftar.layanan.index"}
                        >
                            {daftarInstansi.data.length !== 0 ? (
                                daftarInstansi.data.map((item, index) => (
                                    <TableRow key={daftarInstansi.from + index}>
                                        <TableCell className="text-center">
                                            {index + 1}
                                        </TableCell>
                                        <TableCell>
                                            {item.nama_instansi}
                                        </TableCell>
                                        <TableCell>{item.alamat}</TableCell>
                                        <TableCell>{item.telepon}</TableCell>
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
                {showData && <Detail showData={showData} />}
            </Dialog>

            <Footer />
        </GuestLayout>
    );
}

export default DaftarInstansi;
