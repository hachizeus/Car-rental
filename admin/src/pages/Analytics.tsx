import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Car, TrendingUp, Users } from "lucide-react"

const Analytics = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['analytics'],
    queryFn: async () => {
      // Get total page views
      const { count: totalViews } = await supabase
        .from('page_views')
        .select('*', { count: 'exact', head: true })

      // Get total car views
      const { count: carViews } = await supabase
        .from('car_views')
        .select('*', { count: 'exact', head: true })

      // Get most viewed cars
      const { data: topCars } = await supabase
        .from('car_views')
        .select('car_title, car_id')
        .order('timestamp', { ascending: false })
        .limit(100)

      // Count views per car
      const carViewCounts = topCars?.reduce((acc, view) => {
        acc[view.car_title] = (acc[view.car_title] || 0) + 1
        return acc
      }, {} as Record<string, number>) || {}

      const mostViewedCars = Object.entries(carViewCounts)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5)
        .map(([title, views]) => ({ title, views }))

      // Get recent views (last 7 days)
      const sevenDaysAgo = new Date()
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)
      
      const { count: recentViews } = await supabase
        .from('car_views')
        .select('*', { count: 'exact', head: true })
        .gte('timestamp', sevenDaysAgo.toISOString())

      return {
        totalViews: totalViews || 0,
        carViews: carViews || 0,
        mostViewedCars,
        recentViews: recentViews || 0
      }
    }
  })

  if (isLoading) return <div className="p-8 text-white">Loading analytics...</div>

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Analytics Dashboard</h1>
        <p className="text-gray-300">Track website and car viewing statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Page Views</CardTitle>
            <Eye className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.totalViews}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Car Detail Views</CardTitle>
            <Car className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.carViews}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Views (Last 7 Days)</CardTitle>
            <TrendingUp className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats?.recentViews}</div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Avg. Daily Views</CardTitle>
            <Users className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {Math.round((stats?.recentViews || 0) / 7)}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white">Most Viewed Cars</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats?.mostViewedCars.map((car, index) => (
              <div key={car.title} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <span className="text-white font-medium">{car.title}</span>
                </div>
                <span className="text-gray-300">{car.views} views</span>
              </div>
            ))}
            {(!stats?.mostViewedCars || stats.mostViewedCars.length === 0) && (
              <p className="text-gray-400">No car views recorded yet</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Analytics