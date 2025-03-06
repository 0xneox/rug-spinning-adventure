
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from 'sonner';
import { useTheme } from '@/providers/ThemeProvider';

// This would be replaced with actual wallet adapter
const MOCK_ADDRESS = "Gw6ntSQA...2N7Cgqn";

const WalletConnect = () => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState("0.0");
  const [rugTokenBalance, setRugTokenBalance] = useState("0");
  const { triggerHaptic } = useTheme();

  const handleConnectWallet = () => {
    setLoading(true);
    triggerHaptic('medium');
    
    // This simulates wallet connection - would be replaced with actual wallet adapter
    setTimeout(() => {
      try {
        // Mock for now - would use actual wallet connection
        setConnected(true);
        setWalletBalance("1.25");
        setRugTokenBalance("250");
        
        // Dispatch a custom event to notify other components
        window.dispatchEvent(new CustomEvent('walletConnectionChanged', {
          detail: { connected: true }
        }));
        
        toast.success("Wallet successfully connected!");
        setLoading(false);
      } catch (error) {
        toast.error("Failed to connect wallet. Please try again.");
        setLoading(false);
      }
    }, 1500);
  };

  const handleDisconnect = () => {
    triggerHaptic('medium');
    setConnected(false);
    setWalletBalance("0.0");
    setRugTokenBalance("0");
    
    // Notify other components about wallet disconnection
    window.dispatchEvent(new CustomEvent('walletConnectionChanged', {
      detail: { connected: false }
    }));
    
    toast.info("Wallet disconnected");
  };

  const handleBuyTokens = () => {
    triggerHaptic('light');
    window.open("https://pump.fun/token/rug", "_blank");
  };

  // In a real implementation, we would add a useEffect to listen for wallet changes

  if (connected) {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            className="px-4 py-2 h-10 bg-secondary/40 border border-white/10 backdrop-blur-sm hover:bg-secondary/60 transition-all"
            onClick={() => triggerHaptic('light')}
          >
            <div className="flex items-center">
              <div className="h-2 w-2 rounded-full bg-green-500 mr-2 pulse-subtle"></div>
              <span className="mr-2 hidden md:inline">{MOCK_ADDRESS}</span>
              <span className="mr-2 md:hidden">Connected</span>
              <span className="text-roulette-gold font-medium">{walletBalance} SOL</span>
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64 glassmorphism border-white/10">
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
                <span className="font-medium">{rugTokenBalance}</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="mt-2 text-green-400 hover:text-green-300 border-green-500/20 hover:border-green-500/30 hover:bg-green-500/5"
                onClick={handleBuyTokens}
              >
                Buy RUG Tokens
              </Button>
              <Button 
                variant="outline" 
                className="mt-1 text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5"
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
