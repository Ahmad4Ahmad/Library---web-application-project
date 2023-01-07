import "./SignUp.css";
import Button from "../components/Button";
import Logo from "../components/Logo";
import {useState} from "react";
import { toast } from "react-toastify";
import { registerUser, validateEmail } from "../services/authServices";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setLogin, setName} from "../redux/features/auth/authSlice";
import Loader from "../components/Loader";

const initialState = 
{
    name: "",
    email: "",
    password: ""
};

function SignUp()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState(initialState);
    const {name, email, password} = formData;
    const handleInputChange = (event) =>
    {
        const {name, value} = event.target;
        setFormData({...formData, [name]: value});
    };

    const register = async (event) =>
    {
        event.preventDefault();
        if(!name || !email || !password)
        {
            return toast.error("Required");
        }

        if(password.length < 6)
        {
            return toast.error("password must be at least 6 characters");
        }

        if(!validateEmail(email))
        {
            return toast.error("Please enter a valid email address");
        }

        const userData = {name, email, password};
        setIsLoading(true);
        try
        {
            const data = await registerUser(userData);
            await dispatch(setLogin(true));
            await dispatch(setName(data.name));
            navigate("/");
            setIsLoading(false);
        }
        catch (error)
        {
            setIsLoading(false);
        }
    };

    return (
        <>
            {isLoading && <Loader></Loader>}
            <Logo></Logo>
            <form onSubmit={register}>
                <div className="form">
                    <h2>Sign Up</h2>
                    <div className="form-control">
                        <label htmlFor="email">Email Address:</label>
                        <input type="email" id="email" name="email" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="name">User Name:</label>
                        <input type="text" id="name" name="name" onChange={handleInputChange}></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="pass">Password:</label>
                        <input type="password" id="pass" name="password" onChange={handleInputChange}></input>
                    </div>
                    <Button type="submit">Sign up</Button>
                </div>
            </form>
        </>
    );
}

export default SignUp;