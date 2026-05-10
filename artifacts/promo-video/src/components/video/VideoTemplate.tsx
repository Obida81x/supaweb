import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1 } from './video_scenes/Scene1';
import { Scene2 } from './video_scenes/Scene2';
import { Scene3 } from './video_scenes/Scene3';
import { Scene4 } from './video_scenes/Scene4';
import { Scene5 } from './video_scenes/Scene5';

export const SCENE_DURATIONS: Record<string, number> = {
  open: 4000,
  problem: 4500,
  solution: 4000,
  services: 6000,
  close: 4500,
};

const SCENE_COMPONENTS: Record<string, React.ComponentType> = {
  open: Scene1,
  problem: Scene2,
  solution: Scene3,
  services: Scene4,
  close: Scene5,
};

export default function VideoTemplate({
  durations = SCENE_DURATIONS,
  loop = true,
  onSceneChange,
}: {
  durations?: Record<string, number>;
  loop?: boolean;
  onSceneChange?: (sceneKey: string) => void;
} = {}) {
  const { currentScene, currentSceneKey } = useVideoPlayer({ durations, loop });

  useEffect(() => {
    onSceneChange?.(currentSceneKey);
  }, [currentSceneKey, onSceneChange]);

  const baseSceneKey = currentSceneKey.replace(/_r[12]$/, '') as keyof typeof SCENE_DURATIONS;
  const sceneIndex = Object.keys(SCENE_DURATIONS).indexOf(baseSceneKey);
  const SceneComponent = SCENE_COMPONENTS[baseSceneKey];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[var(--color-bg-dark)]">
      {/* Persistent Background Layer */}
      <div className="absolute inset-0 z-0">
        <video
          src={`${import.meta.env.BASE_URL}videos/bg-cyber.mp4`}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-30 mix-blend-screen"
        />

        {/* Animated Cyber Gradients */}
        <motion.div
          className="absolute w-[80vw] h-[80vw] rounded-full blur-[100px] opacity-20"
          style={{ background: 'radial-gradient(circle, var(--color-primary), transparent)' }}
          animate={{
            x: sceneIndex === 1 ? '-20vw' : sceneIndex === 3 ? '20vw' : '0vw',
            y: sceneIndex === 2 ? '-20vh' : sceneIndex === 4 ? '10vh' : '0vh',
            scale: sceneIndex === 4 ? 1.5 : 1,
          }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />

        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />
      </div>

      {/* Persistent Midground Grid */}
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(14, 165, 233, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(14, 165, 233, 0.1) 1px, transparent 1px)`,
          backgroundSize: '4vw 4vw',
        }}
        animate={{
          y: sceneIndex === 1 ? '4vw' : '0vw',
          opacity: sceneIndex === 1 ? 0.3 : 0.1,
          scale: sceneIndex === 2 ? 1.1 : 1,
        }}
        transition={{ duration: 2, ease: 'easeInOut' }}
      />

      {/* Scenes */}
      <div className="relative z-10 w-full h-full">
        <AnimatePresence mode="popLayout">
          {SceneComponent && <SceneComponent key={currentSceneKey} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
