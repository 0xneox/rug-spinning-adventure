
import { FileText, ExternalLink, ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TokenUtility = () => {
  return (
    <div className="glassmorphism rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gradient flex items-center">
          <FileText className="mr-2 h-5 w-5" /> RUG Token Utility
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-white/10 hover:bg-white/5"
            onClick={() => window.open("https://pump.fun/token/rug", "_blank")}
          >
            <ExternalLink className="h-3 w-3 mr-1" /> Buy on Pump.fun
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-xs border-white/10 hover:bg-white/5"
            onClick={() => window.open("https://jup.ag/swap/SOL-RUG", "_blank")}
          >
            <ArrowUpRight className="h-3 w-3 mr-1" /> Swap on Jupiter
          </Button>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
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
      
      <div className="p-3 bg-black/20 rounded-lg border border-white/5 mb-3">
        <h4 className="text-sm font-medium mb-1">Token Contract</h4>
        <div className="flex items-center">
          <code className="text-xs text-muted-foreground bg-black/30 p-1 rounded">rugX7qJDE83eQnwrKGMC1L3oYzB68QcHLcmj5XrDCn4W</code>
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-6 w-6 p-0 ml-2"
            onClick={() => {
              navigator.clipboard.writeText("rugX7qJDE83eQnwrKGMC1L3oYzB68QcHLcmj5XrDCn4W");
              toast.success("Contract address copied!");
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
          </Button>
        </div>
      </div>
      
      <div className="mt-3 flex justify-between items-center pt-3 border-t border-white/5">
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
