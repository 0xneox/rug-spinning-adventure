
import { useState, useEffect } from 'react';
import WalletConnect from './WalletConnect';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4 ${
        scrolled ? 'glassmorphism' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <div className="relative h-8 w-8 animate-float">
            <div className="absolute inset-0 rounded-full bg-roulette-gold opacity-20 blur-lg"></div>
            <div className="relative h-8 w-8 rounded-full border-2 border-roulette-gold flex items-center justify-center">
              <span className="text-roulette-gold font-bold text-xs">RR</span>
            </div>
          </div>
          <h1 className="ml-3 text-xl font-bold text-gradient">Rug Roulette</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4 text-sm text-foreground/80">
            <a href="#rules" className="hover:text-foreground transition-colors">Rules</a>
            <a href="#pot" className="hover:text-foreground transition-colors">Current Pot</a>
            <a href="#winners" className="hover:text-foreground transition-colors">Winners</a>
          </div>
          <WalletConnect />
        </div>
      </div>
    </header>
  );
};

export default Header;
