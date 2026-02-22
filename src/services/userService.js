import axiosInstance from "./axiosInstance";

export async function fetchUserList() {
  try {
    const response = await axiosInstance.get("/me");
    return response.data;
  } catch (error) {
    throw error;
  }
}
