import "./Signin.css";
import Button from "./Button";
import Logo from "./Logo";

function Signin()
{
    return (
        <>
            <Logo></Logo>
            <form>
                <div className="form">
                    <h2>Sign Up</h2>
                    <div className="form-control">
                        <label htmlFor="email">Email Address:</label>
                        <input type="text" id="email"></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="pass">Password:</label>
                        <input type="text" id="pass"></input>
                    </div>
                    <Button>Sign in</Button>
                </div>
            </form>
        </>
    );
}

export default Signin;