import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollToTop from "./ui/ScrollToTop";

export default function Layout({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });

  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePosition({
            x: (e.clientX / window.innerWidth) * 100,
            y: (e.clientY / window.innerHeight) * 100
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-surface-50 relative overflow-hidden transition-colors duration-500">
      {/* Dynamic Animated Mesh Background */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Main Base Gradients */}
        <div className="absolute inset-0 bg-surface-50 opacity-90" />
        
        {/* Floating gradient orbs */}
        <motion.div 
          animate={{
            x: [0, 50, 0, -50, 0],
            y: [0, -50, -20, 30, 0],
            scale: [1, 1.1, 0.9, 1.05, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary-300/20 rounded-full blur-[120px] mix-blend-multiply"
        />
        
        <motion.div 
          animate={{
            x: [0, -40, 0, 40, 0],
            y: [0, 60, 20, -20, 0],
            scale: [1, 0.9, 1.1, 0.95, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 2 }}
          className="absolute top-[20%] -right-[10%] w-[45%] h-[60%] bg-cyan-300/20 rounded-full blur-[120px] mix-blend-multiply"
        />

        <motion.div 
          animate={{
            x: [0, 60, -20, 0],
            y: [0, 20, 80, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: 5 }}
          className="absolute -bottom-[20%] left-[20%] w-[60%] h-[40%] bg-purple-300/20 rounded-full blur-[120px] mix-blend-multiply"
        />
      </div>

      {/* Mouse Follow Glow */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-50 transition-opacity duration-300"
        style={{
          background: `radial-gradient(1000px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(139, 92, 246, 0.05), transparent 40%)`
        }}
      />
      
      {/* Premium Texture Overlay (Grid Pattern) */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)`,
          backgroundSize: '32px 32px'
        }}
      />
      
      {/* Optional Noise Grain (SaaS Premium Feel) */}
      <div className="fixed inset-0 z-0 opacity-[0.015] pointer-events-none mix-blend-difference" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=\"0 0 200 200\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cfilter id=\"noiseFilter\"%3E%3CfeTurbulence type=\"fractalNoise\" baseFrequency=\"0.65\" numOctaves=\"3\" stitchTiles=\"stitch\"/%3E%3C/filter%3E%3Crect width=\"100%25\" height=\"100%25\" filter=\"url(%23noiseFilter)\"/%3E%3C/svg%3E')" }}></div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      
      <ScrollToTop />
    </div>
  );
}
