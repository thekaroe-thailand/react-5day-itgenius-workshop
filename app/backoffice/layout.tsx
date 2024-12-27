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