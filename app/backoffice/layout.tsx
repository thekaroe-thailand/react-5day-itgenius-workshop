"use client"                                // day 5

import Link from "next/link";
import axios from "axios";                  // day 5
import Swal from "sweetalert2";             // day 5
import { config } from "@/app/config";      // day 5
import { useEffect, useState } from "react";           // day 5
import { useRouter } from "next/navigation";    // day 5

export default function Layout({ children }: {
    children: React.ReactNode
}) {
    const [name, setName] = useState("");    // day 5
    const router = useRouter();               // day 5

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem(config.tokenKey);

        if (token == null || token == "" || token == undefined) {
            router.push("/"); // go to login page
        }

        const headers = { "Authorization": `Bearer ${token}` };

        try {
            const res = await axios.get(config.apiUrl + "/api/user/profile", { headers: headers });
            setName(res.data.name);
        } catch (error: any) {
            if (error.response.data.message !== 'jwt malformed') {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: error.message
                });
            }
        }
    }

    const signOut = async () => {
        const button = await Swal.fire({
            title: 'ออกจากระบบ',
            text: 'คุณต้องการออกจากระบบหรือไม่?',
            icon: 'question',
            showCancelButton: true,
            showConfirmButton: true
        })

        if (button.isConfirmed) {
            localStorage.removeItem(config.tokenKey);
            router.push("/");
        }
    }

    const editProfile = () => {
        router.push("/backoffice/profile");
    }

    return <div className="flex">
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>NextPOS V 0.1</h1>
                <i className="fa fa-user mt-5 text-4xl"></i>
                <div className="mt-3">{name}</div>
                <div className="mt-3 flex gap-2 justify-center">
                    <button className="btn-danger text-sm" onClick={signOut}>
                        <i className="fa fa-sign-out-alt mr-3"></i>
                        Sign Out
                    </button>
                    <button className="btn-success text-sm" onClick={editProfile}>
                        <i className="fa fa-user-edit"></i>
                    </button>
                </div>
            </div>
            <div className="sidebar-menu">
                <div>
                    <Link href="/backoffice/dashboard">
                        <i className="fa fa-chart-line w-7"></i>
                        Dashboard
                    </Link>
                </div>
                <div>
                    <Link href="/backoffice/product">
                        <i className="fa fa-book w-7"></i>
                        สินค้า
                    </Link>
                </div>
                <div>
                    <Link href="/backoffice/sale">
                        <i className="fa fa-shopping-cart w-7"></i>
                        ขายสินค้า
                    </Link>
                </div>
            </div>
        </div>
        <div className="pl-10 pt-2 w-full pr-10">{children}</div>
    </div>;
}