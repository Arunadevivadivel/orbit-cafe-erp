import { motion } from "framer-motion";
import { Package, AlertTriangle, TrendingDown, ArrowDownUp } from "lucide-react";

const inventoryItems = [
  { name: "Coffee Beans (Arabica)", stock: 25, unit: "kg", minStock: 10, status: "ok" },
  { name: "Milk (Full Cream)", stock: 40, unit: "L", minStock: 20, status: "ok" },
  { name: "Sugar", stock: 8, unit: "kg", minStock: 10, status: "low" },
  { name: "Tea Leaves", stock: 5, unit: "kg", minStock: 8, status: "low" },
  { name: "Chocolate Powder", stock: 15, unit: "kg", minStock: 5, status: "ok" },
  { name: "Paper Cups (S)", stock: 200, unit: "pcs", minStock: 100, status: "ok" },
  { name: "Paper Cups (L)", stock: 50, unit: "pcs", minStock: 100, status: "low" },
  { name: "Napkins", stock: 500, unit: "pcs", minStock: 200, status: "ok" },
];

const AdminInventory = () => {
  const lowStockCount = inventoryItems.filter((i) => i.status === "low").length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Inventory</h1>
        <p className="text-muted-foreground text-sm mt-1">Track stock levels & purchases</p>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-primary flex items-center justify-center">
              <Package className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Items</p>
              <p className="text-xl font-bold text-foreground">{inventoryItems.length}</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Low Stock</p>
              <p className="text-xl font-bold text-foreground">{lowStockCount}</p>
            </div>
          </div>
        </div>
        <div className="glass-card p-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-info/10 flex items-center justify-center">
              <ArrowDownUp className="w-5 h-5 text-info" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Movement Today</p>
              <p className="text-xl font-bold text-foreground">14</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
              <th className="pb-3 font-medium">Item</th>
              <th className="pb-3 font-medium">Stock</th>
              <th className="pb-3 font-medium">Min Stock</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {inventoryItems.map((item, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="py-3.5 font-medium text-foreground">{item.name}</td>
                <td className="py-3.5 text-muted-foreground">
                  {item.stock} {item.unit}
                </td>
                <td className="py-3.5 text-muted-foreground">
                  {item.minStock} {item.unit}
                </td>
                <td className="py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                    item.status === "ok" ? "bg-success/10 text-success" : "bg-warning/10 text-warning"
                  }`}>
                    {item.status === "ok" ? "In Stock" : "Low Stock"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AdminInventory;
