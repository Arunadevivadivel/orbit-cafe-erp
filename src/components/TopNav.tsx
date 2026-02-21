import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Coffee, LogOut, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NavItem {
  label: string;
  path: string;
}

const adminNav: NavItem[] = [
  { label: "Dashboard", path: "/admin" },
  { label: "Products", path: "/admin/products" },
  { label: "Staff", path: "/admin/staff" },
  { label: "Inventory", path: "/admin/inventory" },
  { label: "Reports", path: "/admin/reports" },
  { label: "Bills", path: "/admin/bills" },
];

const staffNav: NavItem[] = [
  { label: "Dashboard", path: "/staff" },
  { label: "New Order", path: "/staff/order" },
  { label: "Kitchen", path: "/staff/kitchen" },
  { label: "Bills", path: "/staff/bills" },
];

const TopNav = () => {
  const { role, userName, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = role === "admin" ? adminNav : staffNav;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-7xl px-4 pt-3">
        <nav className="glass rounded-2xl px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to={role === "admin" ? "/admin" : "/staff"} className="flex items-center gap-2.5">
            <div className="w-9 h-9 gradient-primary rounded-xl flex items-center justify-center shadow-glow">
              <Coffee className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold gradient-primary-text hidden sm:block">BrewFlow</span>
          </Link>

          {/* Center Nav */}
          <div className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "gradient-primary text-primary-foreground shadow-glow"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
              <Search className="w-4 h-4 text-muted-foreground" />
            </button>
            <button className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-secondary transition-colors relative">
              <Bell className="w-4 h-4 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 gradient-primary rounded-full" />
            </button>
            <div className="w-px h-6 bg-border mx-1" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 gradient-primary rounded-full flex items-center justify-center text-xs font-semibold text-primary-foreground">
                {(userName || "U")[0].toUpperCase()}
              </div>
              <Button variant="ghost" size="icon" onClick={handleLogout} className="w-9 h-9">
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
