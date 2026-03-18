import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, Shield, Bell, 
  ChevronRight, Save, Lock, 
  Trash2, LogOut, Zap, 
  ShieldCheck, Activity, Globe
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import Button from '../components/ui/Button';
import Sidebar from '../components/layout/Sidebar';

export default function Settings() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      toast.success("Profile updated successfully (Simulation)");
    }, 1000);
  };

  const sections = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="min-h-screen bg-[#010101] text-white flex overflow-hidden font-sans">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <main className={`flex-1 flex flex-col transition-all duration-300 h-screen relative z-10 ${sidebarOpen ? 'ml-[280px]' : 'ml-[80px]'}`}>
        <header className="h-[72px] bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex items-center gap-4">
             <h2 className="text-xl font-black tracking-tighter uppercase italic">Control_Center</h2>
             <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none">Status: Encrypted</span>
            <div className="w-px h-10 bg-white/5 mx-2" />
            <button
               onClick={logout}
               className="p-2 text-zinc-500 hover:text-red-500 transition-colors"
            >
               <LogOut size={20} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto custom-scrollbar p-8">
          <div className="max-w-4xl mx-auto">
            
            {/* Header Section */}
            <div className="mb-12">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[8px] font-black text-indigo-500 mb-4 tracking-[0.3em] uppercase italic">
                  <Shield size={10} /> SECURITY_PROTOCOL_v4.1
               </div>
               <h1 className="text-5xl font-black text-white tracking-tighter uppercase italic mb-4 underline decoration-indigo-500/30 underline-offset-8">
                 Settings<span className="text-indigo-500">.</span>
               </h1>
               <p className="text-zinc-500 font-medium text-lg max-w-xl leading-relaxed">
                 Configure your node parameters and security authorization levels.
               </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
              {/* Tabs Sidebar */}
              <div className="w-full lg:w-64 space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveTab(section.id)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl border transition-all duration-300 group ${
                      activeTab === section.id 
                      ? 'bg-white/5 border-indigo-500/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.05)]' 
                      : 'border-transparent text-zinc-600 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <section.icon size={18} className={`transition-colors ${activeTab === section.id ? 'text-indigo-500' : 'group-hover:text-indigo-400'}`} />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em]">{section.label}</span>
                    {activeTab === section.id && <ChevronRight size={14} className="ml-auto text-indigo-500" />}
                  </button>
                ))}
              </div>

              {/* Content Panels */}
              <div className="flex-1">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-zinc-900/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 p-8 shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[60px] rounded-full" />
                  
                  {activeTab === 'account' && (
                    <form onSubmit={handleUpdateProfile} className="space-y-8">
                      <div>
                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-6 flex items-center gap-3">
                          <User size={20} className="text-indigo-500" /> Account_Identity
                        </h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-4">Node_Name</label>
                              <input 
                                type="text" 
                                value={formData.username}
                                onChange={(e) => setFormData({...formData, username: e.target.value})}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all text-white"
                              />
                           </div>
                           <div className="space-y-2">
                              <label className="text-[10px] font-black text-zinc-600 uppercase tracking-widest pl-4">Communication_Channel</label>
                              <input 
                                type="email" 
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-white/5 border border-white/5 rounded-2xl px-6 py-4 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition-all text-white"
                              />
                           </div>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-white/5 text-right">
                        <Button 
                          type="submit" 
                          loading={loading}
                          variant="vault"
                          className="px-10 py-4 rounded-full"
                          icon={Save}
                        >
                          UPDATE_IDENTITY
                        </Button>
                      </div>
                    </form>
                  )}

                  {activeTab === 'security' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-xl font-black text-white italic tracking-tighter uppercase mb-6 flex items-center gap-3">
                          <Lock size={20} className="text-indigo-500" /> Encryption_Protocols
                        </h3>
                        
                        <div className="space-y-6">
                           <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex items-center justify-between group">
                              <div className="flex items-center gap-4">
                                 <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                                    <ShieldCheck size={24} className="text-indigo-500" />
                                 </div>
                                 <div>
                                    <p className="font-black text-sm uppercase italic tracking-tighter text-white">XTS-256 Protection</p>
                                    <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Active & Verified</p>
                                 </div>
                              </div>
                              <div className="flex items-center gap-2">
                                 <div className="w-2 h-2 rounded-full bg-emerald-500" />
                                 <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">ENABLED</span>
                              </div>
                           </div>
                           
                           <div className="space-y-4">
                              <Button 
                                variant="outline" 
                                className="w-full justify-between px-8 py-5 border-white/10 text-white hover:bg-white/5 rounded-2xl group"
                              >
                                <span className="text-[10px] font-black uppercase tracking-widest">Reset_Access_Token</span>
                                <ChevronRight size={14} className="text-zinc-600 group-hover:text-white transition-all group-hover:translate-x-1" />
                              </Button>
                           </div>
                        </div>
                      </div>

                      <div className="pt-8 border-t border-white/5">
                        <h4 className="text-red-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Danger_Sector</h4>
                        <button className="flex items-center gap-4 text-zinc-600 hover:text-red-500 transition-colors p-2">
                           <Trash2 size={16} />
                           <span className="text-[10px] font-black uppercase tracking-widest">Purge_Node_Permanently</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {activeTab === 'notifications' && (
                    <div className="py-20 text-center">
                       <Bell size={48} className="text-zinc-800 mx-auto mb-6" />
                       <h3 className="text-xl font-black text-zinc-700 uppercase italic tracking-widest">Signal_Logic_Coming_Soon</h3>
                       <p className="text-[10px] font-black text-zinc-800 uppercase tracking-[0.4em] mt-4">Protocol in development</p>
                    </div>
                  )}
                </motion.div>
                
                {/* Visual Decorative Widget */}
                <div className="mt-8 grid grid-cols-3 gap-6">
                   {[
                     { label: 'Latency', value: '4ms', icon: Activity, color: 'text-indigo-400' },
                     { label: 'Network', value: 'Global', icon: Globe, color: 'text-blue-400' },
                     { label: 'IO_OPS', value: '1.2k', icon: Zap, color: 'text-cyan-400' }
                   ].map((stat) => (
                     <div key={stat.label} className="bg-zinc-900/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 flex items-center gap-4">
                        <stat.icon size={16} className={stat.color} />
                        <div>
                           <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                           <p className="text-xs font-black text-white italic leading-none">{stat.value}</p>
                        </div>
                     </div>
                   ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
