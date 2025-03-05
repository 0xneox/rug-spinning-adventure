
import { Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const MobileAppPromo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="my-12 glassmorphism rounded-xl overflow-hidden"
    >
      <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2 text-gradient">Get the Rug Roulette Mobile App</h3>
          <p className="text-muted-foreground mb-4">
            Play anywhere, anytime with our native mobile app. Enjoy exclusive mobile-only features and instant notifications for big wins!
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline"
              className="bg-roulette-gold text-black hover:bg-roulette-gold/90 border-0"
              onClick={() => window.open("https://play.google.com", "_blank")}
            >
              <Smartphone className="mr-2 h-4 w-4" />
              Android App
            </Button>
            <Button 
              variant="outline"
              className="bg-white/90 text-black hover:bg-white/80 border-0"
              onClick={() => window.open("https://apps.apple.com", "_blank")}
            >
              <Smartphone className="mr-2 h-4 w-4" />
              iOS App
            </Button>
          </div>
          
          <div className="mt-4 flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map(star => (
                <svg key={star} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              ))}
            </div>
            <span className="text-sm text-muted-foreground">4.9 stars (2.1k reviews)</span>
          </div>
        </div>
        
        <div className="flex-shrink-0 w-40 md:w-48 relative">
          <div className="absolute inset-0 bg-gradient-radial from-roulette-gold/30 to-transparent blur-xl rounded-full"></div>
          <img 
            src="https://placehold.co/240x480/41345E/FFFFFF?text=Rug+Roulette" 
            alt="Mobile App" 
            className="relative z-10 rounded-xl border-4 border-white/10 shadow-2xl" 
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MobileAppPromo;
