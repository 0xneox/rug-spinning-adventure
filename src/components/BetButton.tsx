
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface BetButtonProps {
  onBet: () => void;
  disabled: boolean;
  isWalletConnected: boolean;
}

const BetButton = ({ onBet, disabled, isWalletConnected }: BetButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBet = async () => {
    if (!isWalletConnected) {
      toast.error("Please connect your wallet first");
      return;
    }

    try {
      setIsProcessing(true);
      
      // This would be replaced with actual blockchain transaction
      toast.loading("Sending transaction to Solana blockchain...");
      
      // Simulate blockchain confirmation delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Call the onBet function which would handle actual betting logic
      onBet();
      
      toast.success("Transaction confirmed! Your bet has been placed.");
    } catch (error) {
      toast.error("Transaction failed. Please try again.");
      console.error("Betting error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="relative">
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 rounded-xl bg-roulette-gold/30 blur-xl transition-opacity duration-500 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      
      <Button 
        onClick={handleBet}
        disabled={disabled || !isWalletConnected || isProcessing}
        className={`relative w-full px-6 py-6 h-auto text-xl font-medium rounded-xl transition-all duration-300 ${
          disabled || isProcessing
            ? 'bg-muted text-muted-foreground cursor-not-allowed' 
            : 'bg-roulette-gold text-black hover:bg-roulette-gold/90 button-glow'
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex flex-col items-center">
          {isProcessing ? (
            <>
              <div className="flex items-center">
                <div className="animate-spin h-5 w-5 border-2 border-black border-t-transparent rounded-full mr-2"></div>
                <span>Processing...</span>
              </div>
              <span className="text-xs mt-1 opacity-80">Confirming on Solana</span>
            </>
          ) : (
            <>
              <span>Bet 0.1 SOL</span>
              {!isWalletConnected && (
                <span className="text-xs mt-1 opacity-80">Connect wallet first</span>
              )}
              {disabled && isWalletConnected && (
                <span className="text-xs mt-1 opacity-80">Waiting for next round</span>
              )}
            </>
          )}
        </div>
      </Button>
    </div>
  );
};

export default BetButton;
