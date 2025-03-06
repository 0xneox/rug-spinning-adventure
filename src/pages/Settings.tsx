import { useState } from 'react';
import Header from '@/components/Header';
import { useTheme } from '@/providers/ThemeProvider';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, Moon, Sun, Palette, CircleDashed, 
  Vibrate, SlidersHorizontal, MonitorSmartphone, 
  Sparkles, Type
} from 'lucide-react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import {
  RadioGroup,
  RadioGroupItem
} from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const Settings = () => {
  const navigate = useNavigate();
  const { 
    mode, setMode, 
    colorScheme, setColorScheme, 
    animations, setAnimations,
    hapticFeedback, setHapticFeedback,
    adaptiveUI, setAdaptiveUI,
    fontScale, setFontScale,
    triggerHaptic
  } = useTheme();
  
  const [activeTab, setActiveTab] = useState('appearance');
  
  const handleGoBack = () => {
    navigate('/');
  };
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    triggerHaptic('light');
  };
  
  const handleHapticToggle = (checked: boolean) => {
    setHapticFeedback(checked);
    if (checked) {
      triggerHaptic('medium');
    }
  };

  return (
    <main className="min-h-screen pb-16">
      <Header />
      
      <div className="container max-w-4xl px-4 pt-24 pb-16">
        <div className="flex items-center mb-6">
          <Button 
            variant="ghost" 
            size="icon"
            className="mr-2"
            onClick={handleGoBack}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>
        
        <div className="glassmorphism rounded-xl p-6">
          <Tabs value={activeTab} onValueChange={handleTabChange}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="appearance" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="performance" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span>Performance</span>
              </TabsTrigger>
              <TabsTrigger value="accessibility" className="flex items-center gap-2">
                <MonitorSmartphone className="h-4 w-4" />
                <span>Accessibility</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="appearance" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-lg font-medium mb-3">Theme Mode</h3>
                  <RadioGroup 
                    value={mode} 
                    onValueChange={(value) => setMode(value as any)}
                    className="grid grid-cols-2 gap-2 md:grid-cols-4"
                  >
                    <div>
                      <RadioGroupItem 
                        value="system" 
                        id="system" 
                        className="sr-only" 
                      />
                      <Label
                        htmlFor="system"
                        className={`flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                          mode === 'system' ? 'border-roulette-gold bg-secondary/40' : ''
                        }`}
                      >
                        <CircleDashed className="mb-2 h-6 w-6" />
                        <span>System</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="light" 
                        id="light" 
                        className="sr-only" 
                      />
                      <Label
                        htmlFor="light"
                        className={`flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                          mode === 'light' ? 'border-roulette-gold bg-secondary/40' : ''
                        }`}
                      >
                        <Sun className="mb-2 h-6 w-6" />
                        <span>Light</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="dark" 
                        id="dark" 
                        className="sr-only" 
                      />
                      <Label
                        htmlFor="dark"
                        className={`flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                          mode === 'dark' ? 'border-roulette-gold bg-secondary/40' : ''
                        }`}
                      >
                        <Moon className="mb-2 h-6 w-6" />
                        <span>Dark</span>
                      </Label>
                    </div>
                    
                    <div>
                      <RadioGroupItem 
                        value="gold" 
                        id="gold" 
                        className="sr-only" 
                      />
                      <Label
                        htmlFor="gold"
                        className={`flex flex-col items-center justify-center rounded-md border-2 border-muted p-4 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                          mode === 'gold' ? 'border-roulette-gold bg-secondary/40' : ''
                        }`}
                      >
                        <Sparkles className="mb-2 h-6 w-6 text-roulette-gold" />
                        <span>Premium</span>
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-3">Color Scheme</h3>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { value: 'gold', label: 'Gold', color: 'bg-gradient-to-br from-roulette-gold to-yellow-500' },
                      { value: 'neon', label: 'Neon', color: 'bg-gradient-to-br from-green-400 to-blue-500' },
                      { value: 'future', label: 'Future', color: 'bg-gradient-to-br from-purple-500 to-pink-500' },
                      { value: 'minimal', label: 'Minimal', color: 'bg-gradient-to-br from-gray-200 to-gray-400' },
                      { value: 'classic', label: 'Classic', color: 'bg-gradient-to-br from-red-500 to-yellow-500' }
                    ].map((scheme) => (
                      <button
                        key={scheme.value}
                        onClick={() => setColorScheme(scheme.value as any)}
                        className={`flex flex-col items-center rounded-md p-1 cursor-pointer transition-all ${
                          colorScheme === scheme.value ? 'ring-2 ring-roulette-gold' : ''
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full mb-1 ${scheme.color}`}></div>
                        <span className="text-xs">{scheme.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-lg font-medium">Animation Level</h3>
                    <span className="text-sm text-muted-foreground capitalize">{animations}</span>
                  </div>
                  
                  <RadioGroup 
                    value={animations} 
                    onValueChange={(value) => setAnimations(value as any)}
                    className="space-y-2"
                  >
                    {[
                      { value: 'none', label: 'None', description: 'No animations for maximum performance' },
                      { value: 'minimal', label: 'Minimal', description: 'Essential animations only' },
                      { value: 'standard', label: 'Standard', description: 'Balance between performance and aesthetics' },
                      { value: 'enhanced', label: 'Enhanced', description: 'Rich animations for modern devices' },
                      { value: 'maximum', label: 'Maximum', description: 'All visual effects and transitions enabled' }
                    ].map((level) => (
                      <div key={level.value} className="flex">
                        <RadioGroupItem 
                          value={level.value} 
                          id={level.value} 
                          className="sr-only" 
                        />
                        <Label
                          htmlFor={level.value}
                          className={`flex flex-col w-full rounded-md border border-muted p-3 hover:bg-accent hover:text-accent-foreground cursor-pointer ${
                            animations === level.value ? 'border-roulette-gold bg-secondary/40' : ''
                          }`}
                        >
                          <span>{level.label}</span>
                          <span className="text-xs text-muted-foreground">{level.description}</span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-0.5">
                    <Label htmlFor="adaptive-ui">Adaptive UI</Label>
                    <p className="text-xs text-muted-foreground">
                      Automatically optimize UI based on your device
                    </p>
                  </div>
                  <Switch
                    id="adaptive-ui"
                    checked={adaptiveUI}
                    onCheckedChange={setAdaptiveUI}
                  />
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="accessibility" className="space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="haptic">Haptic Feedback</Label>
                    <p className="text-xs text-muted-foreground">
                      Vibration feedback for interactions on supported devices
                    </p>
                  </div>
                  <Switch
                    id="haptic"
                    checked={hapticFeedback}
                    onCheckedChange={handleHapticToggle}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <Label htmlFor="font-size">Font Size</Label>
                    <span className="text-sm text-muted-foreground">{Math.round(fontScale * 100)}%</span>
                  </div>
                  <Slider
                    id="font-size"
                    min={0.8}
                    max={1.4}
                    step={0.05}
                    value={[fontScale]}
                    onValueChange={(value) => setFontScale(value[0])}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>A</span>
                    <span>AA</span>
                    <span>AAA</span>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button 
                    onClick={() => {
                      setMode('system');
                      setAnimations('standard');
                      setFontScale(1);
                      setAdaptiveUI(true);
                      triggerHaptic('medium');
                    }}
                    variant="outline"
                    className="w-full"
                  >
                    Reset to Defaults
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  );
};

export default Settings;
