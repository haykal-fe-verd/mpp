import React, { useEffect, useState } from "react";
import { BellRing, Check, Dot, LogOut, Settings, User } from "lucide-react";
import { Link, useForm, usePage } from "@inertiajs/react";
import Swal from "sweetalert2";
import Pusher from "pusher-js";
import axios from "axios";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MobileSidebar from "@/components/mobile-sidebar";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

function Topbar() {
    const { auth } = usePage().props;
    const { post } = useForm();

    const handleLogout = () => {
        Swal.fire({
            title: "Apakah anda ingin logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Logout",
            cancelButtonText: "Tidak",
            confirmButtonColor: "#2c6beb",
        }).then((result) => {
            if (result.isConfirmed) {
                post(route("logout"));
            }
        });
    };

    const [listNotification, setListNotification] = useState([]);
    console.log("🚀  listNotification:", listNotification);

    const loadNotifications = () => {
        axios
            .get(route("notifications"))
            .then((res) => setListNotification(res.data))
            .catch((err) => console.log("error bang", err));
    };

    useEffect(() => {
        const pusher = new Pusher(import.meta.env.VITE_PUSHER_APP_KEY, {
            cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER ?? "ap1",
            encrypted: false,
        });

        const channel = pusher.subscribe("admin-masyarakat");

        channel.bind("PermohonanDibuat", (data) => {
            loadNotifications();
        });

        loadNotifications();

        return () => {
            pusher.unsubscribe("admin-masyarakat");
        };
    }, []);

    return (
        <div className="flex items-center p-4 m-5 bg-white rounded-md shadow-md">
            <MobileSidebar />
            <div className="flex justify-end w-full space-x-3">
                <DropdownMenu>
                    <DropdownMenuTrigger
                        id="notifications"
                        name="notifications"
                        aria-label="notifications"
                        className={cn(
                            "px-4 py-2 bg-primary/20 font-medium text-primary rounded-md flex items-center justify-center focus:outline-none"
                        )}
                    >
                        <div className="relative">
                            <BellRing className="w-5 h-5" />
                            {listNotification.count !== 0 && (
                                <div className="absolute w-2 h-2 bg-red-500 rounded-full -right-2 -top-2 animate-ping" />
                            )}
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <div className="w-full p-5">
                            <h1 className="text-lg font-semibold">
                                Notifications
                            </h1>
                            <p className="mb-5 text-xs">
                                Ada{" "}
                                <span className="text-primary">
                                    {listNotification.count}
                                </span>{" "}
                                notifikasi yang belum dibaca.
                            </p>
                            <div className="grid gap-4">
                                {listNotification?.list?.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={item.data.href}
                                        className="p-2 rounded-lg shadow-lg text-primary bg-primary/20"
                                    >
                                        <h1 className="font-semibold">
                                            {item.data.message}
                                        </h1>
                                        <p></p>
                                    </Link>
                                ))}
                            </div>
                            <div className="mt-5">
                                <Button className="w-full">
                                    <Check className="w-4 h-4 mr-2" /> Tandai
                                    semua telah dibaca
                                </Button>
                            </div>
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Avatar className="border border-slate-900">
                            <AvatarImage
                                src={`/avatars/${auth?.user?.image}`}
                            />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link
                                href={route("profile.edit")}
                                className="flex items-center gap-x-3"
                            >
                                <User className="w-4 h-4" />
                                <span>Profile</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link
                                href={route("password.index")}
                                className="flex items-center gap-x-3"
                            >
                                <Settings className="w-4 h-4" />
                                <span>Ganti Password</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="flex items-center cursor-pointer gap-x-3"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4" />
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}

export default Topbar;
