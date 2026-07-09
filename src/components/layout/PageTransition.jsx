import { useEffect } from 'react';
import { motion } from 'framer-motion';

const PageTransition = ({ children }) => {
  useEffect(() => {
    const forceScroll = () => {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    };
    
    // Force scroll to top immediately when component mounts
    forceScroll();
    
    // Fallback for some mobile browsers
    const timeout = setTimeout(forceScroll, 10);
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
