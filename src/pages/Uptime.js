import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { 
  Globe, Activity, Shield, 
  ChevronRight, ArrowLeft,
  Server, BarChart3, Clock, CheckCircle2
} from "lucide-react";
import Button from "../components/ui/Button";

export default function Uptime() {
  const navigate = useNavigate();

  const metrics = [
    { label: "US_EAST_CLUSTER", value: "99.99%", status: "OPTIMAL" },
    { label: "EU_CENTRAL_CORE", value: "99.98%", status: "OPTIMAL" },
    { label: "APAC_RELAY_GRID", value: "99.99%", status: "OPTIMAL" },
    { label: "GLOBAL_AVERAGE", value: "99.99%", status: "STABLE" }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-[#010101] text-white selection:bg-indigo-500 selection:text-white font-sans relative overflow-hidden">
        
        {/* Technical Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[600px] bg-indigo-600/[0.03] blur-[150px] rounded-full" />
          <div className="absolute bottom-0 right-0 w-full h-[600px] bg-blue-600/[0.03] blur-[150px] rounded-full" />
           <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]" />
        </div>

        <main className="relative z-10 pt-32 pb-24 px-6">
          <div className="max-w-7xl mx-auto">
            
            {/* Top Navigation */}
            <motion.button 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              onClick={() => navigate("/")}
              className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-xs font-black uppercase tracking-[0.2em] mb-12"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to Hub
            </motion.button>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-12">
               <div className="max-w-3xl">
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[9px] font-black text-indigo-500 mb-6 tracking-[0.4em] uppercase"
                  >
                     <Activity size={12} /> LIVE_NETWORK_STATUS
                  </motion.div>
                  <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-8 leading-[0.9]"
                  >
                    NETWORK <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-500">RESILIENCE.</span>
                  </motion.h1>
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl"
                  >
                    Experience 99.99% availability backed by a globally distributed infrastructure vault. Zero downtime by architecture.
                  </motion.p>
               </div>

               <div className="flex flex-col items-end gap-4">
                  <div className="flex items-center gap-4 px-8 py-4 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-xl">
                     <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                     <span className="text-xs font-black uppercase tracking-widest italic">All Systems Operational</span>
                  </div>
               </div>
            </div>

            {/* 3D Uptime Visualization - Professional Placeholder */}
            <div className="grid lg:grid-cols-12 gap-8 mb-32">
               <div className="lg:col-span-8 bg-zinc-900/20 rounded-[4rem] border border-white/5 p-1 relative overflow-hidden group min-h-[500px] flex items-center justify-center">
                  {/* Mock 3D Globe/Network Animation */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:40px_40px]" />
                  
                  <div className="relative w-full h-full flex items-center justify-center">
                     {/* Floating Nodes Animation */}
                     {[...Array(5)].map((_, i) => (
                       <motion.div
                         key={i}
                         animate={{ 
                           y: [0, -20, 0],
                           x: [0, i % 2 === 0 ? 10 : -10, 0],
                           rotate: [0, 5, 0]
                         }}
                         transition={{ 
                           duration: 4 + i, 
                           repeat: Infinity, 
                           ease: "easeInOut",
                           delay: i * 0.5
                         }}
                         className={`absolute p-6 rounded-3xl bg-zinc-900/80 border border-white/10 backdrop-blur-xl shadow-2xl z-${20-i}`}
                         style={{ 
                            top: `${20 + i * 15}%`, 
                            left: `${15 + i * 15}%`,
                            opacity: 1 - i * 0.15
                         }}
                       >
                          <Server className="text-indigo-500 mb-3" size={24} />
                          <div className="w-12 h-1 bg-indigo-500/20 rounded-full" />
                       </motion.div>
                     ))}

                     {/* Central Hub */}
                     <motion.div 
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 6, repeat: Infinity }}
                        className="relative z-30 w-64 h-64 rounded-full bg-indigo-500/5 flex items-center justify-center border border-indigo-500/20"
                     >
                        <div className="w-48 h-48 rounded-full bg-indigo-500/10 flex items-center justify-center border border-indigo-500/30">
                           <Globe size={100} className="text-indigo-500/40 animate-spin-slow" />
                        </div>
                     </motion.div>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end z-40">
                     <div className="space-y-4">
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.4em]">Real-time Latency</span>
                        <div className="flex items-baseline gap-2">
                           <span className="text-4xl font-black italic">12ms</span>
                           <span className="text-xs font-bold text-indigo-500">Global Avg</span>
                        </div>
                     </div>
                     <div className="flex gap-2">
                        {[...Array(24)].map((_, i) => (
                          <div key={i} className={`w-1 h-8 rounded-full bg-indigo-500/${i === 20 ? '20' : '40'} transition-all`} />
                        ))}
                     </div>
                  </div>
               </div>

               <div className="lg:col-span-4 space-y-8">
                  {metrics.map((m, i) => (
                    <motion.div 
                      key={m.label}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl group hover:border-indigo-500/30 transition-all"
                    >
                       <div className="flex items-center justify-between mb-6">
                          <span className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">{m.label}</span>
                          <CheckCircle2 size={14} className="text-indigo-500" />
                       </div>
                       <div className="flex items-baseline gap-3">
                          <span className="text-3xl font-black italic">{m.value}</span>
                          <span className="text-[9px] font-bold text-indigo-500/50 uppercase tracking-widest">{m.status}</span>
                       </div>
                    </motion.div>
                  ))}
               </div>
            </div>

            {/* SLA Section */}
            <div className="bg-zinc-950 border border-white/5 rounded-[4rem] p-12 md:p-20 relative overflow-hidden mb-32 group">
               <div className="absolute inset-0 bg-indigo-600/[0.01] blur-[150px] pointer-events-none" />
               <div className="max-w-4xl mx-auto text-center relative z-10">
                  <h2 className="text-2xl md:text-4xl font-black text-white uppercase italic tracking-tighter mb-8 italic underline decoration-indigo-500/30 underline-offset-8">Contractual_SLA_Guarantee</h2>
                  <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12">
                     Vault leverages BGP Anycast and multi-cloud orchestration to ensure your assets remain high-availability. We commit to 99.99% availability in our Enterprise Service Level Agreement.
                  </p>
                  <div className="grid md:grid-cols-3 gap-12 pt-12 border-t border-white/5">
                     <div className="space-y-4">
                        <BarChart3 className="text-indigo-500 mx-auto" size={24} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Global Density</h4>
                        <p className="text-[10px] text-zinc-600 leading-relaxed uppercase tracking-widest">Nodes in 24 countries</p>
                     </div>
                     <div className="space-y-4">
                        <Clock className="text-blue-500 mx-auto" size={24} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Auto-Failover</h4>
                        <p className="text-[10px] text-zinc-600 leading-relaxed uppercase tracking-widest">&lt; 1sec mitigation</p>
                     </div>
                     <div className="space-y-4">
                        <Shield className="text-indigo-500 mx-auto" size={24} />
                        <h4 className="text-xs font-black uppercase tracking-widest">DR Recovery</h4>
                        <p className="text-[10px] text-zinc-600 leading-relaxed uppercase tracking-widest">Full lattice redundancy</p>
                     </div>
                  </div>
               </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
               <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-10">Deploy_Static_Asset.</h3>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button 
                    onClick={() => navigate("/register")}
                    variant="vault"
                    className="px-12 py-5 rounded-full bg-indigo-600 hover:bg-indigo-500 shadow-indigo-500/20"
                    icon={ChevronRight}
                    iconPosition="right"
                  >
                    AUTHORIZE_DEVICES
                  </Button>
                  <button 
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 text-zinc-600 hover:text-white transition-all text-xs font-black uppercase tracking-widest"
                  >
                    <ArrowLeft size={16} /> Return_to_Nexus
                  </button>
               </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
