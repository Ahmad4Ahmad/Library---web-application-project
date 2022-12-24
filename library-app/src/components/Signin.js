import "./Signin.css";
import Button from "./Button";
import Logo from "./Logo";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import {toast} from "react-toastify";
import {validateEmail, signinUser} from "../services/authServices";
import {setLogin, setName} from "../redux/features/auth/authSlice";
import Loader from "./Loader";

const initialState = 
{
    email: "",
    password: ""
};

function Signin()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const {email, password} = formData;
    const handleInputChange = (event) =>
    {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const submitHandler = async (event) =>
    {
        event.preventDefault();
        if(!email || !password)
        {
            return toast.error("Required");
        }

        if(!validateEmail(email))
        {
            return toast.error("Please enter a valid email address");
        }

        const userData = {email, password};
        setIsLoading(true);
        try
        {
            const data = await signinUser(userData);
            await dispatch(setLogin(true));
            await dispatch(setName(data.name));
            navigate("/home");
            setIsLoading(false);
        }
        catch(error)
        {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loader></Loader>}
            <Logo></Logo>
            <form onSubmit={submitHandler}>
                <div className="form">
                    <h2>Sign Up</h2>
                    <div className="form-control">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" id="email" name="email" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="pass">Password:</label>
                        <input type="password" id="pass" name="password" onChange={handleInputChange}></input>
                    </div>
                    <Button type="submit">Sign in</Button>
                </div>
            </form>
        </>
    );
}

export default Signin;