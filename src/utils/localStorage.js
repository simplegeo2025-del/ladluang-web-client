const accessTokenKey = 'accessToken';
const refreshTokenKey = 'refreshToken';

export const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined') {
    try {
			console.log(value)
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage for key "${key}":`, error);
    }
  }
};

export const getLocalStorage = (key) => {
  if (typeof window !== 'undefined') {
    try {
      const storedValue = localStorage.getItem(key);
      if (storedValue === null || storedValue === undefined) {
        return null;
      }
      return JSON.parse(storedValue);
    } catch (error) {
      console.error(`Error getting localStorage for key "${key}":`, error);
      return null;
    }
  }
  return null;
};

export const setToken = (accessToken) => {
  setLocalStorage('accessToken', accessToken);
};

export const getToken = () => {
  return {
    accessToken: getLocalStorage('accessToken'),
  };
};

export const removeToken = () => {
  localStorage.removeItem(accessTokenKey);
};
