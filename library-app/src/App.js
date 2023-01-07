import {Route, Routes, BrowserRouter} from "react-router-dom";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Library from "./pages/Library";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getSigninStatus } from "./services/authServices";
import { setLogin } from "./redux/features/auth/authSlice";

axios.defaults.withCredentials = true;

function App()
{
    const dispatch = useDispatch();
    useEffect(() =>
    {
        async function signinStatus()
        {
            const status = await getSigninStatus();
            dispatch(setLogin(status));
        }
        signinStatus();
    }, [dispatch]);

    return (
        <BrowserRouter>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<SignUp></SignUp>}/>
                <Route path="/signin" element={<Signin></Signin>}/>
                <Route path="/home" element={<Library/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;