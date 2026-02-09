import axiosInstance from "./axiosInstance";

export async function fetchProducts() {
  try {
    const response = await axiosInstance.get("/products");
    return response.data;
  } catch (error) {
    throw error;
  }
}
