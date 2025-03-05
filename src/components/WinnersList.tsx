
import { useState } from 'react';
import { motion } from 'framer-motion';

// Mock data for winners
const mockWinners = [
  { address: "Gw6ntSQA...2N7Cgqn", amount: 0.5, outcome: "1.5x", timestamp: new Date().getTime() - 1000 * 60 * 5 },
  { address: "6Yh5TRkN...9J8Bvf", amount: 3.2, outcome: "JACKPOT", timestamp: new Date().getTime() - 1000 * 60 * 15 },
  { address: "A2zQpRT7...L4kPmx", amount: 0.2, outcome: "2x", timestamp: new Date().getTime() - 1000 * 60 * 25 },
  { address: "KjN8pqW3...6TrFvz", amount: 0, outcome: "RUG PULL", timestamp: new Date().getTime() - 1000 * 60 * 35 },
  { address: "9PzRtS4B...7YgVnj", amount: 0.2, outcome: "2x", timestamp: new Date().getTime() - 1000 * 60 * 45 },
];

const WinnersList = () => {
  const [winners, setWinners] = useState(mockWinners);

  const formatTime = (timestamp: number) => {
    const now = new Date().getTime();
    const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes === 1) return '1 minute ago';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };

  const getOutcomeStyles = (outcome: string) => {
    switch (outcome) {
      case "JACKPOT":
        return "bg-roulette-jackpot/20 text-roulette-jackpot border-roulette-jackpot/30";
      case "RUG PULL":
        return "bg-roulette-red/20 text-roulette-red border-roulette-red/30";
      default:
        return "bg-roulette-win/20 text-roulette-win border-roulette-win/30";
    }
  };

  return (
    <div id="winners" className="w-full max-w-md mx-auto glassmorphism rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/5">
        <h3 className="text-lg font-medium text-gradient">Recent Winners</h3>
      </div>
      
      <div className="divide-y divide-white/5">
        {winners.map((winner, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-xs">
                {winner.address.substring(0, 2)}
              </div>
              <div>
                <p className="text-sm font-medium">{winner.address}</p>
                <p className="text-xs text-muted-foreground">{formatTime(winner.timestamp)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {winner.outcome !== "RUG PULL" && (
                <span className="text-roulette-gold font-medium">
                  +{winner.amount.toFixed(1)} SOL
                </span>
              )}
              <span className={`text-xs px-2 py-0.5 rounded-full border ${getOutcomeStyles(winner.outcome)}`}>
                {winner.outcome}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="p-4 bg-secondary/20 border-t border-white/5">
        <p className="text-xs text-center text-muted-foreground">
          Updated in real-time as bets are placed
        </p>
      </div>
    </div>
  );
};

export default WinnersList;
