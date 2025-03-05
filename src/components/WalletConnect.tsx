
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const MOCK_ADDRESS = "Gw6ntSQA...2N7Cgqn";

const WalletConnect = () => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState("0.0");

  const handleConnectWallet = () => {
    setLoading(true);
    // Mock wallet connection
    setTimeout(() => {
      setConnected(true);
      setWalletBalance("1.25");
      setLoading(false);
    }, 1500);
  };

  const handleDisconnect = () => {
    setConnected(false);
  };

  if (connected) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="px-4 py-2 h-10 bg-secondary/40 border border-white/10 backdrop-blur-sm hover:bg-secondary/60 transition-all"
          >
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2 pulse-subtle"></div>
              <span className="mr-2">{MOCK_ADDRESS}</span>
              <span className="text-roulette-gold font-medium">{walletBalance} SOL</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 glassmorphism border-white/10">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none text-gradient">Wallet</h4>
              <p className="text-sm text-muted-foreground">
                Connected to Phantom
              </p>
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">SOL Balance:</span>
                <span className="font-medium">{walletBalance}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">RUG Tokens:</span>
                <span className="font-medium">0</span>
              </div>
              <Button 
                variant="outline" 
                className="mt-2 text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5"
                onClick={handleDisconnect}
              >
                Disconnect
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Button 
      className="h-10 px-6 bg-roulette-gold text-black hover:bg-roulette-gold/90 button-glow font-medium"
      onClick={handleConnectWallet}
      disabled={loading}
    >
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin h-4 w-4 border-2 border-black border-t-transparent rounded-full mr-2"></div>
          Connecting...
        </div>
      ) : (
        "Connect Wallet"
      )}
    </Button>
  );
};

export default WalletConnect;
