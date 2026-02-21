import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import TopNav from "@/components/TopNav";

interface ProtectedLayoutProps {
  children: React.ReactNode;
  allowedRole: "admin" | "staff";
}

const ProtectedLayout = ({ children, allowedRole }: ProtectedLayoutProps) => {
  const { isAuthenticated, role } = useAuth();

  if (!isAuthenticated) return <Navigate to="/" replace />;
  if (role !== allowedRole) return <Navigate to={role === "admin" ? "/admin" : "/staff"} replace />;

  return (
    <div className="min-h-screen gradient-subtle">
      <TopNav />
      <main>{children}</main>
    </div>
  );
};

export default ProtectedLayout;
