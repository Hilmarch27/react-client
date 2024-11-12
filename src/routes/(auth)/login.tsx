import { createFileRoute } from '@tanstack/react-router'
import LoginView from '@/sections/auth/view'

export const Route = createFileRoute('/(auth)/login')({
  component: LoginView,
})
