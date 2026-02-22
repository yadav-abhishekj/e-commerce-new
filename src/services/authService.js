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

export async function authServiceForAPI(email, password) {
  const credentials = { email, password };
  const response = await axiosInstance.post("/login", credentials);
  return response;
}
