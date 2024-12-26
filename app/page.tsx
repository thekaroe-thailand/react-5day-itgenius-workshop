'use client'

import { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { useRouter } from "next/navigation";
import { config } from "./config";

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();                       // useRouter ใช้เปลี่ยนหน้าเว็บ

  const handleSignIn = async () => {
    try {
      if (username === '' || password === '') {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'โปรดกรอกข้อมูลให้ครบถ้วน',
        });

        return;
      }

      const payload = {
        username: username,
        password: password,
      };

      const response = await axios.post(`${config.apiUrl}/api/user/signin`, payload);

      if (response.data.token !== undefined) {
        localStorage.setItem(config.tokenKey, response.data.token);
        router.push('/backoffice/dashboard'); // เปลี่ยนหน้าเว็บไปที่ /dashboard
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Invalid username or password',
        });
      }
    } catch (error: any) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold">Sign In to POS System</h1>
      <div className="p-8 bg-gray-700 rounded-3xl mt-10">
        <div>Username</div>
        <input type="text" className="form-control"
          onChange={(e) => setUsername(e.target.value)} />

        <div className="mt-5">Password</div>
        <input type="password" className="form-control"
          onChange={(e) => setPassword(e.target.value)} />

        <button className="btn mt-5" onClick={handleSignIn}>
          Sign In
        </button>
      </div>
    </div>
  );
}
