import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./context/AuthContext";
import type { ReactNode } from "react";

import HomePage from "./pages/HomePage"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import SearchPage from "./pages/SearchPage"
import ProfessionalProfilePage from "./pages/ProfessionalProfilePage"
import CustomerProfilePage from "./pages/CustomerProfilePage"
import FavoritesPage from "./pages/FavoritesPage"
import ProfessionalDashboard from "./pages/ProfessionalDashboard"
import CategoriesPage from "./pages/CategoriesPage"
import PortfolioPage from "./pages/PortfolioPage"
import ProfessionalProfileEdit from "./pages/ProfessionalProfileEdit"


const queryClient = new QueryClient()

function ProtectedRoute({children}: {children: ReactNode}){
  const {user} = useAuth()
  if(!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/search" element={<SearchPage/>} />
      <Route path="/categories" element={<CategoriesPage/>} />
      <Route path="/professionals/:id" element={<ProfessionalProfilePage/>} />

      <Route path="/profile" element={<ProtectedRoute><CustomerProfilePage /></ProtectedRoute>} />
      <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><ProfessionalDashboard /></ProtectedRoute>} />
      <Route path="/portfolio" element={<ProtectedRoute><PortfolioPage /></ProtectedRoute>} />
      <Route path="/profile/edit" element={<ProtectedRoute><ProfessionalProfileEdit /></ProtectedRoute>} />

    </Routes>
  )
}

export default function App(){
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes/>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}