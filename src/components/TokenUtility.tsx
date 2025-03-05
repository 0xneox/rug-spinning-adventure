
import { FileText, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TokenUtility = () => {
  return (
    <div className="glassmorphism rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gradient flex items-center">
          <FileText className="mr-2 h-5 w-5" /> RUG Token Utility
        </h3>
        <Button
          variant="outline"
          size="sm"
          className="text-xs border-white/10 hover:bg-white/5"
          onClick={() => window.open("https://pump.fun/token/rug", "_blank")}
        >
          <ExternalLink className="h-3 w-3 mr-1" /> View on Pump.fun
        </Button>
      </div>
      
      <div className="space-y-3">
        <div className="flex items-start">
          <div className="mt-1 h-5 w-5 rounded-full bg-roulette-gold/20 flex-shrink-0 flex items-center justify-center text-xs text-roulette-gold font-bold">
            1
          </div>
          <p className="ml-3 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Boost your winnings</span>: Stake RUG tokens to increase your win multipliers by up to 2x.
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 h-5 w-5 rounded-full bg-roulette-gold/20 flex-shrink-0 flex items-center justify-center text-xs text-roulette-gold font-bold">
            2
          </div>
          <p className="ml-3 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Exclusive access</span>: Unlock VIP spins with higher rewards when you hold 1000+ RUG tokens.
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 h-5 w-5 rounded-full bg-roulette-gold/20 flex-shrink-0 flex items-center justify-center text-xs text-roulette-gold font-bold">
            3
          </div>
          <p className="ml-3 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Governance</span>: Vote on future features and jackpot distributions with your RUG tokens.
          </p>
        </div>
        
        <div className="flex items-start">
          <div className="mt-1 h-5 w-5 rounded-full bg-roulette-gold/20 flex-shrink-0 flex items-center justify-center text-xs text-roulette-gold font-bold">
            4
          </div>
          <p className="ml-3 text-sm text-muted-foreground">
            <span className="text-foreground font-medium">Reduced fees</span>: Pay lower platform fees when you use RUG tokens for betting.
          </p>
        </div>
      </div>
      
      <div className="mt-4 flex justify-between items-center pt-3 border-t border-white/5">
        <div>
          <span className="text-xs text-muted-foreground">Current Price:</span>
          <span className="ml-1 text-sm font-medium text-roulette-gold">0.00021 SOL</span>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">Market Cap:</span>
          <span className="ml-1 text-sm font-medium text-roulette-gold">21,000 SOL</span>
        </div>
      </div>
    </div>
  );
};

export default TokenUtility;
