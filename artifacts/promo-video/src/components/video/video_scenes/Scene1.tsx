import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene1() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),
      setTimeout(() => setPhase(2), 1000),
      setTimeout(() => setPhase(3), 2500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center"
      {...sceneTransitions.zoomThrough}
    >
      {/* Code stream effect midground */}
      <div className="absolute inset-0 overflow-hidden opacity-30 font-mono text-[0.8vw] text-[var(--color-primary)] whitespace-pre pointer-events-none">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * -5
            }}
            style={{ left: `${(i / 40) * 100}%`, position: 'absolute' }}
          >
            {Array.from({ length: 20 }).map(() => Math.random() > 0.5 ? '1' : '0').join('\n')}
          </motion.div>
        ))}
      </div>

      <div className="text-center z-10 mix-blend-screen">
        <motion.h1 
          className="text-[6vw] font-display font-bold text-white tracking-tighter leading-none"
          initial={{ opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
          animate={phase >= 1 ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : { opacity: 0, scale: 0.8, filter: 'blur(20px)' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        >
          DIGITAL<br/>WORLD
        </motion.h1>
        
        <motion.div 
          className="h-[2px] bg-[var(--color-primary)] mt-6 mx-auto"
          initial={{ width: 0 }}
          animate={phase >= 2 ? { width: '40vw' } : { width: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        <motion.p 
          className="text-[1.5vw] font-mono text-[var(--color-accent)] mt-6 tracking-[0.5em] uppercase"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
        >
          INITIALIZING NETWORKS...
        </motion.p>
      </div>

      {/* Cyber rings */}
      <motion.div 
        className="absolute w-[40vw] h-[40vw] border border-[var(--color-primary)] rounded-full opacity-20"
        animate={{ rotate: 360, scale: phase >= 3 ? 1.5 : 1 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div 
        className="absolute w-[50vw] h-[50vw] border border-[var(--color-secondary)] border-dashed rounded-full opacity-20"
        animate={{ rotate: -360, scale: phase >= 3 ? 1.2 : 1 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
    </motion.div>
  );
}