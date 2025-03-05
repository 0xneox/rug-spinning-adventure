
import { useState, useEffect, useRef } from 'react';
import WalletConnect from './WalletConnect';
import { motion, useAnimation } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const controls = useAnimation();
  
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
  
  // Mouse tracking glow effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (headerRef.current) {
      const rect = headerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      headerRef.current.style.setProperty('--x', `${x}px`);
      headerRef.current.style.setProperty('--y', `${y}px`);
    }
  };
  
  // Subtle header animation
  useEffect(() => {
    const animation = async () => {
      if (scrolled) {
        await controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.3, ease: "easeOut" }
        });
      } else {
        await controls.start({
          y: 0,
          opacity: 1,
          transition: { duration: 0.3, ease: "easeOut" }
        });
      }
    };
    
    animation();
  }, [scrolled, controls]);

  return (
    <motion.header 
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-10 py-4 ${
        scrolled ? 'glassmorphism-2025' : 'bg-transparent'
      }`}
      initial={{ y: -20, opacity: 0 }}
      animate={controls}
      onMouseMove={handleMouseMove}
      style={{
        '--x': '50%',
        '--y': '50%'
      } as React.CSSProperties}
    >
      {/* Neural glow effect */}
      <div 
        className="absolute inset-0 bg-radial-gradient opacity-0 transition-opacity duration-700 ease-in-out pointer-events-none neural-glow"
        style={{
          backgroundImage: `radial-gradient(circle 100px at var(--x) var(--y), rgba(212, 175, 55, 0.15), transparent)`
        }}
      />
      
      <div className="container mx-auto flex items-center justify-between">
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <div className="relative h-9 w-9 animate-float perspective-1000 preserve-3d">
            <motion.div 
              className="absolute inset-0 rounded-full bg-roulette-gold opacity-20 blur-lg"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            
            <motion.div 
              className="relative h-9 w-9 rounded-full border-2 border-roulette-gold flex items-center justify-center preserve-3d"
              whileHover={{ 
                rotateY: 180,
                transition: { duration: 0.8 }
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.span 
                className="absolute text-roulette-gold font-bold text-xs"
                style={{ backfaceVisibility: 'hidden' }}
              >
                RR
              </motion.span>
              <motion.span 
                className="absolute text-roulette-gold font-bold text-xs"
                style={{ 
                  transform: 'rotateY(180deg)',
                  backfaceVisibility: 'hidden'
                }}
              >
                2025
              </motion.span>
            </motion.div>
          </div>
          
          <motion.h1 
            className="ml-3 text-xl font-bold text-gradient-premium"
            animate={{ 
              textShadow: ['0 0 8px rgba(212, 175, 55, 0)', '0 0 12px rgba(212, 175, 55, 0.3)', '0 0 8px rgba(212, 175, 55, 0)']
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "loop"
            }}
          >
            Rug Roulette
            <motion.span 
              className="inline-block ml-1.5"
              animate={{
                y: [0, -2, 0]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >
              <Sparkles className="h-3.5 w-3.5 text-roulette-gold" />
            </motion.span>
          </motion.h1>
        </motion.div>
        
        <div className="flex items-center gap-4">
          <nav className="hidden md:flex items-center gap-4 text-sm text-foreground/80">
            {[
              { name: "Rules", href: "#rules" },
              { name: "Pot", href: "#pot" },
              { name: "Winners", href: "#winners" }
            ].map((item) => (
              <motion.a 
                key={item.name}
                href={item.href}
                className="relative px-2 py-1"
                onHoverStart={() => setActiveLink(item.name)}
                onHoverEnd={() => setActiveLink(null)}
                whileHover={{ y: -2 }}
              >
                <span className={`relative z-10 transition-colors duration-300 ${
                  activeLink === item.name ? 'text-roulette-gold' : 'hover:text-roulette-gold'
                }`}>
                  {item.name}
                </span>
                
                {/* Bottom border animation */}
                <motion.span 
                  className="absolute bottom-0 left-0 h-0.5 bg-roulette-gold/60 rounded-full z-0"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: activeLink === item.name ? '100%' : 0
                  }}
                  transition={{ duration: 0.2 }}
                />
              </motion.a>
            ))}
          </nav>
          <WalletConnect />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
