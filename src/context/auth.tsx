import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useHistory } from 'react-router-dom';

import configApp from '~/config';
import api from '~/services/api';
import authStorageService from '~/services/storage';

export interface AuthContextProps {
  token: string | null;
  user: any;
  isAuthenticated: boolean;
  performsLogin: (payload: any) => Promise<void>;
  logoff: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  const [user, setUser] = useState<AuthContextProps['user']>(null);
  const [token, setToken] = useState(authStorageService.getToken());

  const logoff = useCallback(() => {
    setUser(null);
    setToken(null);

    history.replace('/login');
  }, [history]);

  const performsLogin = useCallback(
    async (payload: any) => {
      try {
        const response = await api.post('/auth', payload);

        setUser(response.data.user);
        setToken(response.data.token);

        const redirect = window.localStorage.getItem('@login.redirect');
        window.localStorage.removeItem('@login.redirect');
        history.push(redirect ? window.atob(redirect) : '/');
      } catch {
        setToken(null);
      }
    },
    [history],
  );

  const memorizedValue = useMemo<AuthContextProps>(
    () => ({
      user,
      token,
      logoff,
      isAuthenticated: token !== null,
      performsLogin,
    }),
    [logoff, performsLogin, token, user],
  );

  useEffect(() => {
    if (!token) {
      return;
    }

    (async () => {
      const response = await api.get('/me');
      setUser(response.data);
    })();
  }, [token]);

  useEffect(() => {
    if (!token) {
      authStorageService.removeToken();
    } else {
      authStorageService.setToken(token);
    }
  }, [token]);

  useEffect(() => {
    const dispatchEventUserLogoff = () => {
      logoff();
    };

    window.addEventListener(configApp.events.logoff, dispatchEventUserLogoff);

    return () => {
      window.removeEventListener(
        configApp.events.logoff,
        dispatchEventUserLogoff,
      );
    };
  }, [logoff]);

  return (
    <AuthContext.Provider value={memorizedValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
