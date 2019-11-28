import React from "react";
import PropTypes from "prop-types";
import authConsumer from "../components/authConsumer.jsx";
import protectedRedirect from "../components/protectedRedirect.jsx";

class UserPage extends React.Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
    };
    render() {
        return (
            <div>
                Welcome {this.props.user.email}
            </div>
        );
    }
}

export default authConsumer(protectedRedirect(UserPage));