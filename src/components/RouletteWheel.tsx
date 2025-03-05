
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

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
  const [interactiveMode, setInteractiveMode] = useState(false);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const wheelRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  
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

  // Interactive 3D effect based on mouse position
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isSpinning && interactiveMode && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Calculate distance from center (0 at center, 1 at edge)
      const distX = (e.clientX - centerX) / (rect.width / 2);
      const distY = (e.clientY - centerY) / (rect.height / 2);
      
      // Apply rotation based on mouse position (limited to +/- 10 degrees)
      setRotateY(distX * 5); // X movement controls Y rotation
      setRotateX(-distY * 5); // Y movement controls X rotation
    }
  };

  // Mouse hover effect
  const handleMouseEnter = () => {
    if (!isSpinning) {
      setHoverEffect(true);
      setInteractiveMode(true);
    }
  };

  const handleMouseLeave = () => {
    setHoverEffect(false);
    setInteractiveMode(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Subtle continuous movement
  useEffect(() => {
    if (!isSpinning && !interactiveMode) {
      const pulseAnimation = async () => {
        await controls.start({
          rotateX: [0, 1, 0, -1, 0],
          rotateY: [0, -1, 0, 1, 0],
          transition: { duration: 8, ease: "easeInOut", repeat: Infinity }
        });
      };
      
      pulseAnimation();
    }
  }, [isSpinning, interactiveMode, controls]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full max-w-md mx-auto aspect-square mt-10 perspective-1000"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      role="img"
      aria-label="Roulette wheel for gambling game"
    >
      {/* Enhanced ambient glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-full bg-roulette-gold/20 blur-3xl transform-gpu"
        animate={{
          scale: hoverEffect ? [1.02, 1.08, 1.02] : [1, 1.03, 1],
          opacity: hoverEffect ? [0.6, 0.8, 0.6] : [0.4, 0.6, 0.4]
        }}
        transition={{ 
          duration: hoverEffect ? 4 : 8, 
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Sparkling stars in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-white/60"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: i * 0.5,
              repeatDelay: Math.random() * 5
            }}
          />
        ))}
      </div>
      
      {/* Particles for jackpot effect */}
      <AnimatePresence>
        {showParticles && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            {Array.from({ length: 80 }).map((_, i) => (
              <motion.div
                key={i}
                className={`absolute rounded-full ${
                  i % 3 === 0 ? 'bg-roulette-jackpot' : i % 3 === 1 ? 'bg-roulette-gold' : 'bg-white'
                }`}
                style={{
                  width: `${Math.random() * 6 + 2}px`,
                  height: `${Math.random() * 6 + 2}px`,
                }}
                initial={{ 
                  x: "50%", 
                  y: "50%",
                  scale: 0,
                  opacity: 0
                }}
                animate={{ 
                  x: `${Math.random() * 120 - 10}%`,
                  y: `${Math.random() * 120 - 10}%`,
                  scale: Math.random() * 3 + 1,
                  opacity: [0, 1, 0],
                  rotate: Math.random() * 360
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: Math.random() * 2 + 1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      
      {/* Wheel container */}
      <div className="relative w-full h-full">
        {/* 3D perspective wrapper */}
        <div className="relative w-full h-full perspective-1000">
          {/* Stationary indicator triangle at the top */}
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10 h-8 w-8 flex justify-center"
            animate={{ y: hoverEffect ? -6 : -2 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="h-0 w-0 border-l-[14px] border-l-transparent border-r-[14px] border-r-transparent border-b-[20px] border-b-roulette-gold drop-shadow-lg"
              animate={{ 
                borderBottomColor: showParticles ? "#8B5CF6" : "#D4AF37",
                scale: showParticles ? [1, 1.2, 1] : 1
              }}
              transition={{ 
                duration: 0.3,
                repeat: showParticles ? Infinity : 0,
                repeatType: "reverse"
              }}
              aria-label="Wheel indicator"
            >
              {/* Glow effect for indicator */}
              <motion.div 
                className="absolute top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-white/80 blur-sm rounded-full"
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
          
          {/* Wheel with 3D transformations */}
          <motion.div 
            ref={wheelRef}
            className="relative w-full h-full rounded-full overflow-hidden border-4 border-roulette-gold shadow-[0_0_80px_rgba(212,175,55,0.3)] transform-gpu"
            style={{
              transform: `rotateX(${interactiveMode ? rotateX : 0}deg) rotateY(${interactiveMode ? rotateY : 0}deg) rotateZ(${rotation}deg)`,
              transition: isSpinning ? 'transform 8s cubic-bezier(0.17, 0.67, 0.14, 0.99)' : 'transform 0.3s ease',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
            animate={!isSpinning && !interactiveMode ? controls : undefined}
            whileHover={{ filter: "brightness(1.1)" }}
          >
            {segments.map((segment, index) => {
              const degreesPerSegment = 360 / segments.length;
              const rotateVal = index * degreesPerSegment;
              
              return (
                <motion.div 
                  key={index}
                  className="absolute w-1/2 h-1/2 origin-bottom-right transform-gpu"
                  style={{ 
                    transform: `rotate(${rotateVal}deg) skewY(${90 - degreesPerSegment}deg) translateZ(2px)`,
                    backgroundColor: segment.color,
                    overflow: 'hidden',
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.3)'
                  }}
                >
                  <motion.div 
                    className="absolute bottom-0 right-0 w-[200%] h-[200%] flex items-center justify-center transform-gpu rotate-45 origin-bottom-right"
                    initial={{ opacity: 0.9 }}
                    animate={{ opacity: 1 }}
                  >
                    {/* Custom pattern for each segment */}
                    <div className="absolute inset-0 opacity-10">
                      {segment.id === 0 && (
                        // Rug Pull pattern
                        <div className="w-full h-full bg-[radial-gradient(circle,_transparent_20%,_rgba(0,0,0,0.3)_70%)]"></div>
                      )}
                      {(segment.id === 1 || segment.id === 4) && (
                        // 1.5x pattern
                        <div className="w-full h-full bg-[linear-gradient(45deg,_transparent_25%,_rgba(255,255,255,0.1)_25%,_rgba(255,255,255,0.1)_50%,_transparent_50%,_transparent_75%,_rgba(255,255,255,0.1)_75%)] bg-[length:10px_10px]"></div>
                      )}
                      {segment.id === 2 && (
                        // 2x pattern
                        <div className="w-full h-full bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_30%,_transparent_70%)] bg-[size:8px_8px]"></div>
                      )}
                      {segment.id === 3 && (
                        // Jackpot pattern
                        <div className="w-full h-full bg-[linear-gradient(60deg,_rgba(255,255,255,0.2)_25%,_transparent_25%,_transparent_75%,_rgba(255,255,255,0.2)_75%)] bg-[length:6px_6px]"></div>
                      )}
                    </div>
                    
                    <span 
                      className="text-sm md:text-base font-bold tracking-wider drop-shadow-md transform-gpu z-10"
                      style={{ 
                        color: segment.textColor,
                        textShadow: '0 2px 4px rgba(0,0,0,0.5)'
                      }}
                    >
                      {segment.label}
                    </span>
                  </motion.div>
                </motion.div>
              );
            })}
            
            {/* Enhanced center button */}
            <motion.div 
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-18 h-18 rounded-full bg-roulette-black border-3 border-roulette-gold z-10 flex items-center justify-center shadow-lg preserve-3d cursor-pointer"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              animate={{ 
                boxShadow: hoverEffect ? '0 0 30px rgba(212,175,55,0.5)' : '0 0 10px rgba(212,175,55,0.2)',
                borderWidth: hoverEffect ? '3px' : '2px'
              }}
            >
              <span className="text-shimmer font-bold">SPIN</span>
              
              {/* Decorative elements */}
              <div className="absolute inset-0 rounded-full border border-roulette-gold/50 flex items-center justify-center animate-spin-slow">
                <div className="w-2/3 h-2/3 rounded-full border border-roulette-gold/30"></div>
              </div>
              
              {/* Central glow */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-roulette-gold/20 blur-md"
                animate={{ 
                  opacity: [0.2, 0.5, 0.2],
                  scale: [0.8, 1, 0.8]
                }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
          
          {/* Enhanced reflection effects */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none"></div>
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent to-white/5 pointer-events-none transform-gpu"></div>
        </div>
      </div>
      
      {/* Accessibility description for screen readers */}
      <div className="sr-only">
        Roulette wheel with 5 segments: Rug Pull (red), 1.5x multiplier (green), 
        2x multiplier (blue), Jackpot (purple), and another 1.5x multiplier (green).
        {isSpinning && " The wheel is currently spinning."}
        {showParticles && " Jackpot has been hit!"}
      </div>
    </div>
  );
};

export default RouletteWheel;
