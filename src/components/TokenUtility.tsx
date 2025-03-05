
import { FileText, ExternalLink, ArrowUpRight, Sparkles, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useState } from 'react';

const TokenUtility = () => {
  const [activeHover, setActiveHover] = useState<number | null>(null);

  return (
    <motion.div 
      className="glassmorphism rounded-xl p-5 mb-6 relative overflow-hidden preserve-3d perspective-1000"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      style={{ transformStyle: 'preserve-3d' }}
      whileHover={{ 
        scale: 1.01,
        boxShadow: "0 20px 80px rgba(212, 175, 55, 0.15)",
        transition: { duration: 0.3 }
      }}
    >
      {/* Interactive background elements */}
      <div className="absolute -top-20 -right-20 w-60 h-60 bg-roulette-gold/10 rounded-full blur-3xl animate-pulse-subtle"></div>
      <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-roulette-gold/10 rounded-full blur-3xl animate-pulse-subtle"></div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-roulette-gold/60"
            initial={{ 
              x: `${Math.random() * 100}%`, 
              y: `${Math.random() * 100}%`,
              opacity: 0.3
            }}
            animate={{ 
              y: [`${Math.random() * 100}%`, `${Math.random() * 100}%`],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{ 
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        ))}
      </div>
      
      <div className="relative">
        <div className="flex items-center justify-between mb-4">
          <motion.h3 
            className="text-lg font-medium text-gradient flex items-center holographic"
            whileHover={{ scale: 1.02 }}
          >
            <FileText className="mr-2 h-5 w-5" /> RUG Token Utility
            <Sparkles className="ml-2 h-3 w-3 text-roulette-gold" />
          </motion.h3>
          <div className="flex gap-2">
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.98 }}
              className="ambient-glow"
            >
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                onClick={() => window.open("https://pump.fun/token/rug", "_blank")}
              >
                <ExternalLink className="h-3 w-3 mr-1" /> Buy on Pump.fun
              </Button>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05, y: -2 }} 
              whileTap={{ scale: 0.98 }}
              className="ambient-glow"
            >
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
        
        <div className="space-y-4 mb-4 perspective-1000">
          {[
            { id: 1, title: "Boost your winnings", desc: "Stake RUG tokens to increase your win multipliers by up to 2x.", icon: <TrendingUp className="h-4 w-4 text-roulette-gold" /> },
            { id: 2, title: "Exclusive access", desc: "Unlock VIP spins with higher rewards when you hold 1000+ RUG tokens.", icon: <Award className="h-4 w-4 text-roulette-gold" /> },
            { id: 3, title: "Governance", desc: "Vote on future features and jackpot distributions with your RUG tokens.", icon: <Sparkles className="h-4 w-4 text-roulette-gold" /> },
            { id: 4, title: "Reduced fees", desc: "Pay lower platform fees when you use RUG tokens for betting.", icon: <ArrowUpRight className="h-4 w-4 text-roulette-gold" /> }
          ].map(item => (
            <motion.div 
              key={item.id}
              className="flex items-start p-3 rounded-lg bg-white/5 border border-white/10 hover:border-roulette-gold/30 transition-all duration-300 transform preserve-3d"
              whileHover={{ 
                backgroundColor: "rgba(255, 255, 255, 0.07)", 
                y: -2,
                rotateX: 2,
                boxShadow: "0 10px 30px rgba(212, 175, 55, 0.15)",
                z: 10
              }}
              onHoverStart={() => setActiveHover(item.id)}
              onHoverEnd={() => setActiveHover(null)}
            >
              <div className="mt-1 h-5 w-5 rounded-full bg-roulette-gold/20 flex-shrink-0 flex items-center justify-center text-xs text-roulette-gold font-bold">
                {item.id}
              </div>
              <div className="ml-3">
                <div className="flex items-center gap-1.5">
                  {item.icon}
                  <span className="text-foreground font-medium">{item.title}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {item.desc}
                </p>
                
                {/* Hover reveal effect */}
                {activeHover === item.id && (
                  <motion.div 
                    className="mt-2 text-xs text-roulette-gold/80 flex items-center"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sparkles className="h-3 w-3 mr-1" /> Learn more about this benefit
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <motion.div 
          className="p-3 bg-black/30 rounded-lg border border-white/10 mb-3 relative overflow-hidden holographic"
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
          
          {/* Scan QR code reveal on hover */}
          <motion.div
            className="mt-2 flex justify-center items-center"
            initial={{ opacity: 0, height: 0 }}
            whileHover={{ opacity: 1, height: 'auto' }}
          >
            <div className="bg-white/10 p-1 rounded">
              {/* Placeholder for QR code - in a real app this would be an actual QR code */}
              <div className="w-16 h-16 grid grid-cols-6 grid-rows-6 gap-0.5 opacity-70">
                {Array(36).fill(0).map((_, i) => (
                  <div key={i} className={`${Math.random() > 0.5 ? 'bg-white' : 'bg-transparent'}`}></div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-3 flex justify-between items-center pt-3 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <motion.div 
            className="bg-black/20 px-3 py-1.5 rounded-full"
            whileHover={{ 
              backgroundColor: "rgba(212, 175, 55, 0.1)",
              transition: { duration: 0.2 }
            }}
          >
            <span className="text-xs text-muted-foreground">Current Price:</span>
            <span className="ml-1 text-sm font-medium text-roulette-gold">0.00021 SOL</span>
          </motion.div>
          <motion.div 
            className="bg-black/20 px-3 py-1.5 rounded-full"
            whileHover={{ 
              backgroundColor: "rgba(212, 175, 55, 0.1)",
              transition: { duration: 0.2 }
            }}
          >
            <span className="text-xs text-muted-foreground">Market Cap:</span>
            <span className="ml-1 text-sm font-medium text-roulette-gold">21,000 SOL</span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TokenUtility;
