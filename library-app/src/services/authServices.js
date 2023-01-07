import axios from "axios";
import {toast} from "react-toastify";

export const backendURL = process.env.REACT_APP_BACKEND_URL;
export const validateEmail = (email) =>
{
    return email.match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
};

export const registerUser = async(userData) =>
{
    try
    {
        const res = await axios.post(`${backendURL}/api/users/signup`, userData, {withCredentials: true});
        if(res.statusText === "OK")
        {
            toast.success("User signed up successfully");
        }

        return res.data;
    }
    catch(error)
    {
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString();
        toast.error(message);
    }
};

export const signinUser = async(userData) =>
{
    try
    {
        const res = await axios.post(`${backendURL}/api/users/signin`, userData);
        if(res.statusText === "OK")
        {
            toast.success("User signed in successfully");
        }

        return res.data;
    }
    catch(error)
    {
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString();
        toast.error(message);
    }
};

export const signoutUser = async() =>
{
    try
    {
        await axios.get(`${backendURL}/api/users/signout`);
    }
    catch(error)
    {
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString();
        toast.error(message);
    }
};

export const getSigninStatus = async () =>
{
    try
    {
        const response = await axios.get(`${backendURL}/api/users/signedin`);
        return response.data;
    }
    catch (error)
    {
        const message = (error.response && error.response.data && error.response.data.message) || 
        error.message || error.toString();
        toast.error(message);
    }
};