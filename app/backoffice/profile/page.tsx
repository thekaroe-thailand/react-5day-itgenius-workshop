'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "@/app/config";
import Swal from "sweetalert2";

export default function Page() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const token = localStorage.getItem(config.tokenKey);
        const headers = {
            "Authorization": `Bearer ${token}`
        }
        const response = await axios.get(`${config.apiUrl}/api/user/profile`, { headers });
        setName(response.data.name);
        setUsername(response.data.username);
    }

    const handleSave = async () => {
        if (password !== confirmPassword) {
            Swal.fire({
                title: "ผิดพลาด",
                text: "รหัสผ่านไม่ตรงกัน",
                icon: "error",
                timer: 2000
            });
            return;
        }

        const token = localStorage.getItem(config.tokenKey);
        const headers = {
            "Authorization": `Bearer ${token}`
        }
        const payload = {
            name: name,
            username: username,
            password: password,
            confirmPassword: confirmPassword
        }

        await axios.put(`${config.apiUrl}/api/user/update`, payload, { headers });
        Swal.fire({
            title: "สำเร็จ",
            text: "บันทึกข้อมูลเรียบร้อย",
            icon: "success",
            timer: 2000
        });
    }

    return <div>
        <h1 className="text-2xl font-bold">Profile</h1>

        <div className="mt-3">ชื่อผู้ใช้งาน</div>
        <input type="text" className="form-control" value={name}
            onChange={(e) => setName(e.target.value)} />

        <div className="mt-3">username</div>
        <input type="text" className="form-control" value={username}
            onChange={(e) => setUsername(e.target.value)} />

        <div className="mt-3">
            password
            <span className="text-red-500 ml-5">*** หากต้องการเปลี่ยนให้กรอกด้านล่าง</span>
        </div>
        <input type="password" className="form-control"
            onChange={(e) => setPassword(e.target.value)} />

        <div className="mt-3">
            ยืนยัน password
            <span className="text-red-500 ml-5">*** หากต้องการเปลี่ยนให้กรอกด้านล่าง</span>
        </div>
        <input type="password" className="form-control"
            onChange={(e) => setConfirmPassword(e.target.value)} />

        <button className="btn mt-3" onClick={handleSave}>
            <i className="fa fa-check mr-3"></i>
            บันทึก
        </button>
    </div>
}

