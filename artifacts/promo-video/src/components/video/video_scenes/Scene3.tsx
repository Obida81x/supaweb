import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene3() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1200),
      setTimeout(() => setPhase(3), 2000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      {...sceneTransitions.perspectiveFlip}
    >
      {/* Central glow */}
      <motion.div 
        className="absolute w-[60vw] h-[60vw] bg-[var(--color-primary)] rounded-full blur-[120px] mix-blend-screen"
        initial={{ opacity: 0, scale: 0 }}
        animate={phase >= 1 ? { opacity: 0.3, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      <div className="text-center z-10 relative">
        <motion.div
          className="w-[10vw] h-[10vw] mx-auto mb-8 relative"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={phase >= 1 ? { rotateY: 0, opacity: 1 } : { rotateY: 90, opacity: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          {/* Abstract Logo Symbol */}
          <div className="absolute inset-0 border-[0.4vw] border-[var(--color-accent)] transform rotate-45" />
          <div className="absolute inset-2 border-[0.2vw] border-white transform -rotate-12" />
          <div className="absolute inset-1/4 bg-[var(--color-primary)] shadow-[0_0_30px_var(--color-primary)]" />
        </motion.div>

        <motion.h2 
          className="text-[5vw] font-display font-bold text-white tracking-widest"
          initial={{ opacity: 0, y: 30 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        >
          SUPAWEB
        </motion.h2>

        <motion.p
          className="text-[1.5vw] font-mono text-[var(--color-accent)] mt-4 uppercase tracking-[0.3em]"
          initial={{ opacity: 0 }}
          animate={phase >= 3 ? { opacity: 1 } : { opacity: 0 }}
        >
          Modern Tech Solutions
        </motion.p>
      </div>

      {/* Modern UI fragments floating */}
      {phase >= 2 && Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute border border-[var(--color-primary)] bg-[var(--color-bg-dark)]/50 backdrop-blur-md rounded-lg"
          style={{
            width: `${Math.random() * 10 + 5}vw`,
            height: `${Math.random() * 5 + 2}vh`,
            top: `${Math.random() * 80 + 10}%`,
            left: `${Math.random() * 80 + 10}%`,
          }}
          initial={{ opacity: 0, scale: 0, z: -500 }}
          animate={{ opacity: 0.6, scale: 1, z: 0, y: [0, -20, 0] }}
          transition={{ 
            opacity: { duration: 0.5, delay: i * 0.1 },
            scale: { duration: 0.5, delay: i * 0.1 },
            y: { duration: 4, repeat: Infinity, delay: i * 0.2 }
          }}
        />
      ))}
    </motion.div>
  );
}