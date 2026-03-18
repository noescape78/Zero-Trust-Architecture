import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Layout from "../components/Layout";
import Sidebar from "../components/layout/Sidebar";

import { useToast } from "../context/ToastContext";
import { useDragAndDrop } from "../hooks";
import { filesAPI, getErrorMessage } from "../services/api";
import { validateFileSize } from "../utils/fileHelpers";
import { formatSize } from "../utils/formatters";
import {
  Upload as UploadIcon, File, Image, FileText,
  X, ShieldCheck, Zap, 
  ChevronRight, Shield
} from "lucide-react";

export default function UploadFile() {
  const navigate = useNavigate();
  const toast = useToast();
  const fileInputRef = useRef(null);

  const [file, setFile] = useState(null);
  const [saveAs, setSaveAs] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadState, setUploadState] = useState('idle'); // idle, uploading, success

  const { isDragging, dragProps } = useDragAndDrop((selectedFile) => {
    handleFileSelect(selectedFile);
  });

  const handleFileSelect = useCallback((selectedFile) => {
    const validation = validateFileSize(selectedFile, 50 * 1024 * 1024);

    if (!validation.valid) {
      toast.error(validation.error);
      return;
    }

    setFile(selectedFile);
    setUploadProgress(0);
    setUploadState('idle');

    if (!saveAs) {
      const nameWithoutExt = selectedFile.name.replace(/\.[^/.]+$/, "");
      setSaveAs(nameWithoutExt);
    }
  }, [saveAs, toast]);

  const handleUpload = async () => {
    if (!file) {
      return;
    }

    const form = new FormData();
    form.append("file", file);
    form.append("saveAs", saveAs || file.name);

    try {
      setLoading(true);
      setUploadState('uploading');
      setUploadProgress(0);

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 5;
        });
      }, 100);

      await filesAPI.uploadFile(form);

      clearInterval(progressInterval);
      setUploadProgress(100);
      setUploadState('success');
      toast.success(`File "${file.name}" uploaded successfully!`);

      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
    } catch (err) {
      const message = getErrorMessage(err);
      toast.error(message);
      setUploadState('idle');
      setUploadProgress(0);
    } finally {
      setLoading(false);
    }
  };

  const clearFile = () => {
    setFile(null);
    setSaveAs("");
    setUploadProgress(0);
    setUploadState('idle');
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getFileIcon = () => {
    if (!file) return <File size={48} className="text-zinc-700" />;
    const ext = file.name.split('.').pop().toLowerCase();
    const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    const docExts = ['doc', 'docx', 'pdf', 'txt', 'rtf'];
    if (imageExts.includes(ext)) return <Image size={48} className="text-pink-500" />;
    if (docExts.includes(ext)) return <FileText size={48} className="text-indigo-400" />;
    return <File size={48} className="text-zinc-400" />;
  };

  return (
    <Layout>
      <div className="flex min-h-screen bg-[#010101] text-white">
        <Sidebar isOpen={true} />

        <main className="flex-1 ml-[280px] p-8 overflow-auto relative z-10 flex flex-col items-center justify-center">
          
          {/* Background Glows */}
          <div className="fixed inset-0 pointer-events-none z-0">
             <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-indigo-900/10 blur-[120px] rounded-full" />
             <div className="absolute bottom-[20%] left-[10%] w-[30%] h-[30%] bg-blue-900/10 blur-[120px] rounded-full" />
          </div>

          <div className="w-full max-w-4xl pt-8 relative z-10">
            {/* Header */}
            <div className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-[9px] font-black text-indigo-400 mb-6 tracking-[0.3em] uppercase italic">
                <Shield size={12} /> Secure_Handshake_Active
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter italic uppercase underline decoration-indigo-500/20 underline-offset-8">
                Initialize Segment.
              </h1>
              <p className="text-zinc-500 font-medium text-lg leading-relaxed max-w-xl mx-auto">
                Deploy your encrypted asset to the decentralized vault. <br />
                Zero-knowledge verification enabled.
              </p>
            </div>

            <div className="grid gap-12 max-w-2xl mx-auto">
              {/* Drop Zone */}
              <AnimatePresence mode="wait">
                {!file ? (
                  <motion.div
                    key="drop-zone"
                    initial={{ opacity: 0, scale: 0.95, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
                    {...dragProps}
                    className={`
                      relative rounded-[3rem] flex flex-col items-center justify-center p-20 text-center transition-all cursor-pointer overflow-hidden border-2
                      ${isDragging
                        ? "border-indigo-500 bg-indigo-500/5 shadow-[0_0_80px_#6366f111]"
                        : "border-dashed border-white/5 bg-zinc-950/40 hover:bg-zinc-900/40 hover:border-white/10"
                      }
                    `}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {/* Animated Ripple Effect when dragging */}
                    {isDragging && (
                       <motion.div 
                         initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
                         className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.05] to-transparent pointer-events-none" 
                       />
                    )}

                    <input
                      ref={fileInputRef}
                      type="file"
                      className="hidden"
                      onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                    />

                    <motion.div 
                      animate={isDragging ? { y: -15, scale: 1.15 } : { y: 0, scale: 1 }}
                      className="w-24 h-24 rounded-[2rem] bg-black border border-white/5 flex items-center justify-center mb-8 relative shadow-2xl"
                    >
                      <motion.div animate={isDragging ? { y: [0, -10, 0] } : {}} transition={{ repeat: Infinity, duration: 1.5 }}>
                        <UploadIcon size={40} className="text-indigo-500 relative z-10" />
                      </motion.div>
                      {/* Scanning Pulse */}
                      <div className="absolute inset-0 rounded-[2rem] border border-indigo-500/50 animate-ping opacity-20" />
                    </motion.div>

                    <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-3">
                       {isDragging ? 'RELEASE_TO_SCAN' : 'DRAG_AND_DROP'}
                    </h3>
                    <p className="text-zinc-600 text-sm mb-10 font-bold uppercase tracking-widest leading-relaxed">
                      Initialize protocol or select segment <br /> from your local terminal.
                    </p>
                    
                    <div className="flex gap-6 opacity-40 group-hover:opacity-100 transition-opacity">
                       <div className="flex items-center gap-2">
                          <ShieldCheck size={14} className="text-indigo-500" />
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">AES-256 Verified</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Zap size={14} className="text-indigo-500" />
                          <span className="text-[9px] font-black text-white uppercase tracking-widest">50MB Max</span>
                       </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="file-selected"
                    initial={{ opacity: 0, scale: 0.95, filter: 'blur(20px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    className="bg-zinc-950/40 backdrop-blur-xl rounded-[3.5rem] border border-white/5 p-10 shadow-2xl relative overflow-hidden"
                  >
                    {/* Background Progress Fill */}
                    <AnimatePresence>
                      {uploadState === 'uploading' && (
                         <motion.div 
                           className="absolute inset-0 bg-indigo-600/5 origin-left"
                           initial={{ scaleX: 0 }}
                           animate={{ scaleX: uploadProgress / 100 }}
                           transition={{ ease: "linear" }}
                           style={{ zIndex: 0 }}
                         />
                      )}
                    </AnimatePresence>

                    <div className="relative z-10">
                      {/* File Card Style Info */}
                      <div className="flex items-center gap-8 mb-10">
                        <div className="w-24 h-24 rounded-[2rem] bg-black border border-white/5 flex items-center justify-center flex-shrink-0 shadow-inner group transition-transform hover:scale-105">
                          {getFileIcon()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                             <h3 className="text-2xl font-black text-white truncate uppercase italic tracking-tighter">
                               {file.name}
                             </h3>
                             {uploadState === 'idle' && (
                               <button
                                 onClick={clearFile}
                                 className="p-3 text-zinc-600 hover:text-red-500 hover:bg-red-500/10 rounded-2xl transition-all border border-transparent hover:border-red-500/20"
                               >
                                 <X size={24} />
                               </button>
                             )}
                          </div>
                          
                          <div className="flex items-center gap-4">
                            <span className="px-3 py-1 bg-white/5 text-zinc-400 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] border border-white/5">
                              {file.name.split('.').pop()}
                            </span>
                            <span className="text-zinc-600 text-xs font-black uppercase tracking-widest">{formatSize(file.size)}</span>
                          </div>
                        </div>
                      </div>

                      {uploadState === 'idle' ? (
                        <div className="space-y-8 pt-10 border-t border-white/5">
                          <div>
                            <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-3">Segment Alias (Optional)</label>
                            <input
                              type="text"
                              placeholder="Name this segment for retrieval"
                              value={saveAs}
                              onChange={(e) => setSaveAs(e.target.value)}
                              className="w-full bg-black border border-white/5 rounded-2xl px-6 py-4 text-white placeholder-zinc-700 focus:outline-none focus:border-indigo-500/50 transition-all font-medium"
                            />
                          </div>

                          <div className="flex items-center gap-4">
                            <button 
                              onClick={clearFile}
                              className="px-10 py-5 rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-600 hover:text-white transition-colors"
                            >
                              DISCARD
                            </button>
                            <button
                              onClick={handleUpload}
                              disabled={loading}
                              className="flex-1 flex items-center justify-center gap-3 py-5 rounded-full bg-white text-black font-black text-sm uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all active:scale-95 shadow-2xl relative group overflow-hidden"
                            >
                               <div className="absolute inset-0 bg-black/5 group-hover:translate-x-full transition-transform duration-1000 -skew-x-12 -ml-4 w-12" />
                               {loading ? 'INITIALIZING...' : 'AUTHORIZE_TRANSFER'}
                               <ChevronRight size={18} />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="pt-10 border-t border-white/5">
                          <div className="flex justify-between items-end mb-4">
                            <div>
                               <p className="text-xl font-black text-white uppercase italic tracking-tighter mb-1">
                                 {uploadState === 'uploading' ? 'ENCRYPTING_SEGMENT...' : 'VAULT_LOCKED.'}
                               </p>
                               <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em]">
                                 {uploadState === 'uploading' ? 'Do not interrupt protocol sequence' : 'Node initialized. Redirecting...'}
                               </p>
                            </div>
                            <span className={`text-4xl font-black italic tracking-tighter ${uploadState === 'success' ? 'text-emerald-500' : 'text-indigo-500'}`}>
                               {uploadProgress}%
                            </span>
                          </div>
                          
                          {/* High-Fidelity Progress Bar */}
                          <div className="h-2 bg-white/5 rounded-full overflow-hidden shadow-inner w-full relative">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${uploadProgress}%` }}
                              className={`absolute top-0 left-0 bottom-0 rounded-full ${
                                uploadState === 'success' ? 'bg-emerald-500 shadow-[0_0_15px_#10b981]' : 'bg-indigo-500 shadow-[0_0_15px_#6366f1]'
                              }`}
                            >
                               {uploadState === 'uploading' && (
                                  <div className="absolute inset-0 bg-white/20 animate-shimmer" />
                               )}
                            </motion.div>
                          </div>
                          
                          {/* Transfer Animation Decoration */}
                          {uploadState === 'uploading' && (
                             <div className="mt-10 flex justify-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                   <motion.div 
                                     key={i}
                                     animate={{ 
                                       opacity: [0.2, 1, 0.2],
                                       scale: [1, 1.2, 1]
                                     }}
                                     transition={{ 
                                       duration: 1, 
                                       repeat: Infinity, 
                                       delay: i * 0.2 
                                     }}
                                     className="w-1.5 h-1.5 rounded-full bg-indigo-500"
                                   />
                                ))}
                             </div>
                          )}

                          {uploadState === 'success' && (
                             <motion.div 
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               className="mt-8 flex justify-center"
                             >
                                <div className="p-4 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500">
                                   <ShieldCheck size={32} />
                                </div>
                             </motion.div>
                          )}
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}
