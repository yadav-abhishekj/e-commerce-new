import axiosInstance from "./axiosInstance";

export async function fetchProducts(query) {
  try {
    const response = await axiosInstance.get(`/products?${query}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function fetchProductById(productId) {
  try {
    const response = await axiosInstance.get(`/product/${productId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}
