import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

export function Scene2() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 3000),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-[var(--color-bg-dark)]"
      {...sceneTransitions.clipPolygon}
    >
      {/* Glitch Overlay */}
      <motion.div 
        className="absolute inset-0 bg-red-500/10 mix-blend-color-burn"
        animate={{ opacity: [0, 0.5, 0, 0.8, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "mirror", repeatDelay: 1 }}
      />

      <div className="absolute left-[10vw] top-[30vh] z-10">
        <motion.div 
          className="text-[var(--color-error)] font-mono text-[1vw] mb-4"
          initial={{ opacity: 0 }}
          animate={phase >= 1 ? { opacity: 1 } : { opacity: 0 }}
        >
          {'>'} SYSTEM_FAILURE
          <br/>{'>'} INFRASTRUCTURE_DECAY
        </motion.div>

        <motion.h2 
          className="text-[5vw] font-display font-bold text-white leading-[1.1] uppercase"
          initial={{ x: -100, opacity: 0 }}
          animate={phase >= 1 ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          Outdated<br/>Systems
        </motion.h2>

        <motion.p
          className="text-[1.5vw] text-[var(--color-text-muted)] mt-6 font-mono max-w-[30vw]"
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        >
          Broken infrastructure limits potential. Security vulnerabilities exposed. Performance degraded.
        </motion.p>
      </div>

      {/* Abstract broken tech visual */}
      <div className="absolute right-[10vw] top-[20vh] w-[30vw] h-[60vh]">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-full h-[2vw] bg-[var(--color-bg-muted)] border border-red-500/30"
            style={{ top: `${i * 12}%` }}
            initial={{ scaleX: 0, transformOrigin: 'left' }}
            animate={phase >= 2 ? { scaleX: Math.random() * 0.5 + 0.2 } : { scaleX: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
        {/* Error nodes */}
        {phase >= 2 && Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={`err-${i}`}
            className="absolute w-4 h-4 bg-red-500 rounded-sm"
            style={{ 
              top: `${Math.random() * 100}%`, 
              left: `${Math.random() * 100}%` 
            }}
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 0.2, repeat: Infinity, repeatDelay: Math.random() * 2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}