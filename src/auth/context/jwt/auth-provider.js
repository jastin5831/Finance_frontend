import PropTypes from 'prop-types';
import { useEffect, useReducer, useCallback, useMemo } from 'react';
// utils
import axios, { endpoints } from 'src/utils/axios';
//
import { AuthContext } from './auth-context';
import { isValidToken, setSession } from './utils';

// ----------------------------------------------------------------------

// NOTE:
// We only build demo at basic level.
// Customer will need to do some extra handling yourself if you want to extend the logic and other features...

// ----------------------------------------------------------------------

const initialState = {
  user: null,
  loading: true,
  error: null
};

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      loading: false,
      user: action.payload,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload,
    };
  }
  if (action.type === "UPDATE") {
    return {
      ...state,
      user: action.payload,
    }
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === "ERROR") {
    return {
      ...state,
      error: action.payload.error
    }
  }
  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = useCallback(async () => {
    try {
      const accessToken = sessionStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);
        const response = await axios.get(endpoints.auth.me);
        const { user } = response.data.data;
        const logData = {...user}
        await axios.post(endpoints.subscription.get, {email: user.email})
          .then(res => {
            logData.role = res.data.plan ? res.data.plan : 'price_123';
          })
          .catch(err => {logData.role = 'price_123'})

        dispatch({
          type: 'INITIAL',
          payload: logData,
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: null,
        });
      }
    } catch (error) {
      const err = error;
      dispatch({
        type: 'ERROR',
        payload: {
          error: err,
        },
      });
    }
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  // LOGIN
  const login = useCallback(async (email, password) => {
    const data = {
      email,
      password,
    };
     
    const response = await axios.post(endpoints.auth.login, data);
    const { accessToken, user } = response.data.data;
    setSession(accessToken);
    
    const logData = {...user}
    await axios.post(endpoints.subscription.get, {email})
      .then(res => {
        logData.role = res.data.plan ? res.data.plan : 'price_123';
      })
      .catch(err => {logData.role = 'price_123'})

    dispatch({
      type: 'LOGIN',
      payload: logData,
    });
  }, []);

  const register = useCallback(
    async (email, password, name) => {
      const data = {
        email,
        password,
        name
      };

      try {
        const response = await axios.post(endpoints.auth.register, data);
        const { accessToken, user } = response.data.data;
        const registerData = {...user}
        // Store the accessToken in sessionStorage
        sessionStorage.setItem(STORAGE_KEY, accessToken);
        registerData.role = 'price_123';
        dispatch({
          type: 'REGISTER',
          payload: registerData
        });
      } catch (error) {
        console.error('Registration error:', error);
      }
    },
    []
  );

  // Update Profile
  const update = useCallback(async (userId, email, password, name) => {
    const data = {
      userId,
      email,
      password,
      name
    };
    
    try {
      const response = await axios.post(endpoints.auth.update, data);
      const { accessToken, user } = response.data.data;

      sessionStorage.setItem(STORAGE_KEY, accessToken);
      const updateData = {...user}
      updateData.role = initialState.user.role;
      // Dispatch REGISTER action
      dispatch({
        type: 'UPDATE',
        payload: updateData,
      });
    } catch (error) {
      console.error('UpdateProfile error:', error);
    }
  },[])
  
  const setRole = useCallback((role, user) => {
    try {
      const updateData = {...user}
      updateData.role = role
      dispatch({
        type: 'UPDATE',
        payload: updateData
      })
    } catch (error) {
      console.log('setRoleErr:',error)
    }
  },[])
  // LOGOUT
  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: 'LOGOUT',
    });
  }, []);

  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';
  const status = state.loading ? 'loading' : checkAuthenticated;
  const userData = state.user;
  const memoizedValue = useMemo(
    () => ({
      user: userData,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      login,
      register,
      update,
      logout,
      setRole,
    }),
    [login, logout, register, update, setRole, userData, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
