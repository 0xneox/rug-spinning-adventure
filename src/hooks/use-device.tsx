
import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'tablet' | 'desktop' | 'large-screen';
type OrientationType = 'portrait' | 'landscape';
type PerfTier = 'low' | 'medium' | 'high' | 'ultra';

interface DeviceInfo {
  type: DeviceType;
  orientation: OrientationType;
  hasTouchScreen: boolean;
  hasHover: boolean;
  prefersReducedMotion: boolean;
  perfTier: PerfTier;
  isVR: boolean;
  isAR: boolean;
  isHighDPI: boolean;
  pixelRatio: number;
  connectionType?: string;
  connectionSpeed?: 'slow' | 'medium' | 'fast';
  isOnline: boolean;
  batteryLevel?: number;
  isLowBattery?: boolean;
  isLowMemory?: boolean;
}

export function useDevice(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    type: 'desktop',
    orientation: 'landscape',
    hasTouchScreen: false,
    hasHover: true,
    prefersReducedMotion: false,
    perfTier: 'high',
    isVR: false,
    isAR: false,
    isHighDPI: false,
    pixelRatio: 1,
    isOnline: true
  });

  useEffect(() => {
    // Only run on client
    if (typeof window === 'undefined') return;

    const detectDevice = () => {
      const width = window.innerWidth;
      let type: DeviceType = 'desktop';
      
      if (width < 768) {
        type = 'mobile';
      } else if (width < 1024) {
        type = 'tablet';
      } else if (width >= 1920) {
        type = 'large-screen';
      }
      
      // Check orientation
      const orientation: OrientationType = window.innerHeight > window.innerWidth ? 'portrait' : 'landscape';
      
      // Touch detection
      const hasTouchScreen = ('ontouchstart' in window) || 
                             (navigator.maxTouchPoints > 0) || 
                             // @ts-ignore
                             (navigator.msMaxTouchPoints > 0);
      
      // Hover capability
      const hasHover = window.matchMedia('(hover: hover)').matches;
      
      // Motion preference
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // High DPI and pixel ratio
      const pixelRatio = window.devicePixelRatio || 1;
      const isHighDPI = pixelRatio >= 2;
      
      // Performance tier estimation (improved)
      let perfTier: PerfTier = 'medium';
      
      // Check for hardware concurrency (CPU cores)
      if (window.navigator.hardwareConcurrency) {
        const cores = window.navigator.hardwareConcurrency;
        if (cores <= 2) perfTier = 'low';
        else if (cores <= 4) perfTier = 'medium';
        else if (cores <= 8) perfTier = 'high';
        else perfTier = 'ultra';
      }
      
      // Additional performance checks
      const memory = (navigator as any).deviceMemory;
      const isLowMemory = memory !== undefined && memory <= 2;
      
      // Runtime performance check
      const performanceTest = () => {
        const startTime = performance.now();
        let result = 0;
        for (let i = 0; i < 1000000; i++) {
          result += Math.sqrt(i);
        }
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        // Adjust perfTier based on actual performance
        if (duration > 1000) {
          perfTier = 'low';
        } else if (duration > 500) {
          perfTier = perfTier === 'low' ? 'low' : 'medium';
        } else if (duration > 200) {
          perfTier = perfTier === 'ultra' ? 'high' : perfTier;
        }
        
        return result; // To prevent optimization
      };
      
      // Run the test but don't block
      setTimeout(() => {
        performanceTest();
      }, 1000);
      
      // Network information
      let connectionType, connectionSpeed;
      
      if ('connection' in navigator) {
        const conn = (navigator as any).connection;
        connectionType = conn?.type;
        
        // Estimate connection speed
        if (conn?.downlink !== undefined) {
          if (conn.downlink < 1) connectionSpeed = 'slow';
          else if (conn.downlink < 5) connectionSpeed = 'medium';
          else connectionSpeed = 'fast';
        }
      }
      
      // Battery information
      let batteryLevel, isLowBattery;
      
      if ('getBattery' in navigator) {
        (navigator as any).getBattery().then((battery: any) => {
          batteryLevel = battery.level;
          isLowBattery = battery.level <= 0.2;
          
          // Update device info when battery changes
          battery.addEventListener('levelchange', detectDevice);
          
          setDeviceInfo(current => ({
            ...current,
            batteryLevel,
            isLowBattery
          }));
          
          return () => {
            battery.removeEventListener('levelchange', detectDevice);
          };
        }).catch(() => {
          // Battery API failed, continue without it
        });
      }
      
      // Online status
      const isOnline = navigator.onLine;
      
      // XR detection (VR/AR)
      const isVR = typeof window !== 'undefined' && 
                  'xr' in navigator && 
                  // @ts-ignore - navigator.xr exists in modern browsers but may not be in TS types
                  navigator.xr !== undefined;
      
      // AR support check
      const isAR = isVR && 
                  // @ts-ignore - WebXR spec exists but may not be in TS types
                  'isSessionSupported' in (navigator.xr || {});
      
      setDeviceInfo({
        type,
        orientation,
        hasTouchScreen,
        hasHover,
        prefersReducedMotion,
        perfTier,
        isVR,
        isAR,
        isHighDPI,
        pixelRatio,
        connectionType,
        connectionSpeed,
        isOnline,
        isLowMemory
      });
    };

    // Initial detection
    detectDevice();
    
    // Update on relevant events
    window.addEventListener('resize', detectDevice);
    window.addEventListener('orientationchange', detectDevice);
    window.addEventListener('online', detectDevice);
    window.addEventListener('offline', detectDevice);
    
    // Check for connection changes
    if ('connection' in navigator) {
      (navigator as any).connection?.addEventListener('change', detectDevice);
    }
    
    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
      window.removeEventListener('online', detectDevice);
      window.removeEventListener('offline', detectDevice);
      
      if ('connection' in navigator) {
        (navigator as any).connection?.removeEventListener('change', detectDevice);
      }
    };
  }, []);

  return deviceInfo;
}
