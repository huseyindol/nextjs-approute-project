'use client'

import { HydrationBoundary } from '@tanstack/react-query'
import { DehydratedState } from '@tanstack/react-query'

interface HydrationProviderProps {
  children: React.ReactNode
  dehydratedState: DehydratedState
}

export default function HydrationProvider({
  children,
  dehydratedState,
}: HydrationProviderProps) {
  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  )
}
