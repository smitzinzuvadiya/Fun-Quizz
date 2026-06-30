import { useState, useEffect, useRef } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export function PullToRefresh({ children, onRefresh }) {
  const [pulling, setPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const containerRef = useRef(null);
  const startYRef = useRef(0);
  const currentYRef = useRef(0);
  
  const MAX_PULL_DISTANCE = 120;
  const THRESHOLD = 80;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = (e) => {
      // Check if any scrollable parent of the touch target is scrolled down
      let el = e.target;
      let isScrolled = false;
      while (el && el !== container) {
        if (el.scrollHeight > el.clientHeight && el.scrollTop > 0) {
          isScrolled = true;
          break;
        }
        el = el.parentElement;
      }
      
      if (isScrolled) return;
      
      // If we are already refreshing, don't allow another pull
      if (isRefreshing) return;

      startYRef.current = e.touches[0].clientY;
      setPulling(true);
    };

    const handleTouchMove = (e) => {
      if (!pulling) return;
      
      currentYRef.current = e.touches[0].clientY;
      const dy = currentYRef.current - startYRef.current;

      // If pulling down
      if (dy > 0) {
        // Prevent default scrolling behavior when pulling down at the top
        if (e.cancelable) e.preventDefault();
        
        // Add resistance to the pull
        const pullAmount = Math.min(dy * 0.4, MAX_PULL_DISTANCE);
        setPullDistance(pullAmount);
      }
    };

    const handleTouchEnd = async () => {
      if (!pulling) return;
      
      setPulling(false);
      
      if (pullDistance >= THRESHOLD) {
        setIsRefreshing(true);
        setPullDistance(THRESHOLD); // Keep it open at threshold while refreshing
        
        try {
          if (onRefresh) {
            await onRefresh();
          }
        } finally {
          setIsRefreshing(false);
          setPullDistance(0);
        }
      } else {
        // Snap back if threshold not met
        setPullDistance(0);
      }
    };

    container.addEventListener('touchstart', handleTouchStart, { passive: false });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd);

    return () => {
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
    };
  }, [pulling, pullDistance, isRefreshing, onRefresh]);

  return (
    <div 
      ref={containerRef}
      className="h-full w-full overflow-y-auto no-scrollbar relative"
    >
      {/* The Refresh Indicator Spinner */}
      <div 
        className="absolute top-0 left-0 w-full flex justify-center items-end overflow-hidden z-0"
        style={{ height: `${pullDistance}px`, transition: pulling ? 'none' : 'height 0.3s ease-out' }}
      >
        <div className="pb-4">
          <ArrowPathIcon 
            className={`w-7 h-7 text-white ${isRefreshing ? 'animate-spin' : ''}`} 
            style={{ 
              transform: `rotate(${pullDistance * 3}deg)`,
              opacity: pullDistance / THRESHOLD
            }}
          />
        </div>
      </div>

      {/* The Actual Content */}
      <div 
        className="h-full w-full relative z-10 bg-inherit flex flex-col"
        style={
          pullDistance > 0 || isRefreshing
            ? { 
                transform: `translateY(${pullDistance}px)`,
                transition: pulling ? 'none' : 'transform 0.3s ease-out'
              }
            : {}
        }
      >
        {children}
      </div>
    </div>
  );
}
