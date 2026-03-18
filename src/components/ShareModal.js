import { motion, AnimatePresence } from "framer-motion";

export default function ShareModal({ open, onClose, file }) {
  if (!open) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/70 backdrop-blur flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="w-[420px] bg-[#0e131b] border border-white/10 rounded-xl p-8"
        >
          <h2 className="text-lg tracking-widest mb-2">
            SHARE FILE
          </h2>

          <p className="text-sm text-gray-400 mb-6">
            {file}
          </p>

          <input
            type="password"
            placeholder="Set access password"
            className="w-full mb-4 p-3 rounded bg-black/40 border border-white/10 outline-none"
          />

          <input
            readOnly
            value="https://secure-share/file/abc123"
            className="w-full mb-6 p-3 rounded bg-black/40 border border-white/10 text-sm"
          />

          <div className="flex justify-between">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-white/20 rounded hover:bg-white/10 transition"
            >
              Close
            </button>

            <button
              className="px-6 py-2 text-sm bg-emerald-500 text-black rounded hover:bg-emerald-400 transition"
            >
              Copy Link
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}