
const GameRules = () => {
  return (
    <div id="rules" className="w-full max-w-2xl mx-auto glassmorphism rounded-xl overflow-hidden">
      <div className="p-4 border-b border-white/5">
        <h3 className="text-lg font-medium text-gradient">How to Play</h3>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="space-y-2">
          <h4 className="font-medium">Simple Rules:</h4>
          <ol className="list-decimal pl-5 space-y-2 text-sm">
            <li>Connect your Solana wallet (Phantom, Solflare, etc.)</li>
            <li>Bet 0.1 SOL to join the current round</li>
            <li>Wait for the wheel to spin every 60 seconds</li>
            <li>Win multipliers, jackpot, or get rugged!</li>
          </ol>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="glassmorphism rounded-lg p-4 border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium">Win (1.5x - 2x)</h5>
              <span className="px-2 py-0.5 bg-roulette-win/20 text-roulette-win text-xs rounded-full border border-roulette-win/30">80% Chance</span>
            </div>
            <p className="text-muted-foreground">Multiply your bet by 1.5x or 2x and collect your winnings instantly!</p>
          </div>
          
          <div className="glassmorphism rounded-lg p-4 border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium">Jackpot</h5>
              <span className="px-2 py-0.5 bg-roulette-jackpot/20 text-roulette-jackpot text-xs rounded-full border border-roulette-jackpot/30">10% Chance</span>
            </div>
            <p className="text-muted-foreground">Win the entire pot plus 1000 RUG tokens! The bigger the pot, the bigger your win.</p>
          </div>
          
          <div className="glassmorphism rounded-lg p-4 border border-white/5">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium">Rug Pull</h5>
              <span className="px-2 py-0.5 bg-roulette-red/20 text-roulette-red text-xs rounded-full border border-roulette-red/30">10% Chance</span>
            </div>
            <p className="text-muted-foreground">You got rugged! Your bet is added to the pot for the next lucky winner.</p>
          </div>
        </div>
        
        <div className="rounded-lg p-4 border border-white/5 bg-secondary/20">
          <h5 className="font-medium mb-2">About RUG Token</h5>
          <p className="text-sm text-muted-foreground">
            RUG is the native token of Rug Roulette. Win RUG tokens via Jackpot, trade them on Pump.fun, or use them for boosted odds in future game updates.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GameRules;
