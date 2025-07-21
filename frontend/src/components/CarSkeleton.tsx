import { Card } from "@/components/ui/card";

export const CarSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <div className="h-48 bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/2" />
        <div className="flex justify-between items-center pt-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/3" />
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/4" />
        </div>
      </div>
    </Card>
  );
};

export const CarDetailsSkeleton = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl animate-pulse" />
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="w-20 h-16 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
      <div className="space-y-6">
        <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/2" />
        <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded animate-pulse" />
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-800 rounded animate-pulse w-1/3" />
          <div className="flex flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse w-20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};