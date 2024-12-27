import { useState, useEffect } from "react";

interface ModalProps {
    title: string;
    children: React.ReactNode;
    isShow: boolean;
    onClose: () => void; // day 5
}

export default function Modal({ title, children, isShow = false, onClose /* day 5 */ }: ModalProps) {
    const [isShowModal, setIsShowModal] = useState(isShow);

    useEffect(() => {
        console.log('isShowModal', isShowModal);
        // esc for close modal
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose(); // day 5
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]); // day 5

    return (
        <>
            {isShow && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg w-1/3">
                            <div className="text-xl font-bold mb-4 p-4 bg-pink-600 text-white rounded-t-lg flex justify-between items-center">
                                {title}
                                <button
                                    onClick={onClose}
                                    className="text-white hover:text-gray-200 focus:outline-none"
                                >
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                            <div className="p-4">{children}</div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}