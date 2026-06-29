import { useEffect, useState } from 'react';
import { AdSlot } from './AdSlot';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { createPortal } from 'react-dom';

export function AdPopup({ isOpen, onClose }) {
  const [canClose, setCanClose] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3);

  useEffect(() => {
    if (isOpen) {
      setCanClose(false);
      setTimeLeft(3);

      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            setCanClose(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 pointer-events-auto">
      <div className="bg-surface rounded-2xl p-6 shadow-xl relative max-w-sm w-full animate-in zoom-in-95 duration-300">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Advertisement</h2>
          {canClose ? (
            <button
              onClick={onClose}
              className="p-1 rounded-full bg-surface-variant hover:bg-outline-variant transition-colors"
              aria-label="Close Ad"
            >
              <XMarkIcon className="w-6 h-6 text-on-surface" />
            </button>
          ) : (
            <span className="text-sm font-bold text-on-surface-variant bg-surface-variant px-3 py-1 rounded-full">
              Close in {timeLeft}
            </span>
          )}
        </div>

        <div className="bg-background rounded-xl p-2 flex justify-center">
          <AdSlot />
        </div>

        <p className="text-xs text-center text-on-surface-variant mt-4">
          Thank you for supporting our app!
        </p>
      </div>
    </div>,
    document.body
  );
}
