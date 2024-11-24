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

import Credits from "@/components/creditos/Credits";

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

        <Tabs defaultValue="no-date" className="space-y-4">
        <div className="p-3 flex items-center justify-center max-h-screen font-[family-name:var(--font-source-serif)] text-custom-color text-black sm:text-5xl">
          <div className="text-center mt-10 max-h-screen font-[family-name:var(--font-source-serif)] text-custom-color text-black sm:text-5xl">
            <h1>
              Créditos
            </h1>
          </div>
        </div>

          <TabsContent value="no-date" className="space-y-4">
            <div className="flex flex-1 flex-col gap-4 p-4">
              <Credits />
            </div>
          </TabsContent>

          <TabsContent value="with-date" className="space-y-4">

          </TabsContent>
        </Tabs>
      </SidebarInset>
    </SidebarProvider>
  );
}
