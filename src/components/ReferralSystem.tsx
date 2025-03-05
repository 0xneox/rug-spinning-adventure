
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Share, Copy, Check } from 'lucide-react';
import { toast } from 'sonner';

const ReferralSystem = () => {
  const [copied, setCopied] = useState(false);
  const [referralCode] = useState(() => {
    // Generate or retrieve referral code
    const savedCode = localStorage.getItem('rugReferralCode');
    if (savedCode) return savedCode;
    
    // Generate a random referral code based on timestamp and random string
    const newCode = `RUG-${Date.now().toString(36).slice(-4)}-${Math.random().toString(36).slice(-4)}`.toUpperCase();
    localStorage.setItem('rugReferralCode', newCode);
    return newCode;
  });

  const referralLink = `${window.location.origin}?ref=${referralCode}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent("Join me on Rug Roulette and earn SOL! Use my referral link to get a free spin. #RugRoulette #SOL #Crypto");
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(referralLink)}`, "_blank");
  };

  return (
    <div className="glassmorphism rounded-xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gradient flex items-center">
          <Share className="mr-2 h-5 w-5" /> Refer & Earn
        </h3>
        <div className="text-sm bg-roulette-gold/20 text-roulette-gold px-3 py-1 rounded-full">
          Earn 0.05 SOL per referral!
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Share your unique referral link with friends. When they sign up and place their first bet, you'll earn 0.05 SOL and they'll get a free spin!
      </p>
      
      <div className="flex space-x-2 mb-3">
        <Input
          value={referralLink}
          readOnly
          className="bg-background/40 border-white/10"
        />
        <Button
          variant="outline"
          className="flex-shrink-0 border-white/10 hover:bg-white/5"
          onClick={copyToClipboard}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Your referrals: <span className="text-roulette-gold font-medium">0</span>
        </div>
        <Button
          variant="outline"
          className="bg-[#1d9bf0]/10 text-[#1d9bf0] border-[#1d9bf0]/20 hover:bg-[#1d9bf0]/20"
          onClick={shareOnTwitter}
        >
          Share on Twitter
        </Button>
      </div>
    </div>
  );
};

export default ReferralSystem;
