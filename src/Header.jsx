import React from "react";
import {Link} from "react-router-dom";
import "./header.css";
import {userIcon} from "./icons";
import {shoppingCart} from "./icons";

const Header = () => {
    return (
        <div className="header" >
            <Link to="/">
                <img src="/tlu.png" className="header__logo"></img>
            </Link>
            <div className="header__buttons">
                <div className={"header__button"}>
                    <img src={userIcon}></img>
                    <div className={"header__button-text"}>Login/<br></br>Register</div>  
                </div>
                <div className={"header__button"}>
                    <img src={shoppingCart} style={{height: 35}}></img>
                        <div className={"header__button-text"}>Cart</div>
                </div>
                {/*<button className="button" >Log in / Setup</button>
                <button className="button" >Cart</button>*/}
            </div>

        </div>
    );
};

export default Header;