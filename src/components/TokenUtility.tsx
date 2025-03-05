
import { FileText, ExternalLink, ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const TokenUtility = () => {
  return (
    <motion.div 
      className="glassmorphism rounded-xl p-5 mb-6 relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background glow effects */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-roulette-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-roulette-gold/10 rounded-full blur-3xl"></div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <motion.h3 
            className="text-lg font-medium text-gradient flex items-center"
            whileHover={{ scale: 1.02 }}
          >
            <FileText className="mr-2 h-5 w-5" /> RUG Token Utility
            <Sparkles className="ml-2 h-3 w-3 text-roulette-gold" />
          </motion.h3>
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                onClick={() => window.open("https://pump.fun/token/rug", "_blank")}
              >
                <ExternalLink className="h-3 w-3 mr-1" /> Buy on Pump.fun
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                onClick={() => window.open("https://jup.ag/swap/SOL-RUG", "_blank")}
              >
                <ArrowUpRight className="h-3 w-3 mr-1" /> Swap on Jupiter
              </Button>
            </motion.div>
          </div>
        </div>
        
        <div className="space-y-4 mb-4">
          {[
            { id: 1, title: "Boost your winnings", desc: "Stake RUG tokens to increase your win multipliers by up to 2x." },
            { id: 2, title: "Exclusive access", desc: "Unlock VIP spins with higher rewards when you hold 1000+ RUG tokens." },
            { id: 3, title: "Governance", desc: "Vote on future features and jackpot distributions with your RUG tokens." },
            { id: 4, title: "Reduced fees", desc: "Pay lower platform fees when you use RUG tokens for betting." }
          ].map(item => (
            <motion.div 
              key={item.id}
              className="flex items-start p-3 rounded-lg bg-white/5 border border-white/10 hover:border-roulette-gold/30 transition-all duration-300"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.07)", 
                y: -2,
                boxShadow: "0 4px 20px rgba(212, 175, 55, 0.1)"
              }}
            >
              <div className="mt-1 h-5 w-5 rounded-full bg-roulette-gold/20 flex-shrink-0 flex items-center justify-center text-xs text-roulette-gold font-bold">
                {item.id}
              </div>
              <p className="ml-3 text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{item.title}</span>: {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="p-3 bg-black/30 rounded-lg border border-white/10 mb-3 relative overflow-hidden"
          whileHover={{ borderColor: "rgba(212, 175, 55, 0.3)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full hover:translate-x-full transition-all duration-3000 ease-in-out"></div>
          <h4 className="text-sm font-medium mb-1">Token Contract</h4>
          <div className="flex items-center">
            <code className="text-xs text-muted-foreground bg-black/40 p-1.5 rounded font-mono tracking-tight">rugX7qJDE83eQnwrKGMC1L3oYzB68QcHLcmj5XrDCn4W</code>
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-6 w-6 p-0 ml-2 hover:bg-roulette-gold/20 transition-colors duration-300"
              onClick={() => {
                navigator.clipboard.writeText("rugX7qJDE83eQnwrKGMC1L3oYzB68QcHLcmj5XrDCn4W");
                toast.success("Contract address copied!");
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            </Button>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-3 flex justify-between items-center pt-3 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="bg-black/20 px-3 py-1.5 rounded-full">
            <span className="text-xs text-muted-foreground">Current Price:</span>
            <span className="ml-1 text-sm font-medium text-roulette-gold">0.00021 SOL</span>
          </div>
          <div className="bg-black/20 px-3 py-1.5 rounded-full">
            <span className="text-xs text-muted-foreground">Market Cap:</span>
            <span className="ml-1 text-sm font-medium text-roulette-gold">21,000 SOL</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TokenUtility;
