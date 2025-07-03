import axiosInstance from "../utilities/api";

export async function fetchProducts(){
    const response = await axiosInstance.get('/products')
    return response.data
}