import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import { API_BASE_URL } from "../constants";
import { readFromClipboard } from "../utils/clipboard";
import {
  Key, Lock, Download, Shield, Check,
  AlertCircle, ShieldCheck
} from "lucide-react";

export default function Receive() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const toast = useToast();

  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [stage, setStage] = useState("idle");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setToken(tokenParam);
    }
  }, [searchParams]);

  const handleReceive = async () => {
    if (!token || !password) {
      setError("Please enter both token and password");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");
      setStage("decrypting");

      const response = await fetch(
        `${API_BASE_URL}/api/files/access/${token}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ password }),
        }
      );

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Invalid token or password");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const disposition = response.headers.get('content-disposition');
      let filename = "downloaded-file";
      if (disposition && disposition.indexOf('attachment') !== -1) {
        var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
        var matches = filenameRegex.exec(disposition);
        if (matches != null && matches[1]) {
          filename = matches[1].replace(/['"]/g, '');
        }
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      setSuccess(`File "${filename}" downloaded seamlessly!`);
      setStage("success");
      toast.success("Download complete!");
    } catch (e) {
      setError(e.message || "Failed to download file");
      toast.error(e.message || "Download failed");
      setStage("idle");
    } finally {
      setLoading(false);
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const text = await readFromClipboard();
      if (text) {
        setToken(text.trim());
        toast.success("Token pasted from clipboard");
      }
    } catch (err) {
      setError("Failed to access clipboard");
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-surface-950 flex justify-center items-center p-6 relative overflow-hidden">
        
        {/* Dynamic Dark Vault Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Central Glow behind Card */}
          <motion.div 
            animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.25, 0.15] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/20 rounded-full blur-[150px]"
          />
          {/* Animated Grid */}
          <div 
             className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
             style={{ backgroundImage: `linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-[480px] relative z-10"
        >
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="inline-flex flex-col items-center cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-cyan-500 flex items-center justify-center shadow-glow mb-4">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-black text-white tracking-tight">CloudVault</span>
            </div>
          </div>

          {/* Main Vault Card */}
          <div className="bg-surface-900 border border-surface-800 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden">
             
            {/* Glossy top highlight */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            {/* Header */}
            <div className="text-center mb-8 relative z-10">
              <div className={`w-16 h-16 rounded-2xl mx-auto mb-5 flex items-center justify-center border ${
                stage === 'success' ? 'bg-emerald-500/20 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]' : 
                stage === 'decrypting' ? 'bg-primary-500/20 border-primary-500/30' : 'bg-surface-800 border-surface-700'
              } transition-all duration-500`}>
                {stage === 'success' ? (
                  <Check size={32} className="text-emerald-400" />
                ) : stage === 'decrypting' ? (
                  <div className="w-8 h-8 border-4 border-primary-500/30 border-t-primary-400 rounded-full animate-spin" />
                ) : (
                  <Download size={32} className="text-surface-300" />
                )}
              </div>
              
              <h1 className="text-2xl font-black text-white mb-2 tracking-wide">
                Secure Retrieval
              </h1>
              <p className="text-surface-400 text-sm font-medium">
                Enter the access credentials provided to you.
              </p>
            </div>

            {/* Status Messages */}
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, y: -10 }}
                  animate={{ opacity: 1, height: 'auto', y: 0 }}
                  exit={{ opacity: 0, height: 0, scale: 0.9 }}
                  className="mb-8 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm flex items-start gap-3 backdrop-blur-sm"
                >
                  <AlertCircle size={20} className="flex-shrink-0 mt-0.5" />
                  <p className="font-bold leading-relaxed">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, height: 0, scale: 0.9 }}
                  animate={{ opacity: 1, height: 'auto', scale: 1 }}
                  className="mb-8 p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-start gap-3 backdrop-blur-sm shadow-[0_0_30px_rgba(16,185,129,0.1)]"
                >
                  <Check size={20} className="flex-shrink-0 mt-0.5" />
                  <p className="font-bold leading-relaxed">{success}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Form */}
            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-widest text-surface-400 ml-1 mb-2">Access Token</label>
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity" />
                  <input
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="e.g. 8a7b6c5d..."
                    className="relative w-full bg-surface-950 border border-surface-700/50 rounded-xl py-3.5 px-4 pl-12 text-white font-mono text-sm outline-none focus:border-primary-500 transition-all placeholder-surface-600 shadow-inner leading-relaxed"
                  />
                  <Key size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500 group-focus-within:text-primary-400" />
                  {!token && (
                     <button
                       onClick={pasteFromClipboard}
                       className="absolute right-3 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-bold text-surface-900 bg-white hover:bg-surface-200 rounded-lg transition-colors shadow-sm"
                     >
                       Paste
                     </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                 <label className="block text-xs font-bold uppercase tracking-widest text-surface-400 ml-1 mb-2">Decryption Password</label>
                 <div className="relative group">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-cyan-500 rounded-xl opacity-0 group-focus-within:opacity-30 blur transition-opacity" />
                    <Input
                       type="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}
                       placeholder="••••••••••••"
                       icon={Lock}
                       showPasswordToggle
                       className="relative w-full bg-surface-950 border border-surface-700/50 rounded-xl text-white outline-none focus:border-primary-500 transition-all placeholder-surface-600 font-medium"
                    />
                 </div>
              </div>

              <div className="pt-4">
                <Button
                  variant="primary"
                  onClick={handleReceive}
                  loading={loading}
                  disabled={!token || !password}
                  className="w-full py-4 text-base shadow-glow uppercase tracking-widest font-black"
                  icon={Download}
                >
                  {stage === 'decrypting' ? 'Decrypting...' : 'Initiate Download'}
                </Button>
              </div>
            </div>
            
            <div className="mt-8 flex items-center justify-center gap-2 text-surface-500 text-xs font-bold uppercase tracking-widest">
               <ShieldCheck size={14} className="text-surface-400" /> Secure Zero-Knowledge Connection
            </div>
          </div>

        </motion.div>
      </div>
    </Layout>
  );
}
