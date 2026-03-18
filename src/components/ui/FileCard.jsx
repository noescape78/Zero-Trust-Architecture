import { motion } from 'framer-motion';
import {
  File, FileText, Image, Film, Music, Archive,
  Code, Share2, Trash2,
  HardDrive, Shield
} from 'lucide-react';
import { formatSize, formatDate } from '../../utils/formatters';
import { getFileType } from '../../utils/fileHelpers';

/**
 * File Icon Component
 */
export function FileIcon({ filename, size = 24, className = '' }) {
  const fileType = getFileType(filename);

  const icons = {
    image: Image,
    document: FileText,
    spreadsheet: FileText,
    video: Film,
    audio: Music,
    archive: Archive,
    code: Code,
    default: File
  };

  const Icon = icons[fileType] || icons.default;
  
  const colorMap = {
    image: 'text-pink-500',
    document: 'text-indigo-400',
    spreadsheet: 'text-emerald-400',
    video: 'text-purple-400',
    audio: 'text-orange-400',
    archive: 'text-yellow-400',
    code: 'text-cyan-400',
    default: 'text-zinc-500'
  };
  
  const colorClass = colorMap[fileType] || colorMap.default;

  return <Icon size={size} className={`${className} ${colorClass}`} />;
}

/**
 * File Card Component - Redesigned for Dark Premium Theme
 */
export default function FileCard({
  file,
  onShare,
  onDelete,
  onPreview,
  index = 0
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 260, 
        damping: 20, 
        delay: index * 0.05 
      }}
      whileHover={{ y: -5 }}
      className="group relative bg-zinc-900/40 backdrop-blur-xl rounded-[2rem] border border-white/5 p-6 hover:shadow-2xl hover:border-white/10 transition-all duration-300 cursor-pointer overflow-hidden flex flex-col h-full"
      onClick={() => onPreview?.(file)}
    >
      {/* Dynamic Background Glow on Hover */}
      <div className="absolute inset-0 bg-indigo-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity blur-[80px] pointer-events-none" />

      {/* File Preview Container */}
      <div className="relative aspect-square rounded-[1.5rem] bg-black/40 border border-white/5 flex items-center justify-center mb-6 group-hover:border-indigo-500/20 transition-colors duration-300">
        <FileIcon filename={file.filename} size={48} className="transition-transform duration-300 group-hover:scale-110" />
        
        {/* Quality Badge */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
           <div className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[7px] font-black text-indigo-400 uppercase tracking-widest italic">
              Verified
           </div>
        </div>
      </div>

      {/* File Info */}
      <div className="space-y-4 flex-1 flex flex-col justify-end relative z-10 w-full">
        <div className="w-full">
          <h3 className="text-xs font-black text-white uppercase italic tracking-tight truncate leading-none" title={file.filename}>
            {file.filename}
          </h3>
        </div>

        <div className="flex items-center justify-between text-[9px] font-black text-zinc-500 uppercase tracking-widest">
          <span className="flex items-center gap-1.5 opacity-60">
            <HardDrive size={10} />
            {formatSize(file.size)}
          </span>
          <span className="flex items-center gap-1.5 opacity-60">
            {formatDate(file.created_at, { month: 'short', day: 'numeric' })}
          </span>
        </div>
      </div>

      {/* Hover Actions Overlay */}
      <div className="absolute top-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-20">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShare?.(file);
          }}
          className="p-2 rounded-xl bg-black border border-white/10 text-zinc-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all"
          title="Share"
        >
          <Share2 size={14} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(file);
          }}
          className="p-2 rounded-xl bg-black border border-white/10 text-zinc-600 hover:text-red-500 hover:border-red-500/30 transition-all"
          title="Delete"
        >
          <Trash2 size={14} />
        </button>
      </div>
    </motion.div>
  );
}

/**
 * File Row Component - Redesigned for Dark Premium Theme
 */
export function FileRow({
  file,
  onShare,
  onDelete,
  onPreview,
  index = 0
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="group grid grid-cols-12 gap-4 items-center px-8 py-5 hover:bg-white/5 transition-colors cursor-pointer"
      onClick={() => onPreview?.(file)}
    >
      {/* Icon & Name */}
      <div className="col-span-6 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-black border border-white/5 flex items-center justify-center transition-transform group-hover:scale-105 group-hover:border-indigo-500/20">
          <FileIcon filename={file.filename} size={24} />
        </div>
        <div className="min-w-0">
           <p className="text-xs font-black text-white uppercase italic tracking-tight truncate mb-1">{file.filename}</p>
           <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
             <Shield size={8} className="text-indigo-500" /> AES_256_STABLE
           </p>
        </div>
      </div>

      {/* Size */}
      <div className="col-span-2">
        <span className="text-[10px] font-bold text-zinc-500">
          {formatSize(file.size)}
        </span>
      </div>

      {/* Date */}
      <div className="col-span-3">
        <span className="text-[10px] font-bold text-zinc-500">
          {formatDate(file.created_at, { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      </div>

      {/* Actions */}
      <div className="col-span-1 flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onShare?.(file);
          }}
          className="p-2 text-zinc-500 hover:text-indigo-400 transition-colors"
        >
          <Share2 size={16} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.(file);
          }}
          className="p-2 text-zinc-700 hover:text-red-500 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}
