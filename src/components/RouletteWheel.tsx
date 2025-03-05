
import { useState, useEffect } from 'react';

// Define the segments of the wheel
const segments = [
  { id: 0, label: "RUG PULL", color: "#E63946", textColor: "white", chance: 10 },
  { id: 1, label: "1.5x", color: "#10B981", textColor: "white", chance: 30 },
  { id: 2, label: "2x", color: "#3B82F6", textColor: "white", chance: 20 },
  { id: 3, label: "JACKPOT", color: "#8B5CF6", textColor: "white", chance: 10 },
  { id: 4, label: "1.5x", color: "#10B981", textColor: "white", chance: 30 }
];

interface RouletteWheelProps {
  isSpinning: boolean;
  onSpinComplete: (result: number) => void;
}

const RouletteWheel = ({ isSpinning, onSpinComplete }: RouletteWheelProps) => {
  const [rotation, setRotation] = useState(0);
  const [winner, setWinner] = useState<number | null>(null);

  useEffect(() => {
    if (isSpinning) {
      // Determine a random winner
      const randomSegment = Math.floor(Math.random() * segments.length);
      setWinner(randomSegment);
      
      // Calculate the rotation needed to land on this segment
      // Add extra rotations for visual effect (5-10 full rotations)
      const extraRotations = 5 + Math.floor(Math.random() * 5);
      const degreesPerSegment = 360 / segments.length;
      const segmentMiddle = randomSegment * degreesPerSegment + degreesPerSegment / 2;
      
      // We subtract from 360 because the wheel rotates clockwise, but our indicator is at the top
      const destinationDegree = 360 - segmentMiddle;
      const totalRotation = destinationDegree + (extraRotations * 360);
      
      setRotation(totalRotation);
      
      // Notify parent component when spin is complete
      const spinDuration = 8000; // 8 seconds, should match the CSS animation duration
      setTimeout(() => {
        onSpinComplete(randomSegment);
      }, spinDuration);
    } else {
      setWinner(null);
    }
  }, [isSpinning, onSpinComplete]);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-square mt-10">
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-roulette-gold/20 blur-xl transform-gpu -translate-y-4"></div>
      
      {/* Wheel container */}
      <div className="relative w-full h-full">
        {/* Stationary indicator triangle at the top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10 h-8 w-8 flex justify-center">
          <div className="h-0 w-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-b-[16px] border-b-roulette-gold drop-shadow-lg"></div>
        </div>
        
        {/* Wheel */}
        <div 
          className="relative w-full h-full rounded-full overflow-hidden border-4 border-roulette-gold shadow-[0_0_50px_rgba(212,175,55,0.3)] transform-gpu"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: isSpinning ? 'transform 8s cubic-bezier(0.17, 0.67, 0.14, 0.99)' : 'none'
          }}
        >
          {segments.map((segment, index) => {
            const degreesPerSegment = 360 / segments.length;
            const rotateVal = index * degreesPerSegment;
            
            return (
              <div 
                key={index}
                className="absolute w-1/2 h-1/2 origin-bottom-right"
                style={{ 
                  transform: `rotate(${rotateVal}deg) skewY(${90 - degreesPerSegment}deg)`,
                  backgroundColor: segment.color,
                  overflow: 'hidden'
                }}
              >
                <div className="absolute bottom-0 right-0 w-[200%] h-[200%] flex items-center justify-center transform-gpu rotate-45 origin-bottom-right">
                  <span 
                    className="text-sm md:text-base font-bold tracking-wider"
                    style={{ color: segment.textColor }}
                  >
                    {segment.label}
                  </span>
                </div>
              </div>
            );
          })}
          
          {/* Center circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-roulette-black border-2 border-roulette-gold z-10 flex items-center justify-center">
            <span className="text-sm font-bold text-gradient">SPIN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RouletteWheel;
