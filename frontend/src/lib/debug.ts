/**
 * Debug utility for logging in development environment
 */

const isDevEnvironment = import.meta.env.DEV;

/**
 * Log debug information only in development environment
 */
export const debug = {
  log: (...args: any[]) => {
    if (isDevEnvironment) {
      console.log('[DEBUG]', ...args);
    }
  },
  
  error: (...args: any[]) => {
    if (isDevEnvironment) {
      console.error('[DEBUG ERROR]', ...args);
    }
  },
  
  warn: (...args: any[]) => {
    if (isDevEnvironment) {
      console.warn('[DEBUG WARN]', ...args);
    }
  },
  
  info: (...args: any[]) => {
    if (isDevEnvironment) {
      console.info('[DEBUG INFO]', ...args);
    }
  },
  
  /**
   * Inspect an object's structure and content
   */
  inspect: (obj: any, label = 'Object Inspection') => {
    if (isDevEnvironment) {
      console.group(label);
      
      if (obj === null) {
        console.log('null');
      } else if (obj === undefined) {
        console.log('undefined');
      } else if (Array.isArray(obj)) {
        console.log(`Array with ${obj.length} items:`);
        obj.forEach((item, index) => {
          console.log(`[${index}]:`, item);
        });
      } else if (typeof obj === 'object') {
        console.log(obj);
        console.table(obj);
      } else {
        console.log(`${typeof obj}:`, obj);
      }
      
      console.groupEnd();
    }
  }
};