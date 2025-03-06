
// Wallet helper utilities for Solana integration

// Mock function to shorten wallet addresses
export const shortenAddress = (address: string, chars = 4): string => {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
};

// Mock function to format SOL amount with proper decimal places
export const formatSOL = (amount: number | string): string => {
  if (typeof amount === 'string') {
    amount = parseFloat(amount);
  }
  
  if (isNaN(amount)) return '0.00';
  
  // For small amounts, show more decimal places
  if (amount < 0.01) {
    return amount.toFixed(6);
  } else if (amount < 1) {
    return amount.toFixed(4);
  } else {
    return amount.toFixed(2);
  }
};

// Convert lamports to SOL
export const lamportsToSOL = (lamports: number): number => {
  return lamports / 1_000_000_000;
};

// Convert SOL to lamports
export const solToLamports = (sol: number): number => {
  return sol * 1_000_000_000;
};

// Generate a sample referral code - would be created on-chain in production
export const generateReferralCode = (address: string): string => {
  if (!address) return '';
  
  // Create a deterministic but unpredictable code based on address
  const seed = address.slice(0, 8) + address.slice(-8);
  let hash = 0;
  
  for (let i = 0; i < seed.length; i++) {
    hash = ((hash << 5) - hash) + seed.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Create a 6-character alphanumeric code
  const code = Math.abs(hash).toString(36).slice(0, 6).toUpperCase();
  return code;
};

// These functions will help connect to your actual Solana wallet adapter
// They're empty now but will be implemented when connecting to actual Solana wallets

// Mock function for wallet connection validation
export const isValidWalletConnection = (wallet: any): boolean => {
  return wallet && wallet.publicKey && wallet.signTransaction;
};

// Mock function to get user's token accounts
export const getUserTokenAccounts = async (connection: any, wallet: any, tokenMint: string) => {
  // This will be replaced with actual token account lookup
  return [];
};

// Mock functions for wallet notifications
export const walletNotifications = {
  onConnect: (address: string) => {
    console.log(`Wallet connected: ${shortenAddress(address)}`);
    // Trigger custom event for components to react
    window.dispatchEvent(new CustomEvent('walletConnectionChanged', {
      detail: { connected: true, address }
    }));
  },
  
  onDisconnect: () => {
    console.log('Wallet disconnected');
    // Trigger custom event for components to react
    window.dispatchEvent(new CustomEvent('walletConnectionChanged', {
      detail: { connected: false }
    }));
  },
  
  onAccountChange: (address: string) => {
    console.log(`Wallet account changed: ${shortenAddress(address)}`);
    // Trigger custom event for components to react
    window.dispatchEvent(new CustomEvent('walletAccountChanged', {
      detail: { address }
    }));
  },
  
  onError: (error: Error) => {
    console.error('Wallet error:', error);
    // Trigger custom event for components to react
    window.dispatchEvent(new CustomEvent('walletError', {
      detail: { error: error.message }
    }));
  }
};
