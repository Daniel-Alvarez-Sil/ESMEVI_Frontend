import { Calendar, Home, Inbox, Search, Settings, Box, Wind, Thermometer, Guitar, Orbit } from "lucide-react"

import {
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Temperatura & Humedad",
    url: "/temhume",
    icon: Thermometer,
  },
  {
    title: "Calidad del Aire",
    url: "/caliaire",
    icon: Wind,
  },
  {
    title: "Contaminación Acústica",
    url: "/contacust",
    icon: Guitar,
  },
  {
    title: "Créditos",
    url: "/creditos",
    icon: Settings,
  },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground" style={{ backgroundColor: '#457b9d' }}> 
                  <Orbit />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">ESMEVI</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Módulos</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-1">
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
