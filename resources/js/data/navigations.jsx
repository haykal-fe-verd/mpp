import {
    Beef,
    LayoutDashboard,
    Newspaper,
    ServerCog,
    Settings,
    UploadCloud,
    Volume2,
} from "lucide-react";

export const navigations = [
    {
        label: "Dashboard",
        href: route("dashboard"),
        icon: LayoutDashboard,
        role: ["admin", "masyarakat"],
    },
    {
        label: "Instansi",
        href: route("instansi.index"),
        icon: ServerCog,
        role: ["admin"],
    },
    {
        label: "Permohonan",
        href: route("permohonan.index"),
        icon: UploadCloud,
        role: ["admin"],
    },
    {
        label: "Pengaduan",
        href: route("pengaduan.admin.index"),
        icon: Beef,
        role: ["admin"],
    },
    {
        label: "Berita",
        href: route("berita.index"),
        icon: Newspaper,
        role: ["admin"],
    },
    {
        label: "Pengumuman",
        href: route("pengumuman.index"),
        icon: Volume2,
        role: ["admin"],
    },
    {
        label: "Setting MPP",
        href: route("mpp.index"),
        icon: Settings,
        role: ["admin"],
    },
    {
        label: "Permohonan",
        href: route("permohonan.masyarakat.index"),
        icon: UploadCloud,
        role: ["masyarakat"],
    },
];
