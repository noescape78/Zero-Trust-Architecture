import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Cloud, Mail, Lock, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await login(email, password);
      if (result.success) {
        toast.success("Welcome back!");
        navigate("/dashboard");
      } else {
        setError(result.error);
        toast.error(result.error);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex w-full bg-white relative overflow-hidden">
      {/* Dynamic Animated Mesh Background for Left Side */}
      <div className="fixed inset-0 w-full lg:w-1/2 z-0 pointer-events-none overflow-hidden opacity-40">
        <div className="absolute inset-0 bg-surface-50" />
        <motion.div 
          animate={{ x: [0, 50, 0, -50, 0], y: [0, -50, -20, 30, 0], scale: [1, 1.1, 0.9, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[80%] h-[80%] bg-primary-300/20 rounded-full blur-[100px] mix-blend-multiply"
        />
        <motion.div 
          animate={{ x: [0, -40, 0, 40, 0], y: [0, 60, 20, -20, 0], scale: [1, 0.9, 1.1, 0.95, 1] }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] right-[10%] w-[70%] h-[70%] bg-cyan-300/20 rounded-full blur-[100px] mix-blend-multiply"
        />
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
        />
      </div>

      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10 min-h-screen flex-col">
        <div className="w-full max-w-[440px]">
          {/* Mobile Only Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-surface-900 to-surface-700">CloudVault</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <h1 className="text-3xl md:text-4xl font-black text-surface-900 mb-2 tracking-tight">Welcome back</h1>
            <p className="text-surface-500 font-medium mb-10">Sign in to access your secure files</p>
          </motion.div>

          <AnimatePresence mode="wait">
             {error && (
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 outline outline-1 outline-red-200/50 text-sm flex items-center gap-3 shadow-inner"
               >
                 <AlertCircle size={18} />
                 <p className="font-medium">{error}</p>
               </motion.div>
             )}
          </AnimatePresence>

          <form onSubmit={handleLogin} className="space-y-5 relative">
             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Input
                  label="Email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                  required
                />
             </motion.div>

             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  icon={Lock}
                  showPasswordToggle
                  required
                />
             </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-sm text-surface-600 font-medium cursor-pointer group">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500 transition-colors group-hover:border-primary-400" 
                />
                Remember me
              </label>
              <Link to="#" className="text-sm text-primary-600 hover:text-primary-700 font-bold transition-colors">
                Forgot password?
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-4">
              <Button
                type="submit"
                loading={loading}
                className="w-full py-3.5 shadow-glow"
                icon={ArrowRight}
                iconPosition="right"
                size="lg"
              >
                Sign In
              </Button>
            </motion.div>
          </form>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-surface-200"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-5 bg-white text-surface-400 font-medium">Or log in with</span></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button type="button" className="group flex items-center justify-center gap-3 py-3 rounded-xl border border-surface-200 text-surface-700 hover:bg-surface-50 hover:border-surface-300 transition-all text-sm font-bold shadow-sm hover:shadow">
                Google
              </button>
              <button type="button" className="group flex items-center justify-center gap-3 py-3 rounded-xl border border-surface-200 text-surface-700 hover:bg-surface-50 hover:border-surface-300 transition-all text-sm font-bold shadow-sm hover:shadow">
                GitHub
              </button>
            </div>

            <p className="text-center mt-10 text-surface-500 font-medium">
              New to CloudVault?{" "}
              <Link to="/register" className="text-primary-600 hover:text-primary-700 font-bold ml-1 transition-colors">
                Sign up free
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Branding Section (Desktop) */}
      <div className="hidden lg:flex w-1/2 bg-surface-950 relative items-center justify-center p-12 overflow-hidden flex-col">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary-900/40 via-surface-950 to-surface-950" />
          <motion.div 
            animate={{ rotate: 360 }} transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[50%] -right-[50%] w-[150%] h-[150%] opacity-20"
            style={{ backgroundImage: `repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(139, 92, 246, 0.1) 10deg 20deg)` }}
          />
        </div>

        <div className="relative z-10 w-full max-w-lg">
          {/* Top Logo */}
          <div className="flex items-center gap-3 mb-16 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-black text-white tracking-tight">CloudVault</span>
          </div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
             <h2 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-6">
               Secure sharing, <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-cyan-400">simplified.</span>
             </h2>
             <p className="text-surface-300 text-lg font-light leading-relaxed mb-12">
               Enterprise-grade encryption meets consumer-grade simplicity. Join over 10 million professionals already using CloudVault.
             </p>

             <div className="space-y-6">
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center border border-primary-500/30">
                     <ShieldCheck className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">End-to-end Encryption</h4>
                    <p className="text-surface-400 text-sm">Military-grade protection for your files.</p>
                  </div>
                </motion.div>
                
                <motion.div whileHover={{ x: 5 }} className="flex items-center gap-4 bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/20 flex items-center justify-center border border-cyan-500/30">
                     <Cloud className="w-6 h-6 text-cyan-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Lightning Fast</h4>
                    <p className="text-surface-400 text-sm">Global CDN ensures instant downloads anywhere.</p>
                  </div>
                </motion.div>
             </div>
          </motion.div>
        </div>

        {/* Refined Security Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="absolute bottom-12 right-12 z-20"
        >
          <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 shadow-2xl flex items-center gap-4 max-w-xs group hover:bg-white/10 transition-colors duration-500">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-white text-xs font-black uppercase tracking-widest mb-0.5 opacity-50">Enterprise Grade</p>
              <h4 className="text-white font-bold text-sm">Security Verified</h4>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
