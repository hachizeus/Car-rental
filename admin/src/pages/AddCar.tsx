import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { supabase } from "@/lib/supabase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Upload, X } from "lucide-react"

const AddCar = () => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price_per_day: '',
    category: 'economy',
    location: 'Nairobi',
    features: '',
    is_available: true
  })
  
  const [images, setImages] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const addMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      setUploading(true)
      
      // Insert car first
      const { data: car, error: carError } = await supabase.from('cars').insert({
        title: data.title,
        description: data.description,
        price_per_day: parseFloat(data.price_per_day),
        category: data.category,
        location: data.location,
        features: data.features.split(',').map(f => f.trim()).filter(Boolean),
        is_available: data.is_available
      }).select().single()
      
      if (carError) throw carError
      
      // Upload images
      for (let i = 0; i < images.length; i++) {
        const file = images[i]
        const fileName = `${car.id}/${Date.now()}-${file.name}`
        
        const { error: uploadError } = await supabase.storage
          .from('car-images')
          .upload(fileName, file)
        
        if (uploadError) throw uploadError
        
        const { data: { publicUrl } } = supabase.storage
          .from('car-images')
          .getPublicUrl(fileName)
        
        await supabase.from('car_images').insert({
          car_id: car.id,
          image_url: publicUrl,
          is_primary: i === 0
        })
      }
      
      // Upload videos (skip if fails)
      for (const file of videos) {
        try {
          const fileName = `${car.id}/${Date.now()}-${file.name}`
          
          const { error: uploadError } = await supabase.storage
            .from('car-videos')
            .upload(fileName, file)
          
          if (!uploadError) {
            const { data: { publicUrl } } = supabase.storage
              .from('car-videos')
              .getPublicUrl(fileName)
            
            await supabase.from('car_videos').insert({
              car_id: car.id,
              video_url: publicUrl
            })
          }
        } catch (error) {
          console.log('Video upload failed, continuing without video')
        }
      }
      
      setUploading(false)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
      toast.success('Car added successfully! (Videos may take longer to process)')
      navigate('/cars')
    },
    onError: () => {
      setUploading(false)
      toast.error('Failed to add car')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addMutation.mutate(formData)
  }
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files))
    }
  }
  
  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setVideos(Array.from(e.target.files))
    }
  }
  
  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index))
  }
  
  const removeVideo = (index: number) => {
    setVideos(videos.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Add New Car</h1>
        <p className="text-gray-600">Add a new car to your fleet</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Car Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                className="w-full p-2 border rounded-md"
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Price per Day (KSh)</label>
                <Input
                  type="number"
                  value={formData.price_per_day}
                  onChange={(e) => setFormData({...formData, price_per_day: e.target.value})}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <select
                  className="w-full p-2 border rounded-md"
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
              <label className="block text-sm font-medium mb-2">Location</label>
              <Input
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Features (comma separated)</label>
              <Input
                value={formData.features}
                onChange={(e) => setFormData({...formData, features: e.target.value})}
                placeholder="GPS, AC, Bluetooth"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Images</label>
              <div className="space-y-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded-md"
                />
                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((file, index) => (
                      <div key={index} className="relative bg-gray-100 p-2 rounded">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="absolute top-1 right-1 h-6 w-6 p-0"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Videos</label>
              <div className="space-y-2">
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="w-full p-2 border rounded-md"
                />
                {videos.length > 0 && (
                  <div className="space-y-2">
                    {videos.map((file, index) => (
                      <div key={index} className="relative bg-gray-100 p-2 rounded flex justify-between items-center">
                        <span className="text-sm">{file.name}</span>
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="h-6 w-6 p-0"
                          onClick={() => removeVideo(index)}
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
              <label htmlFor="available" className="text-sm font-medium">Available for rent</label>
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={addMutation.isPending || uploading}>
                {uploading ? 'Uploading...' : addMutation.isPending ? 'Adding...' : 'Add Car'}
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

export default AddCar