'use client'

import {
	QueryClient,
	QueryClientProvider,
} from '@tanstack/react-query'
import CveView from '@/components/graphs/molecules/cveView'
const queryClient = new QueryClient()

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<CveView />
		</QueryClientProvider>
	)
}
