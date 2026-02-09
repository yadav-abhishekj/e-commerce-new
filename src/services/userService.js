import axiosInstance from "./axiosInstance";

export async function fetchUserList() {
  try {
    const response = await axiosInstance.get("/users");
    return response.data;
  } catch (error) {
    throw error;
  }
}
