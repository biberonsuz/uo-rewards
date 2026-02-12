import { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { apiClient, configureApiClient } from '../api/client';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pendingEmail, setPendingEmail] = useState(null);
  const [devCode, setDevCode] = useState(null);
  const tokenRef = useRef(null);

  const refreshAccessToken = useCallback(async () => {
    const refreshToken = localStorage.getItem('uo_refresh_token');
    if (!refreshToken) return null;
    try {
      const res = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken })
      });
      if (!res.ok) { localStorage.removeItem('uo_refresh_token'); return null; }
      const data = await res.json();
      setAccessToken(data.accessToken);
      tokenRef.current = data.accessToken;
      setUser(data.user);
      return data.accessToken;
    } catch {
      localStorage.removeItem('uo_refresh_token');
      return null;
    }
  }, []);

  useEffect(() => {
    configureApiClient({ getToken: () => tokenRef.current, refresh: refreshAccessToken });
  }, [refreshAccessToken]);

  useEffect(() => { tokenRef.current = accessToken; }, [accessToken]);

  useEffect(() => {
    refreshAccessToken().finally(() => setLoading(false));
  }, [refreshAccessToken]);

  const signup = async ({ email, mobileNumber, birthdate, stylePreference }) => {
    const data = await apiClient.post('/api/auth/signup', { email, mobileNumber, birthdate, stylePreference });
    setPendingEmail(email);
    if (data.devCode) setDevCode(data.devCode);
    return data;
  };

  const login = async (email) => {
    const data = await apiClient.post('/api/auth/login', { email });
    setPendingEmail(email);
    if (data.devCode) setDevCode(data.devCode);
    return data;
  };

  const verify = async (email, code) => {
    const data = await apiClient.post('/api/auth/verify', { email, code });
    setAccessToken(data.accessToken);
    tokenRef.current = data.accessToken;
    setUser(data.user);
    localStorage.setItem('uo_refresh_token', data.refreshToken);
    setPendingEmail(null);
    setDevCode(null);
    return data;
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('uo_refresh_token');
    try {
      if (tokenRef.current) {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${tokenRef.current}` },
          body: JSON.stringify({ refreshToken })
        });
      }
    } catch { /* ignore */ }
    setUser(null); setAccessToken(null); tokenRef.current = null;
    setPendingEmail(null); setDevCode(null);
    localStorage.removeItem('uo_refresh_token');
  };

  const refreshUser = async () => {
    try { const userData = await apiClient.get('/api/user/profile'); setUser(userData); } catch { /* ignore */ }
  };

  const resendCode = async (email, type = 'email') => {
    const data = await apiClient.post('/api/auth/resend-code', { email, type });
    if (data.devCode) setDevCode(data.devCode);
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, pendingEmail, devCode, signup, login, verify, logout, refreshUser, resendCode, accessToken }}>
      {children}
    </AuthContext.Provider>
  );
}
