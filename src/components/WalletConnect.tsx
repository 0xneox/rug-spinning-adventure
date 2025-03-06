
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { useTheme } from '@/providers/ThemeProvider';
import { Wallet, ArrowUpRight, ArrowRight, History, Loader2, CheckCircle2, AlertTriangle, ExternalLink, Coins, RefreshCw } from 'lucide-react';
import { useDevice } from '@/hooks/use-device';
import { motion, AnimatePresence } from 'framer-motion';
import { AnimatedContainer, ShimmerEffect } from './ui/motion-effects';

// This would be replaced with actual wallet adapter
const MOCK_ADDRESS = "Gw6ntSQA...2N7Cgqn";
const MOCK_FULL_ADDRESS = "Gw6ntSQAzP7HaEThT8BjtWg5yzDQNT2N7Cgqn";

const WalletConnect = () => {
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(false);
  const [walletBalance, setWalletBalance] = useState("0.0");
  const [rugTokenBalance, setRugTokenBalance] = useState("0");
  const [activeTab, setActiveTab] = useState('balance');
  const [showQR, setShowQR] = useState(false);
  const [transactionHistory, setTransactionHistory] = useState([
    { type: 'bet', amount: '0.1', status: 'completed', timestamp: Date.now() - 1000000 },
    { type: 'win', amount: '0.15', status: 'completed', timestamp: Date.now() - 900000 }
  ]);
  const { triggerHaptic } = useTheme();
  const { type: deviceType, isOnline, perfTier } = useDevice();
  
  const isMobile = deviceType === 'mobile';

  // Network status effect
  useEffect(() => {
    if (!isOnline && connected) {
      toast.error("Network connection lost. Some features may be unavailable.");
    }
  }, [isOnline, connected]);

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
  
  const handleCopyAddress = () => {
    navigator.clipboard.writeText(MOCK_FULL_ADDRESS);
    toast.success("Address copied to clipboard");
    triggerHaptic('light');
  };
  
  const handleViewOnExplorer = () => {
    window.open(`https://solscan.io/account/${MOCK_FULL_ADDRESS}`, "_blank");
    triggerHaptic('light');
  };
  
  const handleRefreshBalance = () => {
    toast.loading("Refreshing balances...");
    triggerHaptic('light');
    
    setTimeout(() => {
      setWalletBalance((parseFloat(walletBalance) + 0.01).toFixed(2));
      toast.success("Balances updated");
    }, 1000);
  };

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
        <PopoverContent className="w-80 p-0 glassmorphism border-white/10">
          <AnimatePresence>
            <Tabs defaultValue="balance" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gradient">Wallet</h4>
                  <Button 
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={handleRefreshBalance}
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground flex items-center">
                    <Wallet className="h-3.5 w-3.5 mr-1.5" />
                    <span 
                      className="cursor-pointer hover:text-foreground transition-colors"
                      onClick={handleCopyAddress}
                    >
                      {MOCK_ADDRESS}
                    </span>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="h-6 w-6"
                    onClick={handleViewOnExplorer}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
              
              <TabsList className="grid grid-cols-3 p-1 m-3 bg-background/20">
                <TabsTrigger value="balance" onClick={() => triggerHaptic('light')}>Balance</TabsTrigger>
                <TabsTrigger value="activity" onClick={() => triggerHaptic('light')}>Activity</TabsTrigger>
                <TabsTrigger value="rewards" onClick={() => triggerHaptic('light')}>Rewards</TabsTrigger>
              </TabsList>
              
              <TabsContent value="balance" className="p-4 space-y-4 focus:outline-none">
                <motion.div 
                  className="space-y-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 relative overflow-hidden">
                    <ShimmerEffect />
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground">SOL Balance</span>
                      <span className="font-medium text-xl">{walletBalance}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ≈ ${(parseFloat(walletBalance) * 145.30).toFixed(2)} USD
                    </div>
                  </div>
                  
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 relative overflow-hidden">
                    <ShimmerEffect />
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-muted-foreground flex items-center">
                        <Coins className="h-3.5 w-3.5 mr-1.5 text-roulette-gold" />
                        RUG Tokens
                      </span>
                      <span className="font-medium text-xl text-roulette-gold">{rugTokenBalance}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ≈ ${(parseFloat(rugTokenBalance) * 0.00021 * 145.30).toFixed(2)} USD
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-green-400 hover:text-green-300 border-green-500/20 hover:border-green-500/30 hover:bg-green-500/5"
                      onClick={handleBuyTokens}
                    >
                      <ArrowUpRight className="h-3.5 w-3.5 mr-1.5" />
                      Buy RUG Tokens
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-400 hover:text-blue-300 border-blue-500/20 hover:border-blue-500/30 hover:bg-blue-500/5"
                      onClick={() => setShowQR(!showQR)}
                    >
                      <ArrowRight className="h-3.5 w-3.5 mr-1.5" />
                      Receive
                    </Button>
                  </div>
                  
                  <AnimatePresence>
                    {showQR && (
                      <motion.div 
                        className="p-3 bg-black/30 border border-white/10 rounded-lg text-center"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="text-xs text-muted-foreground mb-2">Scan to send SOL or SPL tokens</div>
                        <div className="bg-white p-1 rounded inline-block mx-auto">
                          {/* QR code placeholder - in a real app this would be an actual QR */}
                          <div className="w-24 h-24 grid grid-cols-8 grid-rows-8 gap-0.5">
                            {Array(64).fill(0).map((_, i) => (
                              <div key={i} className={`${Math.random() > 0.5 ? 'bg-black' : 'bg-transparent'}`}></div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="activity" className="p-4 space-y-4 focus:outline-none">
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h5 className="text-sm font-medium mb-2">Recent Activity</h5>
                  
                  {transactionHistory.length > 0 ? (
                    <div className="space-y-2">
                      {transactionHistory.map((tx, index) => (
                        <div key={index} className="p-2.5 bg-white/5 rounded-lg border border-white/10 flex items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            tx.type === 'bet' ? 'bg-orange-500/20' : 
                            tx.type === 'win' ? 'bg-green-500/20' : 'bg-blue-500/20'
                          }`}>
                            {tx.type === 'bet' ? (
                              <Coins className="h-4 w-4 text-orange-500" />
                            ) : tx.type === 'win' ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500" />
                            ) : (
                              <History className="h-4 w-4 text-blue-400" />
                            )}
                          </div>
                          
                          <div className="ml-3 flex-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">
                                {tx.type === 'bet' ? 'Placed Bet' : 
                                 tx.type === 'win' ? 'Won Prize' : 'Transaction'}
                              </span>
                              <span className={`text-sm ${
                                tx.type === 'bet' ? 'text-orange-400' : 
                                tx.type === 'win' ? 'text-green-400' : ''
                              }`}>
                                {tx.type === 'bet' ? '-' : '+'}{tx.amount} SOL
                              </span>
                            </div>
                            <div className="flex items-center justify-between mt-0.5">
                              <span className="text-xs text-muted-foreground">
                                {new Date(tx.timestamp).toLocaleString(undefined, { 
                                  hour: '2-digit', 
                                  minute: '2-digit',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="text-xs flex items-center">
                                {tx.status === 'completed' ? (
                                  <span className="text-green-400 flex items-center">
                                    <CheckCircle2 className="h-3 w-3 mr-1" /> Confirmed
                                  </span>
                                ) : (
                                  <span className="text-orange-400 flex items-center">
                                    <AlertTriangle className="h-3 w-3 mr-1" /> Pending
                                  </span>
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-center">
                      <p className="text-sm text-muted-foreground">No recent activity</p>
                    </div>
                  )}
                </motion.div>
              </TabsContent>
              
              <TabsContent value="rewards" className="p-4 space-y-4 focus:outline-none">
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h5 className="text-sm font-medium mb-2">Your Rewards</h5>
                  
                  <div className="p-3 bg-roulette-gold/10 rounded-lg border border-roulette-gold/20">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-roulette-gold">Total Earned</span>
                      <span className="font-medium">250 RUG</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ≈ ${(250 * 0.00021 * 145.30).toFixed(2)} USD
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-xs text-muted-foreground mb-1">Referrals</div>
                      <div className="font-medium">2 users</div>
                    </div>
                    
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                      <div className="text-xs text-muted-foreground mb-1">Win Rate</div>
                      <div className="font-medium">65%</div>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-roulette-gold/20 text-roulette-gold hover:bg-roulette-gold/10"
                    onClick={() => window.open("https://pump.fun/token/rug", "_blank")}
                  >
                    <Coins className="h-4 w-4 mr-2" />
                    Stake RUG Tokens
                  </Button>
                </motion.div>
              </TabsContent>
              
              <div className="p-3 border-t border-white/10">
                <Button 
                  variant="outline" 
                  className="w-full text-destructive hover:text-destructive border-destructive/20 hover:border-destructive/40 hover:bg-destructive/5"
                  onClick={handleDisconnect}
                >
                  Disconnect
                </Button>
              </div>
            </Tabs>
          </AnimatePresence>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <AnimatedContainer type="fade">
      <Button 
        className={`h-10 px-6 bg-roulette-gold text-black hover:bg-roulette-gold/90 button-glow font-medium ${!isOnline ? 'opacity-70 pointer-events-none' : ''}`}
        onClick={handleConnectWallet}
        disabled={loading || !isOnline}
      >
        {loading ? (
          <div className="flex items-center">
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Connecting...
          </div>
        ) : !isOnline ? (
          <div className="flex items-center">
            <AlertTriangle className="h-4 w-4 mr-2" />
            Offline
          </div>
        ) : (
          <div className="flex items-center">
            <Wallet className="h-4 w-4 mr-2" />
            Connect Wallet
          </div>
        )}
      </Button>
    </AnimatedContainer>
  );
};

export default WalletConnect;
