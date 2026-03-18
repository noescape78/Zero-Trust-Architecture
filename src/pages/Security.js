import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { 
  Shield, Lock, EyeOff, Key, Activity, 
  ArrowLeft, Cpu, HardDrive,
  CheckCircle2, AlertTriangle
} from "lucide-react";

export default function Security() {
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

          <div className="grid lg:grid-cols-2 gap-20 items-start">
            <div>
              <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6">
                Cryptographic <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">Deep Security.</span>
              </h1>
              <p className="text-zinc-500 text-lg font-light max-w-2xl leading-relaxed mb-10">
                Every byte of data is protected by mathematical certainty. Zero trust. Zero knowledge. Absolute privacy.
              </p>

              {/* Neural Grid Scanning Visual */}
              <div className="p-8 rounded-[3rem] bg-indigo-500/[0.03] border border-indigo-500/10 relative overflow-hidden group">
                 <div className="relative z-10 flex items-center gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-zinc-950 border border-indigo-500/20 flex flex-wrap gap-1 p-2 overflow-hidden relative">
                       {[...Array(16)].map((_, i) => (
                         <motion.div 
                           key={i}
                           animate={{ opacity: [0.1, 0.4, 0.1] }}
                           transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                           className="w-2.5 h-2.5 bg-indigo-500 rounded-sm"
                         />
                       ))}
                       <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/20 to-transparent" />
                    </div>
                    <div>
                       <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1 block">Sovereign Identity</span>
                       <h3 className="text-lg font-black tracking-tight italic">Biometric Mesh Scan</h3>
                    </div>
                 </div>
                 <motion.div 
                   animate={{ x: ["-100%", "100%"] }}
                   transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-indigo-500/[0.05] to-transparent pointer-events-none"
                 />
              </div>
            </div>

            {/* Micro-Vortex Sidebar Visual */}
            <div className="hidden lg:flex flex-col gap-4">
               <div className="h-[200px] rounded-[3rem] bg-zinc-900/40 border border-white/5 relative overflow-hidden flex items-center justify-center">
                  <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="w-32 h-32 border border-indigo-500/10 rounded-full relative"
                  >
                     {[...Array(6)].map((_, i) => (
                       <motion.div
                         key={i}
                         animate={{ rotate: -360 }}
                         transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                         className="absolute w-6 h-6 bg-zinc-950 border border-indigo-500/30 rounded-lg flex items-center justify-center"
                         style={{
                           top: '50%',
                           left: '50%',
                           transform: `rotate(${i * 60}deg) translate(48px)`
                         }}
                       >
                          <Key size={10} className="text-indigo-500 opacity-40" />
                       </motion.div>
                     ))}
                     <div className="absolute inset-0 flex items-center justify-center">
                        <Lock size={20} className="text-indigo-500/20" />
                     </div>
                  </motion.div>
                  <div className="absolute top-6 left-8 flex items-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                     <span className="text-[8px] font-black uppercase tracking-widest text-zinc-600">Key Vortex Active</span>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Triple-Model Security Environment - Expanded */}
        <section className="relative z-10 py-8 px-6 overflow-hidden">
           <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12 relative">
              
              {/* LEFT: Protocol Interceptor (3D Data Flow) - High Visibility */}
              <div className="hidden lg:flex flex-1 h-[400px] border border-indigo-500/20 bg-zinc-900/10 rounded-[4rem] relative overflow-hidden group shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                 {/* Background Contrast Glow */}
                 <div className="absolute inset-0 bg-indigo-500/[0.03] blur-[100px] rounded-full" />
                 
                 <div className="absolute top-8 left-10 flex items-center gap-2 z-10">
                    <Activity size={16} className="text-indigo-500 animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500/80">Protocol Interceptor</span>
                 </div>
                 
                 <div className="absolute inset-0 flex items-center justify-center p-14">
                    <div className="w-full flex justify-around items-end gap-3 h-3/4">
                       {[...Array(6)].map((_, i) => (
                         <div key={i} className="flex-1 max-w-[14px] h-full bg-zinc-950 border border-indigo-500/10 rounded-full relative overflow-hidden shadow-inner">
                            <motion.div 
                              animate={{ y: ["-100%", "100%"] }}
                              transition={{ duration: 1.5 + (i % 3) * 0.5, repeat: Infinity, ease: "linear" }}
                              className="absolute top-0 w-full h-1/2 bg-gradient-to-b from-transparent via-indigo-400 to-transparent opacity-80"
                            />
                            {/* Static Data Grid Overlay */}
                            <div className="absolute inset-0 flex flex-col justify-around py-4 opacity-10">
                               {[...Array(12)].map((_, j) => (
                                 <div key={j} className="h-[1px] w-full bg-indigo-300" />
                               ))}
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="absolute bottom-6 right-10 text-[9px] font-mono font-bold text-indigo-500/60 z-10">STATUS: INTERCEPTING_PACKETS</div>
              </div>

              {/* CENTER: The Main Security Core (Existing logic, slightly scaled) */}
              <div className="relative z-10 flex-[1.5] flex items-center justify-center min-h-[450px]">
                 <div className="relative w-full h-full bg-zinc-900/20 border border-indigo-500/20 rounded-[5rem] flex items-center justify-center overflow-hidden shadow-2xl shadow-indigo-500/5">
                    
                    {/* Connection Lasers to side modules */}
                    <div className="absolute inset-x-0 top-1/2 p-2 hidden lg:flex justify-between items-center pointer-events-none opacity-20">
                       <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity }} className="h-px flex-1 bg-gradient-to-r from-indigo-500 to-transparent" />
                       <motion.div animate={{ opacity: [0, 1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} className="h-px flex-1 bg-gradient-to-l from-indigo-500 to-transparent" />
                    </div>

                    {/* Quantum Key Vortex Overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                       {[...Array(3)].map((_, i) => (
                         <motion.div 
                           key={i}
                           animate={{ rotate: -360 }}
                           transition={{ duration: 12 + i * 5, repeat: Infinity, ease: "linear" }}
                           className="absolute inset-[10%] border-t border-indigo-500/5 rounded-full"
                         >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 bg-black border border-indigo-500/10 rounded-lg">
                               <Key size={12} className="text-indigo-400 opacity-30" />
                            </div>
                         </motion.div>
                       ))}
                    </div>

                    {/* Internal Glow for Contrast */}
                    <div className="absolute inset-0 bg-indigo-500/[0.02] blur-[80px] rounded-full" />
                    
                    {/* The Core Visual */}
                    <div className="relative z-10 scale-90">
                       <motion.div 
                         animate={{ 
                           rotateZ: [0, 360],
                           scale: [1, 1.05, 1]
                         }}
                         transition={{ 
                           rotateZ: { duration: 25, repeat: Infinity, ease: "linear" },
                           scale: { duration: 4, repeat: Infinity }
                         }}
                         className="w-40 h-40 md:w-52 md:h-52 rounded-[3.5rem] border-4 border-indigo-500/40 bg-zinc-950 flex items-center justify-center relative shadow-[0_0_60px_rgba(16,185,129,0.2)]"
                       >
                          {[...Array(3)].map((_, i) => (
                            <motion.div 
                              key={i}
                              animate={{ rotateZ: 360 * (i + 1) * 0.5 }}
                              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                              className={`absolute border border-indigo-500/${20 + i * 10} rounded-[2.5rem]`}
                              style={{ inset: `${12 * (i + 1)}%` }}
                            />
                          ))}
                          <Lock size={48} className="text-indigo-500 opacity-80" />
                       </motion.div>

                       {/* Interactive Badges */}
                       <motion.div 
                         initial={{ opacity: 0, scale: 0.8 }}
                         whileInView={{ opacity: 1, scale: 1 }}
                         className="absolute -top-6 -right-12 p-4 bg-zinc-900 border border-indigo-500/30 rounded-2xl backdrop-blur-xl shadow-2xl"
                       >
                          <div className="flex items-center gap-2 mb-1">
                             <CheckCircle2 size={12} className="text-indigo-500" />
                             <span className="text-[8px] font-black uppercase tracking-widest">FIPS-140-2</span>
                          </div>
                          <div className="text-[7px] font-bold text-zinc-500 uppercase tracking-tighter">Hardware Vault</div>
                       </motion.div>

                       <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          className="absolute -bottom-6 -left-12 p-4 bg-zinc-900 border border-indigo-500/30 rounded-2xl backdrop-blur-xl shadow-2xl"
                       >
                          <div className="flex items-center gap-2 mb-1">
                             <EyeOff size={12} className="text-indigo-500" />
                             <span className="text-[8px] font-black uppercase tracking-widest">ZERO-KNOW</span>
                          </div>
                          <div className="text-[7px] font-bold text-zinc-500 uppercase tracking-tighter">Private Keys</div>
                       </motion.div>
                    </div>
                 </div>
              </div>

              {/* RIGHT: HSM Hardware Visualizer (3D Rotating Chip) */}
              <div className="hidden lg:flex flex-1 h-[400px] border border-indigo-500/10 bg-zinc-900/10 rounded-[4rem] relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-t from-transparent via-indigo-500/[0.02] to-transparent" />
                 <div className="absolute top-6 right-10 flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 text-right">Hardware Security Module</span>
                    <Cpu size={14} className="text-indigo-500 animate-pulse" />
                 </div>

                 <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div 
                      animate={{ 
                        rotateY: [0, 360],
                        rotateX: [20, 30, 20]
                      }}
                      transition={{ 
                        rotateY: { duration: 15, repeat: Infinity, ease: "linear" },
                        rotateX: { duration: 5, repeat: Infinity }
                      }}
                      className="w-32 h-32 bg-zinc-950 border-2 border-indigo-500/20 rounded-2xl relative shadow-[0_0_40px_rgba(16,185,129,0.1)] flex items-center justify-center"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                       <div className="w-16 h-16 border border-indigo-500/40 rounded-lg flex items-center justify-center relative">
                          <motion.div 
                             animate={{ scale: [1, 1.2, 1] }}
                             transition={{ duration: 0.5, repeat: Infinity }}
                             className="w-8 h-8 bg-indigo-500 rounded-sm blur-[4px]"
                          />
                          <Lock size={16} className="text-white absolute z-10" />
                       </div>
                       {/* Floating PCB Traces */}
                       {[...Array(4)].map((_, i) => (
                         <div key={i} className={`absolute w-12 h-0.5 bg-indigo-500/20`} style={{ 
                           top: '50%', 
                           left: i % 2 === 0 ? '-20px' : 'auto', 
                           right: i % 2 !== 0 ? '-20px' : 'auto',
                           transform: `translateY(${(i-1.5)*20}px)`
                         }} />
                       ))}
                    </motion.div>
                 </div>
                 <div className="absolute bottom-6 left-10 text-[8px] font-mono text-indigo-500/40">HSM_ID: 0xFD2A9</div>
              </div>
           </div>
        </section>

        {/* Security Layers Grid */}
        <section className="py-24 px-6 relative z-10">
           <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Shield, title: "AES-256", desc: "Symmetric encryption for data at rest.", action: "encrypt" },
                { icon: Key, title: "RSA-4096", desc: "Asymmetric transport security layers.", action: "rotate" },
                { icon: Cpu, title: "HSM Backed", desc: "Private keys never leave memory.", action: "pulse" },
                { icon: HardDrive, title: "Cold Transit", desc: "Hardware isolation for shards.", action: "isolate" }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 flex flex-col items-center text-center group hover:border-indigo-500/30 transition-all relative overflow-hidden">
                   <div className="relative z-10">
                      <item.icon className="w-6 h-6 text-zinc-600 group-hover:text-indigo-500 transition-colors mb-6" />
                      <h3 className="text-lg font-black mb-2 tracking-tight italic uppercase">{item.title}</h3>
                      <p className="text-zinc-600 text-[11px] leading-relaxed font-bold uppercase tracking-tight">{item.desc}</p>
                   </div>

                   {/* Micro-3D Animation Backgrounds */}
                   <div className="absolute bottom-4 right-4 w-12 h-12 opacity-5 group-hover:opacity-20 transition-opacity">
                      {item.action === "encrypt" && (
                        <div className="w-full h-full border-t border-indigo-500 rounded-full animate-spin-slow" />
                      )}
                      {item.action === "rotate" && (
                        <motion.div 
                          animate={{ rotate: 360 }}
                          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                          className="w-full h-full flex items-center justify-center"
                        >
                           <Key size={12} className="text-indigo-500" />
                        </motion.div>
                      )}
                      {item.action === "pulse" && (
                        <motion.div 
                          animate={{ scale: [1, 1.2, 1] }} 
                          transition={{ duration: 1, repeat: Infinity }}
                          className="w-full h-full bg-indigo-500 rounded-full blur-[8px]"
                        />
                      )}
                      {item.action === "isolate" && (
                        <div className="w-full h-full border border-indigo-500 rounded-lg flex items-center justify-center">
                           <div className="w-1/2 h-1/2 bg-indigo-500/50 rounded-sm" />
                        </div>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Security Audit Section */}
        <section className="py-32 px-6 border-t border-white/5 bg-zinc-950/30">
           <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
              <div className="flex-1">
                 <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4 block">Independent Verification</span>
                 <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-8">Audited by the best in the industry.</h2>
                 <p className="text-zinc-500 text-sm leading-relaxed font-light mb-10 max-w-lg">
                    Our codebase undergoes quarterly penetration testing and cryptographic audits from world-renowned security firms. We operate in full transparency of our protocols.
                 </p>
                 <div className="flex gap-10 opacity-20 hover:opacity-100 transition-opacity">
                    <div className="font-black text-xs tracking-widest uppercase">CertiK Verified</div>
                    <div className="font-black text-xs tracking-widest uppercase">SOC2 Type II</div>
                    <div className="font-black text-xs tracking-widest uppercase">GDPR Compliant</div>
                 </div>
              </div>
              <div className="flex-1 w-full max-w-md p-10 bg-zinc-900/50 border border-indigo-500/20 rounded-[3rem] relative group">
                 <div className="absolute top-8 right-8 text-indigo-500 animate-pulse">
                    <AlertTriangle size={20} />
                 </div>
                 <h4 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-600 mb-6">Live Threat Status</h4>
                 <div className="space-y-4">
                    {[
                      { label: "Bruteforce Defense", status: "Active" },
                      { label: "IP Whitelisting", status: "Enabled" },
                      { label: "Hardware Isolation", status: "Secure" }
                    ].map((row, i) => (
                      <div key={i} className="flex justify-between items-center py-3 border-b border-white/5 last:border-0">
                         <span className="text-[11px] font-bold text-white/40 uppercase">{row.label}</span>
                         <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest underline decoration-indigo-500/30">{row.status}</span>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-white/5 px-6">
           <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
              <span>CloudVault Security Hub v2.4</span>
              <span>Built for absolute privacy</span>
           </div>
        </footer>
      </div>
    </Layout>
  );
}
