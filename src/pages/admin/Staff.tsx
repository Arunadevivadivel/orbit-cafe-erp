import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, MoreVertical, UserCheck, UserX, Shield, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StaffMember {
  id: number;
  name: string;
  email: string;
  role: "Manager" | "Staff";
  status: "Active" | "Inactive";
  joinedDate: string;
  shifts: number;
}

const mockStaff: StaffMember[] = [
  { id: 1, name: "Amit Sharma", email: "amit@brewflow.com", role: "Manager", status: "Active", joinedDate: "2024-01-15", shifts: 24 },
  { id: 2, name: "Priya Patel", email: "priya@brewflow.com", role: "Staff", status: "Active", joinedDate: "2024-03-20", shifts: 22 },
  { id: 3, name: "Rahul Verma", email: "rahul@brewflow.com", role: "Staff", status: "Active", joinedDate: "2024-05-10", shifts: 18 },
  { id: 4, name: "Sneha Gupta", email: "sneha@brewflow.com", role: "Staff", status: "Inactive", joinedDate: "2024-02-28", shifts: 0 },
  { id: 5, name: "Karan Singh", email: "karan@brewflow.com", role: "Staff", status: "Active", joinedDate: "2024-06-01", shifts: 15 },
  { id: 6, name: "Neha Joshi", email: "neha@brewflow.com", role: "Manager", status: "Active", joinedDate: "2023-11-10", shifts: 26 },
];

const AdminStaff = () => {
  const [search, setSearch] = useState("");

  const filtered = mockStaff.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Staff</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your team members & roles</p>
        </div>
        <Button variant="hero">
          <Plus className="w-4 h-4" /> Add Staff
        </Button>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-sm mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search staff..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 rounded-full bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
        />
      </div>

      {/* Staff Grid */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((staff, i) => (
          <motion.div
            key={staff.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card p-5 hover:shadow-glow transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 gradient-primary rounded-full flex items-center justify-center text-sm font-bold text-primary-foreground">
                  {staff.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{staff.name}</h3>
                  <p className="text-xs text-muted-foreground">{staff.email}</p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                <MoreVertical className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">
                {staff.role === "Manager" ? <Shield className="w-3 h-3" /> : <User className="w-3 h-3" />}
                {staff.role}
              </span>
              <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                staff.status === "Active" ? "bg-success/10 text-success" : "bg-muted text-muted-foreground"
              }`}>
                {staff.status === "Active" ? <UserCheck className="w-3 h-3" /> : <UserX className="w-3 h-3" />}
                {staff.status}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
              <span>Joined {staff.joinedDate}</span>
              <span>{staff.shifts} shifts this month</span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminStaff;
