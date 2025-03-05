
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { Sparkles, LockIcon, Zap, Coins } from 'lucide-react';

interface BetButtonProps {
  onBet: () => void;
  disabled: boolean;
  isWalletConnected: boolean;
}

const BetButton = ({ onBet, disabled, isWalletConnected }: BetButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  const [hasClicked, setHasClicked] = useState(false);
  const controls = useAnimation();
  
  // Advanced pulse effect with rhythm
  useEffect(() => {
    if (!disabled && isWalletConnected) {
      const pulseSequence = async () => {
        await controls.start({
          scale: [1, 1.02, 1],
          boxShadow: ["0px 0px 0px rgba(212, 175, 55, 0)", "0px 0px 30px rgba(212, 175, 55, 0.3)", "0px 0px 0px rgba(212, 175, 55, 0)"],
          transition: { duration: 2 }
        });
        await new Promise(resolve => setTimeout(resolve, 5000));
        pulseSequence();
      };
      
      pulseSequence();
      
      const interval = setInterval(() => {
        setPulseEffect(true);
        setTimeout(() => setPulseEffect(false), 1000);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [disabled, isWalletConnected, controls]);

  const handleBet = async () => {
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setHasClicked(true);
      setIsProcessing(true);
      
      // Haptic feedback simulation for 2025
      if (window.navigator && "vibrate" in window.navigator) {
        window.navigator.vibrate(200);
      }
      
      // This would be replaced with actual blockchain transaction
      toast.loading("Sending transaction to Solana blockchain...");
      
      // Simulate blockchain confirmation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call the onBet function which would handle actual betting logic
      onBet();
      
      toast.success("Transaction confirmed! Your bet has been placed.");
    } catch (error) {
      toast.error("Transaction failed. Please try again.");
      console.error("Betting error:", error);
    } finally {
      setIsProcessing(false);
      setTimeout(() => setHasClicked(false), 2000);
    }
  };

  return (
    <div className="relative perspective-1000">
      {/* Dynamic ambient glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl bg-roulette-gold/20 blur-xl"
        animate={controls}
        initial={{ opacity: 0 }}
        style={{
          opacity: isProcessing ? 0.8 : isHovering ? 0.6 : pulseEffect ? 0.4 : 0.2
        }}
      />
      
      {/* Dynamic 3D particles */}
      <AnimatePresence>
        {(isHovering || pulseEffect) && !disabled && isWalletConnected && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none perspective-1000 preserve-3d">
            {Array.from({ length: 12 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 rounded-full bg-roulette-gold/80"
                initial={{ 
                  x: "50%", 
                  y: "100%",
                  opacity: 0,
                  scale: 0,
                  z: -10
                }}
                animate={{ 
                  x: `${20 + Math.random() * 60}%`,
                  y: `${Math.random() * 100}%`,
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                  z: [0, 50, 0]
                }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ 
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                  delay: i * 0.1
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
      
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02, z: 10 }}
        whileTap={{ scale: disabled ? 1 : 0.98, z: 5 }}
        style={{ transformStyle: 'preserve-3d' }}
        className="preserve-3d"
      >
        <Button 
          onClick={handleBet}
          disabled={disabled || !isWalletConnected || isProcessing}
          className={`relative w-full px-6 py-7 h-auto text-xl font-medium rounded-xl transition-all duration-300 overflow-hidden preserve-3d ${
            disabled || isProcessing
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-roulette-gold text-black hover:bg-roulette-gold/90 button-glow'
          }`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Enhanced background effects */}
          {!disabled && !isProcessing && isWalletConnected && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-roulette-gold via-yellow-400 to-roulette-gold bg-[length:200%_100%]"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 0%', '0% 0%']
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "loop",
                ease: "linear"
              }}
            />
          )}
          
          {/* Interactive hover effect - 3D depth */}
          {isHovering && !disabled && isWalletConnected && !isProcessing && (
            <motion.div
              className="absolute inset-0 bg-white/10"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.1, 0],
                y: [0, -5, 0]
              }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          )}
          
          <div className="relative flex flex-col items-center space-y-1 preserve-3d" style={{ transform: 'translateZ(20px)' }}>
            {isProcessing ? (
              <>
                <div className="flex items-center">
                  <div className="relative">
                    <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full mr-2"></div>
                    {/* Pulsing circle behind spinner */}
                    <motion.div 
                      className="absolute inset-0 rounded-full bg-black/10"
                      animate={{ 
                        scale: [1, 1.8, 1],
                        opacity: [0.2, 0, 0.2]
                      }}
                      transition={{ 
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                    />
                  </div>
                  <span>Processing...</span>
                </div>
                
                <motion.div 
                  className="flex w-full justify-center space-x-1 text-xs opacity-80"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                >
                  <span>Confirming on Solana</span>
                  <span className="flex">
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >.</motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                    >.</motion.span>
                    <motion.span
                      animate={{ opacity: [0, 1, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                    >.</motion.span>
                  </span>
                </motion.div>
              </>
            ) : (
              <>
                <div className="flex items-center space-x-2">
                  {!disabled && isWalletConnected && (
                    <Coins className="h-5 w-5 animate-pulse-subtle" />
                  )}
                  <span className="relative">
                    Bet 0.1 SOL
                    {/* Text shimmer effect */}
                    {isHovering && !disabled && isWalletConnected && (
                      <motion.div 
                        className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white to-transparent"
                        initial={{ x: '-100%', opacity: 0.3 }}
                        animate={{ x: '100%', opacity: 0.3 }}
                        transition={{ duration: 1, ease: 'easeInOut' }}
                      />
                    )}
                  </span>
                </div>
                {!isWalletConnected ? (
                  <div className="flex items-center text-xs mt-1 opacity-80">
                    <LockIcon className="h-3 w-3 mr-1" />
                    <span>Connect wallet first</span>
                  </div>
                ) : disabled ? (
                  <span className="text-xs mt-1 opacity-80">Waiting for next round</span>
                ) : (
                  <motion.div 
                    className="flex items-center text-xs mt-1 opacity-80"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Zap className="h-3 w-3 mr-1" />
                    <span>Instant confirmation</span>
                  </motion.div>
                )}
              </>
            )}
          </div>
        </Button>
      </motion.div>
      
      {/* Click feedback ripple effect */}
      <AnimatePresence>
        {hasClicked && (
          <motion.div 
            className="absolute inset-0 rounded-xl border-2 border-white"
            initial={{ opacity: 1, scale: 0.9 }}
            animate={{ opacity: 0, scale: 1.2 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        )}
      </AnimatePresence>
      
      {/* Additional context info with enhanced accessibility */}
      {isWalletConnected && !disabled && !isProcessing && (
        <motion.div 
          className="mt-2 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          aria-live="polite" // Accessibility enhancement
        >
          <div className="flex items-center justify-center gap-1">
            <span>Current odds:</span> 
            <span className="inline-flex items-center text-roulette-gold">
              <span>90% win chance</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-3 w-3 ml-1" />
              </motion.div>
            </span> 
            <span className="mx-1">•</span>
            <span>Fee: 5%</span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BetButton;
