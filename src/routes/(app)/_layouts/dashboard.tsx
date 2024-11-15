import PageContainer from '@/components/layout/page-container'
import DashboardView from '@/sections/dashboard/view'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_layouts/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageContainer>
      <DashboardView/>
    </PageContainer>
  )
}
