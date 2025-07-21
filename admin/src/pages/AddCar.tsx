import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router-dom"
import { api } from "@/lib/api"
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
    is_available: true,
    engine: '',
    transmission: 'automatic',
    fuel_type: 'petrol',
    seats: 5,
    year: new Date().getFullYear(),
    mileage: ''
  })
  
  const [images, setImages] = useState<File[]>([])
  const [videos, setVideos] = useState<File[]>([])
  const [uploading, setUploading] = useState(false)

  const addMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      setUploading(true)
      
      const formDataToSend = new FormData()
      
      // Add car data
      Object.keys(data).forEach(key => {
        formDataToSend.append(key, data[key as keyof typeof data] as string)
      })
      
      // Add images
      images.forEach(file => {
        formDataToSend.append('images', file)
      })
      
      // Add videos
      videos.forEach(file => {
        formDataToSend.append('videos', file)
      })
      
      const result = await api.addCar(formDataToSend)
      setUploading(false)
      return result
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cars'] })
      toast.success('Car added successfully!')
      navigate('/cars')
    },
    onError: (error: any) => {
      setUploading(false)
      toast.error(error.message || 'Failed to add car')
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
      const files = Array.from(e.target.files)
      const maxSize = 50 * 1024 * 1024 // 50MB
      const validFiles = files.filter(file => {
        if (file.size > maxSize) {
          toast.error(`${file.name} is too large. Max size is 50MB.`)
          return false
        }
        return true
      })
      setVideos(validFiles)
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
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Add New Car</h1>
        <p className="text-gray-600 dark:text-gray-400">Add a new car to your fleet</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Car Details</CardTitle>
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

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Images</label>
              <div className="space-y-2">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
                {images.length > 0 && (
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((file, index) => (
                      <div key={index} className="relative bg-gray-100 dark:bg-gray-700 p-2 rounded">
                        <span className="text-sm text-gray-900 dark:text-gray-100">{file.name}</span>
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
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Videos (Max 50MB each)</label>
              <div className="space-y-2">
                <input
                  type="file"
                  multiple
                  accept="video/*"
                  onChange={handleVideoUpload}
                  className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
                />
                {videos.length > 0 && (
                  <div className="space-y-2">
                    {videos.map((file, index) => (
                      <div key={index} className="relative bg-gray-100 dark:bg-gray-700 p-2 rounded flex justify-between items-center">
                        <span className="text-sm text-gray-900 dark:text-gray-100">{file.name}</span>
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
              <label htmlFor="available" className="text-sm font-medium text-gray-700 dark:text-gray-300">Available for rent</label>
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