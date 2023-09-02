import React from "react";
import { Head, useForm, usePage } from "@inertiajs/react";
import {
    Eye,
    EyeIcon,
    Loader2,
    MoreHorizontal,
    MoreVertical,
    PencilIcon,
    PlusCircle,
    Printer,
    Trash2,
} from "lucide-react";
import ReactToPrint from "react-to-print";

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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import moment from "moment/moment";
import Modal from "./modal";
import Show from "./show";
import PrintComponent from "@/components/print-component";

function MasyarakatPermohonan() {
    const { permohonan, layanan } = usePage().props;
    const [openModal, setOpenModal] = React.useState(false);
    const [persyaratan, setPersyaratan] = React.useState(null);
    const [isShow, setIsShow] = React.useState(false);
    const [showData, setShowData] = React.useState(null);

    const { data, setData, post, processing, errors, reset } = useForm();

    const onSubmit = (e) => {
        e.preventDefault();
        post(route("permohonan.masyarakat.store"), {
            onSuccess: () => {
                setOpenModal(false), setPersyaratan(null), reset();
            },
        });
    };

    const handleShow = (item) => {
        setIsShow(true);
        setShowData(item);
        setOpenModal(true);
    };

    const header = [
        { name: "#", className: "w-10 text-center" },
        { name: "Instansi", className: "" },
        { name: "Layanan", className: "" },
        { name: "Telp. Instansi", className: "" },
        { name: "Tanggal", className: "" },
        { name: "Status", className: "" },
        { name: "@", className: "text-center" },
    ];

    // print
    const componentRef = React.useRef(null);
    const onBeforeGetContentResolve = React.useRef(null);
    const [loading, setLoading] = React.useState(false);

    const handleOnBeforeGetContent = React.useCallback(
        (item) => {
            setLoading(true);
            return new Promise((resolve) => {
                onBeforeGetContentResolve.current = resolve;
                setTimeout(() => {
                    setLoading(false);
                    setShowData(item);
                    resolve();
                }, 2000);
            });
        },
        [setLoading, setShowData]
    );

    const handleBeforePrint = React.useCallback(() => {
        console.log("`onBeforePrint` called");
    }, []);

    React.useEffect(() => {
        if (
            !showData &&
            typeof onBeforeGetContentResolve.current === "function"
        ) {
            onBeforeGetContentResolve.current();
        }
    }, [onBeforeGetContentResolve.current, showData]);

    return (
        <AuthLayout>
            <Dialog
                open={openModal}
                onOpenChange={(isOpen) => {
                    setOpenModal(isOpen);
                    if (!isOpen) {
                        setIsShow(false);
                        setPersyaratan(null);
                        setShowData(null);
                        reset();
                    }
                }}
            >
                <Head title="Permohonan" />
                <div className="relative w-full p-5 space-y-4 bg-white rounded-md shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold md:text-4xl">
                            Permohonan
                        </h2>
                    </div>
                    <Separator />

                    <Button
                        className={cn("gap-2")}
                        onClick={() => setOpenModal(true)}
                    >
                        <PlusCircle className="w-5 h-5" />
                        <span>Tambah Permohonan</span>
                    </Button>

                    <DataTable
                        data={permohonan}
                        header={header}
                        link={"permohonan.masyarakat.index"}
                        caption="Data permohonan saya"
                    >
                        {permohonan.data.length !== 0 ? (
                            permohonan.data.map((item, index) => (
                                <TableRow key={permohonan.from + index}>
                                    <TableCell className="text-center">
                                        {permohonan.from + index}
                                    </TableCell>
                                    <TableCell>
                                        {item.layanan.instansi.nama_instansi}
                                    </TableCell>
                                    <TableCell>
                                        {item.layanan.nama_layanan}
                                    </TableCell>
                                    <TableCell>
                                        {item.layanan.instansi.telepon}
                                    </TableCell>
                                    <TableCell>
                                        {moment(item.created_at).format(
                                            "DD-MM-YYYY"
                                        )}
                                    </TableCell>
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
                                        <DropdownMenu>
                                            <DropdownMenuTrigger>
                                                <MoreVertical className="w-5 h-5" />
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuItem
                                                    onClick={() =>
                                                        handleShow(item)
                                                    }
                                                >
                                                    <Eye className="w-4 h-4 mr-3" />
                                                    <span>Lihat</span>
                                                </DropdownMenuItem>
                                                {item.status === "selesai" && (
                                                    <ReactToPrint
                                                        onBeforeGetContent={() =>
                                                            handleOnBeforeGetContent(
                                                                item
                                                            )
                                                        }
                                                        onBeforePrint={
                                                            handleBeforePrint
                                                        }
                                                        trigger={() => (
                                                            <DropdownMenuItem
                                                                className="flex items-center"
                                                                onClick={() =>
                                                                    setShowData(
                                                                        item
                                                                    )
                                                                }
                                                            >
                                                                <>
                                                                    <Printer className="w-4 h-4 mr-3" />
                                                                    <span>
                                                                        Cetak
                                                                        Resi
                                                                    </span>
                                                                </>
                                                            </DropdownMenuItem>
                                                        )}
                                                        content={() =>
                                                            componentRef.current
                                                        }
                                                    />
                                                )}
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

                    {loading && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 opacity-75">
                            <Loader2 className="animate-spin" />
                        </div>
                    )}

                    <PrintComponent ref={componentRef} data={showData} />
                </div>

                {/* form */}
                {isShow ? (
                    <Show showData={showData} />
                ) : (
                    <Modal
                        isEdit={false}
                        onSubmit={onSubmit}
                        setData={setData}
                        data={data}
                        errors={errors}
                        processing={processing}
                        layanan={layanan}
                        persyaratan={persyaratan}
                        setPersyaratan={setPersyaratan}
                    />
                )}
            </Dialog>
        </AuthLayout>
    );
}

export default MasyarakatPermohonan;
