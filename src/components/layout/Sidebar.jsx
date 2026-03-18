import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, Share2, LogOut,
  Settings, Home, Clock,
  Trash2, User,
  Cloud, ChevronRight, Zap,
  Shield
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

/**
 * Sidebar Component - Redesigned for "Vault" Aesthetic
 * Matches the dark, premium Home page theme.
 */
export default function Sidebar({ isOpen = true, onToggle }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Vault' },
    { path: '/recent', icon: Clock, label: 'History' },
    { path: '/shared', icon: Share2, label: 'Network' },
    { path: '/starred', icon: Shield, label: 'Protected' },
  ];

  const secondaryItems = [
    { path: '/trash', icon: Trash2, label: 'Terminal' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.aside
      initial={false}
      animate={{ width: isOpen ? 280 : 80 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-0 h-screen bg-[#010101] border-r border-white/5 flex flex-col z-40"
    >
      {/* Dynamic Glow Effect */}
      <div className="absolute top-0 left-0 w-full h-32 bg-indigo-600/5 blur-[100px] pointer-events-none" />

      {/* Logo Area */}
      <div className="p-6 h-20 flex items-center relative z-10 border-b border-white/5">
        <div 
          className="flex items-center gap-4 cursor-pointer group" 
          onClick={() => navigate('/dashboard')}
        >
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-indigo-500/20 relative overflow-hidden transition-transform active:scale-90">
             <div className="absolute inset-0 bg-white/10 group-hover:translate-x-full transition-transform duration-700 ease-in-out -skew-x-12 -ml-4 w-8" />
             <Cloud className="w-5 h-5 text-white relative z-10" />
          </div>
          
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <h1 className="text-xl font-black tracking-tighter text-white uppercase italic">
                  Vault<span className="text-indigo-500">.</span>
                </h1>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Upload Button - Home Style */}
      <div className="p-5 relative z-10">
        <button
          onClick={() => navigate('/upload')}
          className={`
            w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white text-black font-black text-[10px] uppercase tracking-[0.2em]
            hover:bg-zinc-200 transition-all active:scale-95 shadow-xl shadow-white/5 group relative overflow-hidden
            ${!isOpen && 'px-0 justify-center aspect-square rounded-xl'}
          `}
        >
          <Upload size={isOpen ? 14 : 18} className="relative z-10" />
          {isOpen && <span className="relative z-10">Initialize</span>}
          
          {/* Scan Effect */}
          <motion.div 
            animate={{ x: ["-100%", "100%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-1/2 bg-gradient-to-r from-transparent via-black/5 to-transparent skew-x-12 pointer-events-none"
          />
        </button>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 px-4 space-y-2 overflow-y-auto custom-scrollbar relative z-10 mt-2">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                relative flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group overflow-hidden
                ${isActive
                  ? 'text-white'
                  : 'text-zinc-500 hover:text-white'
                }
              `}
            >
              {({ isActive }) => (
                <>
                  {/* Active Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavBg"
                      className="absolute inset-0 bg-white/5 border border-white/5 rounded-xl z-0"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  
                  <div className="relative z-10 flex items-center gap-4 w-full">
                    <item.icon size={18} className={`transition-all duration-300 ${isActive ? 'text-indigo-500 scale-110' : 'text-zinc-600 group-hover:text-indigo-400'}`} />
                    {isOpen && (
                      <span className="flex-1 text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                    )}
                    {isActive && isOpen && (
                       <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
                    )}
                  </div>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="my-6 mx-4 border-t border-white/5" />

        <nav className="space-y-1">
          {secondaryItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `
                flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group
                ${isActive
                  ? 'bg-white/5 text-white'
                  : 'text-zinc-600 hover:text-white'
                }
              `}
            >
              <item.icon size={18} className="transition-colors group-hover:text-indigo-400" />
              {isOpen && (
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Tech Status Widget */}
      {isOpen && (
        <div className="px-5 mb-4 relative z-10">
          <div className="p-4 rounded-2xl bg-zinc-900/40 border border-white/5 backdrop-blur-md relative overflow-hidden group">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={12} className="text-indigo-500" />
              <span className="text-[8px] font-black text-zinc-500 uppercase tracking-widest">Protocol Active</span>
            </div>
            
            <div className="flex items-end justify-between mb-2">
               <span className="text-xl font-black text-white leading-none tracking-tighter uppercase italic">2.4<span className="text-[8px] text-zinc-600 font-bold ml-1 tracking-widest">GB_SEGMENT</span></span>
            </div>
            
            <div className="h-1 bg-white/5 rounded-full overflow-hidden mt-3">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '16%' }}
                className="h-full bg-indigo-500 relative" 
              >
                <div className="absolute inset-0 bg-white/20 animate-shimmer" />
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* User Session Footer */}
      <div className="p-4 border-t border-white/5 bg-black relative z-10">
        <div className={`flex items-center gap-3 ${!isOpen && 'justify-center'} group cursor-pointer bg-white/[0.02] border border-white/5 hover:bg-white/5 p-2.5 rounded-2xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.02)]`}>
          <div className="w-10 h-10 rounded-[14px] bg-zinc-900 border border-white/10 flex items-center justify-center flex-shrink-0 p-0.5 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110 group-hover:border-indigo-500/30 shadow-inner">
            {user?.avatar ? (
              <img src={user.avatar} alt={user.username} className="w-full h-full rounded-lg object-cover" />
            ) : (
              <div className="w-full h-full rounded-lg bg-indigo-600/5 flex items-center justify-center">
                 <User size={18} className="text-zinc-600 group-hover:text-indigo-400 transition-colors" />
              </div>
            )}
          </div>
          
          {isOpen && (
            <div className="flex-1 min-w-0">
               <div className="flex items-center gap-1.5 mb-0.5">
                  <p className="text-[11px] font-black text-white uppercase italic tracking-tight truncate">{user?.username || 'Root_Node'}</p>
                  <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
               </div>
               <p className="text-[7.5px] font-bold text-zinc-600 uppercase tracking-[0.2em] flex items-center gap-1.5">
                  <Shield size={7} className="text-indigo-500/50" /> Verified Hub
               </p>
            </div>
          )}
          
          {isOpen && (
            <div className="opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
              <ChevronRight size={12} className="text-zinc-500" />
            </div>
          )}
        </div>
        
        {isOpen ? (
          <div className="flex gap-2 mt-4 px-1">
             <button
               onClick={() => navigate('/settings')}
               className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/5 text-zinc-500 hover:text-white hover:bg-indigo-600/10 rounded-xl transition-all border border-white/5 hover:border-indigo-500/30 text-[9px] font-black uppercase tracking-widest shadow-xl shadow-black group/settings"
             >
               <Settings size={12} className="group-hover/settings:rotate-90 transition-transform duration-500" />
               Settings
             </button>
             <button
               onClick={handleLogout}
               className="flex items-center justify-center p-2.5 bg-zinc-900/50 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-white/5 hover:border-red-500/20 group/logout"
               title="Disconnect"
             >
               <LogOut size={14} className="group-hover/logout:translate-x-0.5 transition-transform" />
             </button>
          </div>
        ) : (
          <button
            onClick={handleLogout}
            className="mt-4 w-full flex justify-center p-3 text-zinc-700 hover:text-red-500 transition-colors"
          >
            <LogOut size={20} />
          </button>
        )}
      </div>
    </motion.aside>
  );
}
