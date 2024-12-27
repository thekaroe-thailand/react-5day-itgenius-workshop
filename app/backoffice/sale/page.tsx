'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import { config } from "@/app/config";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export default function Page() {
    const [isbn, setIsbn] = useState('');
    const [saleOrders, setSaleOrders] = useState([]);   // ข้อมูลการขายสินค้า

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${config.apiUrl}/api/sale/list`);
            setSaleOrders(response.data);
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: err.message
            })
        }
    }

    const handleSave = async () => {
        try {
            const payload = { isbn: isbn }
            await axios.post(`${config.apiUrl}/api/sale/create`, payload);
            fetchData();
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: err.message
            })
        }
    }

    const handleRemove = async (id: string) => {
        try {
            const button = await Swal.fire({
                icon: 'question',
                title: 'ลบรายการนี้',
                text: 'คุณต้องการลบรายการนี้หรือไม่?',
                showCancelButton: true,
                showConfirmButton: true
            });

            if (button.isConfirmed) {
                await axios.delete(`${config.apiUrl}/api/sale/remove/${id}`);
                fetchData();
            }
        } catch (err: any) {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: err.message
            })
        }
    }

    return (
        <div>
            <h1 className="text-2xl font-bold">ขายสินค้า</h1>
            <div className="flex mt-4 gap-2 items-center">
                <div className="font-bold">ISBN</div>
                <div className="w-[300px]">
                    <input type="text" className="form-control"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)} />
                </div>
                <div>
                    <button className="btn" onClick={handleSave}>
                        <i className="fa fa-search mr-3"></i>
                        ค้นหา
                    </button>
                </div>
            </div>

            <table className="table mt-4">
                <thead>
                    <tr>
                        <th style={{ width: '180px' }}>วันที่ทำรายการ</th>
                        <th style={{ width: '120px' }}>รหัสสินค้า</th>
                        <th>ชื่อสินค้า</th>
                        <th style={{ textAlign: 'right', width: '100px' }}>ราคา</th>
                        <th style={{ textAlign: 'right', width: '100px' }}>จำนวน</th>
                        <th style={{ textAlign: 'right', width: '100px' }}>รวม</th>
                        <th style={{ width: '60px' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {saleOrders.length === 0 ? (
                        <tr>
                            <td colSpan={6} className="text-center text-red-500">
                                --- ยังไม่มีการขายสินค้า ---
                            </td>
                        </tr>
                    ) : (
                        saleOrders.map((item: any, index: number) => (
                            <tr key={index}>
                                <td>{dayjs(item.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                                <td>{item.book?.isbn}</td>
                                <td>{item.book?.name}</td>
                                <td className="text-right">{item.price}</td>
                                <td className="text-right">{item.quantity}</td>
                                <td className="text-right">{item.price * item.quantity}</td>
                                <td className="text-center">
                                    <button className="btn-danger"
                                        onClick={() => handleRemove(item.id)}>
                                        <i className="fa fa-times"></i>
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

