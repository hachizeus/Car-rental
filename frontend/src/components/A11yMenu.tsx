import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useA11y } from './A11yProvider';
import { Accessibility, ChevronUp, ChevronDown, RotateCcw, Zap } from 'lucide-react';

export const A11yMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    highContrast,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    reducedMotion,
    toggleReducedMotion
  } = useA11y();

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-white dark:bg-gray-800 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Accessibility options"
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 w-64 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium mb-3 text-gray-900 dark:text-gray-100">Accessibility Options</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">Text Size</p>
              <div className="flex items-center space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={decreaseFontSize}
                  aria-label="Decrease font size"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={resetFontSize}
                  aria-label="Reset font size"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={increaseFontSize}
                  aria-label="Increase font size"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">High Contrast</span>
              <Button 
                variant={highContrast ? "default" : "outline"} 
                size="sm" 
                onClick={toggleHighContrast}
                aria-pressed={highContrast}
              >
                {highContrast ? 'On' : 'Off'}
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-300">Reduce Motion</span>
              <Button 
                variant={reducedMotion ? "default" : "outline"} 
                size="sm" 
                onClick={toggleReducedMotion}
                aria-pressed={reducedMotion}
              >
                {reducedMotion ? 'On' : 'Off'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};