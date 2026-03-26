import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner"
import type { ReactNode } from "react";

import HomePage from "@/pages/HomePage"
import LoginPage from "@/pages/LoginPage"
import RegisterPage from "@/pages/RegisterPage"
import SearchPage from "@/pages/SearchPage"
import ProfessionalProfilePage from "@/pages/ProfessionalProfilePage"
import CustomerProfilePage from "@/pages/CustomerProfilePage"
import FavoritesPage from "@/pages/FavoritesPage"
import ProfessionalDashboard from "@/pages/ProfessionalDashboard"
import PortfolioPage from "@/pages/PortfolioPage"
import ProfessionalProfileEdit from "@/pages/ProfessionalProfileEdit"
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotFoundPage from "./pages/NotFoundPage";


const queryClient = new QueryClient()

function ProtectedRoute({children}: {children: ReactNode}){
  const {user} = useAuth()
  if(!user) return <Navigate to="/login" replace />
  return <>{children}</>
}

function ProfessionalRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth()

  if (loading) return null

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (user.role !== "professional") {
    return <Navigate to="/" replace />
  }

  return <>{children}</>
}

function AppRoutes() {
  return (
    <>
      <Navbar/>
      
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/professionals/:id" element={<ProfessionalProfilePage/>} />

        <Route path="/profile" element={<ProtectedRoute><CustomerProfilePage /></ProtectedRoute>} />
        <Route path="/favorites" element={<ProtectedRoute><FavoritesPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProfessionalRoute><ProfessionalDashboard /></ProfessionalRoute>} />
        <Route path="/portfolio" element={<ProfessionalRoute><PortfolioPage /></ProfessionalRoute>} />
        <Route path="/profile/edit" element={<ProtectedRoute><ProfessionalProfileEdit /></ProtectedRoute>} />

        <Route path="*" element={<NotFoundPage/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default function App(){
  return (
    <ThemeProvider defaultTheme="light" storageKey="localpro-theme">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
            <Toaster position="bottom-right" />
          </BrowserRouter>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  )
}