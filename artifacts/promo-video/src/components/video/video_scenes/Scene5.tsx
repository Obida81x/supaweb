import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene5() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--color-bg-dark)]"
      {...sceneTransitions.splitHorizontal}
    >
      {/* Central focal point */}
      <motion.div 
        className="absolute w-[2px] h-screen bg-[var(--color-primary)] mix-blend-screen"
        initial={{ scaleY: 0 }}
        animate={phase >= 1 ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute w-screen h-[2px] bg-[var(--color-accent)] mix-blend-screen"
        initial={{ scaleX: 0 }}
        animate={phase >= 1 ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      />

      <div className="z-10 text-center bg-[var(--color-bg-dark)]/80 backdrop-blur-xl p-[4vw] rounded-2xl border border-[var(--color-primary)]/30">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={phase >= 2 ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          <div className="w-[8vw] h-[8vw] mx-auto mb-6 relative">
            <div className="absolute inset-0 border-[0.4vw] border-[var(--color-accent)] transform rotate-45" />
            <div className="absolute inset-2 border-[0.2vw] border-white transform -rotate-12" />
            <div className="absolute inset-1/4 bg-[var(--color-primary)] shadow-[0_0_50px_var(--color-primary)]" />
          </div>
          
          <h1 className="text-[6vw] font-display font-black text-white tracking-widest leading-none">
            SUPAWEB
          </h1>
        </motion.div>

        <motion.div
          className="mt-8 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
        >
          <p className="text-[2vw] font-mono text-[var(--color-accent)]">
            supaweb.digital
          </p>
        </motion.div>
      </div>

      {/* Cyber overlay elements */}
      {phase >= 3 && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-screen opacity-50">
          <motion.div 
            className="absolute top-[10vh] left-[5vw] text-[var(--color-primary)] font-mono text-[0.8vw]"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            SYS.READY // 100%
          </motion.div>
          <motion.div 
            className="absolute bottom-[10vh] right-[5vw] text-[var(--color-accent)] font-mono text-[0.8vw] text-right"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          >
            SECURE.CONNECTION
            <br/>ESTABLISHED
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}