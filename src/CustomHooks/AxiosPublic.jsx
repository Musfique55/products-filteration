import axios from "axios";

const axiosPublic = axios.create({
    baseURL : 'https://product-filteration-server.vercel.app'
})
const AxiosPublic = () => {
    return axiosPublic;
};

export default AxiosPublic;