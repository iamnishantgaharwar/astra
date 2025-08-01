import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const StarshipSkeleton = () => {
  return (
    <div className="w-full space-y-4 mt-2">
        <div className="grid grid-cols-5 gap-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        {[...Array(5)].map((_, i) => (
          <div key={i} className="grid grid-cols-5 gap-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
  )
}

export default StarshipSkeleton