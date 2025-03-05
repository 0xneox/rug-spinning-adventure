
import { useState, useEffect, useRef } from 'react';

interface PotProps {
  amount: number;
  isJackpot: boolean;
}

const Pot = ({ amount, isJackpot }: PotProps) => {
  const [displayAmount, setDisplayAmount] = useState(0);
  const prevAmountRef = useRef(0);

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

  return (
    <div className={`relative px-8 py-6 rounded-xl glassmorphism transition-all duration-500 ${
      isJackpot ? 'border-roulette-jackpot/30 shadow-[0_0_30px_rgba(139,92,246,0.2)]' : ''
    }`}>
      <div className="absolute inset-0 rounded-xl bg-gradient-radial from-transparent to-roulette-gold/5 pointer-events-none"></div>
      
      <div className="flex flex-col items-center">
        <span className="text-sm uppercase tracking-wider text-muted-foreground mb-1">Current Pot</span>
        <div className="flex items-center justify-center">
          <span className="text-4xl md:text-5xl font-bold">
            <span className={isJackpot ? 'text-roulette-jackpot' : 'text-gradient'}>
              {displayAmount.toFixed(1)}
            </span>
            <span className="ml-2 text-2xl">SOL</span>
          </span>
        </div>
        
        {isJackpot && (
          <div className="mt-2 px-3 py-1 rounded-full bg-roulette-jackpot/20 border border-roulette-jackpot/30 animate-pulse-subtle">
            <span className="text-xs font-medium text-roulette-jackpot">JACKPOT UNLOCKED</span>
          </div>
        )}
        
        <p className="mt-3 text-sm text-muted-foreground text-center">
          Winner takes all + 1000 RUG tokens!
        </p>
      </div>
    </div>
  );
};

export default Pot;
