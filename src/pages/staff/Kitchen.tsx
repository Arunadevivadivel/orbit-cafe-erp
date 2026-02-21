import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, ChefHat, CheckCircle, UtensilsCrossed } from "lucide-react";

interface KitchenOrder {
  id: string;
  items: string[];
  table: string;
  time: string;
  type: string;
}

const initialOrders: Record<string, KitchenOrder[]> = {
  pending: [
    { id: "#BF1240", items: ["Cappuccino x2", "Croissant x1"], table: "Table 3", time: "2m ago", type: "Dine-In" },
    { id: "#BF1241", items: ["Latte x1", "Sandwich x1"], table: "Takeaway", time: "4m ago", type: "Takeaway" },
  ],
  cooking: [
    { id: "#BF1238", items: ["Espresso x1", "Chocolate Cake x1"], table: "Table 1", time: "6m ago", type: "Dine-In" },
    { id: "#BF1239", items: ["Green Tea x2"], table: "Takeaway", time: "5m ago", type: "Takeaway" },
  ],
  ready: [
    { id: "#BF1236", items: ["Americano x1", "Brownie x2"], table: "Table 5", time: "10m ago", type: "Dine-In" },
  ],
  served: [
    { id: "#BF1234", items: ["Masala Chai x3"], table: "Table 2", time: "15m ago", type: "Dine-In" },
    { id: "#BF1235", items: ["Mango Smoothie x1"], table: "Takeaway", time: "12m ago", type: "Takeaway" },
  ],
};

const columns = [
  { key: "pending", label: "Pending", icon: Clock, color: "bg-warning/10 text-warning" },
  { key: "cooking", label: "Cooking", icon: ChefHat, color: "bg-info/10 text-info" },
  { key: "ready", label: "Ready", icon: CheckCircle, color: "bg-success/10 text-success" },
  { key: "served", label: "Served", icon: UtensilsCrossed, color: "bg-accent text-accent-foreground" },
];

const StaffKitchen = () => {
  const [orders] = useState(initialOrders);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Kitchen Display</h1>
        <p className="text-muted-foreground text-sm mt-1">Track orders across stages</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((col, colIdx) => (
          <motion.div key={col.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: colIdx * 0.1 }}>
            <div className="flex items-center gap-2 mb-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${col.color}`}>
                <col.icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-semibold text-foreground">{col.label}</h3>
              <span className="ml-auto text-xs font-medium text-muted-foreground bg-secondary rounded-full px-2 py-0.5">
                {orders[col.key]?.length || 0}
              </span>
            </div>

            <div className="space-y-3">
              {orders[col.key]?.map((order, i) => (
                <motion.div key={order.id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: colIdx * 0.1 + i * 0.05 }}
                  className="glass-card p-4 hover:shadow-glow transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-foreground">{order.id}</span>
                    <span className="text-xs text-muted-foreground">{order.time}</span>
                  </div>
                  <div className="space-y-1 mb-2">
                    {order.items.map((item, j) => (
                      <p key={j} className="text-sm text-foreground">{item}</p>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{order.table}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                      order.type === "Dine-In" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground"
                    }`}>{order.type}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StaffKitchen;
