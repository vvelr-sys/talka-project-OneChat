"use client"

import Sidebar from "../components/SideBar";

export default function SidebarLayout({ children }) {
    return (
        <div className="flex h-screen bg-[url(/Bg.jpg)] bg-center bg-cover text-white overflow-hidden">
            {/* Sidebar อยู่กับที่ */}
            <div className="fixed top-0 left-0 h-full z-20">
                <Sidebar />
            </div>

            {/* Content ส่วนที่เลื่อน */}
            <main className="flex-1 ml-[250px] h-full overflow-y-auto p-6">
                {children}
            </main>
        </div>
    );
}