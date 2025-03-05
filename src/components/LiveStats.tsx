
import { useState, useEffect } from 'react';
import { Users, TrendingUp } from 'lucide-react';

const LiveStats = () => {
  const [playerCount, setPlayerCount] = useState(0);
  const [progressiveJackpot, setProgressiveJackpot] = useState(5.0);
  
  // Simulate changing player count for FOMO
  useEffect(() => {
    // Start with a random number between 80-120
    const baseCount = Math.floor(Math.random() * 40) + 80;
    setPlayerCount(baseCount);
    
    // Update player count randomly every 5-15 seconds
    const interval = setInterval(() => {
      // 70% chance to increase, 30% chance to decrease
      const shouldIncrease = Math.random() > 0.3;
      const changeAmount = Math.floor(Math.random() * 3) + 1;
      
      setPlayerCount(prev => {
        // Ensure count stays between reasonable bounds (70-150)
        let newCount = shouldIncrease ? prev + changeAmount : prev - changeAmount;
        if (newCount < 70) newCount = 70;
        if (newCount > 150) newCount = 150;
        return newCount;
      });
    }, Math.floor(Math.random() * 10000) + 5000);
    
    // Simulate progressive jackpot growth
    const jackpotInterval = setInterval(() => {
      setProgressiveJackpot(prev => {
        // Increase by a small random amount
        const increase = Math.random() * 0.05;
        return parseFloat((prev + increase).toFixed(2));
      });
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearInterval(jackpotInterval);
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-8">
      <div className="flex-1 glassmorphism rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-roulette-gold/10 flex items-center justify-center">
            <Users className="h-5 w-5 text-roulette-gold" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-muted-foreground">Live Players</p>
            <p className="text-xl font-medium animate-pulse-subtle">{playerCount}</p>
          </div>
        </div>
        <div className="h-8 px-2 rounded-full bg-roulette-gold/20 border border-roulette-gold/30 flex items-center">
          <span className="text-xs font-medium text-roulette-gold animate-pulse">LIVE</span>
        </div>
      </div>
      
      <div className="flex-1 glassmorphism rounded-xl p-4 flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-10 w-10 rounded-full bg-roulette-jackpot/10 flex items-center justify-center">
            <TrendingUp className="h-5 w-5 text-roulette-jackpot" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-muted-foreground">Progressive Jackpot</p>
            <p className="text-xl font-medium text-roulette-jackpot animate-pulse-subtle">
              {progressiveJackpot.toFixed(2)} SOL
            </p>
          </div>
        </div>
        <div className="h-8 px-2 rounded-full bg-roulette-jackpot/20 border border-roulette-jackpot/30 flex items-center">
          <span className="text-xs font-medium text-roulette-jackpot">GROWING</span>
        </div>
      </div>
    </div>
  );
};

export default LiveStats;
