import { Link } from "react-router-dom";
import "./Welcome.css";
import Logo from "./Logo";
import Button from "./Button";


function Welcome()
{
    return (
        <div className="container">
            <div className="header">
                <Logo></Logo>
                <div className="btn">
                    <Link to="/signin"><Button className="alt">Sign In</Button></Link>
                    <Link to="/signup"><Button>Sign Up</Button></Link>
                </div>
            </div>
            <div className="grid-container">
                <div className="grid-item">
                    <img src={require("../images/read.png")} alt="read"/>
                    <p>Read Free Library Books Online</p>
                </div>
                <div className="grid-item">
                    <img src={require("../images/track.png")} alt="read"/>
                    <p>Keep Track Of Your Favorite Books</p>
                </div>
                <div className="grid-item">
                    <img src={require("../images/librarian.png")} alt="read"/>
                    <p>Try The Virtual Library Explorer</p>
                </div>
                <div className="grid-item">
                    <img src={require("../images/library_explorer.png")} alt="read"/>
                    <p>Be an Open Librarian</p>
                </div>
            </div>
        </div>
    );
}

export default Welcome;