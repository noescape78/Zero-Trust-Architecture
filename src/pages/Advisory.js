import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { 
  Shield, Terminal, 
  ChevronRight, ArrowLeft, MessageSquare,
  Users, Briefcase, Zap
} from "lucide-react";
import Button from "../components/ui/Button";

export default function Advisory() {
  const navigate = useNavigate();

  const services = [
    {
      title: "CRYPTO_ORCHESTRATION",
      description: "Custom enterprise-grade encryption architecture tailored for high-compliance environments.",
      icon: Shield,
      color: "text-indigo-500"
    },
    {
      title: "ZERO_TRUST_SCALING",
      description: "Seamlessly scale your data infrastructure without compromising on security or sovereignty.",
      icon: Zap,
      color: "text-blue-500"
    },
    {
      title: "TECHNICAL_AUDIT",
      description: "Comprehensive audits of your current deployment to ensure protocol-level integrity.",
      icon: Terminal,
      color: "text-emerald-500"
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-[#010101] text-white selection:bg-indigo-500 selection:text-white font-sans relative overflow-hidden">
        
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-full h-[600px] bg-indigo-600/[0.04] blur-[150px] rounded-full" />
          <div className="absolute bottom-0 left-0 w-full h-[600px] bg-emerald-600/[0.04] blur-[150px] rounded-full" />
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
                 className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[9px] font-black text-indigo-500 mb-6 tracking-[0.4em] uppercase"
               >
                  <Briefcase size={12} /> ENTERPRISE_SOLUTIONS
               </motion.div>
               <motion.h1 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.1 }}
                 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-8 leading-[0.9]"
               >
                 EXPERT <br />
                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-emerald-500">ADVISORY.</span>
               </motion.h1>
               <motion.p 
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ delay: 0.2 }}
                 className="text-zinc-500 text-lg md:text-xl font-light leading-relaxed"
               >
                 Collaborate directly with our cryptographic engineers to build the next generation of secure data infrastructure.
               </motion.p>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
               {services.map((service, i) => (
                 <motion.div 
                   key={service.title}
                   initial={{ opacity: 0, y: 30 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ delay: i * 0.1 }}
                   viewport={{ once: true }}
                   className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 backdrop-blur-xl group hover:bg-zinc-900/60 transition-all cursor-default"
                 >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                       <service.icon size={26} className={service.color} />
                    </div>
                    <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-4">{service.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed font-light tracking-wide">{service.description}</p>
                 </motion.div>
               ))}
            </div>

            {/* Consulting Process */}
            <div className="grid lg:grid-cols-2 gap-12 items-center mb-32">
               <div className="relative h-[400px] bg-zinc-900/20 rounded-[4rem] border border-white/5 overflow-hidden flex items-center justify-center group">
                  <div className="absolute inset-0 bg-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity blur-[80px]" />
                  <div className="relative z-10 flex flex-col items-center gap-8">
                     <div className="flex -space-x-4">
                        {[...Array(4)].map((_, i) => (
                           <div key={i} className="w-16 h-16 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden">
                              <Users size={24} className="text-zinc-600" />
                           </div>
                        ))}
                     </div>
                     <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.4em]">Integrated Intelligence</span>
                  </div>
               </div>
               
               <div className="p-8 md:p-12">
                  <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter mb-8 italic underline decoration-indigo-500/20 underline-offset-8">Engagement_Model</h2>
                  <div className="space-y-10">
                     {[
                        { step: "01", title: "Infrastructural Analysis", text: "We identify potential vulnerabilities and scaling bottlenecks in your data layer." },
                        { step: "02", title: "Protocol Design", text: "Mapping the zero-knowledge requirements to your specific business logic." },
                        { step: "03", title: "Continuous Oversight", text: "Ongoing technical guidance as your secure network evolves." }
                     ].map((item) => (
                        <div key={item.step} className="flex gap-8 group">
                           <span className="text-2xl font-black text-zinc-800 group-hover:text-indigo-500/50 transition-colors uppercase italic leading-none">{item.step}</span>
                           <div className="space-y-2">
                              <h4 className="text-[11px] font-black text-white uppercase tracking-widest leading-none">{item.title}</h4>
                              <p className="text-sm text-zinc-600 font-light leading-relaxed">{item.text}</p>
                           </div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>

            {/* Final CTA */}
            <div className="bg-zinc-900/40 rounded-[4rem] border border-white/5 p-12 md:p-24 text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-[100px]" />
               
               <div className="relative z-10 max-w-2xl mx-auto">
                  <div className="w-20 h-20 rounded-[2rem] bg-indigo-600 flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-indigo-500/20 group-hover:scale-110 transition-transform">
                     <MessageSquare className="text-white" size={32} />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-6">Initiate_Consult</h2>
                  <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12">
                     Ready to orchestrate your enterprise vault? Connect with our engineering lead to discuss your requirements.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                     <Button 
                       onClick={() => {}}
                       variant="vault"
                       className="px-12 py-5 rounded-full"
                       icon={ChevronRight}
                       iconPosition="right"
                     >
                       TALK_TO_ENGINEER
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
          </div>
        </main>
      </div>
    </Layout>
  );
}
