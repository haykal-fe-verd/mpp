import React from "react";
import { Beef, Building2, Newspaper, ServerCog } from "lucide-react";
import Chart from "react-apexcharts";
import { usePage } from "@inertiajs/react";

function ChartPermohonan(props) {
    const { data, bulan } = props;

    const options = {
        chart: {
            id: "total-permohonan-chart",
            type: "line",
            shadow: {
                enabled: true,
                color: "#000",
                top: 18,
                left: 7,
                blur: 10,
                opacity: 1,
            },
            toolbar: {
                show: false,
            },
        },
        colors: ["#2563eb"],
        dataLabels: {
            enabled: true,
        },
        stroke: {
            curve: "smooth",
        },
        grid: {
            borderColor: "#e7e7e7",
            row: {
                colors: ["#f3f3f3"],
                opacity: 0.0,
            },
        },
        markers: {
            size: 6,
        },
        xaxis: {
            categories: Object.values(bulan),
        },
        yaxis: {
            title: {
                text: "Total Permohonan",
            },
        },
        legend: {
            position: "top",
            horizontalAlign: "right",
            floating: true,
            offsetY: -25,
            offsetX: -5,
        },
    };

    const series = [
        {
            name: "Total Permohonan",
            data: data,
        },
    ];

    return <Chart options={options} series={series} type="line" height={500} />;
}

function AdminDashboard({
    totalInstansi,
    totalLayanan,
    totalBerita,
    totalPengaduan,
    chartAdmin,
    bulan,
}) {
    const { pengumuman } = usePage().props;

    const dataDashboard = [
        {
            id: 1,
            title: "Total Instansi",
            desc: totalInstansi,
            icons: <ServerCog className="w-10 h-10 " />,
        },
        {
            id: 2,
            title: "Total Layanan",
            desc: totalLayanan,
            icons: <Building2 className="w-10 h-10 " />,
        },
        {
            id: 3,
            title: "Total Berita",
            desc: totalBerita,
            icons: <Newspaper className="w-10 h-10 " />,
        },
        {
            id: 4,
            title: "Total Pengaduan",
            desc: totalPengaduan,
            icons: <Beef className="w-10 h-10 " />,
        },
    ];

    return (
        <div className="space-y-5">
            <div className="grid grid-cols-4 gap-5">
                {dataDashboard.map((item) => (
                    <div
                        key={item.id}
                        className="relative col-span-4 py-5 bg-white rounded-md shadow-lg lg:col-span-1"
                    >
                        <div className="absolute inset-y-0 flex items-center justify-center px-6 text-white bg-primary rounded-tl-md rounded-bl-md">
                            {item.icons}
                        </div>
                        <h2 className="text-2xl font-semibold pl-28">
                            {item.title}
                        </h2>
                        <p className="mt-5 text-4xl font-bold pl-28 text-primary">
                            {item.desc}
                        </p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-5 gap-5">
                <div className="col-span-5 p-5 bg-white rounded-md lg:col-span-3">
                    <h1 className="text-lg font-semibold text-primary">
                        Grafik Total Permohonan Tahun {new Date().getFullYear()}
                    </h1>
                    <div>
                        <ChartPermohonan data={chartAdmin} bulan={bulan} />
                    </div>
                </div>
                <div className="col-span-5 p-5 bg-white rounded-md lg:col-span-2">
                    <h1 className="text-lg font-semibold text-primary">
                        Pengumuman:
                    </h1>

                    <div
                        dangerouslySetInnerHTML={{
                            __html: pengumuman.pengumuman,
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
