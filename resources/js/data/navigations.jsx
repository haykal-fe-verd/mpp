import {
    ActivitySquareIcon,
    BedIcon,
    Bitcoin,
    Clapperboard,
    Cog,
    LayoutDashboard,
    Newspaper,
    Scale3d,
    Settings,
    ShieldCheck,
    Siren,
    Stethoscope,
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
];
