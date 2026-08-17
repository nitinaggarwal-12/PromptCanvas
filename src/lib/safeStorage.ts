// Universal safe browser storage utility that gracefully handles QuotaExceededError, SSR/Node.js, and strict private browsing mode

const memoryStore = new Map<string, string>();

export const safeLocalStorage = {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') {
      return memoryStore.get(`local_${key}`) || null;
    }
    try {
      return window.localStorage.getItem(key);
    } catch {
      return memoryStore.get(`local_${key}`) || null;
    }
  },

  setItem(key: string, value: string): void {
    if (typeof window === 'undefined') {
      memoryStore.set(`local_${key}`, value);
      return;
    }
    try {
      window.localStorage.setItem(key, value);
    } catch {
      memoryStore.set(`local_${key}`, value);
    }
  },

  removeItem(key: string): void {
    if (typeof window === 'undefined') {
      memoryStore.delete(`local_${key}`);
      return;
    }
    try {
      window.localStorage.removeItem(key);
    } catch {
      memoryStore.delete(`local_${key}`);
    }
  }
};

export const safeSessionStorage = {
  getItem(key: string): string | null {
    if (typeof window === 'undefined') {
      return memoryStore.get(`session_${key}`) || null;
    }
    try {
      return window.sessionStorage.getItem(key);
    } catch {
      return memoryStore.get(`session_${key}`) || null;
    }
  },

  setItem(key: string, value: string): void {
    if (typeof window === 'undefined') {
      memoryStore.set(`session_${key}`, value);
      return;
    }
    try {
      window.sessionStorage.setItem(key, value);
    } catch {
      memoryStore.set(`session_${key}`, value);
    }
  },

  removeItem(key: string): void {
    if (typeof window === 'undefined') {
      memoryStore.delete(`session_${key}`);
      return;
    }
    try {
      window.sessionStorage.removeItem(key);
    } catch {
      memoryStore.delete(`session_${key}`);
    }
  }
};
