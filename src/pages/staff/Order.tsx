import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, X, ShoppingCart, CreditCard, Banknote, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = ["All", "Coffee", "Tea", "Snacks", "Desserts", "Juice"];

const menuItems = [
  { id: 1, name: "Cappuccino", category: "Coffee", price: 180 },
  { id: 2, name: "Latte", category: "Coffee", price: 200 },
  { id: 3, name: "Espresso", category: "Coffee", price: 150 },
  { id: 4, name: "Americano", category: "Coffee", price: 160 },
  { id: 5, name: "Green Tea", category: "Tea", price: 120 },
  { id: 6, name: "Masala Chai", category: "Tea", price: 80 },
  { id: 7, name: "Croissant", category: "Snacks", price: 150 },
  { id: 8, name: "Sandwich", category: "Snacks", price: 180 },
  { id: 9, name: "Chocolate Cake", category: "Desserts", price: 250 },
  { id: 10, name: "Brownie", category: "Desserts", price: 180 },
  { id: 11, name: "Mango Smoothie", category: "Juice", price: 220 },
  { id: 12, name: "Fresh Orange", category: "Juice", price: 160 },
];

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
}

const StaffOrder = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPayment, setShowPayment] = useState(false);

  const filtered = activeCategory === "All" ? menuItems : menuItems.filter((i) => i.category === activeCategory);

  const addToCart = (item: (typeof menuItems)[0]) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.id === item.id);
      if (existing) return prev.map((c) => (c.id === item.id ? { ...c, qty: c.qty + 1 } : c));
      return [...prev, { id: item.id, name: item.name, price: item.price, qty: 1 }];
    });
  };

  const updateQty = (id: number, delta: number) => {
    setCart((prev) => prev.map((c) => (c.id === id ? { ...c, qty: Math.max(0, c.qty + delta) } : c)).filter((c) => c.qty > 0));
  };

  const removeItem = (id: number) => setCart((prev) => prev.filter((c) => c.id !== id));

  const subtotal = cart.reduce((sum, c) => sum + c.price * c.qty, 0);
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + gst;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-6 h-[calc(100vh-120px)]">
        {/* Menu Section */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Categories */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? "gradient-primary text-primary-foreground shadow-glow"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 overflow-y-auto flex-1 pr-1">
            {filtered.map((item) => {
              const inCart = cart.find((c) => c.id === item.id);
              return (
                <motion.button
                  key={item.id}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => addToCart(item)}
                  className={`glass-card p-4 text-left hover:shadow-glow transition-all duration-300 relative ${inCart ? "ring-2 ring-primary/40" : ""}`}
                >
                  <div className="w-full h-16 rounded-xl bg-secondary/50 flex items-center justify-center mb-3">
                    <span className="text-2xl">☕</span>
                  </div>
                  <h3 className="text-sm font-semibold text-foreground truncate">{item.name}</h3>
                  <p className="text-xs text-muted-foreground">{item.category}</p>
                  <p className="text-sm font-bold text-foreground mt-1">₹{item.price}</p>
                  {inCart && (
                    <span className="absolute top-2 right-2 w-6 h-6 gradient-primary rounded-full text-xs font-bold text-primary-foreground flex items-center justify-center">
                      {inCart.qty}
                    </span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Cart Panel */}
        <div className="w-80 glass-card p-5 flex flex-col shrink-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-foreground flex items-center gap-2">
              <ShoppingCart className="w-4 h-4" /> Cart
            </h2>
            <span className="text-xs text-muted-foreground">{cart.length} items</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3">
            <AnimatePresence>
              {cart.map((item) => (
                <motion.div key={item.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{item.name}</p>
                    <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button onClick={() => updateQty(item.id, -1)} className="w-7 h-7 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary"><Minus className="w-3 h-3" /></button>
                    <span className="text-sm font-semibold w-6 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-7 h-7 rounded-full gradient-primary text-primary-foreground flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                  </div>
                  <p className="text-sm font-bold text-foreground w-14 text-right">₹{item.price * item.qty}</p>
                  <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-destructive"><Trash2 className="w-3.5 h-3.5" /></button>
                </motion.div>
              ))}
            </AnimatePresence>
            {cart.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">Cart is empty</p>}
          </div>

          {/* Totals */}
          {cart.length > 0 && (
            <div className="border-t border-border pt-4 mt-4 space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span><span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>GST (5%)</span><span>₹{gst.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-border">
                <span>Total</span><span>₹{total.toLocaleString()}</span>
              </div>
              <Button variant="hero" size="lg" className="w-full mt-3" onClick={() => setShowPayment(true)}>
                Proceed to Payment
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPayment && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="glass-card p-8 w-full max-w-md relative">
              <button onClick={() => setShowPayment(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center hover:bg-secondary">
                <X className="w-4 h-4" />
              </button>
              <h2 className="text-xl font-bold text-foreground mb-2">Payment</h2>
              <p className="text-3xl font-bold gradient-primary-text mb-6">₹{total.toLocaleString()}</p>

              <div className="space-y-3 mb-6">
                {[
                  { label: "Cash", icon: Banknote },
                  { label: "Card", icon: CreditCard },
                  { label: "UPI", icon: Smartphone },
                ].map((method) => (
                  <button key={method.label} className="w-full flex items-center gap-3 p-4 rounded-xl border border-border hover:border-primary hover:bg-accent transition-all text-left">
                    <method.icon className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium text-foreground">{method.label}</span>
                  </button>
                ))}
              </div>

              <Button variant="hero" size="lg" className="w-full" onClick={() => { setShowPayment(false); setCart([]); }}>
                Complete Order
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default StaffOrder;
