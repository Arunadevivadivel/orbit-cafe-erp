import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye, Printer, Calendar } from "lucide-react";

const mockBills = [
  { id: "#BF1234", date: "2026-02-21", customer: "Walk-in", items: 3, amount: "₹520", paymentMode: "Cash", type: "Dine-In" },
  { id: "#BF1235", date: "2026-02-21", customer: "Rahul K.", items: 2, amount: "₹340", paymentMode: "UPI", type: "Takeaway" },
  { id: "#BF1236", date: "2026-02-21", customer: "Table 5", items: 5, amount: "₹890", paymentMode: "Card", type: "Dine-In" },
  { id: "#BF1237", date: "2026-02-20", customer: "Priya M.", items: 1, amount: "₹180", paymentMode: "UPI", type: "Takeaway" },
  { id: "#BF1238", date: "2026-02-20", customer: "Table 2", items: 4, amount: "₹720", paymentMode: "Cash", type: "Dine-In" },
  { id: "#BF1239", date: "2026-02-20", customer: "Walk-in", items: 2, amount: "₹290", paymentMode: "Card", type: "Takeaway" },
];

const AdminBills = () => {
  const [search, setSearch] = useState("");
  const filtered = mockBills.filter((b) => b.id.toLowerCase().includes(search.toLowerCase()) || b.customer.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Bills</h1>
        <p className="text-muted-foreground text-sm mt-1">View & reprint past invoices</p>
      </motion.div>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search bills..." value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-card border border-border text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
          <Calendar className="w-4 h-4" /> Filter by Date
        </button>
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="glass-card p-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs text-muted-foreground uppercase tracking-wider border-b border-border">
              <th className="pb-3 font-medium">Bill No</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Customer</th>
              <th className="pb-3 font-medium">Items</th>
              <th className="pb-3 font-medium">Amount</th>
              <th className="pb-3 font-medium">Payment</th>
              <th className="pb-3 font-medium">Type</th>
              <th className="pb-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((bill, i) => (
              <tr key={i} className="border-b border-border/50 last:border-0">
                <td className="py-3.5 font-semibold text-foreground">{bill.id}</td>
                <td className="py-3.5 text-muted-foreground">{bill.date}</td>
                <td className="py-3.5 text-muted-foreground">{bill.customer}</td>
                <td className="py-3.5 text-muted-foreground">{bill.items}</td>
                <td className="py-3.5 font-semibold text-foreground">{bill.amount}</td>
                <td className="py-3.5">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent text-accent-foreground">{bill.paymentMode}</span>
                </td>
                <td className="py-3.5">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${bill.type === "Dine-In" ? "bg-secondary text-secondary-foreground" : "bg-info/10 text-info"}`}>{bill.type}</span>
                </td>
                <td className="py-3.5">
                  <div className="flex gap-1">
                    <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"><Eye className="w-3.5 h-3.5 text-muted-foreground" /></button>
                    <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"><Printer className="w-3.5 h-3.5 text-muted-foreground" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </div>
  );
};

export default AdminBills;
