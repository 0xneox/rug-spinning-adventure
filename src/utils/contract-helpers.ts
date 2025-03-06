
import { toast } from 'sonner';

// Mock interface for transaction response
// Replace with your actual Solana transaction types
interface TransactionResponse {
  signature: string;
  slot: number;
  blockTime: number;
  confirmationStatus: 'processed' | 'confirmed' | 'finalized';
}

// Helper to handle transaction errors consistently
export const handleTransactionError = (error: any) => {
  console.error('Transaction error:', error);
  
  // Extract meaningful error messages
  let errorMessage = 'Transaction failed';
  
  if (error instanceof Error) {
    // Check for common Solana errors
    if (error.message.includes('insufficient funds')) {
      errorMessage = 'Insufficient funds for transaction';
    } else if (error.message.includes('blockhash')) {
      errorMessage = 'Transaction expired, please try again';
    } else if (error.message.includes('rejected')) {
      errorMessage = 'Transaction rejected';
    } else if (error.message.includes('user rejected')) {
      errorMessage = 'Transaction cancelled by user';
    } else {
      // If not recognized, use the original message
      errorMessage = error.message;
    }
  }
  
  toast.error(errorMessage);
  return null;
};

// Helper to format transaction signature for display
export const formatSignature = (signature: string) => {
  if (!signature) return '';
  if (signature.length <= 8) return signature;
  return `${signature.slice(0, 4)}...${signature.slice(-4)}`;
};

// Helper to get Solana explorer link
export const getExplorerLink = (signature: string) => {
  return `https://solscan.io/tx/${signature}`;
};

// Mock contract call - to be replaced with actual contract calls
export const placeBet = async (
  amount: number,
  wallet: any
): Promise<TransactionResponse | null> => {
  try {
    // This would be replaced with an actual contract call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock transaction response
    return {
      signature: 'mock' + Math.random().toString(36).substring(2, 15),
      slot: Math.floor(Math.random() * 100000000),
      blockTime: Date.now() / 1000,
      confirmationStatus: 'confirmed'
    };
  } catch (error) {
    return handleTransactionError(error);
  }
};

// Function to get current pot amount - to be implemented
export const getCurrentPot = async (): Promise<number> => {
  try {
    // This would be replaced with an actual contract call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 1.23; // Mock value
  } catch (error) {
    console.error('Failed to get pot amount:', error);
    return 0;
  }
};

// Function to get RUG token price - to be implemented
export const getTokenPrice = async (): Promise<number> => {
  try {
    // This would be replaced with an actual API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return 0.00021; // Mock value in SOL
  } catch (error) {
    console.error('Failed to get token price:', error);
    return 0.0002;
  }
};

// Function to get recent winners - to be implemented
export const getRecentWinners = async (): Promise<Array<{
  address: string;
  amount: number;
  timestamp: number;
}>> => {
  try {
    // This would be replaced with an actual contract call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock data
    return [
      { address: 'Hx7vUxp...A2Gm', amount: 2.5, timestamp: Date.now() - 100000 },
      { address: 'Jk9rT2z...K3pQ', amount: 0.75, timestamp: Date.now() - 300000 },
      { address: 'L3mZwE1...P9sX', amount: 5.0, timestamp: Date.now() - 900000 },
    ];
  } catch (error) {
    console.error('Failed to get recent winners:', error);
    return [];
  }
};

// Prepare for contract integration by adding these placeholders
export const PROGRAM_ID = 'rugX7qJDE83eQnwrKGMC1L3oYzB68QcHLcmj5XrDCn4W'; // To be replaced with actual program ID
export const RUG_TOKEN_MINT = 'rugX7qJDE83eQnwrKGMC1L3oYzB68QcHLcmj5XrDCn4W'; // To be replaced with actual token mint
