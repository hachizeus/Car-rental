import { useState, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { X, Upload } from "lucide-react"

const EditCar = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_per_day: '',
    category: 'economy',
    location: 'Nairobi',
    features: '',
    is_available: true,
    engine: '',
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    year: new Date().getFullYear(),
    mileage: ''
  })
  
  const [newImages, setNewImages] = useState<File[]>([])
  const [newVideos, setNewVideos] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: async () => {
      const { data } = await supabase
        .from('cars')
        .select(`
          *,
          car_images(id, image_url, is_primary),
          car_videos(id, video_url)
        `)
        .eq('id', id)
        .single()
      return data
    },
    enabled: !!id
  })

  useEffect(() => {
    if (car) {
      setFormData({
        title: car.title,
        description: car.description,
        price_per_day: car.price_per_day.toString(),
        category: car.category,
        location: car.location,
        features: car.features?.join(', ') || '',
        is_available: car.is_available,
        engine: car.engine || '',
        transmission: car.transmission || 'automatic',
        fuel_type: car.fuel_type || 'petrol',
        seats: car.seats || 5,
        year: car.year || new Date().getFullYear(),
        mileage: car.mileage || ''
      })
    }
  }, [car])

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      setUploading(true)
      
      // Update car details
      const { error } = await supabase.from('cars').update({
        title: data.title,
        description: data.description,
        price_per_day: parseFloat(data.price_per_day),
        category: data.category,
        location: data.location,
        features: data.features.split(',').map(f => f.trim()).filter(Boolean),
        is_available: data.is_available,
        engine: data.engine,
        transmission: data.transmission,
        fuel_type: data.fuel_type,
        seats: data.seats,
        year: data.year,
        mileage: data.mileage
      }).eq('id', id)
      if (error) throw error
      
      // Upload new images
      for (let i = 0; i < newImages.length; i++) {
        const file = newImages[i]
        const fileName = `${id}/${Date.now()}-${file.name}`
        
        const { error: uploadError } = await supabase.storage
          .from('car-images')
          .upload(fileName, file)
        
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('car-images')
          .getPublicUrl(fileName)
        
        await supabase.from('car_images').insert({
          car_id: id,
          image_url: publicUrl,
          is_primary: false
        })
      }
      
      // Upload new videos
      for (const file of newVideos) {
        const fileName = `${id}/${Date.now()}-${file.name}`
        
        const { error: uploadError } = await supabase.storage
          .from('car-videos')
          .upload(fileName, file)
        
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('car-videos')
          .getPublicUrl(fileName)
        
        await supabase.from('car_videos').insert({
          car_id: id,
          video_url: publicUrl
        })
      }
      
      setUploading(false)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
      queryClient.invalidateQueries({ queryKey: ['car', id] })
      toast.success('Car updated successfully')
      navigate('/cars')
    },
    onError: () => {
      setUploading(false)
      toast.error('Failed to update car')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    updateMutation.mutate(formData)
  }
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewImages(Array.from(e.target.files))
    }
  }
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewVideos(Array.from(e.target.files))
    }
  }
  
  const removeNewImage = (index: number) => {
    setNewImages(newImages.filter((_, i) => i !== index))
  }
  
  const removeNewVideo = (index: number) => {
    setNewVideos(newVideos.filter((_, i) => i !== index))
  }
  
  const deleteExistingImage = async (imageId: string) => {
    const { error } = await supabase.from('car_images').delete().eq('id', imageId)
    if (error) {
      toast.error('Failed to delete image')
    } else {
      toast.success('Image deleted')
      queryClient.invalidateQueries({ queryKey: ['car', id] })
    }
  }
  
  const deleteExistingVideo = async (videoId: string) => {
    const { error } = await supabase.from('car_videos').delete().eq('id', videoId)
    if (error) {
      toast.error('Failed to delete video')
    } else {
      toast.success('Video deleted')
      queryClient.invalidateQueries({ queryKey: ['car', id] })
    }
  }

  if (isLoading) return <div className="p-8 text-gray-900 dark:text-gray-100">Loading...</div>

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Edit Car</h1>
        <p className="text-gray-600 dark:text-gray-400">Update car details</p>
      </div>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="text-gray-900 dark:text-gray-100">Car Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Description</label>
              <textarea
                className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Price per Day (KSh)</label>
                <Input
                  type="number"
                  value={formData.price_per_day}
                  onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Category</label>
                <select
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="economy">Economy</option>
                  <option value="luxury">Luxury</option>
                  <option value="suv">SUV</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Features (comma separated)</label>
              <Input
                value={formData.features}
                onChange={(e) => setFormData({...formData, features: e.target.value})}
                placeholder="GPS, AC, Bluetooth"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Specifications</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Engine</label>
                  <Input
                    value={formData.engine || ''}
                    onChange={(e) => setFormData({...formData, engine: e.target.value})}
                    placeholder="2.0L Turbo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Transmission</label>
                  <select
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    value={formData.transmission || 'automatic'}
                    onChange={(e) => setFormData({...formData, transmission: e.target.value})}
                  >
                    <option value="automatic">Automatic</option>
                    <option value="manual">Manual</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Fuel Type</label>
                  <select
                    className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                    value={formData.fuel_type || 'petrol'}
                    onChange={(e) => setFormData({...formData, fuel_type: e.target.value})}
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid">Hybrid</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Seats</label>
                  <Input
                    type="number"
                    value={formData.seats || ''}
                    onChange={(e) => setFormData({...formData, seats: parseInt(e.target.value) || 0})}
                    placeholder="5"
                    min="1"
                    max="15"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Year</label>
                  <Input
                    type="number"
                    value={formData.year || ''}
                    onChange={(e) => setFormData({...formData, year: parseInt(e.target.value) || 0})}
                    placeholder="2023"
                    min="2000"
                    max="2025"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium mb-1 text-gray-600 dark:text-gray-400">Mileage</label>
                  <Input
                    value={formData.mileage || ''}
                    onChange={(e) => setFormData({...formData, mileage: e.target.value})}
                    placeholder="15 km/l"
                  />
                </div>
              </div>
            </div>

            {/* Existing Images */}
            {car?.car_images && car.car_images.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Current Images</label>
                <div className="grid grid-cols-2 gap-2">
                  {car.car_images.map((img) => (
                    <div key={img.id} className="relative">
                      <img 
                        src={img.image_url} 
                        alt="Car" 
                        className="w-full h-24 object-cover rounded"
                      />
                      {img.is_primary && (
                        <span className="absolute top-1 left-1 bg-green-600 text-white text-xs px-1 rounded">
                          Primary
                        </span>
                      )}
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="absolute top-1 right-1 h-6 w-6 p-0"
                        onClick={() => deleteExistingImage(img.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Images */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Add New Images</label>
              <div className="space-y-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
                {newImages.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {newImages.map((file, index) => (
                      <div key={index} className="relative bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        <span className="text-sm text-gray-900 dark:text-gray-100">{file.name}</span>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removeNewImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Existing Videos */}
            {car?.car_videos && car.car_videos.length > 0 && (
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Current Videos</label>
                <div className="space-y-2">
                  {car.car_videos.map((video) => (
                    <div key={video.id} className="relative bg-gray-100 dark:bg-gray-700 p-2 rounded flex justify-between items-center">
                      <span className="text-sm text-gray-900 dark:text-gray-100">Video {video.id}</span>
                      <Button
                        type="button"
                        size="sm"
                        variant="destructive"
                        className="h-6 w-6 p-0"
                        onClick={() => deleteExistingVideo(video.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* New Videos */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Add New Videos</label>
              <div className="space-y-2">
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
                {newVideos.length > 0 && (
                  <div className="space-y-2">
                    {newVideos.map((file, index) => (
                      <div key={index} className="relative bg-gray-100 dark:bg-gray-700 p-2 rounded flex justify-between items-center">
                        <span className="text-sm text-gray-900 dark:text-gray-100">{file.name}</span>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="h-6 w-6 p-0"
                          onClick={() => removeNewVideo(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="available"
                checked={formData.is_available}
                onChange={(e) => setFormData({...formData, is_available: e.target.checked})}
              />
              <label htmlFor="available" className="text-sm font-medium text-gray-700 dark:text-gray-300">Available for rent</label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={updateMutation.isPending || uploading}>
                {uploading ? 'Uploading...' : updateMutation.isPending ? 'Updating...' : 'Update Car'}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate('/cars')}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default EditCar