import Link from "next/link";

export default function Layout({ children }: {
    children: React.ReactNode
}) {
    return <div className="flex">
        <div className="sidebar">
            <div className="sidebar-header">
                <h1>NextPOS V 0.1</h1>
            </div>
            <div className="sidebar-menu">
                <div><Link href="/backoffice/dashboard">Dashboard</Link></div>
                <div><Link href="/backoffice/product">สินค้า</Link></div>
                <div><Link href="/backoffice/sale">ขายสินค้า</Link></div>
            </div>
        </div>
        <div className="pl-10 pt-2 w-full pr-10">{children}</div>
    </div>;
}