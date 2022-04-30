import axios from "axios";
import { QueryClient } from "react-query";

export const apiRoute = `http://54.195.228.225:8000${process.env.REACT_APP_API_ROUTE}`;
export const envGlob = process.env.NODE_ENV;
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
export const imageRoute = `http://54.195.228.225:8000${process.env.REACT_APP_API_ROUTE}/images?image=`;
export default axios.create({
  baseURL: "http://54.195.228.225:8000",
  responseType: "json",
});
export const moralis_server_url = process.env.REACT_APP_MORALIS_SERVER_URL;
export const moralis_id = process.env.REACT_APP_MORALIS_ID;
export const network_id = process.env.REACT_APP_MORALIS_NETWORK;
