import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { sceneTransitions } from '@/lib/video/animations';

const services = [
  { title: "WEB DEV", desc: "High-performance interfaces", delay: 0.5 },
  { title: "MOBILE APPS", desc: "Native digital experiences", delay: 1.5 },
  { title: "CYBERSECURITY", desc: "Ironclad protection protocols", delay: 2.5 },
  { title: "AI SYSTEMS", desc: "Intelligent automation", delay: 3.5 },
];

export function Scene4() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 500),
      setTimeout(() => setPhase(2), 1500),
      setTimeout(() => setPhase(3), 2500),
      setTimeout(() => setPhase(4), 3500),
    ];
    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center"
      {...sceneTransitions.wipe}
    >
      <div className="absolute top-[10vh] left-[10vw]">
        <motion.div 
          className="text-[var(--color-primary)] font-mono text-[1vw] mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          // OUR_CAPABILITIES
        </motion.div>
        <motion.div className="h-[2px] w-[20vw] bg-[var(--color-bg-muted)] relative overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-[var(--color-accent)]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 4, ease: "linear" }}
          />
        </motion.div>
      </div>

      <div className="w-[80vw] grid grid-cols-2 gap-x-[10vw] gap-y-[10vh] mt-[10vh]">
        {services.map((service, index) => {
          const isVisible = phase >= index + 1;
          return (
            <motion.div 
              key={index}
              className="relative pl-[4vw]"
              initial={{ opacity: 0, x: -50 }}
              animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-[var(--color-bg-muted)]">
                {isVisible && (
                  <motion.div 
                    className="absolute top-0 w-full bg-[var(--color-primary)] shadow-[0_0_10px_var(--color-primary)]"
                    initial={{ height: 0 }}
                    animate={{ height: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                )}
              </div>
              <h3 className="text-[3vw] font-display font-bold text-white leading-none">
                {service.title}
              </h3>
              <p className="text-[1.2vw] font-mono text-[var(--color-text-secondary)] mt-2">
                {'>'} {service.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}