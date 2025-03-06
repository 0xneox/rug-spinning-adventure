
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Coins } from 'lucide-react';
import { motion } from 'framer-motion';

interface BetAmountSelectorProps {
  defaultValue: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

const BetAmountSelector = ({
  defaultValue = 0.1,
  onChange,
  min = 0.01,
  max = 10,
  step = 0.01
}: BetAmountSelectorProps) => {
  const [betAmount, setBetAmount] = useState(defaultValue);
  
  const handleSliderChange = (newValue: number[]) => {
    const value = newValue[0];
    setBetAmount(value);
    onChange(value);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    
    if (isNaN(value)) {
      value = min;
    } else {
      value = Math.min(Math.max(value, min), max);
    }
    
    setBetAmount(value);
    onChange(value);
  };

  // Predefined quick selection amounts
  const quickAmounts = [0.1, 0.5, 1, 5, 10];
  
  return (
    <div className="space-y-3 w-full">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">Bet Amount</span>
        <div className="flex items-center bg-background/20 px-2 py-1 rounded border border-white/10">
          <Coins className="h-3.5 w-3.5 mr-1.5 text-roulette-gold" />
          <span className="text-sm font-medium">{betAmount.toFixed(2)} SOL</span>
        </div>
      </div>
      
      <div className="px-1">
        <Slider
          defaultValue={[defaultValue]}
          min={min}
          max={max}
          step={step}
          value={[betAmount]}
          onValueChange={handleSliderChange}
          className="my-5"
        />
      </div>
      
      <div className="flex space-x-1.5 justify-between">
        {quickAmounts.map((amount) => (
          <motion.button
            key={amount}
            onClick={() => {
              setBetAmount(amount);
              onChange(amount);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`relative flex-1 py-1 text-xs rounded border ${
              Math.abs(betAmount - amount) < 0.001 
                ? 'bg-roulette-gold/20 border-roulette-gold text-white' 
                : 'bg-background/20 border-white/10 text-muted-foreground hover:text-white hover:border-white/30'
            } transition-colors font-medium`}
          >
            {amount} SOL
          </motion.button>
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          value={betAmount}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          className="flex-1 bg-background/20 border-white/10 font-medium text-center"
        />
        <span className="text-sm font-medium">SOL</span>
      </div>
    </div>
  );
};

export default BetAmountSelector;
