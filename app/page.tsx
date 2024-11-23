// "use client"

import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import Actual from "@/components/dashboard/Actual"
import HistoricBarCharts from "@/components/dashboard/HistoricBarCharts"
import HistoricLineCharts from "@/components/dashboard/HistoricLineCharts"

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="#">
                  Estación Meteorológica Virtual
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Tecnologico de Monterrey</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <div className="grid auto-rows-min gap-4 md:grid-cols-2 lg:grid-cols-1">
            <div className="text-center mt-2 justify-items-center max-h-screen font-[family-name:var(--font-source-serif)] text-custom-color text-black sm:text-7xl">
                <h1 className="font-bold tracking-tight">
                Estación Meteorologica Virtual
                </h1>
            </div> 
          </div>
          <Actual/>
          
        <Tabs defaultValue="line" className="space-y-4">
          <div className="p-3 flex items-center justify-between space-y-2 max-h-screen font-[family-name:var(--font-source-serif)] text-custom-color text-black sm:text-5xl">
            <h2 className="pt-2 font-bold tracking-tight">Dashboard</h2>
            <div className="flex items-center space-x-2">
              <TabsList>
                <TabsTrigger value="bar">Gráficas de Barras</TabsTrigger>
                <TabsTrigger value="line">Gráficas de Líneas</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <TabsContent value="bar" className="space-y-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
              <HistoricBarCharts/>
            </div>
          </TabsContent>

          <TabsContent value="line" className="space-y-4">
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                <HistoricLineCharts/>
            </div>
          </TabsContent>
        </Tabs>
         

        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
