import React from "react";
import {Link} from "react-router-dom";
import "./header.css";
import {userIcon, shoppingCart} from "../icons.js";
import PropTypes from "prop-types";
import authConsumer from "./authConsumer.jsx";

const Header = ({user}) => {
    return (
        <div className="header" >
            <Link to="/">
                <img src="/tlu.png" className="header__logo"></img>
            </Link>
            <div className="header__buttons">
                {user.email && <WelcomeIcon user={user} />}
                {!user.email && <LoginRegisterIcon />}
                <Link to={"/checkout/cart"} className={"header__button"}>
                    <img src={shoppingCart} style={{ height: 35 }}></img>
                    <div className={"header__button-text"}>Cart</div>
                </Link>
            </div>
        </div>
    );
};

Header.propTypes = {
    token: PropTypes.string,
    user: PropTypes.object
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

export default authConsumer(Header);