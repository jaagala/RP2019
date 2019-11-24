import React from "react";
import PropTypes from "prop-types";

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

export default UserPage;