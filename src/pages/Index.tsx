import { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';
import { useDevice } from '@/hooks/use-device';
import { useNetwork } from '@/hooks/use-network';
import { useOptimisticUpdate } from '@/hooks/use-optimistic-update';
import { AnimatedContainer, FloatingParticles } from '@/components/ui/motion-effects';
import { AlertCircle, WifiOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Index = () => {
  const [pot, setPot] = useState(1.2);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [timeToNextSpin, setTimeToNextSpin] = useState(60);
  const [showJackpot, setShowJackpot] = useState(false);
  const { triggerHaptic } = useTheme();
  const { type: deviceType, perfTier, prefersReducedMotion } = useDevice();
  const { status: networkStatus, isOnline } = useNetwork();
  
  const isMobile = deviceType === 'mobile';
  const isLowPerformance = perfTier === 'low';
  
  const betUpdate = useOptimisticUpdate<{ success: boolean, newPot: number }>({
    successMessage: "Bet placed successfully!",
    errorMessage: "Failed to place bet. Please try again."
  });
  
  useEffect(() => {
    const checkWallet = () => {
      setIsWalletConnected(false);
    };
    
    checkWallet();
    
    const handleWalletConnection = (event: CustomEvent) => {
      if (event.detail && event.detail.connected !== undefined) {
        setIsWalletConnected(event.detail.connected);
      }
    };
    
    window.addEventListener('walletConnectionChanged' as any, handleWalletConnection);
    
    return () => {
      window.removeEventListener('walletConnectionChanged' as any, handleWalletConnection);
    };
  }, []);
  
  useEffect(() => {
    if (isSpinning) return;
    
    const timer = setInterval(() => {
      setTimeToNextSpin((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsSpinning(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [isSpinning]);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    
    if (refCode) {
      localStorage.setItem('referredBy', refCode);
      toast.success(`Referral detected! You'll get a free spin after your first bet.`);
    }
  }, []);
  
  const handleBet = useCallback(async (betAmount: number) => {
    triggerHaptic('medium');
    
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }
    
    const fee = betAmount * 0.05;
    const netBetAmount = betAmount - fee;
    
    const currentPot = pot;
    const optimisticNewPot = pot + netBetAmount;
    
    try {
      await betUpdate.execute(
        new Promise((resolve, reject) => {
          setTimeout(() => {
            if (Math.random() > 0.1) {
              resolve({ success: true, newPot: optimisticNewPot });
            } else {
              reject(new Error("Transaction failed"));
            }
          }, 2000);
        }),
        { success: true, newPot: optimisticNewPot }
      );
      
      if (betUpdate.isSuccess && betUpdate.data) {
        setPot(betUpdate.data.newPot);
      }

      const isFirstBet = !localStorage.getItem('firstBetPlaced');
      const referredBy = localStorage.getItem('referredBy');
      
      if (isFirstBet && referredBy) {
        toast.success(`Your referrer ${referredBy.slice(0, 8)}... earned a reward!`);
        localStorage.setItem('firstBetPlaced', 'true');
      }
    } catch (error) {
      console.error("Betting error:", error);
    }
  }, [pot, isWalletConnected, triggerHaptic, betUpdate]);
  
  const handleSpinComplete = useCallback((result: number) => {
    if (result === 0) {
      toast.error("RUG PULL! Better luck next time...");
      triggerHaptic('heavy');
    } else if (result === 3) {
      toast.success("JACKPOT! You won the entire pot + 1000 RUG tokens!");
      setShowJackpot(true);
      triggerHaptic('heavy');
      
      setTimeout(() => {
        setPot(0);
        setShowJackpot(false);
      }, 5000);
    } else {
      const multiplier = result === 1 || result === 4 ? 1.5 : 2;
      toast.success(`You won ${multiplier}x your bet!`);
      triggerHaptic('medium');
    }
    
    setTimeout(() => {
      setIsSpinning(false);
      setTimeToNextSpin(60);
    }, 3000);
  }, [triggerHaptic]);
  
  const MainContent = useMemo(() => (
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
            disabled={isSpinning || betUpdate.isLoading}
            isWalletConnected={isWalletConnected}
          />
        </div>
      </div>
      
      <div className="flex flex-col space-y-6">
        <AnimatedContainer
          type="scale"
          delay={0.2}
          id="pot"
        >
          <Pot amount={pot} isJackpot={showJackpot} />
        </AnimatedContainer>
        
        <AnimatedContainer
          type="scale"
          delay={0.3}
        >
          <Rewards isWalletConnected={isWalletConnected} />
        </AnimatedContainer>
        
        <AnimatedContainer
          type="scale"
          delay={0.4}
        >
          <WinnersList />
        </AnimatedContainer>
      </div>
    </div>
  ), [pot, isSpinning, timeToNextSpin, handleBet, isWalletConnected, handleSpinComplete, showJackpot, betUpdate.isLoading]);
  
  const FeatureContent = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <AnimatedContainer
        type="fade"
        delay={0.5}
      >
        <ReferralSystem />
      </AnimatedContainer>
      
      <AnimatedContainer
        type="fade"
        delay={0.6}
      >
        <TokenUtility />
      </AnimatedContainer>
    </div>
  ), []);

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container max-w-6xl px-4 pt-24 pb-16">
        <AnimatedContainer 
          type="fade"
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Rug Roulette</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-xl mx-auto">
            Bet, spin, win big or get rugged. The ultimate Solana gambling experience.
          </p>
        </AnimatedContainer>

        <AnimatePresence>
          {!isOnline && (
            <AnimatedContainer type="fade" className="mb-6">
              <Alert variant="destructive" className="bg-destructive/20 border-destructive/30">
                <WifiOff className="h-4 w-4" />
                <AlertDescription className="flex items-center">
                  You're currently offline. Please check your connection to continue betting.
                </AlertDescription>
              </Alert>
            </AnimatedContainer>
          )}
          
          {isOnline && networkStatus === 'slow' && (
            <AnimatedContainer type="fade" className="mb-6">
              <Alert variant="default" className="bg-orange-500/10 border-orange-500/30 text-orange-300">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="flex items-center">
                  Your connection is slow. Transactions may take longer to process.
                </AlertDescription>
              </Alert>
            </AnimatedContainer>
          )}
        </AnimatePresence>

        <Suspense fallback={<div className="text-center py-10">Loading stats...</div>}>
          <LiveStats />
        </Suspense>
        
        {MainContent}
        
        {FeatureContent}
        
        <MobileAppPromo />
        
        <AnimatedContainer
          type="fade"
          delay={0.7}
          className="mb-16"
        >
          <GameRules />
        </AnimatedContainer>
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
