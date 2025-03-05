
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Sparkles, LockIcon } from 'lucide-react';

interface BetButtonProps {
  onBet: () => void;
  disabled: boolean;
  isWalletConnected: boolean;
}

const BetButton = ({ onBet, disabled, isWalletConnected }: BetButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pulseEffect, setPulseEffect] = useState(false);
  
  // Auto-pulse effect every few seconds to draw attention
  useEffect(() => {
    if (!disabled && isWalletConnected) {
      const interval = setInterval(() => {
        setPulseEffect(true);
        setTimeout(() => setPulseEffect(false), 1000);
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [disabled, isWalletConnected]);

  const handleBet = async () => {
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setIsProcessing(true);
      
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
    }
  };

  return (
    <div className="relative">
      {/* Dynamic glow effect */}
      <motion.div 
        className="absolute inset-0 rounded-xl bg-roulette-gold/20 blur-xl"
        animate={{ 
          opacity: pulseEffect ? 0.8 : isHovering ? 0.6 : 0,
          scale: pulseEffect ? 1.1 : isHovering ? 1.05 : 1
        }}
        transition={{ duration: 0.4 }}
      />
      
      {/* Ambient particles */}
      {isHovering && !disabled && isWalletConnected && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-roulette-gold/80"
              initial={{ 
                x: "50%", 
                y: "100%",
                opacity: 0
              }}
              animate={{ 
                x: `${30 + Math.random() * 40}%`,
                y: `${Math.random() * 100}%`,
                opacity: [0, 0.8, 0]
              }}
              transition={{ 
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )}
      
      <motion.div
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
      >
        <Button 
          onClick={handleBet}
          disabled={disabled || !isWalletConnected || isProcessing}
          className={`relative w-full px-6 py-7 h-auto text-xl font-medium rounded-xl transition-all duration-300 overflow-hidden ${
            disabled || isProcessing
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-roulette-gold text-black hover:bg-roulette-gold/90 button-glow'
          }`}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Background effects */}
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
          
          <div className="relative flex flex-col items-center space-y-1">
            {isProcessing ? (
              <>
                <div className="flex items-center">
                  <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full mr-2"></div>
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
                    <Sparkles className="h-5 w-5 animate-pulse-subtle" />
                  )}
                  <span>Bet 0.1 SOL</span>
                </div>
                {!isWalletConnected ? (
                  <div className="flex items-center text-xs mt-1 opacity-80">
                    <LockIcon className="h-3 w-3 mr-1" />
                    <span>Connect wallet first</span>
                  </div>
                ) : disabled ? (
                  <span className="text-xs mt-1 opacity-80">Waiting for next round</span>
                ) : (
                  <motion.span 
                    className="text-xs mt-1 opacity-80"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    Instant confirmation
                  </motion.span>
                )}
              </>
            )}
          </div>
        </Button>
      </motion.div>
      
      {/* Additional context info */}
      {isWalletConnected && !disabled && !isProcessing && (
        <motion.div 
          className="mt-2 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Current odds: <span className="text-roulette-gold">90% win chance</span> • Fee: 5%
        </motion.div>
      )}
    </div>
  );
};

export default BetButton;
