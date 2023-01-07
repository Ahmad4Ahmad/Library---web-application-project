import { useSelector } from "react-redux";
import { selectIsSignedin } from "../../redux/features/auth/authSlice";

export const ShowOnSignin = ({children}) =>
{
    const isSignedin = useSelector(selectIsSignedin);
    if(isSignedin)
    {
        return <>{children}</>;
    }
    return null;
};

export const ShowOnSignout = ({children}) =>
{
    const isSignedin = useSelector(selectIsSignedin);
    if(!isSignedin)
    {
        return <>{children}</>;
    }
    return null;
};