
import { useState, useEffect } from 'react';

type NetworkStatus = 'online' | 'offline' | 'slow' | 'fast';

interface NetworkInfo {
  status: NetworkStatus;
  latency: number | null;
  downlink: number | null;
  effectiveType: string | null;
  isOnline: boolean;
  isSlow: boolean;
}

export function useNetwork(): NetworkInfo {
  const [networkInfo, setNetworkInfo] = useState<NetworkInfo>({
    status: 'online',
    latency: null,
    downlink: null,
    effectiveType: null,
    isOnline: true,
    isSlow: false
  });

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const updateNetworkInfo = () => {
      // Check if online
      const isOnline = navigator.onLine;
      
      // Get connection info if available
      let downlink = null;
      let effectiveType = null;
      let isSlow = false;
      
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        downlink = conn?.downlink;
        effectiveType = conn?.effectiveType;
        
        // Determine if connection is slow
        isSlow = conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g' || (conn?.downlink && conn?.downlink < 1);
      }
      
      // Determine overall status
      let status: NetworkStatus = 'online';
      
      if (!isOnline) {
        status = 'offline';
      } else if (isSlow) {
        status = 'slow';
      } else if (downlink && downlink > 5) {
        status = 'fast';
      }
      
      setNetworkInfo({
        status,
        latency: null, // Will be measured later
        downlink,
        effectiveType,
        isOnline,
        isSlow
      });
    };
    
    // Measure network latency
    const measureLatency = async () => {
      try {
        const start = performance.now();
        // Fetch a small resource to measure latency
        const response = await fetch('/favicon.ico', { 
          method: 'HEAD',
          cache: 'no-store'
        });
        const end = performance.now();
        
        if (response.ok) {
          const latency = end - start;
          
          setNetworkInfo(prev => {
            // Update network status based on latency
            let status = prev.status;
            let isSlow = prev.isSlow;
            
            if (latency > 300) {
              status = 'slow';
              isSlow = true;
            } else if (prev.status !== 'offline') {
              status = 'fast';
              isSlow = false;
            }
            
            return {
              ...prev,
              latency,
              status,
              isSlow
            };
          });
        }
      } catch (error) {
        // Failed to measure latency, might be offline
        console.log('Failed to measure network latency');
      }
    };
    
    // Run initial checks
    updateNetworkInfo();
    measureLatency();
    
    // Set up event listeners
    window.addEventListener('online', () => {
      updateNetworkInfo();
      measureLatency();
    });
    
    window.addEventListener('offline', updateNetworkInfo);
    
    // Listen for connection changes if supported
    if ('connection' in navigator) {
      (navigator as any).connection?.addEventListener('change', () => {
        updateNetworkInfo();
        measureLatency();
      });
    }
    
    // Periodically measure latency
    const latencyInterval = setInterval(measureLatency, 30000);
    
    return () => {
      window.removeEventListener('online', updateNetworkInfo);
      window.removeEventListener('offline', updateNetworkInfo);
      
      if ('connection' in navigator) {
        (navigator as any).connection?.removeEventListener('change', updateNetworkInfo);
      }
      
      clearInterval(latencyInterval);
    };
  }, []);

  return networkInfo;
}
