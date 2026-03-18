import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../components/layout/Sidebar";
import ShareModal from "../components/modals/ShareModal";
import ConfirmModal from "../components/modals/ConfirmModal";
import FileCard, { FileRow } from "../components/ui/FileCard";
import Button from "../components/ui/Button";
import { useFileOperations, useDebounce } from "../hooks";
import { useToast } from "../context/ToastContext";
import { getExpiryStatus, formatSize } from "../utils/formatters";
import { copyToClipboard } from "../utils/clipboard";
import {
  Search, Share2, Trash2,
  Grid3X3, List, Copy, Check,
  Filter, ShieldCheck, HardDrive, Activity, 
  Menu, X, Layers, Globe, Package
} from "lucide-react";


export default function Dashboard() {
  const navigate = useNavigate();
  const toast = useToast();
  const { files, shares, loading, loadAll, deleteFile, revokeShare } = useFileOperations();

  const [activeTab, setActiveTab] = useState("files");
  const [viewMode, setViewMode] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ open: false, type: '', data: null });
  const [copiedId, setCopiedId] = useState(null);

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredFiles = useMemo(() => {
    if (!debouncedSearch) return files;
    return files.filter(f =>
      f.filename.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [files, debouncedSearch]);

  const filteredShares = useMemo(() => {
    if (!debouncedSearch) return shares;
    return shares.filter(s =>
      s.filename.toLowerCase().includes(debouncedSearch.toLowerCase())
    );
  }, [shares, debouncedSearch]);

  useEffect(() => {
    loadAll();

    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('global-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [loadAll]);

  const handleShare = (file) => {
    setSelectedFile(file);
    setShareModalOpen(true);
  };

  const handleDelete = (file) => {
    setConfirmModal({
      open: true,
      type: 'delete',
      data: file
    });
  };

  const handleRevoke = (shareId) => {
    setConfirmModal({
      open: true,
      type: 'revoke',
      data: { shareId }
    });
  };

  const handleConfirmAction = async () => {
    if (confirmModal.type === 'delete') {
      await deleteFile(confirmModal.data.id);
    } else if (confirmModal.type === 'revoke') {
      await revokeShare(confirmModal.data.shareId);
    }
    loadAll();
    setConfirmModal({ open: false, type: '', data: null });
  };

  const handleCopyToken = async (token) => {
    await copyToClipboard(token);
    setCopiedId(token);
    toast.success("Link copied to clipboard");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const tabs = [
    { id: "files", label: "Vault" },
    { id: "shares", label: "Shares" }
  ];

  const storageUsage = files.reduce((acc, f) => acc + f.size, 0);
  const storageLimit = 5 * 1024 * 1024 * 1024; // 5GB
  const storagePercent = Math.min((storageUsage / storageLimit) * 100, 100);

  return (
    <div className="min-h-screen bg-[#010101] text-white flex overflow-hidden font-sans">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-900/10 blur-[150px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/10 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <main className={`flex-1 flex flex-col transition-all duration-300 h-screen relative z-10 ${sidebarOpen ? 'ml-[280px]' : 'ml-[80px]'}`}>
        
        {/* Top Header */}
        <header className="h-[72px] bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-20">
          <div className="flex flex-1 items-center max-w-xl">
             <div className="relative w-full group">
               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                 <Search className="h-4 w-4 text-zinc-500 group-focus-within:text-indigo-500 transition-colors" />
               </div>
               <input
                 id="global-search"
                 type="text"
                 placeholder="Search entries..."
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="block w-full pl-10 pr-12 py-2.5 bg-white/5 border border-white/5 rounded-xl text-sm placeholder-zinc-600 focus:outline-none focus:bg-white/10 focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium text-white"
               />
               <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                 <kbd className="hidden sm:inline-block items-center px-2 py-0.5 rounded border border-white/10 bg-black font-mono text-[9px] font-bold text-zinc-600">
                   ⌘K
                 </kbd>
               </div>
             </div>
          </div>

          <div className="flex items-center gap-4 ml-8">
            <button
               onClick={() => setSidebarOpen(!sidebarOpen)}
               className="p-2 text-zinc-500 hover:text-white transition-colors"
            >
               {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Button
              onClick={() => navigate("/upload")}
              variant="vault"
              className="px-6 rounded-xl"
            >
              INITIALIZE
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 overflow-auto custom-scrollbar p-8">
          
          <div className="max-w-7xl mx-auto">
             {/* Dynamic Heading & Quick Stats */}
             <div className="mb-12">
               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                 <div>
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[8px] font-black text-indigo-500 mb-4 tracking-[0.3em] uppercase italic">
                      <Activity size={10} /> Node_Vault_v2.4
                   </div>
                   <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic underline decoration-indigo-500/30 underline-offset-8 mb-4">
                     {activeTab === 'files' ? 'THE VAULT.' : 'NETWORK HUB.'}
                   </h1>
                   <p className="text-zinc-500 font-medium text-lg max-w-xl leading-relaxed">
                     {activeTab === 'files' 
                        ? `Managing ${files.length} segments of zero-knowledge encrypted assets.` 
                        : `Orchestrating ${shares.length} active protocol distribution points.`}
                   </p>
                 </div>
                 
                 <div className="flex items-center gap-3">
                    <div className="bg-zinc-900/40 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/5 shadow-xl flex items-center gap-4 group">
                       <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20">
                          <HardDrive size={18} className="text-indigo-500" />
                       </div>
                       <div>
                          <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1.5">Sector Occupancy</p>
                          <div className="flex items-center gap-2">
                             <p className="text-sm font-black text-white leading-none tracking-tight">
                                {formatSize(storageUsage)} <span className="text-zinc-600 font-bold text-[10px]">/ 5GB</span>
                             </p>
                             <div className="w-20 h-1 bg-white/5 rounded-full overflow-hidden">
                                <motion.div 
                                  initial={{ width: 0 }}
                                  animate={{ width: `${storagePercent}%` }}
                                  className="h-full bg-indigo-500" 
                                />
                             </div>
                          </div>
                       </div>
                    </div>
                 </div>
               </div>

               {/* Stats Cards Row */}
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { label: 'OBJECTS', value: files.length, icon: Package, color: 'text-indigo-400', bg: 'bg-indigo-400/5' },
                    { label: 'NODES', value: shares.length, icon: Globe, color: 'text-blue-400', bg: 'bg-blue-400/5' },
                    { label: 'TRANSFERS', value: shares.reduce((acc, s) => acc + (s.download_count || 0), 0), icon: Activity, color: 'text-cyan-400', bg: 'bg-cyan-400/5' },
                    { label: 'PROTOCOL', value: 'XTS-256', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-400/5' }
                  ].map((stat, i) => (
                    <motion.div 
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-zinc-900/40 backdrop-blur-md p-6 rounded-[2rem] border border-white/5 shadow-xl hover:border-white/10 transition-all flex items-center gap-5 group"
                    >
                      <div className={`w-14 h-14 rounded-2xl ${stat.bg} flex items-center justify-center border border-white/5 group-hover:bg-white/5 transition-all`}>
                         <stat.icon size={24} className={stat.color} />
                      </div>
                      <div>
                        <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em] mb-1">{stat.label}</p>
                        <h4 className="text-2xl font-black text-white italic tracking-tighter leading-none">{stat.value}</h4>
                      </div>
                    </motion.div>
                  ))}
               </div>
             </div>

             {/* Controls Row */}
             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 border-t border-white/5 pt-8">
                
                {/* Framer Motion Animated Tabs */}
                <div className="flex items-center p-1.5 bg-white/5 rounded-xl border border-white/5">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-6 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] rounded-lg transition-colors z-10 ${
                        activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-white'
                      }`}
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="dashboardTab"
                          className={`absolute inset-0 rounded-md -z-10 ${
                            tab.id === 'files' ? 'bg-indigo-600' : 'bg-blue-600'
                          }`}
                          transition={{ type: "spring", stiffness: 500, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* View Toggles & Filters */}
                {activeTab === 'files' && (
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 bg-white/5 border border-white/5 rounded-xl hover:text-white hover:bg-white/10 transition-all">
                       <Filter size={14} /> FILTER
                    </button>
                    <div className="flex items-center bg-white/5 p-1 rounded-xl border border-white/5">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-lg transition-all z-10 relative ${
                          viewMode === "grid" ? 'text-indigo-500 bg-white/10' : 'text-zinc-600 hover:text-white'
                        }`}
                      >
                        <Grid3X3 size={16} className="relative z-10" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-lg transition-all z-10 relative ${
                          viewMode === "list" ? 'text-indigo-500 bg-white/10' : 'text-zinc-600 hover:text-white'
                        }`}
                      >
                        <List size={16} className="relative z-10" />
                      </button>
                    </div>
                  </div>
                )}
             </div>

             {/* Content Area Details */}
             <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="flex flex-col justify-center items-center py-32"
                  >
                    <div className="w-16 h-16 border-4 border-indigo-900 border-t-indigo-500 rounded-full animate-spin mb-6 shadow-[0_0_20px_#6366f133]" />
                    <p className="text-zinc-500 font-black uppercase tracking-[0.3em] text-[10px]">Accessing Vault Segments...</p>
                  </motion.div>
                ) : activeTab === 'files' ? (
                  <motion.div
                    key="files-view"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {filteredFiles.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-24 px-4 mt-8 bg-zinc-900/20 backdrop-blur-sm rounded-[3rem] border-2 border-dashed border-white/5 overflow-hidden relative group">
                        <div className="absolute inset-0 bg-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity blur-[100px]" />
                        <div className="w-24 h-24 rounded-[2rem] bg-white/5 flex items-center justify-center mb-8 shadow-inner border border-white/5">
                          <Layers size={40} className="text-zinc-700 group-hover:text-indigo-500 transition-colors" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">
                          {searchQuery ? "SEGMENT_NOT_FOUND" : "VAULT_EMPTY"}
                        </h3>
                        <p className="text-zinc-600 font-medium mb-10 max-w-sm text-center text-sm leading-relaxed uppercase tracking-widest opacity-80">
                          {searchQuery 
                            ? "Protocol could not locate matching data segments." 
                            : "Initialize your first technical vault to secure your assets."
                          }
                        </p>
                        <Button 
                          onClick={() => navigate("/upload")} 
                          className="bg-indigo-600 text-white hover:bg-indigo-500 font-black text-[10px] uppercase tracking-[0.3em] px-10 py-4 rounded-full shadow-lg shadow-indigo-500/20"
                        >
                          INITIALIZE SEGMENT
                        </Button>
                      </div>
                    ) : viewMode === 'grid' ? (
                      <motion.div 
                        initial="hidden"
                        animate="show"
                        variants={{
                          hidden: { opacity: 0 },
                          show: { opacity: 1, transition: { staggerChildren: 0.05 } }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8"
                      >
                        {filteredFiles.map((file, i) => (
                           <motion.div key={file.id} variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
                             <FileCard file={file} index={i} onShare={handleShare} onDelete={handleDelete} />
                           </motion.div>
                        ))}
                      </motion.div>
                    ) : (
                      <div className="bg-zinc-900/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-12 gap-4 text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] bg-white/5 px-8 py-5 border-b border-white/5">
                           <div className="col-span-6">SEGMENT_NAME</div>
                           <div className="col-span-2">SIZE</div>
                           <div className="col-span-3">TIMESTAMP</div>
                           <div className="col-span-1"></div>
                        </div>
                        <div className="divide-y divide-white/5">
                           {filteredFiles.map((file, i) => (
                             <FileRow key={file.id} file={file} index={i} onShare={handleShare} onDelete={handleDelete} />
                           ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <motion.div
                    key="shares-view"
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {filteredShares.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-24 px-4 mt-8 bg-zinc-900/20 backdrop-blur-sm rounded-[3rem] border-2 border-dashed border-white/5 overflow-hidden relative group">
                         <div className="absolute inset-0 bg-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity blur-[100px]" />
                        <div className="w-24 h-24 rounded-[2.5rem] bg-white/5 flex items-center justify-center mb-8 border border-white/5">
                          <Globe size={40} className="text-zinc-700 group-hover:text-blue-500 transition-colors" />
                        </div>
                        <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter mb-4">NO_ACTIVE_NODES</h3>
                        <p className="text-zinc-600 font-medium mb-10 max-w-sm text-center text-sm leading-relaxed uppercase tracking-widest opacity-80">
                          Select a vault segment and deploy to the network to initiate a public node.
                        </p>
                        <Button 
                          onClick={() => setActiveTab('files')} 
                          className="bg-blue-600 text-white hover:bg-blue-500 font-black text-[10px] uppercase tracking-[0.3em] px-10 py-4 rounded-full shadow-lg shadow-blue-500/20"
                        >
                          DEPLOY NODE
                        </Button>
                      </div>
                    ) : (
                      <div className="bg-zinc-900/40 backdrop-blur-md rounded-[2.5rem] border border-white/5 overflow-hidden shadow-2xl">
                        <div className="grid grid-cols-12 gap-6 text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em] bg-white/5 px-8 py-5 border-b border-white/5">
                          <div className="col-span-4 lg:col-span-5">ENTRY_PROTOCOL</div>
                          <div className="col-span-5 lg:col-span-4">ACCESS_TOKEN</div>
                          <div className="col-span-2">LATENCY</div>
                          <div className="col-span-1"></div>
                        </div>
                        <div className="divide-y divide-white/5">
                          {filteredShares.map((share, i) => {
                            const expiryStatus = getExpiryStatus(share.expires_at);
                            return (
                              <motion.div
                                key={share.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                className="grid grid-cols-12 gap-6 items-center px-8 py-6 hover:bg-white/5 transition-colors group"
                              >
                                <div className="col-span-4 lg:col-span-5 flex items-center gap-5">
                                  <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:bg-blue-600/10">
                                    <Share2 size={22} className="text-blue-500" />
                                  </div>
                                  <div className="min-w-0">
                                     <span className="text-sm font-black text-white uppercase italic tracking-tighter block mb-1">
                                       {share.filename}
                                     </span>
                                     <span className="text-[9px] font-black flex items-center gap-2 uppercase tracking-widest">
                                        {expiryStatus === 'Expired' ? (
                                           <span className="text-red-500 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-500" /> OFFLINE</span>
                                        ) : (
                                           <span className="text-emerald-500 flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> LIVE_ACCESS</span>
                                        )}
                                     </span>
                                  </div>
                                </div>

                                <div className="col-span-5 lg:col-span-4 flex items-center gap-3">
                                  <div className="relative flex-1 group/link">
                                    <code className="block w-full text-[10px] font-mono font-bold text-blue-400 bg-white/5 px-5 py-3 rounded-xl truncate border border-white/5">
                                      {share.token.substring(0, 24)}...
                                    </code>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                      <button
                                        onClick={() => handleCopyToken(share.token)}
                                        className={`p-1.5 rounded-lg transition-all ${copiedId === share.token ? 'text-emerald-400' : 'hover:scale-110 text-blue-500'}`}
                                      >
                                        {copiedId === share.token ? <Check size={16} /> : <Copy size={16} />}
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                <div className="col-span-2">
                                  <div className="flex flex-col gap-2">
                                    <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest">
                                       <span className="text-white">{share.download_count}</span>
                                       <span className="text-zinc-600">LIMIT: {share.download_limit || 'INF'}</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                      <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(share.download_count / (share.download_limit || Math.max(10, share.download_count + 1))) * 100}%` }}
                                        className="h-full bg-blue-500"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="col-span-1 flex justify-end">
                                  <button
                                    onClick={() => handleRevoke(share.id)}
                                    className="p-3 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-xl transition-all border border-transparent hover:border-red-500/20 opacity-0 group-hover:opacity-100"
                                    title="DISCONNECT"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </motion.div>
                )}
             </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Modals */}
      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => {
          setShareModalOpen(false);
          setSelectedFile(null);
        }}
        file={selectedFile}
        onSuccess={() => loadAll()}
      />

      <ConfirmModal
        isOpen={confirmModal.open}
        onClose={() => setConfirmModal({ open: false, type: '', data: null })}
        onConfirm={handleConfirmAction}
        title={confirmModal.type === 'delete' ? 'PURGE_ENTRY' : 'DISCONNECT_NODE'}
        message={confirmModal.type === 'delete'
          ? `Initiating permanent erasure of sequence "${confirmModal.data?.filename}". This protocol is non-reversible.`
          : 'Are you sure you want to disconnect this node? Public access will be instantly terminated.'
        }
        confirmText={confirmModal.type === 'delete' ? 'AUTHORIZE_PURGE' : 'AUTHORIZE_DISCONNECT'}
        variant="danger"
      />
    </div>
  );
}
