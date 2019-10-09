import React from "react";
import {Link} from "react-router-dom";

const Header = () => {
    return (
        <div className="banner" >
                <div class="buttons">
                    <button class="button" >Log in / Setup</button>
                    <button class="button" >Cart</button>
                </div>
                <div>
                    <Link to="/">
                        <a href="index.html">
                            <img src="logo.svg" class="logo"></img>
                        </a>
                    </Link>
                </div>
        </div>
    )
};

export default Header;