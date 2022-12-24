import {Route, Routes, BrowserRouter} from "react-router-dom";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";
import Signin from "./components/Signin";
import Home from "./components/Home";
import axios from "axios";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

function App()
{
    return (
        <BrowserRouter>
            <ToastContainer/>
            <Routes>
                <Route path="/" element={<Welcome></Welcome>}/>
                <Route path="/signup" element={<SignUp></SignUp>}/>
                <Route path="/signin" element={<Signin></Signin>}/>
                <Route path="/home" element={<Home/>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;