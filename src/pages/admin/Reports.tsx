import { motion } from "framer-motion";
import { FileText, TrendingUp, Users, CreditCard, PieChart } from "lucide-react";

const reportTypes = [
  { title: "GST Report", desc: "Tax breakdown & filing summary", icon: FileText, color: "gradient-primary" },
  { title: "Sales Report", desc: "Revenue analytics & trends", icon: TrendingUp, color: "bg-info/10" },
  { title: "Staff Performance", desc: "Efficiency & attendance metrics", icon: Users, color: "bg-success/10" },
  { title: "Category Sales", desc: "Product category breakdown", icon: PieChart, color: "bg-warning/10" },
  { title: "Payment Mode Report", desc: "Cash / Card / UPI analysis", icon: CreditCard, color: "bg-accent" },
];

const AdminReports = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Reports</h1>
        <p className="text-muted-foreground text-sm mt-1">Generate & export detailed reports</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {reportTypes.map((report, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-6 hover:shadow-glow transition-all duration-300 cursor-pointer group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              i === 0 ? "gradient-primary shadow-glow" : report.color
            }`}>
              <report.icon className={`w-5 h-5 ${i === 0 ? "text-primary-foreground" : i === 1 ? "text-info" : i === 2 ? "text-success" : i === 3 ? "text-warning" : "text-accent-foreground"}`} />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-1">{report.title}</h3>
            <p className="text-sm text-muted-foreground">{report.desc}</p>
            <button className="mt-4 text-sm font-medium text-primary hover:underline">Generate →</button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default AdminReports;
