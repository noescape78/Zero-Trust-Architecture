import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Layout from "../components/Layout";
import { 
  Cloud, Lock, Shield, ChevronRight, 
  Globe, Activity, 
  ArrowUpRight, Heart, Code, 
  Layers, Package, Radio, Terminal, LifeBuoy
} from "lucide-react";

const FloatingElement = ({ delay, children, className }) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-15, 15, -15] }}
    transition={{ duration: 6, repeat: Infinity, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Home() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <Layout>
      <div className="min-h-screen bg-[#010101] text-white selection:bg-indigo-500 selection:text-white font-sans relative overflow-hidden">
        
        {/* Animated Background */}
        <motion.div 
          style={{ y: backgroundY }}
          className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
        >
          <div className="absolute top-[-5%] left-[-5%] w-[50%] h-[50%] bg-indigo-900/10 blur-[150px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-5%] right-[-5%] w-[50%] h-[50%] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen" />
        </motion.div>

        {/* Navigation */}
        <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigate("/")}>
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-black tracking-tight text-white uppercase italic">
                Vault
              </span>
            </div>

            <div className="hidden md:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
               <button onClick={() => navigate("/overview")} className="hover:text-white transition-colors">Overview</button>
               <button onClick={() => navigate("/how-it-works")} className="hover:text-white transition-colors">How it works</button>
               <button onClick={() => navigate("/infrastructure")} className="hover:text-white transition-colors">Infrastructure</button>
               <button onClick={() => navigate("/security")} className="hover:text-white transition-colors">Security</button>
               <button onClick={() => navigate("/pricing")} className="hover:text-white transition-colors">Pricing</button>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest">
               <button onClick={() => navigate("/login")} className="text-zinc-500 hover:text-white transition-colors">Login</button>
               <button 
                 onClick={() => navigate("/register")}
                 className="bg-white text-black px-6 py-2.5 rounded-full hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5"
               >
                 Sign Up
               </button>
            </div>
          </div>
        </nav>

        {/* Hero Section - Redesigned for Split Layout */}
        <section className="relative z-10 pt-32 pb-16 px-6 min-h-[80vh] flex flex-col justify-center">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-left"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[9px] font-bold text-indigo-400 mb-6 tracking-[0.3em] uppercase">
                <Activity className="w-3 h-3" />
                Enterprise v2.4 Active
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.9] mb-6 italic uppercase">
                STEALTH <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-zinc-700">
                  DATA NETWORK.
                </span>
              </h1>

              <p className="text-sm md:text-lg text-zinc-500 font-light max-w-lg leading-relaxed mb-10">
                Advanced zero-knowledge encryption for the modern digital sovereign. <br className="hidden md:block" />
                Scale your data with mathematical certainty.
              </p>

              <div className="flex flex-col sm:flex-row items-start gap-4">
                <button 
                  onClick={() => navigate("/register")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-10 py-4 rounded-full font-black text-sm hover:bg-zinc-200 transition-all active:scale-95 group shadow-2xl shadow-white/5"
                >
                  GET STARTED
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigate("/protocol")}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 bg-transparent text-white border border-white/10 px-10 py-4 rounded-full font-black text-sm hover:bg-white/5 transition-all uppercase tracking-widest"
                >
                  Protocol
                </button>
              </div>
            </motion.div>

            {/* Special Animation on Right */}
            <div className="hidden lg:flex relative items-center justify-center h-[500px]">
               <div className="absolute inset-0 bg-indigo-600/5 blur-[120px] rounded-full" />
               <div className="relative w-full h-full flex items-center justify-center">
                  <FloatingElement delay={0} className="absolute z-20">
                     <div className="w-48 h-48 rounded-[3rem] bg-zinc-900 border border-white/10 flex items-center justify-center shadow-2xl relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Lock className="w-20 h-20 text-white" />
                     </div>
                  </FloatingElement>
                  
                  <FloatingElement delay={1} className="absolute top-10 left-10 z-10">
                     <div className="w-20 h-20 rounded-2xl bg-zinc-900/80 border border-white/5 flex items-center justify-center backdrop-blur-md">
                        <Layers className="w-8 h-8 text-indigo-400/50" />
                     </div>
                  </FloatingElement>

                  <FloatingElement delay={2} className="absolute bottom-10 right-20 z-10">
                     <div className="w-24 h-24 rounded-3xl bg-zinc-900/80 border border-white/5 flex items-center justify-center backdrop-blur-md">
                        <Package className="w-10 h-10 text-blue-400/50" />
                     </div>
                  </FloatingElement>

                  <FloatingElement delay={0.5} className="absolute top-1/2 -right-10 z-0">
                     <div className="w-16 h-16 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center animate-spin-slow">
                        <Radio className="w-6 h-6 text-indigo-500" />
                     </div>
                  </FloatingElement>
               </div>
            </div>
          </div>
        </section>

        {/* Minimal Stats */}
        <section className="relative z-10 py-12 border-y border-white/5 bg-black/40">
           <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-between items-center gap-8 opacity-40">
              <div className="flex items-center gap-3">
                 <Shield size={16} className="text-indigo-500" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">AES-256 Verified</span>
              </div>
              <div className="flex items-center gap-3">
                 <Lock size={16} className="text-indigo-500" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Zero-Knowledge</span>
              </div>
              <div className="flex items-center gap-3">
                 <Activity size={16} className="text-indigo-500" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-3">
                 <Globe size={16} className="text-indigo-500" />
                 <span className="text-[10px] font-black uppercase tracking-[0.2em]">Distributed Edge</span>
              </div>
           </div>
        </section>

        {/* The Nexus - Comprehensive Site Overview */}
        <section className="relative z-10 py-24 px-6 border-t border-white/5 bg-zinc-950/30">
           <div className="max-w-7xl mx-auto">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
                 <div className="text-left">
                    <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em] mb-4 block">Platform Ecosystem</span>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tight uppercase italic underline decoration-indigo-500/30 underline-offset-8">THE NEXUS.</h2>
                 </div>
                 <button 
                  onClick={() => navigate("/overview")}
                  className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-black uppercase tracking-widest"
                 >
                    View Full Directory <ArrowUpRight size={16} />
                 </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                 {[
                   { title: "SUPPORT", icon: LifeBuoy, count: "24/7", link: "/overview" },
                   { title: "SECURITY", icon: Shield, count: "AUDITED", link: "/security" },
                   { title: "DEVELOPERS", icon: Terminal, count: "SDKs", link: "/overview" },
                   { title: "UPTIME", icon: Globe, count: "99.9%", link: "/uptime" }
                 ].map((item, i) => (
                   <motion.div 
                     key={i}
                     whileHover={{ y: -5 }}
                     onClick={() => navigate(item.link)}
                     className="p-8 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500/30 transition-all group"
                   >
                      <item.icon className="w-8 h-8 text-zinc-600 group-hover:text-indigo-500 transition-colors mb-4" />
                      <span className="text-[10px] font-black text-white tracking-[0.2em] mb-1">{item.title}</span>
                      <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter">{item.count}</span>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>

        {/* Premium Feature Grid - Redesigned */}
        <section className="relative z-10 py-24 px-6">
           <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
              {/* Expert Advisory - NEW Replacement */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                viewport={{ once: true }}
                onClick={() => navigate("/advisory")}
                className="group relative p-12 rounded-[3.5rem] bg-zinc-900/40 border border-white/5 flex flex-col items-center text-center cursor-pointer hover:bg-zinc-900/60 transition-all overflow-hidden"
              >
                 {/* Signal Pulse 3D Animation */}
                 <div className="relative w-24 h-24 mb-10 flex items-center justify-center">
                    {[...Array(3)].map((_, i) => (
                      <motion.div 
                        key={i}
                        animate={{ 
                          scale: [1, 2],
                          opacity: [0.5, 0]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity, 
                          delay: i * 0.6,
                          ease: "easeOut"
                        }}
                        className="absolute inset-0 border border-indigo-500/50 rounded-full"
                      />
                    ))}
                    <Terminal className="w-10 h-10 text-indigo-500 relative z-10 group-hover:scale-110 transition-transform" />
                 </div>

                 <h2 className="text-3xl font-black mb-4 tracking-tight uppercase italic underline decoration-indigo-500/20 underline-offset-8">Expert Advisory</h2>
                 <p className="text-zinc-500 text-sm leading-relaxed mb-10 font-light max-w-xs">
                    Consult with our cryptographic engineers for custom enterprise orchestration and zero-trust scaling.
                 </p>
                 <button className="text-[10px] font-black text-white bg-indigo-600/20 px-8 py-3 rounded-full uppercase tracking-widest border border-indigo-500/30 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    Talk to an Expert
                 </button>
                 
                 {/* Background Glow */}
                 <div className="absolute inset-0 bg-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity blur-[80px]" />
              </motion.div>

              {/* Community Card - Refined with Fade */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                viewport={{ once: true }}
                onClick={() => navigate("/pricing")}
                className="p-12 rounded-[3.5rem] bg-indigo-600 border border-indigo-500 flex flex-col items-center text-center shadow-2xl shadow-indigo-600/20 group cursor-pointer hover:bg-indigo-500 transition-colors relative overflow-hidden"
              >
                 <Heart className="w-10 h-10 text-white mb-10 group-hover:scale-110 transition-transform" />
                 <h2 className="text-3xl font-black mb-4 tracking-tight uppercase italic underline decoration-white/20 underline-offset-8">The Community</h2>
                 <p className="text-white/70 text-sm leading-relaxed mb-10 font-light max-w-xs">
                    Trusted by thousands of developers and organizations requiring absolute digital sovereignty.
                 </p>
                 <button className="bg-white text-indigo-600 px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-zinc-100 transition-all shadow-xl">
                    Explore Plans
                 </button>
                 
                 {/* Subtle Light Scan Effect */}
                 <motion.div 
                   animate={{ x: ["-100%", "100%"] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                   className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 pointer-events-none"
                 />
              </motion.div>
           </div>
        </section>

        {/* Nexus Directory Grid */}
        <section className="relative z-10 py-16 px-6">
           <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-black mb-12 text-center tracking-tighter">
                 The Nexus Directory.
              </h2>

              <div className="grid md:grid-cols-3 gap-8">
                 {[
                   {
                     icon: Globe,
                     title: "Global Edge Network",
                     description: "Access your data from anywhere with low latency and high availability.",
                     link: "/protocol"
                   },
                   {
                     icon: Shield,
                     title: "Advanced Security Protocols",
                     description: "End-to-end encryption and zero-knowledge architecture protect your privacy.",
                     link: "/security"
                   },
                   {
                     icon: Code,
                     title: "Developer Friendly APIs",
                     description: "Integrate seamlessly with our robust and well-documented API endpoints.",
                     link: "/developers"
                   }
                 ].map((item, i) => (
                   <motion.div
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.15, duration: 0.6 }}
                     viewport={{ once: true, amount: 0.5 }}
                     className="p-8 rounded-[2.5rem] bg-zinc-900/30 border border-white/5 flex flex-col items-start text-left group cursor-pointer hover:bg-zinc-900/50 transition-colors"
                     onClick={() => navigate(item.link)}
                   >
                     <item.icon className="w-10 h-10 text-indigo-500 mb-6" />
                     <h3 className="text-2xl font-black mb-3 tracking-tight">{item.title}</h3>
                     <p className="text-zinc-500 text-sm leading-relaxed mb-6 font-light">
                       {item.description}
                     </p>
                     <button className="text-[10px] font-black text-indigo-500 uppercase tracking-widest flex items-center gap-2">
                        Learn More <ArrowUpRight size={14} />
                     </button>
                   </motion.div>
                 ))}
              </div>
           </div>
        </section>


        {/* Footer CTA - Resized & Enhanced with Density Strip */}
        <section className="relative z-10 py-32 px-6 text-center border-t border-white/5 overflow-hidden">
           {/* Subtle Grid Background */}
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

           <div className="max-w-4xl mx-auto relative z-10">
              <h2 className="text-3xl md:text-4xl font-black mb-4 tracking-tighter uppercase italic">Ready to secure?</h2>
              <p className="text-zinc-500 text-xs md:text-sm font-light mb-12 max-w-xl mx-auto leading-relaxed">
                 Join thousands of users who have reclaimed their digital sovereignty. <br className="hidden md:block"/>
                 Initialize your first technical vault in seconds.
              </p>

              <div className="flex flex-col items-center gap-12">
                <button 
                  onClick={() => navigate("/register")}
                  className="bg-indigo-600 text-white px-10 py-5 rounded-full font-black text-lg hover:bg-indigo-500 transition-all hover:scale-105 shadow-2xl shadow-indigo-500/30 flex items-center gap-4 mx-auto"
                >
                   INITIALIZE VAULT
                   <ChevronRight size={20} />
                </button>

                {/* Density Strip */}
                <div className="w-full max-w-2xl py-4 border-y border-white/5 flex items-center justify-around opacity-40">
                   <div className="flex flex-col items-center">
                      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Network Latency</span>
                      <span className="text-[10px] font-mono font-bold text-white">~14ms AVG</span>
                   </div>
                   <div className="flex flex-col items-center border-x border-white/5 px-8">
                      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Encryption Mode</span>
                      <span className="text-[10px] font-mono font-bold text-white">XTS-AES-256</span>
                   </div>
                   <div className="flex flex-col items-center">
                      <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">SLA Guarantee</span>
                      <span className="text-[10px] font-mono font-bold text-white">99.99%</span>
                   </div>
                </div>
              </div>
           </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/5 bg-black py-16 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 text-[10px]">
             <div className="flex items-center gap-2 text-white font-black text-lg">
                <Cloud className="w-5 h-5 text-indigo-500" /> VAULT
             </div>
             <div className="flex gap-10 text-zinc-500 font-bold uppercase tracking-[0.3em]">
                <button onClick={() => navigate("/protocol")} className="hover:text-white transition-colors">Protocol</button>
                <button onClick={() => navigate("/security")} className="hover:text-white transition-colors">Architecture</button>
                <button onClick={() => navigate("/pricing")} className="hover:text-white transition-colors">Pricing</button>
             </div>
             <div className="flex items-center gap-3 text-zinc-700 uppercase font-black tracking-widest font-mono">
                <Code className="w-4 h-4" /> 024_RELEASE
             </div>
          </div>
          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-zinc-800 font-bold text-[9px] tracking-[0.5em] uppercase">
             © {new Date().getFullYear()} VAULT INFRASTRUCTURE GROUP
          </div>
        </footer>
      </div>
    </Layout>
  );
}
