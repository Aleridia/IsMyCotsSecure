'use client'

import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import GetGH from '@/components/OSS/molecules/getGHCots'
const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<GetGH />
		</QueryClientProvider>
	)
}
