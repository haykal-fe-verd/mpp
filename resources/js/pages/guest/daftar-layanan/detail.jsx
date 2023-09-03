import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

function Detail({ showData }) {
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Persyaratan</DialogTitle>
                <DialogDescription className="p-5">
                    <ul className="list-disc">
                        {showData?.persyaratan?.map((item) => {
                            return (
                                <li key={item.id}>{item.nama_persyaratan}</li>
                            );
                        })}
                    </ul>
                </DialogDescription>
            </DialogHeader>
        </DialogContent>
    );
}

export default Detail;
