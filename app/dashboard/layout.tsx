import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar/app-sidebar"
import { ModeToggle } from "@/components/theme"

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen mx-2">
        <AppSidebar />
        
        <main className="flex-1">
          <div className="flex relative items-center">
            <div className="absolute mt-2 ml-2">
              <SidebarTrigger />
            </div>
            <nav className="border rounded-lg p-4 mt-2 w-full inline-flex justify-center items-center">
            <span className=" font-bold font-mono uppercase text-2xl">Star Wars Fleet Management Dashboard</span>
            <div className="absolute right-2 ">
              <ModeToggle />
            </div>
            </nav>
          </div>
          
          {children}
        </main>
      </div>
    </SidebarProvider>
  )
}