import type { AuthResponse, LoginRequest, SignUpRequest } from "../types/auth";
import api from "./axiosConfig";

export const signupUser= async(
    signupData:SignUpRequest
): Promise<AuthResponse> =>{
    const response=await api.post<AuthResponse>("/auth/signup",signupData);
    return response.data;
}

export const loginUser = async (
    loginData: LoginRequest
): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>("/auth/login", loginData);
    return response.data;
};