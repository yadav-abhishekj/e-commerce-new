import { createContext, useEffect, useReducer } from "react";
import { authServiceForAPI, setLogoutHandler } from "../services/authService";
import { fetchUserList } from "../services/userService";

export const AuthContext = createContext();
const getInitialAuthState = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  return {
    token,
    user: user ? JSON.parse(user) : null,
    isAuthenticated: !!token,
  };
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        token: action.payload.token,
        user: action.payload.user,
        isAuthenticated: true,
      };

    case "LOGOUT":
      return {
        token: null,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(
    authReducer,
    undefined,
    getInitialAuthState,
  ); // lazy initialization

  // login function that can be used across the app
  async function login(username, password) {
    const response = await authServiceForAPI(username, password);
    if (response && response.token) {
      const users = await fetchUserList();
      const loginUser = users.find((user) => user.username === username);

      dispatch({
        type: "LOGIN",
        payload: {
          token: response.token,
          user: loginUser,
        },
      });
      return true;
    }
    return false;
  }

  // register logout handler ONCE
  useEffect(() => {
    setLogoutHandler(() => {
      dispatch({ type: "LOGOUT" });
    });
  }, []);

  useEffect(() => {
    if (state.token) {
      localStorage.setItem("token", state.token);
      localStorage.setItem("user", JSON.stringify(state.user));
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, [state.token, state.user]);

  /* for dispatching logout on other tabs when token is removed manually
   from localStorage manually or other way */
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem("token");

      if (!token) {
        dispatch({ type: "LOGOUT" });
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch, login }}>
      {children}
    </AuthContext.Provider>
  );
}
