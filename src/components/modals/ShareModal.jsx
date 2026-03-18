import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Clock, Download, Copy, Check, File, Info, Sparkles, Shield, ChevronRight } from 'lucide-react';
import Modal from '../ui/Modal';

import { filesAPI, getErrorMessage } from '../../services/api';
import { useToast } from '../../context/ToastContext';
import { copyToClipboard } from '../../utils/clipboard';
import { EXPIRATION_OPTIONS, DOWNLOAD_LIMIT_OPTIONS } from '../../constants';
import Input from '../ui/Input';

/**
 * ShareModal - Redesigned for Dark Premium Theme
 */
export default function ShareModal({ isOpen, onClose, file, onSuccess }) {
  const [password, setPassword] = useState('');
  const [expiresIn, setExpiresIn] = useState(null);
  const [downloadLimit, setDownloadLimit] = useState(10);
  const [loading, setLoading] = useState(false);
  const [shareResult, setShareResult] = useState(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const toast = useToast();

  const handleCreateShare = async () => {
    if (!password || password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const { data } = await filesAPI.createShare(file.id, {
        password,
        expiresInHours: expiresIn,
        downloadLimit
      });

      setShareResult(data);
      toast.success('Share link successfully generated');
      if (onSuccess) onSuccess(data);
    } catch (err) {
      const message = getErrorMessage(err);
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyLink = async () => {
    if (shareResult?.token) {
      const fullLink = `${window.location.origin}/receive?token=${shareResult.token}`;
      await copyToClipboard(fullLink);
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setPassword('');
    setExpiresIn(null);
    setDownloadLimit(10);
    setShareResult(null);
    setError('');
    onClose();
  };

  const handleGeneratePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let newPassword = '';
    for (let i = 0; i < 12; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(newPassword);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="DEPLOY_NODE"
      size="md"
    >
      <div className="space-y-10">
        {/* File Box - Dark Premium */}
        <div className="flex items-center gap-6 p-6 rounded-[2rem] bg-black border border-white/5 relative overflow-hidden group">
          <div className="absolute inset-0 bg-indigo-500/[0.03] opacity-0 group-hover:opacity-100 transition-opacity blur-[40px] pointer-events-none" />
          <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-105">
            <File size={28} className="text-indigo-500" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-black text-white truncate uppercase italic tracking-tight mb-1">{file?.filename}</p>
            <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
               <Shield size={10} className="text-indigo-500" /> SECURE_SEGMENT
            </p>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!shareResult ? (
            <motion.div
              key="share-form"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <div className="relative">
                  <Input
                    label="Access Password"
                    type="password"
                    variant="vault"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={Lock}
                    showPasswordToggle={true}
                    placeholder="Min 6 characters required"
                    error={error}
                  />
                  <div className="absolute right-0 top-0 pt-0.5 pr-1">
                     <button
                        type="button"
                        onClick={handleGeneratePassword}
                        className="text-[9px] font-black text-indigo-500 hover:text-white flex items-center gap-1.5 uppercase tracking-widest transition-colors"
                      >
                        <Sparkles size={10} />
                        Auto-Gen
                     </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 pt-2">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-1">TTL_PROTOCOL</label>
                    <div className="relative group">
                      <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 z-10" size={16} />
                      <select
                        value={expiresIn || ''}
                        onChange={(e) => setExpiresIn(e.target.value ? Number(e.target.value) : null)}
                        className="w-full relative z-0 bg-black border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-indigo-500/50 transition-all text-sm font-medium text-white appearance-none hover:bg-zinc-900/40"
                      >
                        {EXPIRATION_OPTIONS.map((opt) => (
                          <option key={opt.value ?? 'never'} value={opt.value ?? ''} className="bg-black text-white">
                            {opt.label.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-1">ACCESS_LIMIT</label>
                    <div className="relative group">
                      <Download className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-600 z-10" size={16} />
                      <select
                        value={downloadLimit}
                        onChange={(e) => setDownloadLimit(Number(e.target.value))}
                        className="w-full relative z-0 bg-black border border-white/5 rounded-2xl py-4 pl-14 pr-6 outline-none focus:border-indigo-500/50 transition-all text-sm font-medium text-white appearance-none hover:bg-zinc-900/40"
                      >
                        {DOWNLOAD_LIMIT_OPTIONS.map((opt) => (
                          <option key={opt.value ?? 'unlimited'} value={opt.value ?? 100} className="bg-black text-white">
                            {opt.label.toUpperCase()}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-zinc-600">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-10 border-t border-white/5">
                <button 
                  onClick={handleClose} 
                  className="px-8 py-4 text-[10px] font-black text-zinc-600 hover:text-white uppercase tracking-widest transition-colors"
                >
                  DISCARD
                </button>
                <button
                  onClick={handleCreateShare}
                  disabled={loading || !password || password.length < 6}
                  className="flex-1 flex items-center justify-center gap-3 py-4 rounded-full bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all active:scale-95 shadow-2xl relative group overflow-hidden"
                >
                  {loading ? 'DEPLOYING...' : 'INITIALIZE_NODE'}
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="share-result"
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="space-y-8"
            >
              {/* Success Badge */}
              <div className="p-6 rounded-[2rem] bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-6 shadow-xl relative overflow-hidden">
                <div className="absolute inset-0 bg-indigo-500/[0.03] animate-pulse" />
                <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 relative z-10">
                  <Check size={28} className="text-white" />
                </div>
                <div className="relative z-10">
                  <p className="text-sm font-black text-white uppercase italic tracking-tighter mb-1">NODE_INITIALIZED</p>
                  <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Protocol Handshake Successful</p>
                </div>
              </div>

              {/* Share Link */}
              <div className="space-y-3">
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] px-2">ACCESS_LINK</label>
                <div className="relative group">
                  {/* Copy Button Inside */}
                  <div className="absolute inset-y-0 right-2 flex items-center p-1.5 z-20">
                     <button
                        onClick={handleCopyLink}
                        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all h-full flex items-center gap-2 ${
                          copied ? 'bg-indigo-500 text-white' : 'bg-white text-black hover:bg-zinc-200'
                        }`}
                      >
                        {copied ? <Check size={14} /> : <Copy size={14} />}
                        {copied ? 'COPIED' : 'COPY'}
                     </button>
                  </div>
                  <input
                    readOnly
                    value={`${window.location.origin}/receive?token=${shareResult.token}`}
                    className="w-full bg-black border border-white/5 rounded-2xl py-4 pl-6 pr-32 font-mono text-[11px] font-bold text-indigo-400 outline-none focus:border-indigo-500/30 transition-all shadow-inner"
                  />
                </div>
              </div>

              {/* Password Reminder */}
              <div className="p-6 rounded-[2rem] bg-zinc-900/40 border border-white/5 relative overflow-hidden">
                <div className="absolute top-[-20%] right-[-20%] p-8 opacity-5 text-indigo-500">
                  <Lock size={120} />
                </div>
                <div className="flex items-start gap-5 relative z-10">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0 border border-orange-500/20">
                     <Info size={20} className="text-orange-500" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white uppercase italic tracking-tighter mb-2">
                      PASSWORD_SECURITY_WARNING
                    </p>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest leading-relaxed">
                      Handshake requires manual credential exchange. <br />
                      Key: <span className="font-mono text-white font-black bg-white/5 px-2 py-0.5 rounded border border-white/10 mx-1">{password}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-8 border-t border-white/5">
                <button
                  onClick={handleClose}
                  className="w-full py-5 rounded-full bg-white text-black font-black text-[11px] uppercase tracking-[0.2em] hover:bg-zinc-200 transition-all shadow-2xl"
                >
                  CLOSE_HANDSHAKE
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Modal>
  );
}
