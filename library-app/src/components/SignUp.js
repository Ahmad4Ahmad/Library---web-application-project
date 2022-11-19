import "./SignUp.css";
import Button from "./Button";
import Logo from "./Logo";

function SignUp()
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
                        <label htmlFor="name">User Name:</label>
                        <input type="text" id="name"></input>
                    </div>
                    <div className="form-control">
                        <label htmlFor="pass">Password:</label>
                        <input type="text" id="pass"></input>
                    </div>
                    <Button>Sign up</Button>
                </div>
            </form>
        </>
    );
}

export default SignUp;