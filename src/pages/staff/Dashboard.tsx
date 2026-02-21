import { motion } from "framer-motion";
import { ShoppingBag, DollarSign, Coffee, UtensilsCrossed } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Button } from "@/components/ui/button";

const orderSplit = [
  { name: "Takeaway", value: 45, color: "hsl(252, 75%, 60%)" },
  { name: "Dine-In", value: 55, color: "hsl(252, 65%, 75%)" },
];

const StaffDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Staff Dashboard ☕</h1>
        <p className="text-muted-foreground text-sm mt-1">Quick overview of today's activity</p>
      </motion.div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: "Today's Revenue", value: "₹18,400", icon: DollarSign },
          { label: "Orders Today", value: "67", icon: ShoppingBag },
          { label: "Avg Order", value: "₹275", icon: Coffee },
        ].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card p-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
                <stat.icon className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p className="text-xl font-bold text-foreground">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Order Split + New Order */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card p-6">
          <h3 className="text-base font-semibold text-foreground mb-1">Order Split</h3>
          <p className="text-xs text-muted-foreground mb-4">Takeaway vs Dine-In today</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={orderSplit} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={4} dataKey="value">
                {orderSplit.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            {orderSplit.map((p, i) => (
              <div key={i} className="flex items-center gap-1.5 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: p.color }} />
                <span className="text-muted-foreground">{p.name}</span>
                <span className="font-semibold text-foreground">{p.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card p-6 flex flex-col items-center justify-center text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">Create New Order</h3>
          <p className="text-sm text-muted-foreground mb-8">Select order type to get started</p>
          <div className="flex gap-4">
            <Button variant="hero" size="xl" onClick={() => navigate("/staff/order?type=takeaway")} className="flex-col h-auto py-6 px-8 gap-3">
              <Coffee className="w-8 h-8" />
              <span>Takeaway</span>
            </Button>
            <Button variant="outline" size="xl" onClick={() => navigate("/staff/order?type=dinein")} className="flex-col h-auto py-6 px-8 gap-3 border-2">
              <UtensilsCrossed className="w-8 h-8" />
              <span>Dine-In</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StaffDashboard;
