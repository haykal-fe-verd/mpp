import React from "react";
import { usePage } from "@inertiajs/react";

const PrintComponent = React.forwardRef((props, ref) => {
    const { data } = props;

    const { mpp } = usePage().props;

    return (
        <div ref={ref} className="print-table">
            <div>
                <div className="flex items-center justify-between pt-5">
                    <div className="flex items-center justify-end w-1/4">
                        <img
                            src={`storage/${mpp.logo}`}
                            alt="Logo Kop"
                            height={100}
                            width={100}
                        />
                    </div>
                    <div className="w-full text-center ">
                        <h1 className="text-xl font-bold">
                            MAL PELAYANAN PUBLIK
                        </h1>
                        <h1 className="text-xl font-bold">
                            KABUPATEN ACEH BESAR
                        </h1>
                    </div>
                </div>
                <hr className="mx-5 mt-5 border-gray-500" />
                <hr className="mx-5 mt-1 border-gray-500" />
            </div>
            <div className="flex items-center justify-center p-5">
                <p className="w-full px-5 py-5 text-center text-white rounded-md bg-primary">
                    {data?.no_resi}
                </p>
            </div>
        </div>
    );
});

export default PrintComponent;
