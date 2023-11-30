import { AxiosError } from "axios";
import { axiosInstance } from "../../../services/AxiosService";

type RequestTokenProps = {
  email: string;
  password: string;
};

export const requestToken = async ({ email, password }: RequestTokenProps) => {
  try {
    const response = await axiosInstance.post("/api/user/login", { email, password });

    return { token: response.data.token, error: null };
  } catch (err) {
    let error = "Something went wrong";

    if (err instanceof AxiosError) {
      error = err.response?.data.message || err.message;
    }

    return { token: null, error: error };
  }
};
