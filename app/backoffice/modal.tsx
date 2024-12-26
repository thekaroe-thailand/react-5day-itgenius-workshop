import { useState, useEffect } from "react";

interface ModalProps {
    title: string;
    children: React.ReactNode;
    isShow: boolean;
}

export default function Modal({ title, children, isShow = false }: ModalProps) {
    const [isShowModal, setIsShowModal] = useState(isShow);

    useEffect(() => {
        console.log('isShowModal', isShowModal);
        // esc for close modal
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setIsShowModal(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [isShowModal]);

    return (
        <>
            {isShow && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
                        <div className="bg-white rounded-lg shadow-lg w-1/3">
                            <div className="text-xl font-bold mb-4 p-4 bg-pink-600 text-white rounded-t-lg">
                                {title}
                            </div>
                            <div className="p-4">{children}</div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}