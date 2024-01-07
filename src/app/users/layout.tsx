import MobileFooter from "@/components/MobileFooter"
import Sidebar from "@/components/sidebar/Sidebar"

interface LayoutProps {
    children: React.ReactNode
}
export default function layout({children}: LayoutProps) {
    return (
        <main className="h-full lg:pl-20">
            <Sidebar />
            {children}
            <MobileFooter />
        </main>
    )
}
