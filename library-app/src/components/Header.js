import Logo from "../components/Logo";
import Button from "../components/Button";
import { ShowOnSignin, ShowOnSignout } from "../components/protect/HiddenLink";
import {useDispatch, useSelector} from "react-redux";
import {setLogin, selectName} from "../redux/features/auth/authSlice";
import {useNavigate} from "react-router-dom";
import { Link } from "react-router-dom";
import {signoutUser} from "../services/authServices";
import "./Header.css";

function Header()
{
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const name = useSelector(selectName);
    const signout = async() =>
    {
        await signoutUser();
        dispatch(setLogin(false));
        navigate("/");
    };

    return (
        <div className="header">
            <Logo></Logo>
            <div className="btn">
                <ShowOnSignin><p>{name}</p></ShowOnSignin>
                <ShowOnSignin><Button onClick={signout}>Sign out</Button></ShowOnSignin>
                <ShowOnSignout><Link to="/signin"><Button className="alt">Sign In</Button></Link></ShowOnSignout>
                <ShowOnSignout><Link to="/signup"><Button>Sign Up</Button></Link></ShowOnSignout>
            </div>
        </div>
    );
}

export default Header;