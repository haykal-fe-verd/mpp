import { Link } from "@inertiajs/react";
import moment from "moment/moment";
import React from "react";

function CardBerita({ item }) {
    return (
        <Link key={item.slug} href={route("home.berita.detail", item.slug)}>
            <div className="flex flex-col p-5 mb-10 bg-white rounded-md shadow-lg">
                <img
                    src={`/storage/${item.thumbnail}`}
                    alt=""
                    className="object-cover w-full h-40 lg:h-[400px] rounded-md bg-slate-200 "
                />
                <h1 className="mt-5 text-xl font-bold">{item.judul}</h1>
                <h2 className="text-xs underline text-primary">
                    {moment(item.created_at).format("DD-MM-YYYY")} | Admin
                </h2>
                <div
                    className="mt-5 text-justify"
                    dangerouslySetInnerHTML={{
                        __html:
                            item.isi.substring(0, 600) +
                            (item.isi.length > 600 ? " ............" : ""),
                    }}
                />
            </div>
        </Link>
    );
}

export default CardBerita;
