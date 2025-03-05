
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Define the segments of the wheel
const segments = [
  { id: 0, label: "RUG PULL", color: "#E63946", textColor: "white", chance: 10 },
  { id: 1, label: "1.5x", color: "#10B981", textColor: "white", chance: 30 },
  { id: 2, label: "2x", color: "#3B82F6", textColor: "white", chance: 20 },
  { id: 3, label: "JACKPOT", color: "#8B5CF6", textColor: "white", chance: 10 },
  { id: 4, label: "1.5x", color: "#10B981", textColor: "white", chance: 30 }
];

interface RouletteWheelProps {
  isSpinning: boolean;
  onSpinComplete: (result: number) => void;
}

const RouletteWheel = ({ isSpinning, onSpinComplete }: RouletteWheelProps) => {
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<number | null>(null);
  const [hoverEffect, setHoverEffect] = useState(false);
  const wheelRef = useRef<HTMLDivElement>(null);
  
  // Particle effect for jackpot
  const [showParticles, setShowParticles] = useState(false);

  useEffect(() => {
    if (isSpinning) {
      // Determine a random winner
      const randomSegment = Math.floor(Math.random() * segments.length);
      setWinner(randomSegment);
      
      // Calculate the rotation needed to land on this segment
      // Add extra rotations for visual effect (5-10 full rotations)
      const extraRotations = 5 + Math.floor(Math.random() * 5);
      const degreesPerSegment = 360 / segments.length;
      const segmentMiddle = randomSegment * degreesPerSegment + degreesPerSegment / 2;
      
      // We subtract from 360 because the wheel rotates clockwise, but our indicator is at the top
      const destinationDegree = 360 - segmentMiddle;
      const totalRotation = destinationDegree + (extraRotations * 360);
      
      setRotation(totalRotation);
      
      // Notify parent component when spin is complete
      const spinDuration = 8000; // 8 seconds, should match the CSS animation duration
      setTimeout(() => {
        if (randomSegment === 3) {
          // Jackpot effect
          setShowParticles(true);
          setTimeout(() => setShowParticles(false), 5000);
        }
        onSpinComplete(randomSegment);
      }, spinDuration);
    } else {
      setWinner(null);
    }
  }, [isSpinning, onSpinComplete]);

  // Mouse hover effect
  const handleMouseEnter = () => {
    if (!isSpinning) {
      setHoverEffect(true);
    }
  };

  const handleMouseLeave = () => {
    setHoverEffect(false);
  };

  return (
    <div 
      className="relative w-full max-w-md mx-auto aspect-square mt-10"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-roulette-gold/20 blur-xl transform-gpu"
        animate={{
          scale: hoverEffect ? 1.05 : 1,
          opacity: hoverEffect ? 0.8 : 0.6
        }}
        transition={{ duration: 0.5 }}
      ></motion.div>
      
      {/* Particles for jackpot effect */}
      {showParticles && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-roulette-jackpot"
              initial={{ 
                x: "50%", 
                y: "50%",
                scale: 0
              }}
              animate={{ 
                x: `${Math.random() * 100}%`,
                y: `${Math.random() * 100}%`,
                scale: Math.random() * 3 + 1,
                opacity: 0
              }}
              transition={{ 
                duration: Math.random() * 2 + 1,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      )}
      
      {/* Wheel container */}
      <div className="relative w-full h-full">
        {/* 3D perspective wrapper */}
        <div className="relative w-full h-full perspective-1000">
          {/* Stationary indicator triangle at the top */}
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10 h-8 w-8 flex justify-center"
            animate={{ y: hoverEffect ? -4 : -2 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="h-0 w-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[16px] border-b-roulette-gold drop-shadow-lg"
              animate={{ 
                borderBottomColor: showParticles ? "#8B5CF6" : "#D4AF37",
                scale: showParticles ? [1, 1.2, 1] : 1
              }}
              transition={{ 
                duration: 0.3,
                repeat: showParticles ? Infinity : 0,
                repeatType: "reverse"
              }}
            ></motion.div>
          </motion.div>
          
          {/* Wheel */}
          <motion.div 
            ref={wheelRef}
            className="relative w-full h-full rounded-full overflow-hidden border-4 border-roulette-gold shadow-[0_0_60px_rgba(212,175,55,0.3)] transform-gpu"
            style={{
              transform: `rotateZ(${rotation}deg)`,
              transition: isSpinning ? 'transform 8s cubic-bezier(0.17, 0.67, 0.14, 0.99)' : 'none',
              transformStyle: 'preserve-3d'
            }}
            animate={{ 
              rotateY: hoverEffect && !isSpinning ? 10 : 0,
              rotateX: hoverEffect && !isSpinning ? -5 : 0,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 10 }}
            whileHover={{ filter: "brightness(1.1)" }}
          >
            {segments.map((segment, index) => {
              const degreesPerSegment = 360 / segments.length;
              const rotateVal = index * degreesPerSegment;
              
              return (
                <motion.div 
                  key={index}
                  className="absolute w-1/2 h-1/2 origin-bottom-right"
                  style={{ 
                    transform: `rotate(${rotateVal}deg) skewY(${90 - degreesPerSegment}deg)`,
                    backgroundColor: segment.color,
                    overflow: 'hidden',
                    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.2)'
                  }}
                  whileHover={{ backgroundColor: segment.color, filter: "brightness(1.1)" }}
                >
                  <motion.div 
                    className="absolute bottom-0 right-0 w-[200%] h-[200%] flex items-center justify-center transform-gpu rotate-45 origin-bottom-right"
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                  >
                    <span 
                      className="text-sm md:text-base font-bold tracking-wider drop-shadow-md"
                      style={{ color: segment.textColor }}
                    >
                      {segment.label}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
            
            {/* Center button */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-roulette-black border-2 border-roulette-gold z-10 flex items-center justify-center shadow-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: hoverEffect ? '0 0 20px rgba(212,175,55,0.5)' : '0 0 10px rgba(212,175,55,0.2)',
                borderWidth: hoverEffect ? '3px' : '2px'
              }}
            >
              <span className="text-sm font-bold text-gradient">SPIN</span>
              
              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-full border border-roulette-gold/50 flex items-center justify-center">
                <div className="w-2/3 h-2/3 rounded-full border border-roulette-gold/30"></div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Subtle reflection */}
          <div className="absolute inset-0 rounded-full opacity-10 bg-gradient-to-b from-white via-transparent to-transparent pointer-events-none transform-gpu"></div>
        </div>
      </div>
    </div>
  );
};

export default RouletteWheel;
