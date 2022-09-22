import { createContext, useState, useContext, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "../utilities/useLocalStorage";
import axios from 'axios'
import { me } from '../utilities/util'
import { toast, ToastContainer } from 'react-toastify';
import ToastBody from "../components/ToastBody";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage("_auth_rimcal_token", null);
  const [user,setUser] = useState(null)
  const navigate = useNavigate();

  if (token?.token) {
    axios.defaults.headers = {
        ...axios.defaults.headers,
        'Authorization': `Bearer ${token.token}`
    }
  }


  const setGlobalAuthentication = async (data = null) => {
    const tokenInfo = data ? data.token : token.token
    axios.defaults.headers = {
        ...axios.defaults.headers,
        'Authorization': `Bearer ${tokenInfo}`
    }

    if (!user) {
        try {
            if (data) {
                delete data.token
                delete data.token_expiry
            }
            const userInfo = data ? data : await me();
            setUser({ ...userInfo });
            if (data) {
                toast.success(<ToastBody
                title='Success'
                type='success'
                body='Login Successful!'
                />, {
                    toastId: 'login-id',
                  });
            }

            navigate("/calendar", { replace: true });
        } catch (e){
            if ([403, 401].includes(e.response.status))
                logout()
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
    <ToastContainer
        autoClose="4000"
        position="top-right"
        closeButton={true}
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        closeOnClick={false}
        newestOnTop={true}
        draggable={false}
    />
    {children}
    </>
    </AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
