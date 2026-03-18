import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { 
  Globe, Activity, Zap, Radio,
  ArrowLeft, ArrowUpRight, 
  Monitor, Wifi, Database
} from "lucide-react";

export default function Infrastructure() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-[#010101] text-white selection:bg-indigo-500 relative overflow-hidden flex flex-col pt-24">
        
        {/* Navigation / Header */}
        <div className="max-w-7xl mx-auto w-full px-6 relative z-10 mb-20">
          <button 
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-xs font-black uppercase tracking-[0.2em] mb-12"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Hub
          </button>

          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                Global <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">Infrastructure.</span>
              </h1>
              <p className="text-zinc-500 text-lg font-light max-w-2xl leading-relaxed mb-8">
                Our backbone is a high-performance, decentralized edge network designed for zero-latency data orchestration.
              </p>
              
              {/* Topology Constellation Overlay - High Visibility */}
              <div className="flex gap-4">
                 {[...Array(3)].map((_, i) => (
                   <div key={i} className="flex flex-col gap-1 p-5 rounded-[2rem] bg-zinc-900/80 border border-blue-500/20 relative overflow-hidden group shadow-[0_0_30px_rgba(59,130,246,0.05)]">
                      <div className="absolute inset-0 bg-blue-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="flex items-center gap-2 relative z-10">
                         <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] animate-pulse" />
                         <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Zone {i+1}</span>
                      </div>
                      <div className="text-[11px] font-mono font-bold text-zinc-500 relative z-10">RELAY_ACTIVE</div>
                      
                      {/* Mini Topology Graph - Boosted Opacity */}
                      <div className="mt-5 h-14 w-28 relative overflow-hidden flex items-center justify-center opacity-40 group-hover:opacity-80 transition-opacity">
                         <motion.div 
                           animate={{ rotate: 360 }}
                           transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                           className="w-16 h-16 border-2 border-blue-500/30 rounded-full flex items-center justify-center"
                         >
                            <div className="w-8 h-8 border border-blue-500/50 rounded-full" />
                            <div className="absolute top-0 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                            <div className="absolute bottom-0 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                         </motion.div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            {/* Satellite Sync Visual Area - High Contrast */}
            <div className="hidden lg:flex relative items-center justify-center h-[320px] border border-blue-500/20 rounded-[4rem] bg-zinc-900/40 overflow-hidden shadow-2xl">
               <div className="absolute inset-0 bg-[radial-gradient(#3b82f615_1px,transparent_1px)] bg-[size:20px_20px]" />
               {/* Background Glow */}
               <div className="absolute inset-0 bg-blue-600/[0.02] blur-[80px] rounded-full" />
               
               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                 className="relative w-56 h-56"
               >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute w-5 h-5 bg-zinc-950 border-2 border-blue-500/50 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      style={{
                        top: '50%',
                        left: '50%',
                        transform: `rotate(${i * 90}deg) translate(28px)`
                      }}
                    >
                       <Radio className="w-2.5 h-2.5 text-blue-400" />
                       <motion.div 
                         initial={{ height: 0 }}
                         animate={{ height: [0, 120, 0] }}
                         transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.6 }}
                         className="absolute top-full left-1/2 -translate-x-1/2 w-[1.5px] bg-gradient-to-b from-blue-400 to-transparent"
                       />
                    </motion.div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="w-20 h-20 text-blue-400 opacity-80 animate-pulse shadow-[0_0_30px_rgba(96,165,250,0.5)]" />
                  </div>
               </motion.div>
               <div className="absolute bottom-6 left-8 flex items-center gap-3 bg-zinc-950/50 px-3 py-1.5 rounded-full border border-white/5">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-emerald-500/80">Sync Active</span>
               </div>
            </div>
          </div>
        </div>

        {/* Global Node Map Animation - Scaled Down */}
        <section className="relative z-10 py-6 px-6 overflow-hidden">
           <div className="max-w-7xl mx-auto">
              <div className="relative h-[300px] md:h-[450px] bg-zinc-900/20 border border-white/5 rounded-[4rem] flex items-center justify-center group">
                 {/* Map Grid Background */}
                 <div className="absolute inset-0 bg-[radial-gradient(#ffffff05_1px,transparent_1px)] bg-[size:30px_30px] opacity-40" />
                 
                 {/* Satellite Relays Overlay */}
                 <div className="absolute inset-0 pointer-events-none">
                    {[...Array(2)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ rotate: 360 }}
                        transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: i * 7 }}
                        className="absolute inset-[15%] border border-blue-500/10 rounded-full"
                      >
                         <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,1)]" />
                      </motion.div>
                    ))}
                 </div>
                 
                 {/* Pulse Rings */}
                 <div className="absolute inset-0 flex items-center justify-center">
                    {[...Array(3)].map((_, i) => (
                      <motion.div 
                        key={i}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1.3, opacity: [0, 0.15, 0] }}
                        transition={{ duration: 4, repeat: Infinity, delay: i * 1.5 }}
                        className="absolute w-[200px] h-[200px] border border-blue-500/20 rounded-full"
                      />
                    ))}
                 </div>

                 {/* Central Node Visual - Scaled Down */}
                 <div className="relative z-10 scale-90">
                    <motion.div 
                      animate={{ rotate: 360 }}
                      transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                      className="w-32 h-32 border border-white/10 rounded-full relative"
                    >
                       {/* Floating Nodes */}
                       {[...Array(5)].map((_, i) => (
                         <div 
                           key={i}
                           className="absolute w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"
                           style={{
                             top: '50%',
                             left: '50%',
                             transform: `rotate(${i * 72}deg) translate(64px)`
                           }}
                         />
                       ))}
                    </motion.div>
                    <div className="absolute inset-0 flex items-center justify-center">
                       <Globe size={40} className="text-white opacity-80" />
                    </div>
                 </div>

                 {/* Live Dashboard Overlay */}
                 <div className="absolute bottom-12 left-12 right-12 flex flex-col md:flex-row justify-between items-end gap-8 bg-black/60 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem]">
                    <div className="flex gap-12">
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Active Nodes</span>
                          <span className="text-3xl font-black italic">2,481</span>
                       </div>
                       <div className="flex flex-col">
                          <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-1">Global Latency</span>
                          <span className="text-3xl font-black italic text-blue-500">14.2ms</span>
                       </div>
                    </div>
                    <div className="flex flex-col items-end">
                       <div className="flex gap-2 mb-2">
                          {[...Array(12)].map((_, i) => (
                            <div key={i} className={`w-1 h-4 bg-zinc-800 rounded-full overflow-hidden relative`}>
                               <motion.div 
                                 animate={{ height: ["20%", "80%", "40%"] }}
                                 transition={{ duration: 0.5 + Math.random(), repeat: Infinity }}
                                 className="absolute bottom-0 w-full bg-blue-500" 
                               />
                            </div>
                          ))}
                       </div>
                       <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Realtime Throughput</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Technical Specs */}
        <section className="py-24 px-6 relative z-10">
           <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
              {[
                { icon: Activity, title: "Edge Computing", desc: "Data processing at the nearest node for instantaneous synchronization.", anim: "pulse" },
                { icon: Zap, title: "Fiber Backplane", desc: "Direct cross-connects with Tier-1 providers for unthrottled bandwidth.", anim: "flow" },
                { icon: Monitor, title: "Real-time Monitoring", desc: "Global telemetry clusters tracking every packet with sub-microsecond precision.", anim: "scan" }
              ].map((item, i) => (
                <div key={i} className="p-10 rounded-[3rem] bg-zinc-900/30 border border-white/5 hover:border-blue-500/30 transition-all group relative overflow-hidden">
                   <div className="relative z-10">
                      <item.icon className="w-8 h-8 text-zinc-600 group-hover:text-blue-500 transition-colors mb-6" />
                      <h3 className="text-xl font-black mb-3 tracking-tight">{item.title}</h3>
                      <p className="text-zinc-500 text-sm leading-relaxed font-light">{item.desc}</p>
                   </div>

                   {/* Micro-3D Animation Backgrounds */}
                   <div className="absolute top-8 right-8 w-20 h-20 opacity-10 group-hover:opacity-30 transition-opacity">
                      {item.anim === "pulse" && (
                        <motion.div 
                          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-full h-full border-2 border-blue-500 rounded-full"
                        />
                      )}
                      {item.anim === "flow" && (
                        <div className="w-full h-full flex items-center justify-center">
                           {[...Array(3)].map((_, j) => (
                             <motion.div 
                               key={j}
                               animate={{ x: [-20, 20], opacity: [0, 1, 0] }}
                               transition={{ duration: 1, repeat: Infinity, delay: j * 0.3 }}
                               className="absolute h-0.5 w-10 bg-blue-500 rounded-full"
                               style={{ top: `${30 + j * 20}%` }}
                             />
                           ))}
                        </div>
                      )}
                      {item.anim === "scan" && (
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                          className="w-full h-full border-t-2 border-r-2 border-blue-500 rounded-full"
                        />
                      )}
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Infrastructure Directory */}
        <section className="py-32 px-6 border-t border-white/5 bg-zinc-950/30">
           <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row items-center justify-between mb-20 gap-8">
                 <h2 className="text-3xl font-black tracking-tight italic uppercase underline decoration-blue-500/30 underline-offset-8">THE BACKBONE.</h2>
                 <div className="flex gap-4">
                    <div className="px-6 py-2 rounded-full border border-white/10 bg-black text-[9px] font-black tracking-widest uppercase">Nodes: Online</div>
                    <div className="px-6 py-2 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-500 text-[9px] font-black tracking-widest uppercase">Service: 100%</div>
                 </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                 <div className="p-12 rounded-[3.5rem] bg-zinc-900/40 border border-white/5 flex flex-col items-start gap-8">
                    <Database size={40} className="text-blue-500" />
                    <div>
                       <h3 className="text-2xl font-black mb-4">Object Storage v4</h3>
                       <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-sm">
                          Immutable, cold-storage clusters distributed across 14 sovereign data centers.
                       </p>
                    </div>
                    <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                       Deep Dive <ArrowUpRight size={14} />
                    </button>
                 </div>
                 <div className="p-12 rounded-[3.5rem] bg-zinc-900/40 border border-white/5 flex flex-col items-start gap-8">
                    <Wifi size={40} className="text-blue-500" />
                    <div>
                       <h3 className="text-2xl font-black mb-4">Anycast Network</h3>
                       <p className="text-zinc-500 text-sm font-light leading-relaxed max-w-sm">
                          Dynamic routing protocol ensures your data always takes the fastest cryptographic path.
                       </p>
                    </div>
                    <button className="text-[10px] font-black text-blue-500 uppercase tracking-widest flex items-center gap-2">
                       Network Map <ArrowUpRight size={14} />
                    </button>
                 </div>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 px-6">
           <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
              <span>CloudVault Infrastructure Portal</span>
              <span>© {new Date().getFullYear()} VAULT INFRASTRUCTURE GROUP</span>
           </div>
        </footer>
      </div>
    </Layout>
  );
}
