import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import InputError from "@/components/input-error";
import { Loader2 } from "lucide-react";

function Modal({ isEdit, onSubmit, setData, data, errors, processing }) {
    const handleContentChange = (content) => {
        setData("isi", content);
    };

    const handleThumbnailChange = (e) => {
        const file = e.target.files[0];
        setData("thumbnail", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const imgPreview = document.getElementById("thumbnailPreview");
                if (imgPreview) {
                    imgPreview.src = reader.result;
                }
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <DialogContent className="">
            <DialogHeader>
                <DialogTitle>
                    {isEdit ? "Edit" : "Tambah"} Berita
                    <Separator className="my-5" />
                </DialogTitle>
                <form
                    onSubmit={onSubmit}
                    className="space-y-5"
                    encType="multipart/form-data"
                >
                    {/* judul */}
                    <div>
                        <Label htmlFor="judul">
                            Judul
                            <span className="text-rose-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            id="judul"
                            name="judul"
                            className="mt-2"
                            value={data.judul}
                            onChange={(e) => setData("judul", e.target.value)}
                        />
                        <InputError message={errors.judul} />
                    </div>

                    {/* isi */}
                    <div>
                        <Label htmlFor="isi">Isi Berita</Label>
                        <ReactQuill
                            theme="snow"
                            value={data.isi}
                            onChange={handleContentChange}
                        />
                        <InputError message={errors.isi} />
                    </div>

                    {/* thumbnail */}
                    <div>
                        <Label htmlFor="thumbnail">Thumbnail</Label>
                        <Input
                            type="file"
                            id="thumbnail"
                            name="thumbnail"
                            onChange={handleThumbnailChange}
                        />
                        <InputError message={errors.thumbnail} />
                    </div>

                    {/* preview image */}
                    {data.thumbnail && (
                        <div className="object-cover w-full h-40 rounded-md shadow-lg">
                            <img
                                id="thumbnailPreview"
                                src={`/storage/${data.thumbnail}`}
                                alt="Thumbnail Preview"
                                className="object-cover w-full h-full"
                            />
                        </div>
                    )}

                    <Button
                        className="flex items-center justify-center gap-3"
                        disabled={processing}
                    >
                        {processing && <Loader2 className="animate-spin" />}
                        Simpan
                    </Button>
                </form>
            </DialogHeader>
        </DialogContent>
    );
}

export default Modal;
