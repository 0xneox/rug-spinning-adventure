
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
    pixelRatio: 1
  });

  useEffect(() => {
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
      
      // Performance tier estimation (simplified)
      let perfTier: PerfTier = 'medium';
      
      if (window.navigator.hardwareConcurrency) {
        const cores = window.navigator.hardwareConcurrency;
        if (cores <= 2) perfTier = 'low';
        else if (cores <= 4) perfTier = 'medium';
        else if (cores <= 8) perfTier = 'high';
        else perfTier = 'ultra';
      }
      
      // XR detection (VR/AR)
      // @ts-ignore
      const isVR = 'xr' in navigator && navigator.xr ? true : false;
      const isAR = isVR && 'isSessionSupported' in navigator.xr;
      
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
        pixelRatio
      });
    };

    // Initial detection
    detectDevice();
    
    // Redetect on resize and orientation change
    window.addEventListener('resize', detectDevice);
    window.addEventListener('orientationchange', detectDevice);
    
    return () => {
      window.removeEventListener('resize', detectDevice);
      window.removeEventListener('orientationchange', detectDevice);
    };
  }, []);

  return deviceInfo;
}
