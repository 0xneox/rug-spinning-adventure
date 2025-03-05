
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Gift, Trophy, Star } from 'lucide-react';
import { toast } from 'sonner';

const Rewards = ({ isWalletConnected }: { isWalletConnected: boolean }) => {
  const [dailyRewardClaimed, setDailyRewardClaimed] = useState<boolean>(() => {
    const saved = localStorage.getItem('dailyRewardClaimed');
    if (saved) {
      const { claimed, timestamp } = JSON.parse(saved);
      // Check if it's a new day
      const lastClaim = new Date(timestamp);
      const today = new Date();
      if (lastClaim.toDateString() !== today.toDateString()) {
        return false;
      }
      return claimed;
    }
    return false;
  });

  const [weeklyProgress, setWeeklyProgress] = useState<number>(() => {
    const saved = localStorage.getItem('weeklyProgress');
    return saved ? parseInt(saved, 10) : 0;
  });

  const claimDailyReward = () => {
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    setDailyRewardClaimed(true);
    localStorage.setItem('dailyRewardClaimed', JSON.stringify({
      claimed: true,
      timestamp: new Date().toISOString()
    }));
    
    // Update weekly progress
    const newProgress = Math.min(weeklyProgress + 1, 7);
    setWeeklyProgress(newProgress);
    localStorage.setItem('weeklyProgress', newProgress.toString());
    
    toast.success("Daily reward claimed: 10 RUG tokens!");
  };

  const claimWeeklyReward = () => {
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    if (weeklyProgress < 7) {
      toast.error("Complete 7 daily logins to claim the weekly reward");
      return;
    }
    
    setWeeklyProgress(0);
    localStorage.setItem('weeklyProgress', '0');
    toast.success("Weekly reward claimed: Free spin + 100 RUG tokens!");
  };

  const getFirstTimeBonus = () => {
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    const firstTimeBonusClaimed = localStorage.getItem('firstTimeBonusClaimed');
    if (firstTimeBonusClaimed) {
      toast.error("You've already claimed your first-time bonus");
      return;
    }
    
    localStorage.setItem('firstTimeBonusClaimed', 'true');
    toast.success("First-time bonus claimed: Free spin + 50 RUG tokens!");
  };

  return (
    <div className="glassmorphism rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gradient flex items-center">
          <Gift className="mr-2 h-5 w-5" /> Rewards
        </h3>
      </div>
      
      <div className="space-y-5">
        {/* First-time Bonus */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-roulette-gold/10 to-purple-500/10 border border-white/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-3 h-10 w-10 rounded-full bg-roulette-gold/20 flex items-center justify-center">
                <Star className="h-5 w-5 text-roulette-gold" />
              </div>
              <div>
                <h4 className="font-medium">First-time Bonus</h4>
                <p className="text-xs text-muted-foreground">Free spin + 50 RUG tokens</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="bg-roulette-gold text-black hover:bg-roulette-gold/90 border-0"
              onClick={getFirstTimeBonus}
              disabled={!isWalletConnected || localStorage.getItem('firstTimeBonusClaimed') !== null}
            >
              {localStorage.getItem('firstTimeBonusClaimed') !== null ? "Claimed" : "Claim"}
            </Button>
          </div>
        </div>
        
        {/* Daily Reward */}
        <div className="p-3 rounded-lg bg-secondary/20 border border-white/5">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="mr-3 h-10 w-10 rounded-full bg-roulette-win/20 flex items-center justify-center">
                <Gift className="h-5 w-5 text-roulette-win" />
              </div>
              <div>
                <h4 className="font-medium">Daily Reward</h4>
                <p className="text-xs text-muted-foreground">10 RUG tokens</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="bg-roulette-win/80 text-black hover:bg-roulette-win border-0"
              onClick={claimDailyReward}
              disabled={!isWalletConnected || dailyRewardClaimed}
            >
              {dailyRewardClaimed ? "Claimed" : "Claim"}
            </Button>
          </div>
        </div>
        
        {/* Weekly Reward */}
        <div className="p-3 rounded-lg bg-secondary/20 border border-white/5">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <div className="mr-3 h-10 w-10 rounded-full bg-roulette-jackpot/20 flex items-center justify-center">
                <Trophy className="h-5 w-5 text-roulette-jackpot" />
              </div>
              <div>
                <h4 className="font-medium">Weekly Reward</h4>
                <p className="text-xs text-muted-foreground">Free spin + 100 RUG tokens</p>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="bg-roulette-jackpot/80 text-white hover:bg-roulette-jackpot border-0"
              onClick={claimWeeklyReward}
              disabled={!isWalletConnected || weeklyProgress < 7}
            >
              Claim
            </Button>
          </div>
          <div className="flex items-center">
            <Progress value={(weeklyProgress / 7) * 100} className="flex-1 h-2 bg-secondary" />
            <span className="ml-2 text-xs text-muted-foreground">
              {weeklyProgress}/7 days
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
