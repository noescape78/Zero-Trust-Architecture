import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Layout from "../components/Layout";
import { 
  Shield, Lock, Zap, Globe, 
  ArrowLeft, Terminal, Cpu, Database,
  ArrowRight
} from "lucide-react";
import { useRef } from "react";

const StepSection = ({ step, title, description, children, icon: Icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="relative py-24 px-6 md:px-12 border-b border-white/5 last:border-0"
  >
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
      <div className="order-2 lg:order-1">
        <div className="inline-flex items-center gap-3 mb-6">
           <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
              <Icon size={20} />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600">Step 0{step}</span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black mb-4 tracking-tight">{title}</h2>
        <p className="text-zinc-500 text-base leading-relaxed font-light mb-8">{description}</p>
        
        <div className="flex gap-4">
           {["MIL-SPEC", "AES-256", "E2EE"].map((tag) => (
             <div key={tag} className="px-4 py-1.5 rounded-full border border-white/5 bg-zinc-900/50 text-[9px] font-bold text-zinc-500">
                {tag}
             </div>
           ))}
        </div>
      </div>
      
      <div className="order-1 lg:order-2">
         {children}
      </div>
    </div>
  </motion.div>
);

export default function HowItWorks() {
  const navigate = useNavigate();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: targetRef });
  
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-10, 10]);

  return (
    <Layout>
      <div ref={targetRef} className="min-h-screen bg-[#010101] text-white selection:bg-indigo-500 relative overflow-hidden flex flex-col pt-24">
        
        {/* Navigation / Header */}
        <div className="max-w-7xl mx-auto w-full px-6 relative z-10 mb-20">
          <button 
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-xs font-black uppercase tracking-[0.2em] mb-12"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Hub
          </button>

          <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-4">
            The Lifecycle of a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">Secure Object.</span>
          </h1>
          <p className="text-zinc-500 text-lg font-light max-w-2xl leading-relaxed">
            From the moment you drag a file into CloudVault, a sophisticated chain of cryptographic events begins.
          </p>
        </div>

        {/* Step 1: Client Side Encryption */}
        <StepSection 
          step={1}
          icon={Lock}
          title="Encrypted locally."
          description="Your file is encrypted directly in your browser using AES-256-GCM. The plaintext data never touches our network. Your device is the only one with the key."
        >
          <motion.div 
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative h-[350px] bg-zinc-900/40 border border-white/10 rounded-[3rem] p-8 overflow-hidden shadow-2xl"
          >
             <div className="absolute inset-x-0 top-0 h-10 border-b border-white/5 bg-zinc-950 px-6 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500/20" />
                <div className="w-2 h-2 rounded-full bg-emerald-500/20" />
                <Terminal size={14} className="text-zinc-600 ml-auto" />
             </div>
             <div className="mt-12 space-y-4 font-mono text-[10px]">
                <div className="text-emerald-500">$ generating_master_key...</div>
                <div className="text-zinc-500">Key Hash: 0xA72...F91 (256-bit)</div>
                <div className="text-indigo-400">$ encrypting_payload_stream...</div>
                <div className="grid grid-cols-4 gap-2">
                   {[...Array(12)].map((_, i) => (
                     <div key={i} className="h-4 bg-zinc-800 rounded animate-pulse" />
                   ))}
                </div>
                <div className="text-zinc-500">Entropy status: verified_high</div>
             </div>
             {/* 3D Floating Key Icon */}
             <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute bottom-10 right-10 w-20 h-20 rounded-3xl bg-indigo-500 flex items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)]"
             >
                <Shield className="text-white w-10 h-10" />
             </motion.div>
          </motion.div>
        </StepSection>

        {/* Step 2: Distributed Transmission */}
        <StepSection 
          step={2}
          icon={Globe}
          title="Distributed transit."
          description="The encrypted ciphertext is split into unrecognizable shards and transmitted via our globally distributed edge network for near-zero latency."
        >
          <div className="relative h-[280px] flex items-center justify-center scale-90 md:scale-100">
             <div className="absolute inset-0 bg-indigo-600/5 blur-[80px] rounded-full" />
             <div className="relative w-full aspect-square max-h-[220px]">
                {[...Array(3)].map((_, i) => (
                   <motion.div 
                      key={i}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20 + i * 5, repeat: Infinity, ease: "linear" }}
                      className={`absolute inset-0 border border-white/10 opacity-${8 - i * i} rounded-full`}
                   />
                ))}
                <motion.div 
                   animate={{ scale: [1, 1.05, 1] }} 
                   transition={{ duration: 4, repeat: Infinity }}
                   className="absolute inset-0 flex items-center justify-center"
                >
                   <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center shadow-2xl relative">
                      <Zap className="text-white w-10 h-10" />
                      <div className="absolute -top-6 -right-6 px-3 py-1.5 bg-black border border-white/10 rounded-lg text-[8px] font-black whitespace-nowrap shadow-xl">240+ NODES</div>
                   </div>
                </motion.div>
             </div>
          </div>
        </StepSection>

        {/* Step 3: Zero-Knowledge Storage */}
        <StepSection 
          step={3}
          icon={Database}
          title="Static Rest."
          description="Your data sits in an immutable cold-storage vault. Even if we wanted to, we can't see what's inside. Only your key can reconstruct the object."
        >
           <div className="bg-zinc-900/30 border border-white/5 rounded-[3rem] p-12 overflow-hidden relative">
              <div className="grid grid-cols-2 gap-6 relative z-10">
                 <div className="space-y-4">
                    <h4 className="text-sm font-bold opacity-60">ENCRYPTION LVL</h4>
                    <div className="text-4xl font-black italic">MIL8</div>
                 </div>
                 <div className="space-y-4">
                    <h4 className="text-sm font-bold opacity-60">AVAILABILITY</h4>
                    <div className="text-4xl font-black italic">99.9%</div>
                 </div>
              </div>
              <motion.div 
                 animate={{ rotateX: [0, 10, 0], rotateY: [0, 10, 0] }}
                 transition={{ duration: 5, repeat: Infinity }}
                 className="mt-12 bg-black border border-white/5 p-6 rounded-2xl flex items-center justify-between"
              >
                 <div className="flex gap-4">
                    <Cpu className="text-indigo-500 w-5 h-5" />
                    <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest">Storage integrity check</span>
                 </div>
                 <div className="text-[10px] font-mono font-bold text-emerald-500">STABLE</div>
              </motion.div>
           </div>
        </StepSection>

        {/* Global CTA - Enriched */}
        <section className="py-32 px-6 text-center border-t border-white/5 relative overflow-hidden">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
           <div className="max-w-3xl mx-auto relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter uppercase italic">Ready to secure?</h2>
              <p className="text-zinc-500 text-xs md:text-sm font-light mb-10 max-w-xl mx-auto leading-relaxed">
                Experience the cryptographic certainty of CloudVault. <br /> Initialize your secure object lifecycle today.
              </p>
              
              <div className="flex flex-col items-center gap-10">
                <button 
                  onClick={() => navigate("/register")}
                  className="bg-indigo-600 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-indigo-500 transition-all hover:scale-105 shadow-2xl shadow-indigo-500/30 flex items-center gap-4 mx-auto"
                >
                   INITIALIZE VAULT
                   <ArrowRight size={20} />
                </button>

                <div className="w-full max-w-lg py-4 border-y border-white/5 flex items-center justify-around opacity-40">
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Entropy Check</span>
                    <span className="text-[10px] font-mono font-bold text-white">VERIFIED</span>
                  </div>
                  <div className="flex flex-col items-center border-x border-white/5 px-8">
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Architecture</span>
                    <span className="text-[10px] font-mono font-bold text-white">DECENTRALIZED</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Compliance</span>
                    <span className="text-[10px] font-mono font-bold text-white">ISO/IEC 27001</span>
                  </div>
                </div>
              </div>
           </div>
        </section>

        {/* Small Footer */}
        <footer className="py-12 border-t border-white/5 px-6">
           <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
              <span>CloudVault Documentation v2.4</span>
              <span>Built for absolute privacy</span>
           </div>
        </footer>
      </div>
    </Layout>
  );
}
