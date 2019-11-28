import React from "react";
import {Link} from "react-router-dom";
import "./header.css";
import {userIcon, shoppingCart} from "../icons.js";
import PropTypes from "prop-types";
import {AuthContext} from "../index.jsx";

const Header = () => {
    return (
        <AuthContext.Consumer>
            {
                (contextValue) => (
                    <div className="header" >
                        <Link to="/">
                            <img src="/tlu.png" className="header__logo"></img>
                        </Link>
                        <div className="header__buttons">
                            {contextValue.user.email && <WelcomeIcon user={contextValue.user} />}
                            {!contextValue.user.email && <LoginRegisterIcon />}
                            <div className={"header__button"}>
                                <img src={shoppingCart} style={{ height: 35 }}></img>
                                <div className={"header__button-text"}>Cart</div>
                            </div>
                            {/*<button className="button" >Log in / Setup</button>
                    <button className="button" >Cart</button>*/}
                        </div>
                    </div>
                )
            }
        </AuthContext.Consumer>
    );
};

const LoginRegisterIcon = () => {
    return (
        <Link id="header__button" to={"/login"}>
            <img src={userIcon} alt="User" />
            <div className={"header__button-text"}>Login /<br />Register</div>
        </Link>
    );
};

const WelcomeIcon = ({ user }) => {
    return (
        <Link id="header__button" to={"/users/" + user._id}>
            <img src={userIcon} alt="User" />
            <div className={"header__button-text"}>Welcome, {user.email}</div>
        </Link>
    );
};

WelcomeIcon.propTypes = {
    user: PropTypes.object.isRequired
};

export default Header;