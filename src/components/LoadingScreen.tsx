
import { motion } from 'framer-motion';
import { useTheme } from '@/providers/ThemeProvider';

const LoadingScreen = () => {
  const { colorScheme } = useTheme();
  
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <motion.div 
          className="relative h-20 w-20 mb-6 perspective-1000"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="absolute inset-0 rounded-full bg-roulette-gold/20 blur-lg"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.4, 0.2]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          <motion.div 
            className="relative h-20 w-20 rounded-full border-4 border-roulette-gold flex items-center justify-center preserve-3d"
            animate={{ 
              rotateY: 360,
              transition: { 
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }
            }}
          >
            <motion.span 
              className="absolute text-roulette-gold font-bold text-xl transform"
              style={{ backfaceVisibility: 'hidden' }}
            >
              RR
            </motion.span>
            <motion.span 
              className="absolute text-roulette-gold font-bold text-xl transform"
              style={{ 
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden'
              }}
            >
              25
            </motion.span>
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-xl font-medium text-gradient-premium mb-2">Rug Roulette</h2>
          <div className="relative h-1.5 w-48 bg-muted rounded-full overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-roulette-gold rounded-full"
              initial={{ width: "0%" }}
              animate={{ 
                width: ["0%", "100%", "0%"],
                transition: { 
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "loop"
                }
              }}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-3">Loading the future of gambling...</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingScreen;
