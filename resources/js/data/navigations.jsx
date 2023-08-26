import {
    ActivitySquareIcon,
    BedIcon,
    Bitcoin,
    Clapperboard,
    Cog,
    LayoutDashboard,
    Scale3d,
    Settings,
    ShieldCheck,
    Siren,
    Stethoscope,
} from "lucide-react";

export const navigations = [
    {
        label: "Dashboard",
        href: route("dashboard"),
        icon: LayoutDashboard,
        role: ["admin", "masyarakat"],
    },
    {
        label: "Setting MPP",
        href: route("mpp.index"),
        icon: Settings,
        role: ["admin"],
    },
];
