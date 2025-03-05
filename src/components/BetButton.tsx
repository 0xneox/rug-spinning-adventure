
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface BetButtonProps {
  onBet: () => void;
  disabled: boolean;
  isWalletConnected: boolean;
}

const BetButton = ({ onBet, disabled, isWalletConnected }: BetButtonProps) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div className="relative">
      {/* Glow effect */}
      <div 
        className={`absolute inset-0 rounded-xl bg-roulette-gold/30 blur-xl transition-opacity duration-500 ${
          isHovering ? 'opacity-100' : 'opacity-0'
        }`}
      ></div>
      
      <Button 
        onClick={onBet}
        disabled={disabled || !isWalletConnected}
        className={`relative w-full px-6 py-6 h-auto text-xl font-medium rounded-xl transition-all duration-300 ${
          disabled 
            ? 'bg-muted text-muted-foreground cursor-not-allowed' 
            : 'bg-roulette-gold text-black hover:bg-roulette-gold/90 button-glow'
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex flex-col items-center">
          <span>Bet 0.1 SOL</span>
          {!isWalletConnected && (
            <span className="text-xs mt-1 opacity-80">Connect wallet first</span>
          )}
          {disabled && isWalletConnected && (
            <span className="text-xs mt-1 opacity-80">Waiting for next round</span>
          )}
        </div>
      </Button>
    </div>
  );
};

export default BetButton;
