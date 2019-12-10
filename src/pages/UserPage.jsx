import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { UserPropTypes } from "../store/reducer";
import Fancybutton from "../components/Fancybutton.jsx";
import { userUpdate, tokenUpdate } from "../store/actions.js";
import protectedRedirect from "../components/protectedRedirect.jsx";

class UserPage extends React.Component {
    static propTypes = {
        user: PropTypes.shape(UserPropTypes),
        dispatch: PropTypes.func.isRequired,
    };

    handleLogout = () => {
        console.log("logout");
        this.props.dispatch(userUpdate(null));
        this.props.dispatch(tokenUpdate(null));
    };

    render() {
        return (
            <div className={"spacer"}>
                <div className={"box-cart"}>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <div className={"field"}>
                            Hello, {this.props.user.email}
                        </div>
                        <div className={"field"}>
                            Your account was created at: {this.props.user.createdAt}
                        </div>
                        <Fancybutton onClick={this.handleLogout}>Logi välja</Fancybutton>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        user: store.user,
    };
};

export default connect(mapStateToProps)(protectedRedirect(UserPage));