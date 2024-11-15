import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export const base_url = import.meta.env.VITE_API_URL;
export const api_url = import.meta.env.VITE_API_API_URL;
