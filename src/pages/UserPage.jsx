import React from "react";
import PropTypes from "prop-types";
import authConsumer from "../components/authConsumer.jsx";

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

export default authConsumer(UserPage);