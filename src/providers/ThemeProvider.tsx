
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDevice } from '@/hooks/use-device';

type ThemeMode = 'system' | 'light' | 'dark' | 'gold' | 'neo';
type ColorScheme = 'gold' | 'neon' | 'future' | 'minimal' | 'classic';
type AnimationLevel = 'none' | 'minimal' | 'standard' | 'enhanced' | 'maximum';

interface ThemeContextType {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  colorScheme: ColorScheme;
  setColorScheme: (scheme: ColorScheme) => void;
  animations: AnimationLevel;
  setAnimations: (level: AnimationLevel) => void;
  hapticFeedback: boolean;
  setHapticFeedback: (enabled: boolean) => void;
  triggerHaptic: (intensity?: 'light' | 'medium' | 'heavy') => void;
  adaptiveUI: boolean;
  setAdaptiveUI: (enabled: boolean) => void;
  fontScale: number;
  setFontScale: (scale: number) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>('system');
  const [colorScheme, setColorScheme] = useState<ColorScheme>('gold');
  const [animations, setAnimations] = useState<AnimationLevel>('standard');
  const [hapticFeedback, setHapticFeedback] = useState<boolean>(true);
  const [adaptiveUI, setAdaptiveUI] = useState<boolean>(true);
  const [fontScale, setFontScale] = useState<number>(1);
  const { prefersReducedMotion, perfTier, hasTouchScreen } = useDevice();

  // Set initial animations based on device capabilities and user preferences
  useEffect(() => {
    if (prefersReducedMotion) {
      setAnimations('minimal');
    } else if (perfTier === 'low') {
      setAnimations('minimal');
    } else if (perfTier === 'medium') {
      setAnimations('standard');
    } else {
      setAnimations('enhanced');
    }
  }, [prefersReducedMotion, perfTier]);

  // Apply theme class to html element
  useEffect(() => {
    const root = document.documentElement;
    
    // Clean up previous themes
    root.classList.remove('theme-light', 'theme-dark', 'theme-gold', 'theme-neo');
    
    if (mode === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.add(systemDark ? 'theme-dark' : 'theme-light');
    } else {
      root.classList.add(`theme-${mode}`);
    }
    
    // Add color scheme class
    root.classList.remove('scheme-gold', 'scheme-neon', 'scheme-future', 'scheme-minimal', 'scheme-classic');
    root.classList.add(`scheme-${colorScheme}`);
    
    // Set animation level
    root.setAttribute('data-animation', animations);
    
    // Set adaptive UI
    if (adaptiveUI) {
      root.setAttribute('data-adaptive', 'true');
    } else {
      root.removeAttribute('data-adaptive');
    }
    
    // Set font scale
    root.style.setProperty('--font-scale', fontScale.toString());
  }, [mode, colorScheme, animations, adaptiveUI, fontScale]);

  // Haptic feedback function
  const triggerHaptic = (intensity: 'light' | 'medium' | 'heavy' = 'medium') => {
    if (!hapticFeedback || !hasTouchScreen) return;
    
    // Use navigator.vibrate if available
    if ('vibrate' in navigator) {
      switch (intensity) {
        case 'light':
          navigator.vibrate(10);
          break;
        case 'medium':
          navigator.vibrate(35);
          break;
        case 'heavy':
          navigator.vibrate([35, 20, 65]);
          break;
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        mode,
        setMode,
        colorScheme,
        setColorScheme,
        animations,
        setAnimations,
        hapticFeedback,
        setHapticFeedback,
        triggerHaptic,
        adaptiveUI,
        setAdaptiveUI,
        fontScale,
        setFontScale
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
