/**
 * Browser storage utilities with error handling
 */

// Check if storage is available
const isStorageAvailable = (type: 'localStorage' | 'sessionStorage'): boolean => {
  try {
    const storage = window[type];
    const testKey = '__storage_test__';
    storage.setItem(testKey, testKey);
    storage.removeItem(testKey);
    return true;
  } catch (e) {
    return false;
  }
};

// Local Storage with error handling
export const localStore = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      if (!isStorageAvailable('localStorage')) return defaultValue;
      
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting item ${key} from localStorage:`, error);
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): boolean => {
    try {
      if (!isStorageAvailable('localStorage')) return false;
      
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in localStorage:`, error);
      return false;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      if (!isStorageAvailable('localStorage')) return false;
      
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from localStorage:`, error);
      return false;
    }
  },
  
  clear: (): boolean => {
    try {
      if (!isStorageAvailable('localStorage')) return false;
      
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing localStorage:', error);
      return false;
    }
  }
};

// Session Storage with error handling
export const sessionStore = {
  get: <T>(key: string, defaultValue: T): T => {
    try {
      if (!isStorageAvailable('sessionStorage')) return defaultValue;
      
      const item = sessionStorage.getItem(key);
      if (item === null) return defaultValue;
      
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting item ${key} from sessionStorage:`, error);
      return defaultValue;
    }
  },
  
  set: <T>(key: string, value: T): boolean => {
    try {
      if (!isStorageAvailable('sessionStorage')) return false;
      
      sessionStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting item ${key} in sessionStorage:`, error);
      return false;
    }
  },
  
  remove: (key: string): boolean => {
    try {
      if (!isStorageAvailable('sessionStorage')) return false;
      
      sessionStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Error removing item ${key} from sessionStorage:`, error);
      return false;
    }
  },
  
  clear: (): boolean => {
    try {
      if (!isStorageAvailable('sessionStorage')) return false;
      
      sessionStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing sessionStorage:', error);
      return false;
    }
  }
};