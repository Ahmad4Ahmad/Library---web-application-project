import { Route, Routes, BrowserRouter } from "react-router-dom";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";
import Signin from "./components/Signin";

function App()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome></Welcome>}/>
                <Route path="/signup" element={<SignUp></SignUp>}/>
                <Route path="/signin" element={<Signin></Signin>}/>
            </Routes>
        </BrowserRouter>
    );
}

export default App;