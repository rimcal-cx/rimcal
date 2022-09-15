import { createContext, useState, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../utilities/useLocalStorage";
import axios  from "axios";
import { toast, ToastContainer } from 'react-toastify';
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

    if (!user) {
        try {
            const userInfo = data ? data.user : (await axios.get('/me')).data.data;
            setUser(userInfo);
            if (data) {
                toast.success("Login Successful !", {
                    position: toast.POSITION.TOP_LEFT,
                    toastId: 'login-id',
                    autoClose: 2000,
                  });
            }

            navigate("/calendar", { replace: true });
        } catch {
            setToken(null)
            setUser(null)
        }
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
  return <AuthContext.Provider value={value}>
    <>
    <ToastContainer />
    {children}
    </>
    </AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
