import { createContext, useState, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../utilities/useLocalStorage";
import axios  from "axios";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("_auth_rimcal_token", null);
  const [user,setUser] = useState(null)
  const navigate = useNavigate();

  const setGlobalAuthentication = async (data = null) => {
    const tokenInfo = data ? data.token : token.token
    axios.defaults.headers = {
        ...axios.defaults.headers,
        'Authorization': `Bearer ${tokenInfo}`
    }

    navigate("/calender", { replace: true });

    if (!user) {
        const userInfo = data ? data.user : (await axios.get('/me')).data.data;
        setUser(userInfo);
    }

  }

  useEffect(() => {
    if (token?.token) {
        setGlobalAuthentication()
    }
  }, [])

  // call this function when you want to authenticate the user
  const login = async (data) => {
    if (!token) {
        setToken({ token: data.token, token_expiry:data.token_expiry });
        setGlobalAuthentication(data)
    }
  };

  // call this function to sign out logged in user
  const logout = () => {
    setToken(null);
    setUser(null);
    if (axios.defaults.headers?.Authorization)
        delete axios.defaults.headers.Authorization

    navigate("/", { replace: true });
  };

  const value = useMemo(
    () => ({
      token,
      user,
      login,
      logout
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
