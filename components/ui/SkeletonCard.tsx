import { Card } from "@/components/ui/card"

export function SkeletonCard() {
  return (
    <Card className="w-80 p-4 bg-white dark:bg-gray-800 shadow-xl border border-gray-200 dark:border-gray-700">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-24"></div>
          <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        </div>

        <div className="space-y-2">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-4/5"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-3/4"></div>
        </div>

        <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-16"></div>
        </div>
      </div>
    </Card>
  )
}
