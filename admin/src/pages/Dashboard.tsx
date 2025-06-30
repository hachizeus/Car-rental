import { useQuery } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Car, Plus } from "lucide-react"

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


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Manage your car rental fleet</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cars</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCars}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Cars</CardTitle>
            <Car className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{availableCars}</div>
          </CardContent>
        </Card>


      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button asChild size="lg" className="h-16">
          <Link to="/cars" className="flex flex-col items-center gap-2">
            <Car className="h-6 w-6" />
            <span>Manage Cars</span>
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="h-16">
          <Link to="/cars/add" className="flex flex-col items-center gap-2">
            <Plus className="h-6 w-6" />
            <span>Add New Car</span>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default Dashboard