import KBar from '@/components/kbar'
import Header from '@/components/layout/header'
import AppSidebar from '@/components/layout/main-sidebar'
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar'
import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_layouts')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <KBar>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <Header />
          {/* page main content */}
          <Outlet />
          {/* page main content ends */}
        </SidebarInset>
      </SidebarProvider>
    </KBar>
  )
}
