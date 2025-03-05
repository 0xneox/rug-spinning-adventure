
import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface PotProps {
  amount: number;
  isJackpot: boolean;
}

const Pot = ({ amount, isJackpot }: PotProps) => {
  const [displayAmount, setDisplayAmount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const prevAmountRef = useRef(0);
  const controls = useAnimation();
  
  // Animate the counter with optimized timing
  useEffect(() => {
    if (amount === prevAmountRef.current) return;
    
    // Animate the counter
    const start = prevAmountRef.current;
    const end = amount;
    const duration = 1500;
    const startTime = performance.now();
    
    const animateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      // Use easeOutExpo for a nice effect
      const easeProgress = 1 - Math.pow(1 - progress, 4);
      const currentCount = start + (end - start) * easeProgress;
      
      setDisplayAmount(parseFloat(currentCount.toFixed(2)));
      
      if (progress < 1) {
        requestAnimationFrame(animateCount);
      }
    };
    
    requestAnimationFrame(animateCount);
    prevAmountRef.current = amount;
  }, [amount]);
  
  // Enhanced jackpot effect
  useEffect(() => {
    if (isJackpot) {
      // Create a pulse animation sequence
      const pulseSequence = async () => {
        await controls.start({
          scale: [1, 1.03, 1],
          boxShadow: [
            "0 0 20px rgba(139, 92, 246, 0.2)",
            "0 0 40px rgba(139, 92, 246, 0.4)",
            "0 0 20px rgba(139, 92, 246, 0.2)"
          ],
          transition: { duration: 1.5, times: [0, 0.5, 1] }
        });
        
        if (isJackpot) {
          pulseSequence(); // Continue while jackpot is active
        }
      };
      
      pulseSequence();
    }
  }, [isJackpot, controls]);

  return (
    <motion.div 
      className={`relative px-8 py-6 rounded-xl glassmorphism-2025 transition-all duration-500 preserve-3d perspective-1000 ${
        isJackpot ? 'border-roulette-jackpot/30' : ''
      }`}
      animate={controls}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -5,
        boxShadow: isJackpot 
          ? "0 20px 40px rgba(139, 92, 246, 0.2)" 
          : "0 20px 40px rgba(0, 0, 0, 0.3)"
      }}
      onHoverStart={() => setIsHovering(true)}
      onHoverEnd={() => setIsHovering(false)}
      aria-live={isJackpot ? "assertive" : "polite"}
      role="region"
      aria-label={isJackpot ? "Jackpot unlocked!" : "Current pot amount"}
    >
      {/* Enhanced background gradient */}
      <div className="absolute inset-0 rounded-xl bg-gradient-radial from-transparent to-roulette-gold/5 pointer-events-none"></div>
      
      {/* Floating particles for jackpot */}
      <AnimatePresence>
        {isJackpot && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-roulette-jackpot/80"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                }}
                initial={{ 
                  x: "50%", 
                  y: "100%",
                  opacity: 0
                }}
                animate={{ 
                  x: `${Math.random() * 100}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [0, 0.8, 0],
                  rotate: Math.random() * 360
                }}
                exit={{ opacity: 0 }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.2
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      
      {/* Hover tracking glow effect */}
      {isHovering && (
        <motion.div 
          className="absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(circle 100px at var(--x, 50%) var(--y, 50%), ${
              isJackpot ? 'rgba(139, 92, 246, 0.15)' : 'rgba(212, 175, 55, 0.15)'
            }, transparent)`,
            x: '-50%',
            y: '-50%'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onMouseMove={(e) => {
            const target = e.currentTarget;
            const rect = target.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            target.style.setProperty('--x', `${x}px`);
            target.style.setProperty('--y', `${y}px`);
          }}
        />
      )}
      
      <div className="flex flex-col items-center">
        <motion.span 
          className="text-sm uppercase tracking-wider text-muted-foreground mb-1"
          animate={isJackpot ? { 
            color: ["hsl(var(--muted-foreground))", "hsl(var(--roulette-jackpot))", "hsl(var(--muted-foreground))"]
          } : {}}
          transition={isJackpot ? { duration: 1.5, repeat: Infinity } : {}}
        >
          Current Pot
        </motion.span>
        
        <motion.div 
          className="flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <motion.span 
            className="text-4xl md:text-5xl font-bold flex items-center"
            style={{ transform: 'translateZ(10px)' }}
          >
            <motion.span 
              className={isJackpot ? 'text-roulette-jackpot' : 'text-gradient-premium'}
              animate={isJackpot ? {
                textShadow: [
                  "0 0 10px rgba(139, 92, 246, 0.3)",
                  "0 0 20px rgba(139, 92, 246, 0.6)",
                  "0 0 10px rgba(139, 92, 246, 0.3)"
                ]
              } : {}}
              transition={isJackpot ? { duration: 2, repeat: Infinity } : {}}
            >
              {displayAmount.toFixed(1)}
            </motion.span>
            <motion.span 
              className="ml-2 text-2xl"
              style={{ transform: 'translateZ(5px)' }}
            >
              SOL
            </motion.span>
            
            {isJackpot && (
              <motion.div
                animate={{ 
                  rotate: 360,
                  scale: [1, 1.2, 1]
                }}
                transition={{ 
                  rotate: { duration: 10, repeat: Infinity, ease: "linear" },
                  scale: { duration: 2, repeat: Infinity, repeatType: "reverse" }
                }}
                className="ml-3"
              >
                <Sparkles className="h-6 w-6 text-roulette-jackpot" />
              </motion.div>
            )}
          </motion.span>
        </motion.div>
        
        <AnimatePresence>
          {isJackpot && (
            <motion.div 
              className="mt-3 px-4 py-1.5 rounded-full bg-roulette-jackpot/20 border border-roulette-jackpot/30"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                boxShadow: [
                  "0 0 0px rgba(139, 92, 246, 0.3)",
                  "0 0 10px rgba(139, 92, 246, 0.6)",
                  "0 0 0px rgba(139, 92, 246, 0.3)"
                ]
              }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ 
                boxShadow: { duration: 2, repeat: Infinity }
              }}
            >
              <span className="text-sm font-medium text-roulette-jackpot flex items-center">
                <Sparkles className="h-3 w-3 mr-1.5" />
                JACKPOT UNLOCKED!
                <Sparkles className="h-3 w-3 ml-1.5" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <motion.p 
          className="mt-3 text-sm text-muted-foreground text-center"
          style={{ transform: 'translateZ(5px)' }}
          whileHover={{ color: isJackpot ? "rgb(139, 92, 246)" : "rgb(212, 175, 55)" }}
        >
          Winner takes all <span className="inline-block">+ 1000 RUG tokens!</span>
        </motion.p>
        
        {/* Interactive pot history visualization */}
        <motion.div 
          className="mt-4 w-full h-6 bg-black/20 rounded-full overflow-hidden"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: isHovering ? 24 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="h-full bg-gradient-to-r from-roulette-gold/30 to-roulette-gold/60 relative"
            style={{ 
              width: `${Math.min((displayAmount / 5) * 100, 100)}%`,
              borderRight: "2px solid rgba(212, 175, 55, 0.8)"
            }}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min((displayAmount / 5) * 100, 100)}%` }}
            transition={{ duration: 1 }}
          >
            <motion.div 
              className="absolute right-0 top-0 bottom-0 w-1 bg-roulette-gold"
              animate={{ 
                opacity: [0.4, 1, 0.4],
                boxShadow: [
                  "0 0 2px rgba(212, 175, 55, 0.3)",
                  "0 0 8px rgba(212, 175, 55, 0.8)",
                  "0 0 2px rgba(212, 175, 55, 0.3)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          
          <div className="absolute inset-x-0 bottom-0 flex justify-between px-2 text-[10px] text-muted-foreground/70">
            <span>0</span>
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5+ SOL</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Pot;
