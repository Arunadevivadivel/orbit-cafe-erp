import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, User, ArrowRight, Globe, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import loginHero from "@/assets/login-hero.jpg";
import brewflowLogo from "@/assets/brewflow-logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<"admin" | "staff">("admin");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    login(selectedRole, email || "User");
    navigate(selectedRole === "admin" ? "/admin" : "/staff");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left: Hero Image Panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-[55%] relative overflow-hidden"
      >
        <img
          src={loginHero}
          alt="Premium café ambiance"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />

        {/* Content over image */}
        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          {/* Top badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-2"
          >
            <div className="px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-xs font-medium flex items-center gap-2">
              <Globe className="w-3.5 h-3.5" />
              Global Café Management Platform
            </div>
          </motion.div>

          {/* Bottom content */}
          <div className="space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-4xl xl:text-5xl font-bold text-white leading-tight"
            >
              Manage your café
              <br />
              <span className="text-white/80">like never before.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-white/70 text-base max-w-md"
            >
              Enterprise-grade billing, inventory, and operations — trusted by cafés across Dubai, Singapore & India.
            </motion.p>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3"
            >
              {[
                { icon: Shield, label: "Enterprise Security" },
                { icon: Zap, label: "Real-time Sync" },
                { icon: Globe, label: "Multi-location" },
              ].map((feat) => (
                <div
                  key={feat.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white text-sm"
                >
                  <feat.icon className="w-4 h-4" />
                  {feat.label}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Right: Login Form Panel */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-10 relative">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="w-full max-w-[420px] relative z-10"
        >
          {/* Logo & Brand */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="inline-flex flex-col items-center gap-3"
            >
              <img
                src={brewflowLogo}
                alt="BrewFlow Logo"
                className="w-16 h-16 object-contain drop-shadow-lg"
              />
              <div>
                <h1 className="text-3xl font-bold gradient-primary-text">BrewFlow</h1>
                <p className="text-muted-foreground text-sm mt-1">Enterprise Café Management</p>
              </div>
            </motion.div>
          </div>

          {/* Login Card */}
          <div className="glass-card p-8">
            <h2 className="text-xl font-semibold text-foreground mb-1">Welcome back</h2>
            <p className="text-muted-foreground text-sm mb-6">Sign in to your account to continue</p>

            {/* Role Selector */}
            <div className="flex gap-1.5 mb-6 p-1 bg-secondary rounded-full">
              {(["admin", "staff"] as const).map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  className={`relative flex-1 py-2.5 rounded-full text-sm font-medium transition-all duration-300 capitalize ${
                    selectedRole === r
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {selectedRole === r && (
                    <motion.div
                      layoutId="roleSelector"
                      className="absolute inset-0 gradient-primary rounded-full shadow-glow"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{r === "admin" ? "Admin" : "Staff"}</span>
                </button>
              ))}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Email</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    placeholder="admin@brewflow.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-secondary/50 border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm text-foreground placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded accent-primary" />
                  <span className="text-muted-foreground">Remember me</span>
                </label>
                <button type="button" className="text-primary font-medium hover:underline">
                  Forgot Password?
                </button>
              </div>

              <Button type="submit" variant="hero" size="lg" className="w-full mt-2">
                Sign In
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>

            {/* Trust badges */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex items-center justify-center gap-6 text-muted-foreground">
                <div className="flex items-center gap-1.5 text-xs">
                  <Shield className="w-3.5 h-3.5 text-primary" />
                  256-bit SSL
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  GDPR Ready
                </div>
                <div className="flex items-center gap-1.5 text-xs">
                  <Zap className="w-3.5 h-3.5 text-primary" />
                  99.9% Uptime
                </div>
              </div>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6">
            © 2026 BrewFlow · Enterprise Grade · All rights reserved
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
