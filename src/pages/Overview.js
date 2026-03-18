import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import { 
  Shield, 
  ArrowLeft, Terminal, 
  Mail, LifeBuoy, MessageSquare,
  Users, Briefcase, Network
} from "lucide-react";

const DirectoryCard = ({ title, items, icon: Icon }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className="bg-zinc-900/40 border border-white/5 p-10 rounded-[2.5rem] hover:bg-zinc-900/60 transition-all group"
  >
    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 mb-8 group-hover:scale-110 transition-transform">
      <Icon size={24} />
    </div>
    <h3 className="text-2xl font-black mb-6 tracking-tight uppercase italic">{title}</h3>
    <ul className="space-y-4">
      {items.map((item, i) => (
        <li key={i} className="flex items-center gap-2 group/item cursor-pointer">
          <span className="text-zinc-600 text-[10px] font-black group-hover/item:text-indigo-500 transition-colors">0{i+1} /</span>
          <span className="text-sm font-bold text-zinc-400 group-hover/item:text-white transition-colors">{item}</span>
        </li>
      ))}
    </ul>
  </motion.div>
);

export default function Overview() {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="min-h-screen bg-[#010101] text-white selection:bg-indigo-500 relative overflow-hidden flex flex-col pt-24 pb-20 px-6">
        
        {/* Abstract Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 blur-[150px] pointer-events-none rounded-full" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 blur-[150px] pointer-events-none rounded-full" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <button 
            onClick={() => navigate("/")}
            className="group flex items-center gap-2 text-zinc-500 hover:text-white transition-all text-xs font-black uppercase tracking-[0.2em] mb-12"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Headquarters
          </button>

          <header className="max-w-4xl mb-20">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[10px] font-black text-indigo-400 mb-6 tracking-[0.3em] uppercase italic">
              <Network className="w-4 h-4" />
              Comprehensive Directory v1.0
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[0.9] mb-8">
              THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-600">NEXUS HUB.</span>
            </h1>
            <p className="text-zinc-500 text-lg font-light leading-relaxed max-w-2xl">
              Access the complete architecture of CloudVault. From deep-level documentation to 24/7 technical support.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
            <DirectoryCard 
              title="Support"
              icon={LifeBuoy}
              items={["Help Center", "Technical Support", "Status Board", "Priority Ticket"]}
            />
            <DirectoryCard 
              title="Developers"
              icon={Terminal}
              items={["API Documentation", "SDK Downloads", "System Architecture", "Webhooks"]}
            />
            <DirectoryCard 
              title="Company"
              icon={Briefcase}
              items={["Mission & Values", "Careers", "Security Audits", "Brand Assets"]}
            />
            <DirectoryCard 
              title="Compliance"
              icon={Shield}
              items={["GDPR & ISO", "User Privacy", "Data Sovereignty", "Service Level"]}
            />
            <DirectoryCard 
              title="Community"
              icon={Users}
              items={["Developer Forum", "Twitter Updates", "Discord Infrastructure", "Open Source"]}
            />
            <DirectoryCard 
              title="Contact"
              icon={Mail}
              items={["General Inquiries", "Press Relations", "Sales Department", "Bug Bounty"]}
            />
          </div>

          {/* Interactive Status Card - Scaled Down & Enhanced */}
          <section className="bg-indigo-600 rounded-[2.5rem] p-10 md:p-14 relative overflow-hidden group shadow-2xl shadow-indigo-600/30">
             <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/10 blur-[80px] rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform" />
             <div className="relative z-10 flex flex-col lg:row items-center justify-between gap-10">
                <div className="text-left flex-1">
                   <div className="flex items-center gap-3 mb-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_15px_rgba(52,211,153,0.5)]" />
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">Systems Operational</span>
                   </div>
                   <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Need immediate help?</h2>
                   <p className="text-white/60 text-sm max-w-sm mb-8 leading-relaxed">Our global team is distributed across 12 timezones to provide 24/7/365 coverage with sub-5m response times.</p>
                   
                   {/* Advanced Button */}
                   <button className="group/btn relative overflow-hidden bg-white text-indigo-600 px-8 py-4 rounded-full font-black text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center gap-3 shadow-xl">
                      <span className="relative z-10">Start Technical Consult</span>
                      <div className="relative z-10 w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center group-hover/btn:rotate-12 transition-transform">
                         <MessageSquare size={14} className="text-white" />
                      </div>
                      <div className="absolute inset-0 bg-indigo-50 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
                   </button>
                </div>
                
                <div className="grid grid-cols-2 gap-4 w-full max-w-[320px]">
                   {[
                     { l: "US EAST", s: "UP" },
                     { l: "EU WEST", s: "UP" },
                     { l: "ASIA SOUTH", s: "UP" },
                     { l: "AU NORTH", s: "UP" }
                   ].map((node, i) => (
                     <div key={i} className="bg-black/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex flex-col items-center">
                        <div className="text-[8px] font-black text-white/40 mb-1">{node.l}</div>
                        <div className="text-lg font-black text-white">{node.s}</div>
                     </div>
                   ))}
                </div>
             </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}
