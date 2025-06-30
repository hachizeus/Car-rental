import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import { Toaster } from "sonner"
import Dashboard from "./pages/Dashboard"
import CarList from "./pages/CarList"
import AddCar from "./pages/AddCar"
import EditCar from "./pages/EditCar"


const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-xl font-semibold text-gray-900">Car Rental Admin</Link>
                <div className="hidden md:flex space-x-4">
                  <Link to="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">Dashboard</Link>
                  <Link to="/cars" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">Cars</Link>

                  <Link to="/cars/add" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md">Add Car</Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cars" element={<CarList />} />

          <Route path="/cars/add" element={<AddCar />} />
          <Route path="/cars/edit/:id" element={<EditCar />} />
        </Routes>
      </div>
      <Toaster />
    </BrowserRouter>
  </QueryClientProvider>
)

export default App