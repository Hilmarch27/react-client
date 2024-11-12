import PageContainer from '@/components/layout/page-container'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(app)/_layouts/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <PageContainer>
      <h1>ini dashboard</h1>
    </PageContainer>
  )
}
