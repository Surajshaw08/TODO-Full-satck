// src/utils/auth.js
const TOKEN_KEY = import.meta.env.VITE_TOKEN_STORAGE_KEY || "token";

export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);
export const logout = () => localStorage.removeItem(TOKEN_KEY);

// Additional auth utility functions
export const isAuthenticated = () => !!getToken();

export const getUserFromToken = () => {
  const token = getToken();
  if (!token) return null;
  
  try {
    // JWT tokens are in format: header.payload.signature
    // We need the payload part
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing token:", error);
    return null;
  }
};
