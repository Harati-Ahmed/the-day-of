'use client';

import { useTheme } from '@/contexts/theme-context';
import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const themeContext = useTheme();
  
  // Handle case where component is used outside of ThemeProvider
  if (!themeContext) {
    return null;
  }
  
  const { theme, toggleTheme } = themeContext;

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative p-3 rounded-xl bg-white/80 dark:bg-dark-800/80 backdrop-blur-md border border-neutral-200 dark:border-dark-700 hover:bg-primary-50 dark:hover:bg-dark-700 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <motion.div
        className="relative w-6 h-6"
        initial={false}
        animate={{ rotate: theme === 'light' ? 0 : 180 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{ 
            opacity: theme === 'light' ? 1 : 0,
            scale: theme === 'light' ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          <Sun className="h-5 w-5 text-accent-500 group-hover:text-accent-600 transition-colors" />
        </motion.div>
        
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={false}
          animate={{ 
            opacity: theme === 'dark' ? 1 : 0,
            scale: theme === 'dark' ? 1 : 0.8
          }}
          transition={{ duration: 0.3 }}
        >
          <Moon className="h-5 w-5 text-primary-400 group-hover:text-primary-300 transition-colors" />
        </motion.div>
      </motion.div>
    </motion.button>
  );
}
