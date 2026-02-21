import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Search, Edit2, Trash2, ToggleLeft, ToggleRight, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  gst: number;
  available: boolean;
  image?: string;
}

const mockProducts: Product[] = [
  { id: 1, name: "Cappuccino", category: "Coffee", price: 180, gst: 5, available: true },
  { id: 2, name: "Latte", category: "Coffee", price: 200, gst: 5, available: true },
  { id: 3, name: "Green Tea", category: "Tea", price: 120, gst: 5, available: true },
  { id: 4, name: "Chocolate Cake", category: "Desserts", price: 250, gst: 12, available: false },
  { id: 5, name: "Croissant", category: "Snacks", price: 150, gst: 5, available: true },
  { id: 6, name: "Espresso", category: "Coffee", price: 150, gst: 5, available: true },
  { id: 7, name: "Masala Chai", category: "Tea", price: 80, gst: 5, available: true },
  { id: 8, name: "Mango Smoothie", category: "Juice", price: 220, gst: 12, available: true },
];

const categories = ["All", "Coffee", "Tea", "Snacks", "Desserts", "Juice"];

const AdminProducts = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [products, setProducts] = useState(mockProducts);

  const filtered = products.filter((p) => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const toggleAvailability = (id: number) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, available: !p.available } : p)));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Products</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage your menu items & categories</p>
        </div>
        <Button variant="hero" size="default">
          <Plus className="w-4 h-4" /> Add Product
        </Button>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-card border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? "gradient-primary text-primary-foreground shadow-glow"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-primary/30"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      >
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card p-5 hover:shadow-glow transition-all duration-300 ${!product.available ? "opacity-60" : ""}`}
          >
            <div className="w-full h-28 rounded-xl bg-secondary/50 flex items-center justify-center mb-4">
              <ImageIcon className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-foreground">{product.name}</h3>
                <span className="text-xs text-muted-foreground">{product.category}</span>
              </div>
              <button onClick={() => toggleAvailability(product.id)} className="text-primary">
                {product.available ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-muted-foreground" />}
              </button>
            </div>
            <div className="flex items-center justify-between mt-3">
              <div>
                <span className="text-lg font-bold text-foreground">₹{product.price}</span>
                <span className="text-xs text-muted-foreground ml-2">GST {product.gst}%</span>
              </div>
              <div className="flex gap-1">
                <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary transition-colors">
                  <Edit2 className="w-3.5 h-3.5 text-muted-foreground" />
                </button>
                <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-destructive/10 transition-colors">
                  <Trash2 className="w-3.5 h-3.5 text-destructive" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default AdminProducts;
