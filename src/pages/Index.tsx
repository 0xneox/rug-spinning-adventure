
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import RouletteWheel from '../components/RouletteWheel';
import Pot from '../components/Pot';
import BetButton from '../components/BetButton';
import WinnersList from '../components/WinnersList';
import GameRules from '../components/GameRules';
import ReferralSystem from '../components/ReferralSystem';
import Rewards from '../components/Rewards';
import TokenUtility from '../components/TokenUtility';
import LiveStats from '../components/LiveStats';
import MobileAppPromo from '../components/MobileAppPromo';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';
import { useDevice } from '@/hooks/use-device';

const Index = () => {
  const [pot, setPot] = useState(1.2);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [timeToNextSpin, setTimeToNextSpin] = useState(60);
  const [showJackpot, setShowJackpot] = useState(false);
  const { triggerHaptic } = useTheme();
  const { type: deviceType } = useDevice();
  
  const isMobile = deviceType === 'mobile';
  
  // Mock function to check wallet connection
  useEffect(() => {
    // This simulates checking if wallet is connected
    const checkWallet = () => {
      // For demo purposes, we'll just assume wallet isn't connected initially
      setIsWalletConnected(false);
    };
    
    checkWallet();
    
    // Listen for wallet connection changes
    const handleWalletConnection = (event: CustomEvent) => {
      if (event.detail && event.detail.connected !== undefined) {
        setIsWalletConnected(event.detail.connected);
      }
    };
    
    // This is a mock event. In a real app, this would come from your wallet adapter
    window.addEventListener('walletConnectionChanged' as any, handleWalletConnection);
    
    return () => {
      window.removeEventListener('walletConnectionChanged' as any, handleWalletConnection);
    };
  }, []);
  
  // Countdown timer for the next spin
  useEffect(() => {
    if (isSpinning) return;
    
    const timer = setInterval(() => {
      setTimeToNextSpin((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-spin when timer reaches 0
          setIsSpinning(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isSpinning]);

  // Check for referral when component mounts
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    
    if (refCode) {
      // Store referral info in local storage
      localStorage.setItem('referredBy', refCode);
      toast.success(`Referral detected! You'll get a free spin after your first bet.`);
    }
  }, []);
  
  // Handle bet
  const handleBet = () => {
    triggerHaptic('medium');
    
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    // In a real app, this would send a transaction to the blockchain
    toast.success("Bet placed successfully!");
    
    // For demo, add 0.1 SOL to the pot (minus 5% fee)
    setPot((prev) => prev + 0.095);

    // Check if user is placing their first bet and was referred
    const isFirstBet = !localStorage.getItem('firstBetPlaced');
    const referredBy = localStorage.getItem('referredBy');
    
    if (isFirstBet && referredBy) {
      toast.success(`Your referrer ${referredBy.slice(0, 8)}... earned a reward!`);
      localStorage.setItem('firstBetPlaced', 'true');
    }
  };
  
  // Handle spin completion
  const handleSpinComplete = (result: number) => {
    // Process the result
    if (result === 0) {
      // Rug pull - you lose
      toast.error("RUG PULL! Better luck next time...");
      triggerHaptic('heavy');
    } else if (result === 3) {
      // Jackpot
      toast.success("JACKPOT! You won the entire pot + 1000 RUG tokens!");
      setShowJackpot(true);
      triggerHaptic('heavy');
      
      // Reset pot after a short delay
      setTimeout(() => {
        setPot(0);
        setShowJackpot(false);
      }, 5000);
    } else {
      // Regular win
      const multiplier = result === 1 || result === 4 ? 1.5 : 2;
      toast.success(`You won ${multiplier}x your bet!`);
      triggerHaptic('medium');
    }
    
    // Reset spinning state and timer
    setTimeout(() => {
      setIsSpinning(false);
      setTimeToNextSpin(60);
    }, 3000);
  };

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container max-w-6xl px-4 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Rug Roulette</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Bet, spin, win big or get rugged. The ultimate Solana gambling experience.
          </p>
        </motion.div>

        <LiveStats />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="md:col-span-2 flex flex-col items-center">
            <RouletteWheel 
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
            />
            
            <div className="mt-10 mb-6 text-center">
              {!isSpinning ? (
                <div className="text-xl font-medium">
                  <span className="text-muted-foreground">Next spin in: </span>
                  <span className="text-roulette-gold">{timeToNextSpin}s</span>
                </div>
              ) : (
                <div className="text-xl font-medium animate-pulse-subtle">
                  <span>Spinning...</span>
                </div>
              )}
            </div>
            
            <div className="w-full max-w-sm">
              <BetButton 
                onBet={handleBet}
                disabled={isSpinning}
                isWalletConnected={isWalletConnected}
              />
            </div>
          </div>
          
          <div className="flex flex-col space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              id="pot"
            >
              <Pot amount={pot} isJackpot={showJackpot} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <Rewards isWalletConnected={isWalletConnected} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <WinnersList />
            </motion.div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <ReferralSystem />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <TokenUtility />
          </motion.div>
        </div>
        
        <MobileAppPromo />
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mb-16"
        >
          <GameRules />
        </motion.div>
      </div>
      
      <footer className="py-6 border-t border-white/5 bg-secondary/20">
        <div className="container max-w-6xl px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="h-8 w-8 rounded-full border-2 border-roulette-gold flex items-center justify-center">
                <span className="text-roulette-gold font-bold text-xs">RR</span>
              </div>
              <span className="ml-2 text-sm text-muted-foreground">© 2025 Rug Roulette</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <a href="https://twitter.com/RugRouletteSOL" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </a>
              <a href="https://pump.fun/token/rug" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                RUG Token
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
};

export default Index;
