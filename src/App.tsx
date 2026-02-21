import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedLayout from "@/components/ProtectedLayout";

import Login from "./pages/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminStaff from "./pages/admin/Staff";
import AdminInventory from "./pages/admin/Inventory";
import AdminReports from "./pages/admin/Reports";
import AdminBills from "./pages/admin/Bills";
import StaffDashboard from "./pages/staff/Dashboard";
import StaffOrder from "./pages/staff/Order";
import StaffKitchen from "./pages/staff/Kitchen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedLayout allowedRole="admin"><AdminDashboard /></ProtectedLayout>} />
            <Route path="/admin/products" element={<ProtectedLayout allowedRole="admin"><AdminProducts /></ProtectedLayout>} />
            <Route path="/admin/staff" element={<ProtectedLayout allowedRole="admin"><AdminStaff /></ProtectedLayout>} />
            <Route path="/admin/inventory" element={<ProtectedLayout allowedRole="admin"><AdminInventory /></ProtectedLayout>} />
            <Route path="/admin/reports" element={<ProtectedLayout allowedRole="admin"><AdminReports /></ProtectedLayout>} />
            <Route path="/admin/bills" element={<ProtectedLayout allowedRole="admin"><AdminBills /></ProtectedLayout>} />

            {/* Staff Routes */}
            <Route path="/staff" element={<ProtectedLayout allowedRole="staff"><StaffDashboard /></ProtectedLayout>} />
            <Route path="/staff/order" element={<ProtectedLayout allowedRole="staff"><StaffOrder /></ProtectedLayout>} />
            <Route path="/staff/kitchen" element={<ProtectedLayout allowedRole="staff"><StaffKitchen /></ProtectedLayout>} />
            <Route path="/staff/bills" element={<ProtectedLayout allowedRole="staff"><AdminBills /></ProtectedLayout>} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
