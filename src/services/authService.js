import axiosInstance from "./axiosInstance";

let logoutHandler = null;

export const setLogoutHandler = (handler) => {
  logoutHandler = handler;
};

export const triggerLogout = () => {
  if (logoutHandler) {
    logoutHandler();
  }
};

export async function authServiceForAPI(username, password) {
  try {
    const credentials = { username, password };
    const response = await axiosInstance.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
}
