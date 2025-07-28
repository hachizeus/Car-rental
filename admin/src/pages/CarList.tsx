import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "@/lib/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Edit, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"

const CarList = () => {
  const queryClient = useQueryClient()

  const { data: cars, isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: api.getCars
  })

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteCar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
      toast.success('Car deleted successfully')
    },
    onError: (error: any) => {
      toast.error(error.message || 'Failed to delete car')
    }
  })

  if (isLoading) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Cars</h1>
          <p className="text-gray-300">Manage your car inventory</p>
        </div>
        <Button asChild>
          <Link to="/cars/add">
            <Plus className="mr-2 h-4 w-4" />
            Add Car
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars?.map((car) => {
          const primaryImage = car.images?.find(img => img.is_primary)?.url
          return (
          <Card key={car._id} className="bg-gray-800 border-gray-700">
            {primaryImage && (
              <div className="h-48 overflow-hidden">
                <img 
                  src={primaryImage} 
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardHeader>
              <CardTitle className="text-lg text-white">{car.title}</CardTitle>
              <div className="flex justify-between text-sm text-gray-300">
                <span>{car.category}</span>
                <span className={car.is_available ? 'text-green-400' : 'text-red-400'}>
                  {car.is_available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-gray-400 mt-1">
                <span>{car.images?.length || 0} images</span>
                <span>{car.videos?.length || 0} videos</span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4 line-clamp-2">{car.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-red-500">
                  KSh {car.price_per_day.toLocaleString()}/day
                </span>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" className="flex-1 bg-red-600 hover:bg-red-700 text-white border-0">
                  <Link to={`/cars/edit/${car._id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => {
                    if (window.confirm(`Are you sure you want to delete "${car.title}"? This action cannot be undone.`)) {
                      deleteMutation.mutate(car._id)
                    }
                  }}
                  disabled={deleteMutation.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )})}
      </div>

      {cars?.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 mb-4">No cars found</p>
          <Button asChild className="bg-red-600 hover:bg-red-700">
            <Link to="/cars/add">Add your first car</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default CarList