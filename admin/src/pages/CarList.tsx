import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { Edit, Trash2, Plus } from "lucide-react"
import { toast } from "sonner"

const CarList = () => {
  const queryClient = useQueryClient()

  const { data: cars, isLoading } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const { data } = await supabase
        .from('cars')
        .select(`
          *,
          car_images(image_url, is_primary)
        `)
        .order('created_at', { ascending: false })
      return data || []
    }
  })

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Get car images and videos to delete from storage
      const { data: images } = await supabase.from('car_images').select('image_url').eq('car_id', id)
      const { data: videos } = await supabase.from('car_videos').select('video_url').eq('car_id', id)
      
      // Delete files from storage
      if (images) {
        for (const img of images) {
          const path = img.image_url.split('/').slice(-2).join('/')
          await supabase.storage.from('car-images').remove([path])
        }
      }
      if (videos) {
        for (const vid of videos) {
          const path = vid.video_url.split('/').slice(-2).join('/')
          await supabase.storage.from('car-videos').remove([path])
        }
      }
      
      // Delete car (cascade will delete related records)
      const { error } = await supabase.from('cars').delete().eq('id', id)
      if (error) throw error
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
      toast.success('Car deleted successfully')
    },
    onError: () => {
      toast.error('Failed to delete car')
    }
  })

  if (isLoading) return <div className="p-8">Loading...</div>

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cars</h1>
          <p className="text-gray-600">Manage your car inventory</p>
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
          const primaryImage = car.car_images?.find(img => img.is_primary)?.image_url
          return (
          <Card key={car.id}>
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
              <CardTitle className="text-lg">{car.title}</CardTitle>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{car.category}</span>
                <span className={car.is_available ? 'text-green-600' : 'text-red-600'}>
                  {car.is_available ? 'Available' : 'Unavailable'}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4 line-clamp-2">{car.description}</p>
              <div className="flex justify-between items-center mb-4">
                <span className="text-2xl font-bold text-green-600">
                  KSh {car.price_per_day.toLocaleString()}/day
                </span>
              </div>
              <div className="flex gap-2">
                <Button asChild size="sm" variant="outline" className="flex-1">
                  <Link to={`/cars/edit/${car.id}`}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </Button>
                <Button 
                  size="sm" 
                  variant="destructive"
                  onClick={() => deleteMutation.mutate(car.id)}
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
          <p className="text-gray-500 mb-4">No cars found</p>
          <Button asChild>
            <Link to="/cars/add">Add your first car</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

export default CarList