import React from "react";
import "./Loader.css";
import loaderImg from "../images/spinner.gif";
import ReactDOM from "react-dom";

function Loader()
{
    return ReactDOM.createPortal(
        <div className="wrapper">
            <div className="loader">
                <img src={loaderImg} alt="Loading..."></img>
            </div>
        </div>,
        document.getElementById("loader")
    );
}

export const spinnerImg = () =>
{
    return(
        <div className="center-all">
            <img src={loaderImg} alt="Loading..."></img>
        </div>
    );
}

export default Loader;