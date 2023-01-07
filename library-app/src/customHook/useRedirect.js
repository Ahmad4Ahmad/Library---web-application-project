import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getSigninStatus } from "../services/authServices";
import { setLogin } from "../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const useRedirect = (path) =>
{
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() =>
    {
        const redirectSignedoutUser = async () =>
        {
            const isSignedin = await getSigninStatus();
            dispatch(setLogin(isSignedin));
            if (!isSignedin)
            {
                toast.info("Session expired, please sign to continue");
                navigate(path);
                return
            }
        };
        redirectSignedoutUser()
    }, [navigate, path, dispatch]);
};

export default useRedirect;