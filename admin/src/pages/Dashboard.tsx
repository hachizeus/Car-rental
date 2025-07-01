import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Car, TrendingUp, Users, Eye, Calendar } from "lucide-react"

const Dashboard = () => {
  const { data: cars } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const { data } = await supabase.from('cars').select('*')
      return data || []
    }
  })
  


  const totalCars = cars?.length || 0
  const availableCars = cars?.filter(car => car.is_available).length || 0
  const rentedCars = totalCars - availableCars
  
  // Mock analytics data
  const analyticsData = {
    dailyVisits: [
      { day: 'Sun', visits: 0 },
      { day: 'Mon', visits: 0 },
      { day: 'Tue', visits: 0 },
      { day: 'Wed', visits: 0 },
      { day: 'Thu', visits: 0 },
      { day: 'Fri', visits: 0 },
      { day: 'Sat', visits: 0 }
    ],
    totalVisits: 0,
    totalUsers: 0
  }


  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-300">Manage your car rental fleet</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{totalCars}</div>
            <p className="text-xs text-gray-400 mt-1">Fleet size</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Available Cars</CardTitle>
            <Car className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{availableCars}</div>
            <p className="text-xs text-gray-400 mt-1">Ready to rent</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Website Visits</CardTitle>
            <Eye className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
            <p className="text-xs text-gray-400 mt-1">This week</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 border-gray-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-300">Car Views</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">0</div>
            <p className="text-xs text-gray-400 mt-1">Car detail views</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Daily Visits Chart */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-red-500" />
              Daily Website Visits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analyticsData?.dailyVisits?.map((day, index) => {
                const maxVisits = Math.max(...(analyticsData?.dailyVisits?.map(d => d.visits) || [1]))
                const percentage = (day.visits / maxVisits) * 100
                return (
                  <div key={day.day} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm w-12">{day.day}</span>
                    <div className="flex-1 mx-4">
                      <div className="bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-white text-sm w-12 text-right">{day.visits}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Fleet Status */}
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Car className="h-5 w-5 text-red-500" />
              Fleet Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Available Cars</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-white font-semibold">{availableCars}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-300">Rented Cars</span>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                  <span className="text-white font-semibold">{rentedCars}</span>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-700">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-300">Utilization Rate</span>
                  <span className="text-white font-semibold">{totalCars > 0 ? Math.round((rentedCars / totalCars) * 100) : 0}%</span>
                </div>
                <div className="bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${totalCars > 0 ? (rentedCars / totalCars) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button asChild size="lg" className="h-16 bg-red-600 hover:bg-red-700 px-12">
          <Link to="/cars" className="flex flex-col items-center gap-2">
            <Car className="h-6 w-6" />
            <span>Manage Cars</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Dashboard