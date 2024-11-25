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

import TemHumeChart from "@/components/temhume/TemHumeChart"
import TemHumeStats from "@/components/temhume/Stats"
import TemHumeSensor from "@/components/temhume/Sensor"
import TemHumeWithDate from "@/components/temhume/WithDate"
import TemBarChart from '@/components/temhume/TemBarChart'
import HumeBarChart from '@/components/temhume/HumeBarChart'
import TemLineChart from '@/components/temhume/TemLineChart'
import HumeLineChart from '@/components/temhume/HumeLineChart'
import TemAreaChart from '@/components/temhume/TemAreaChart'
import HumeAreaChart from '@/components/temhume/HumeAreaChart'

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
        {/* Antiguo Titulo */}
        {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="text-center mt-10 justify-items-center max-h-screen font-[family-name:var(--font-source-serif)] text-custom-color text-black sm:text-5xl">
              <h1>
              Temperatura & Humedad
              </h1>
          </div> 
        </div> */}

        {/* Nuevo Titulo - Deprecated*/}
        {/* <div className="p-3 flex items-center justify-between space-y-2 max-h-screen font-[family-name:var(--font-source-serif)] text-custom-color text-black sm:text-5xl">
          <h2 className="{font-bold tracking-tight">Temperatura & Humedad</h2>
          <div className="flex items-center space-x-2">
              
          </div>
        </div> */}

        <Tabs defaultValue="no-date" className="space-y-4">
          <div className="p-3 flex items-center justify-between space-y-2 max-h-screen font-[family-name:var(--font-source-serif)] text-custom-color text-black sm:text-5xl">
            <h2 className="pt-2 font-bold tracking-tight">Temperatura & Humedad</h2>
            <div className="flex items-center space-x-2">
              <TabsList>
                <TabsTrigger value="no-date">General</TabsTrigger>
                <TabsTrigger value="with-date">Rango de Fechas</TabsTrigger>
              </TabsList>
            </div>
          </div>
          
          <TabsContent value="no-date" className="space-y-4">
            <div className="flex flex-1 flex-col gap-4 p-4">       
              <TemHumeStats/>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                <TemAreaChart/>
                <div className="pt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  <TemBarChart/>
                  <TemLineChart/>
                </div>

                <HumeAreaChart/>
                <div className="pt-2 grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  <HumeBarChart/>
                  <HumeLineChart/>
                </div>
                <TemHumeChart/>
                <TemHumeSensor/>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="with-date" className="space-y-4">
            <TemHumeWithDate/>
            {/* <div className="flex flex-1 flex-col gap-4 p-4">   
              <CalendarDateRangePicker />    
              <TempStats/>
              <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min p-4">
                <TempChart/>
                <Sensor/>
              </div>
            </div> */}
          </TabsContent>
        </Tabs>
        
      </SidebarInset>
    </SidebarProvider>
  )
}
