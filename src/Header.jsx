import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="banner" >
                <div className="buttons">
                    <button className="button" >Log in / Setup</button>
                    <button className="button" >Cart</button>
                </div>
                <div>
                    <Link to="/">
                        <a href="index.html">
                            <img src="/logo.svg" className="logo"></img>
                        </a>
                    </Link>
                </div>
        </div>
    );
};

export default Header;