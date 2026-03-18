import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { Cloud, Mail, Lock, User, AlertCircle, CheckCircle, ArrowRight, UploadCloud, Users } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const toast = useToast();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Password strength validation
  const getPasswordStrength = () => {
    if (!password) return { strength: 0, label: "", color: "bg-surface-200" };

    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;

    const labels = ["Weak", "Fair", "Good", "Strong"];
    const colors = ["bg-red-500", "bg-amber-500", "bg-primary-500", "bg-emerald-500"];

    return {
      strength,
      label: labels[Math.floor(strength / 25) - 1] || "",
      color: colors[Math.floor(strength / 25) - 1] || "bg-surface-200"
    };
  };

  const passwordStrength = getPasswordStrength();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);
      const result = await register(username, password, email);

      if (result.success) {
        setSuccess("Account created successfully!");
        toast.success("Account created! Please sign in.");
        
        setTimeout(() => {
          navigate("/login");
        }, 1500);
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
          animate={{ x: [0, 60, 0, -30, 0], y: [0, -30, -50, 20, 0], scale: [1, 1.15, 0.9, 1.05, 1] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[20%] w-[90%] h-[90%] bg-purple-300/20 rounded-full blur-[120px] mix-blend-multiply"
        />
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{ backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`, backgroundSize: '32px 32px' }}
        />
      </div>

      {/* Left Form Section */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative z-10 min-h-screen flex-col py-16 overflow-y-auto custom-scrollbar">
        <div className="w-full max-w-[440px] my-auto">
          {/* Mobile Only Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow">
              <Cloud className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-black bg-clip-text text-transparent bg-gradient-to-r from-surface-900 to-surface-700">CloudVault</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}>
            <h1 className="text-3xl md:text-4xl font-black text-surface-900 mb-2 tracking-tight">Create an account</h1>
            <p className="text-surface-500 font-medium mb-8">Start sharing files securely in seconds</p>
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
             
             {success && (
               <motion.div
                 initial={{ opacity: 0, height: 0 }}
                 animate={{ opacity: 1, height: 'auto' }}
                 exit={{ opacity: 0, height: 0 }}
                 className="mb-6 p-4 rounded-xl bg-green-50 border border-green-100 text-green-600 outline outline-1 outline-green-200/50 text-sm flex items-center gap-3 shadow-inner"
               >
                 <CheckCircle size={18} />
                 <p className="font-medium">{success}</p>
               </motion.div>
             )}
          </AnimatePresence>

          <form onSubmit={handleRegister} className="space-y-4 relative">
             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
                <Input
                  label="Username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  icon={User}
                  required
                />
             </motion.div>

             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 }}>
                <Input
                  label="Email (Optional)"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  icon={Mail}
                />
             </motion.div>

             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-1.5">
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
                
                {/* Password Strength */}
                <AnimatePresence>
                  {password && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="px-1 overflow-hidden">
                      <div className="flex justify-between items-center mb-1.5 pt-1">
                        <span className="text-xs text-surface-500 font-medium">Password strength</span>
                        <span className={`text-xs font-bold ${
                          passwordStrength.strength >= 75 ? 'text-emerald-600' : 
                          passwordStrength.strength >= 50 ? 'text-primary-600' : 'text-red-600'
                        }`}>
                          {passwordStrength.label}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        {[1, 2, 3, 4].map((step) => (
                          <div
                            key={step}
                            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                              passwordStrength.strength >= step * 25 ? passwordStrength.color : 'bg-surface-200'
                            }`}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
             </motion.div>

             <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.25 }}>
               <Input
                 label="Confirm Password"
                 type="password"
                 placeholder="••••••••"
                 value={confirmPassword}
                 onChange={(e) => setConfirmPassword(e.target.value)}
                 icon={Lock}
                 showPasswordToggle
                 required
               />
             </motion.div>

            <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="pt-2">
              <div className="flex items-start gap-3">
                <div className="flex items-center h-5">
                  <input 
                    type="checkbox" 
                    id="terms"
                    required
                    className="w-4 h-4 rounded border-surface-300 text-primary-600 focus:ring-primary-500 transition-colors" 
                  />
                </div>
                <label htmlFor="terms" className="text-sm text-surface-600 font-medium leading-tight">
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary-600 hover:text-primary-700 font-bold transition-colors">Terms of Service</Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="text-primary-600 hover:text-primary-700 font-bold transition-colors">Privacy Policy</Link>
                </label>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="pt-4">
              <Button
                type="submit"
                loading={loading}
                disabled={password !== confirmPassword || password.length < 6}
                className="w-full py-3.5 shadow-glow"
                icon={ArrowRight}
                iconPosition="right"
                size="lg"
              >
                Create Account
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

            <p className="text-center mt-8 text-surface-500 font-medium">
              Already have an account?{" "}
              <Link to="/login" className="text-primary-600 hover:text-primary-700 font-bold transition-colors">
                Sign in
              </Link>
            </p>
          </motion.div>
        </div>
      </div>

      {/* Right Branding Section (Desktop) */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-surface-900 to-surface-950 relative items-center justify-center p-12 overflow-hidden flex-col border-l border-surface-800">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0">
          <motion.div 
            animate={{ rotate: -360 }} transition={{ duration: 200, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[50%] -left-[50%] w-[150%] h-[150%] opacity-20"
            style={{ backgroundImage: `repeating-conic-gradient(from 0deg, transparent 0deg 10deg, rgba(236, 72, 153, 0.1) 10deg 20deg)` }}
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
               Join the future of <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">cloud storage.</span>
             </h2>
             
             <div className="grid gap-6 mt-12">
                <motion.div whileHover={{ x: 5 }} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex flex-shrink-0 items-center justify-center border border-purple-500/30">
                     <UploadCloud className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Unlimited Uploads</h4>
                    <p className="text-surface-400 text-sm mt-1">No file size limits. Upload entire folders effortlessly.</p>
                  </div>
                </motion.div>
                
                <motion.div whileHover={{ x: 5 }} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-pink-500/20 flex flex-shrink-0 items-center justify-center border border-pink-500/30">
                     <Users className="w-5 h-5 text-pink-400" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">Team Collaboration</h4>
                    <p className="text-surface-400 text-sm mt-1">Share folders and manage permissions with granular control.</p>
                  </div>
                </motion.div>
             </div>
          </motion.div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] right-[20%] w-16 h-16 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-full blur-xl opacity-30"
          />
          <motion.div
            animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute bottom-[20%] left-[30%] w-24 h-24 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full blur-xl opacity-30"
          />
        </div>
      </div>
    </div>
  );
}
