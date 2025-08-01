import { Search, List } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"

// Menu items.
const items = [
  {
    title: "Search",
    url: "/dashboard",
    icon: Search,
  },
  {
    title: "Starships List",
    url: "/dashboard/starships",
    icon: List,
  },
]

export function AppSidebar() {
  return (
    <Sidebar variant="floating" className="font-mono">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Starship Control</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-xs text-muted-foreground">Nishant Gaharwar</SidebarFooter>
    </Sidebar>
  )
}