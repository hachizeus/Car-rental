import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom"
import { Toaster } from "sonner"
import { Car, LayoutDashboard, Plus, LogOut } from "lucide-react"
import logo from "@/assets/images/logo.png"
import Dashboard from "./pages/Dashboard"
import CarList from "./pages/CarList"
import AddCar from "./pages/AddCar"
import EditCar from "./pages/EditCar"
import Login from "./pages/Login"


const queryClient = new QueryClient()

const Sidebar = () => {
  const location = useLocation()
  
  const menuItems = [
    { path: "/", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/cars", icon: Car, label: "Cars" },
  ]

  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0 flex flex-col border-r border-gray-700">
      {/* Logo */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <img src={logo} alt="PattRentals Logo" className="w-8 h-8" />
          <div className="text-xl font-bold text-white">
            Pattrentals
          </div>
        </div>
        <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-red-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>


    </div>
  )
}

const TopBar = () => {
  return (
    <div className="ml-64 bg-gray-800 text-white h-16 flex items-center justify-between px-6 shadow-lg">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold">Admin Dashboard</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">A</span>
          </div>
          <span className="text-sm font-medium">Admin User</span>
        </div>
        
        <button 
          onClick={() => {
            localStorage.clear();
            sessionStorage.clear();
            window.location.reload();
          }}
          className="flex items-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-4 h-4" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  )
}



const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn')
  return isLoggedIn ? <>{children}</> : <Login />
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <div className="min-h-screen bg-gray-900">
        <Sidebar />
        <TopBar />
        
        <main className="ml-64 pt-4 p-6">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/cars" element={<ProtectedRoute><CarList /></ProtectedRoute>} />
            <Route path="/cars/add" element={<ProtectedRoute><AddCar /></ProtectedRoute>} />
            <Route path="/cars/edit/:id" element={<ProtectedRoute><EditCar /></ProtectedRoute>} />
          </Routes>
        </main>
      </div>
      <Toaster />
    </BrowserRouter>
  </QueryClientProvider>
)

export default App