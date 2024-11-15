import KBar from "@/components/kbar";
import Header from "@/components/layout/header";
import AppSidebar from "@/components/layout/main-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useAuthStore } from "@/hooks/store/use-auth";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(app)/_layouts")({
  component: RouteComponent,
});

function RouteComponent() {
  if (!useAuthStore((state) => state.isAuthenticated)) {
    console.log("user redirect to login");
    return window.location.replace("/login");
  }
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
  );
}
