import { motion } from 'framer-motion';
import { useDevice } from '@/hooks/use-device';
import { ReactNode } from 'react';

interface AnimatedContainerProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  reducedMotion?: boolean;
  type?: 'fade' | 'scale' | 'slide' | 'pop' | 'glow';
  isActive?: boolean;
  id?: string;
}

export const AnimatedContainer = ({
  children,
  delay = 0,
  className = '',
  reducedMotion = false,
  type = 'fade',
  isActive = true,
  id
}: AnimatedContainerProps) => {
  const { prefersReducedMotion, perfTier } = useDevice();
  
  const shouldReduceMotion = prefersReducedMotion || reducedMotion || perfTier === 'low';
  
  const variants = {
    fade: {
      hidden: { opacity: 0, y: 10 },
      visible: { opacity: 1, y: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { opacity: 1, scale: 1 }
    },
    slide: {
      hidden: { opacity: 0, x: -20 },
      visible: { opacity: 1, x: 0 }
    },
    pop: {
      hidden: { opacity: 0, scale: 0.8, y: 10 },
      visible: { opacity: 1, scale: 1, y: 0 }
    },
    glow: {
      hidden: { opacity: 0, boxShadow: '0 0 0 rgba(212, 175, 55, 0)' },
      visible: { 
        opacity: 1, 
        boxShadow: shouldReduceMotion ? undefined : '0 0 20px rgba(212, 175, 55, 0.3)'
      }
    }
  };
  
  if (shouldReduceMotion) {
    return <div className={className} id={id}>{children}</div>;
  }
  
  return (
    <motion.div
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={variants[type]}
      transition={{ 
        duration: 0.4, 
        delay: delay,
        ease: type === 'pop' ? 'backOut' : 'easeOut'
      }}
      className={className}
      id={id}
    >
      {children}
    </motion.div>
  );
};

export const FloatingParticles = ({ count = 10, color = 'gold', className = '' }) => {
  const { prefersReducedMotion, perfTier } = useDevice();
  
  if (prefersReducedMotion || perfTier === 'low') {
    return null;
  }
  
  const particleCount = perfTier === 'ultra' ? count : 
                        perfTier === 'high' ? Math.floor(count * 0.7) : 
                        Math.floor(count * 0.4);
  
  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${
            color === 'gold' ? 'bg-roulette-gold/60' : 
            color === 'purple' ? 'bg-roulette-jackpot/60' : 
            'bg-white/60'
          }`}
          initial={{ 
            x: `${Math.random() * 100}%`, 
            y: `${Math.random() * 100}%`,
            opacity: 0.3
          }}
          animate={{ 
            y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
            opacity: [0.3, 0.8, 0.3]
          }}
          transition={{ 
            duration: 3 + Math.random() * 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      ))}
    </div>
  );
};

export const ShimmerEffect = ({ className = '', width = '100%' }) => {
  return (
    <motion.div
      className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent ${className}`}
      initial={{ x: '-100%', opacity: 0.1 }}
      animate={{ x: '100%', opacity: 0.15 }}
      transition={{ 
        duration: 1.5, 
        repeat: Infinity,
        repeatDelay: 0.5
      }}
      style={{ width }}
    />
  );
};

export const PulseAnimation = ({ children, className = '', intensity = 'medium' }) => {
  const { prefersReducedMotion } = useDevice();
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  const pulseConfig = {
    light: {
      scale: [1, 1.02, 1],
      duration: 2
    },
    medium: {
      scale: [1, 1.05, 1],
      duration: 1.5
    },
    strong: {
      scale: [1, 1.1, 1],
      duration: 1
    }
  };
  
  const { scale, duration } = pulseConfig[intensity as keyof typeof pulseConfig] || pulseConfig.medium;
  
  return (
    <motion.div
      className={className}
      animate={{ scale }}
      transition={{ 
        duration, 
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};
