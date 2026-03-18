import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { 
  Shield, Lock, Activity, 
  ChevronRight, Layers, 
  Cpu, Network, Terminal, ArrowLeft
} from "lucide-react";
import Button from "../components/ui/Button";

export default function Protocol() {
  const navigate = useNavigate();

  const layers = [
    {
      title: "LAYER_01: ZERO-KNOWLEDGE",
      description: "Client-side encryption using XTS-AES-256 bits. Your master key never leaves your local environment.",
      icon: Lock,
      status: "Verified",
      color: "text-indigo-500",
      bg: "bg-indigo-500/5"
    },
    {
      title: "LAYER_02: FRAGMENTATION",
      description: "Files are split into non-contiguous segments and distributed across the global edge relay network.",
      icon: Layers,
      status: "Active",
      color: "text-blue-500",
      bg: "bg-blue-500/5"
    },
    {
      title: "LAYER_03: TRANSMISSION",
      description: "Secured via TLS 1.3 with perfect forward secrecy. Nodes rotate identities every 3600 seconds.",
      icon: Network,
      status: "Operational",
      color: "text-cyan-500",
      bg: "bg-cyan-500/5"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-[#010101] text-white selection:bg-indigo-500 selection:text-white font-sans relative overflow-hidden">
        
        {/* Technical Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-[500px] bg-indigo-600/[0.03] blur-[120px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-full h-[500px] bg-blue-600/[0.03] blur-[120px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:60px_60px]" />
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
            <div className="max-w-3xl mb-24">
               <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[9px] font-black text-indigo-500 mb-6 tracking-[0.4em] uppercase italic"
               >
                  <Terminal size={12} /> PROTOCOL_SPECIFICATION_v2.4
               </motion.div>
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-8 leading-[0.9]"
               >
                 THE VAULT <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">PROTOCOL.</span>
               </motion.h1>
               <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed"
               >
                 A multi-layered cryptographic architecture designed for absolute data sovereignty and high-velocity distribution.
               </motion.p>
            </div>

            {/* Protocol Layers Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-32">
               {layers.map((layer, i) => (
                 <motion.div 
                   key={layer.title}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   viewport={{ once: true }}
                   className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl relative group overflow-hidden"
                 >
                    <div className={`w-16 h-16 rounded-2xl ${layer.bg} flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                       <layer.icon size={28} className={layer.color} />
                    </div>
                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-4">{layer.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed mb-8 font-light tracking-wide">{layer.description}</p>
                    
                    <div className="flex items-center justify-between pt-6 border-t border-white/5">
                       <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none">Status</span>
                       <span className={`text-[9px] font-black uppercase tracking-widest leading-none ${layer.color}`}>{layer.status}</span>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                 </motion.div>
               ))}
            </div>

            {/* Technical Deep Dive Section */}
            <div className="bg-zinc-900/40 rounded-[4rem] border border-white/5 p-12 md:p-20 relative overflow-hidden mb-32 group">
               <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/[0.01] blur-[150px] pointer-events-none" />
               
               <div className="max-w-3xl relative z-10">
                  <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic tracking-tighter mb-8 underline decoration-indigo-500/30 underline-offset-8">Distibuted_State_Logic</h2>
                  <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12">
                     Vault eliminates central points of failure by fragmenting every object into 256-bit segments. These segments are cryptographically hashed and deployed to a dynamic lattice of edge nodes. No single node possesses more than 0.4% of any given asset.
                  </p>

                  <div className="grid md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <Shield className="text-indigo-500" size={16} />
                           <span className="text-[11px] font-black text-white uppercase tracking-widest">End-to-End Integrity</span>
                        </div>
                        <p className="text-xs text-zinc-600 font-medium leading-relaxed uppercase tracking-widest">Merkle-Tree verification ensures bit-perfect reconstruction during retrieval.</p>
                     </div>
                     <div className="space-y-4">
                        <div className="flex items-center gap-3">
                           <Activity className="text-blue-500" size={16} />
                           <span className="text-[11px] font-black text-white uppercase tracking-widest">Dynamic Scaling</span>
                        </div>
                        <p className="text-xs text-zinc-600 font-medium leading-relaxed uppercase tracking-widest">Protocol automatically re-balances segment density based on network demand.</p>
                     </div>
                  </div>
               </div>

               <div className="hidden lg:block absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 opacity-20 group-hover:opacity-30 transition-opacity rotate-12">
                  <Cpu className="w-full h-full text-indigo-500" />
               </div>
            </div>

            {/* Terminal View Component */}
            <div className="max-w-4xl mx-auto mb-32">
               <div className="bg-[#050505] rounded-3xl border border-white/5 shadow-2xl overflow-hidden">
                  <div className="bg-white/5 px-6 py-4 flex items-center gap-2 border-b border-white/5">
                     <div className="w-3 h-3 rounded-full bg-red-500/50" />
                     <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                     <div className="w-3 h-3 rounded-full bg-emerald-500/50" />
                     <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest ml-4 font-mono">Vault_Terminal_01.sh</span>
                  </div>
                  <div className="p-8 font-mono text-xs md:text-sm">
                     <div className="flex gap-4 mb-2">
                        <span className="text-indigo-500">$</span>
                        <span className="text-zinc-400 italic">vault protocol --init --force-xts</span>
                     </div>
                     <div className="text-emerald-500 mb-1 tracking-tight">[STATUS] Initializing Layer_01 Secure_Enclave...</div>
                     <div className="text-emerald-500 mb-1 tracking-tight">[STATUS] Generating 256-bit XTS Cryptographic Seed...</div>
                     <div className="text-zinc-500 mb-4 opacity-50"># Indexing local segments... [DONE]</div>
                     <div className="flex gap-4 mb-1">
                        <span className="text-indigo-500">$</span>
                        <span className="text-zinc-400 italic">vault deploy --distribute --target=EdgeNetwork</span>
                     </div>
                     <div className="text-blue-500 mb-1 tracking-tight">[NET] Connection established to US-East-04 Node.</div>
                     <div className="text-blue-500 mb-1 tracking-tight">[NET] Fragmenting sequence 0x2A4F... Status: 100%</div>
                     <div className="text-blue-500 mb-1 tracking-tight">[SYST] Distribution pattern: Global_Relay_Active</div>
                     <div className="animate-pulse inline-block w-2 h-4 bg-white/20 mt-4 ml-8" />
                  </div>
               </div>
            </div>

            {/* Final CTA */}
            <div className="text-center">
               <h3 className="text-3xl font-black text-white italic tracking-tighter uppercase mb-10">Start_Your_Deployment.</h3>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Button 
                    onClick={() => navigate("/register")}
                    variant="vault"
                    className="px-12 py-5 rounded-full"
                    icon={ChevronRight}
                    iconPosition="right"
                  >
                    AUTHORIZE_ACCESS
                  </Button>
                  <Button 
                    onClick={() => navigate("/security")}
                    variant="outline"
                    className="px-12 py-5 rounded-full border-white/10 text-white hover:bg-white/5 tracking-widest text-[10px] uppercase font-black"
                  >
                    Review_Security
                  </Button>
               </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
