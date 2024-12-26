"use client";

import { useEffect, useState } from "react";
import { config } from "@/app/config";
import axios from "axios";
import Swal from "sweetalert2";
import Modal from "@/app/backoffice/modal";

export default function Page() {
    const [books, setBooks] = useState([]);
    const [isShowModal, setIsShowModal] = useState(false); // สถานะการแสดง modal
    const [categories, setCategories] = useState([]); // หมวดหมู่
    const [authors, setAuthors] = useState([]); // ผู้แต่ง
    const [publishers, setPublishers] = useState([]); // สำนักพิมพ์
    const [book, setBook] = useState({
        id: 0,
        isbn: '',
        name: '',
        price: 0,
        categoryId: 0,
        authorId: 0,
        publisherId: 0 // สำนักพิมพ์
    }); // ข้อมูลหนังสือ
    useEffect(() => {  // ทำงานทุกครั้งที่มีการ render หน้า
        fetchDataBook();
        fetchData();
    }, []);
    const handleShowModal = () => {
        setIsShowModal(true);
    }
    const handleCloseModal = () => {
        setIsShowModal(false);
        handleClearForm();
    }
    const fetchDataBook = async () => { // ดึงข้อมูลจากฐานข้อมูล
        const res = await axios.get(`${config.apiUrl}/api/book/list`);
        setBooks(res.data);
    }
    const fetchData = async () => { // ดึงข้อมูลจากฐานข้อมูล
        try {
            const resCategories = await axios.get(`${config.apiUrl}/api/category/list`);
            setCategories(resCategories.data);
            setBook({ ...book, categoryId: Number(resCategories.data[0].id) });

            const resPublishers = await axios.get(`${config.apiUrl}/api/publisher/list`);
            setPublishers(resPublishers.data);
            setAuthors(resPublishers.data[0].authors); // กำหนดข้อมูลผู้แต่งเป็นค่าเริ่มต้น
            setBook({ ...book, authorId: Number(resPublishers.data[0].authors[0].id) });
        } catch (err: any) {
            Swal.fire({
                icon: "error",
                title: "error",
                text: err.message,
            });
        }
    }
    const handleChangePublisher = (publisherId: number) => {
        // ค้นหาสำนักพิมพ์จาก id
        const publisher = publishers.find((p: any) => p.id === publisherId) as any;
        setAuthors(publisher.authors); // กำหนดผู้แต่ง
        setBook({
            ...book,
            authorId: Number(publisher.authors[0].id),
            publisherId: publisherId
        });
    }
    const handleClearForm = () => {
        setBook({
            id: 0,
            isbn: '',
            name: '',
            price: 0,
            categoryId: 0,
            authorId: 0,
            publisherId: 0
        });
    }
    const handleSave = async () => {
        try {
            if (book.isbn === '' || book.name === '' || book.price === 0 || book.categoryId === 0 || book.authorId === 0 || book.publisherId === 0) {
                Swal.fire({
                    icon: "warning",
                    title: "ตรวจสอบข้อมูล",
                    text: "กรุณากรอกข้อมูลให้ครบถ้วน",
                });
                return;
            }

            if (book.id === 0) {
                await axios.post(`${config.apiUrl}/api/book/create`, book);
            } else {
                await axios.put(`${config.apiUrl}/api/book/update/${book.id}`, book);
            }

            Swal.fire({
                icon: "success",
                title: "success",
                text: "บันทึกข้อมูลเรียบร้อย",
                timer: 2000
            });

            fetchDataBook();
            handleCloseModal();
            handleClearForm();
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "error",
                text: error.message,
            });
        }
    }
    const handleRemove = async (id: number) => {
        const button = await Swal.fire({
            title: "คุณต้องการลบหนังสือหรือไม่?",
            icon: "question",
            showCancelButton: true,
            showConfirmButton: true
        });

        if (button.isConfirmed) {
            await axios.delete(`${config.apiUrl}/api/book/remove/${id}`);
            fetchDataBook();
        }
    }
    const handleEdit = (book: any) => {
        const publisherId = Number(book.author.publisherId);

        handleShowModal();
        handleChangePublisher(publisherId);
        setBook(book);
        setBook({ ...book, publisherId: publisherId });
    }

    return <div>
        <h3 className="text-2xl font-bold mb-4">หนังสือ</h3>
        <button className="btn" onClick={handleShowModal}>
            <i className="fa fa-plus mr-2"></i>
            เพิ่มรายการ
        </button>
        <table className="table mt-5">
            <thead>
                <tr>
                    <th>isbn</th>
                    <th>ชื่อหนังสือ</th>
                    <th>ราคา</th>
                    <th>หมวดหมู่</th>
                    <th>ผู้แต่ง</th>
                    <th>สำนักพิมพ์</th>
                    <th style={{ width: "110px" }}>จัดการ</th>
                </tr>
            </thead>
            <tbody>
                {books.map((book: any) => (
                    <tr key={book.id}>
                        <td>{book.isbn}</td>
                        <td>{book.name}</td>
                        <td>{book.price}</td>
                        <td>{book.category?.name}</td>
                        <td>{book.author?.name}</td>
                        <td>{book.author?.publisher?.name}</td>
                        <td className="text-center flex gap-1">
                            <button className="btn-success" onClick={() => handleEdit(book)}>
                                <i className="fa fa-edit"></i>
                            </button>
                            <button className="btn-danger" onClick={() => handleRemove(book.id)}>
                                <i className="fa fa-trash"></i>
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>

        <Modal title="เพิ่มรายการ" isShow={isShowModal}>
            <div>isbn</div>
            <input type="text" className="form-control"
                onChange={(e) => setBook({ ...book, isbn: e.target.value })}
                value={book.isbn}
            />

            <div className="mt-4">ชื่อหนังสือ</div>
            <input type="text" className="form-control"
                onChange={(e) => setBook({ ...book, name: e.target.value })}
                value={book.name}
            />

            <div className="mt-4">ราคา</div>
            <input type="text" className="form-control"
                onChange={(e) => setBook({ ...book, price: Number(e.target.value) })}
                value={book.price}
            />

            <div className="mt-4">หมวดหมู่</div>
            <select className="form-control"
                onChange={(e) => setBook({ ...book, categoryId: Number(e.target.value) })}
                value={book.categoryId}
            >
                {categories.map((category: any) => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))}
            </select>

            <div className="mt-4">สำนักพิมพ์</div>
            <select className="form-control"
                onChange={(e) => handleChangePublisher(Number(e.target.value))}
                value={book.publisherId}>
                {publishers.map((publisher: any) => (
                    <option key={publisher.id} value={publisher.id}>
                        {publisher.name}
                    </option>
                ))}
            </select>

            <div className="mt-4">ผู้แต่ง</div>
            <select className="form-control"
                onChange={(e) => setBook({ ...book, authorId: Number(e.target.value) })}
                value={book.authorId}
            >
                {authors.map((author: any) => (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                ))}
            </select>

            <div className="mt-4">
                <button className="btn mr-2" onClick={handleSave}>บันทึก</button>
                <button className="btn-secondary" onClick={handleCloseModal}>ยกเลิก</button>
            </div>
        </Modal>
    </div>
}
