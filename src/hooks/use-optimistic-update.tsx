
import { useState, useCallback } from 'react';
import { toast } from 'sonner';

type Status = 'idle' | 'loading' | 'success' | 'error';

interface OptimisticUpdateOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
  showToast?: boolean;
}

interface OptimisticUpdateResult<T> {
  status: Status;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: Error | null;
  data: T | null;
  execute: (promise: Promise<T>, optimisticData?: T) => Promise<T | null>;
  reset: () => void;
}

export function useOptimisticUpdate<T>(options: OptimisticUpdateOptions<T> = {}): OptimisticUpdateResult<T> {
  const [status, setStatus] = useState<Status>('idle');
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  
  const {
    onSuccess,
    onError,
    successMessage = 'Operation completed successfully',
    errorMessage = 'Operation failed',
    showToast = true
  } = options;
  
  const execute = useCallback(async (promise: Promise<T>, optimisticData?: T): Promise<T | null> => {
    setStatus('loading');
    
    // If optimistic data is provided, update the UI immediately
    if (optimisticData !== undefined) {
      setData(optimisticData);
    }
    
    try {
      const result = await promise;
      setStatus('success');
      setData(result);
      setError(null);
      
      if (showToast) {
        toast.success(successMessage);
      }
      
      if (onSuccess) {
        onSuccess(result);
      }
      
      return result;
    } catch (err) {
      setStatus('error');
      
      const actualError = err instanceof Error ? err : new Error(String(err));
      setError(actualError);
      
      // If optimistic update failed, revert to previous state
      // but only if we were using optimistic data
      if (optimisticData !== undefined) {
        // We could revert to previous state here if needed
      }
      
      if (showToast) {
        toast.error(errorMessage);
      }
      
      if (onError) {
        onError(actualError);
      }
      
      return null;
    }
  }, [onSuccess, onError, successMessage, errorMessage, showToast]);
  
  const reset = useCallback(() => {
    setStatus('idle');
    setData(null);
    setError(null);
  }, []);
  
  return {
    status,
    isLoading: status === 'loading',
    isSuccess: status === 'success',
    isError: status === 'error',
    error,
    data,
    execute,
    reset
  };
}
