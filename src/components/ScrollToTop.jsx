import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop Component
 * 
 * This component listens for route changes and automatically scrolls the 
 * window to the top (0, 0) to ensure a consistent user experience when 
 * navigating between different pages.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Standard scroll to top
    window.scrollTo(0, 0);
    
    // Also scroll the main document element just in case
    if (document.documentElement) {
      document.documentElement.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
