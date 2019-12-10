import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { shoppingCart, userIcon } from "../icons.js";
import { ItemProps } from "../pages/CartPage.jsx";
import "./header.css";
import { UserPropTypes } from "../store/reducer.js";

const Header = ({user, cart}) => {
    return (
        <div className="header" >
            <Link to="/">
                <img src="/tlu.png" className="header__logo"></img>
            </Link>
            <div className="header__buttons">
                {user && <WelcomeIcon user={user} />}
                {!user && <LoginRegisterIcon />}
                <Link to={"/checkout/cart"} className={"header__button"}>
                    <img src={shoppingCart} style={{ height: 35 }}></img>
                    <div className={"header__button-text"}>Cart</div>
                    <Badge>{cart.length}</Badge>
                </Link>
            </div>
        </div>
    );
};

Header.propTypes = {
    token: PropTypes.string,
    user: PropTypes.shape(UserPropTypes),
    cart: PropTypes.arrayOf(ItemProps).isRequired,
};

const Badge = ({children}) => {
    if (children === 0) return null;
    return (
        <span className={"badge"}>
            {children}
        </span>
    );
};

Badge.propTypes = {
    children: PropTypes.number.isRequired,
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
    user: PropTypes.shape(UserPropTypes),
};

const mapStateToProps = (store) => {
    return {
        cart: store.cart,
        user: store.user,

    };
};

export default connect(mapStateToProps)(Header);