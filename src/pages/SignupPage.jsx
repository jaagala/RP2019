import React from "react";
import "./form.css";
import PropTypes from "prop-types";

class SignupPage extends React.Component {

    static propTypes = {
        history: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }
    handleSubmit = (event) => {
        event.preventDefault();
        fetch("/api/v1/auth/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(this.state),
            })
            .then( res => res.json())
            // eslint-disable-next-line no-unused-vars
            .then( data => {
                this.props.history.push("/login");
            })
            .catch(err => {
                console.log("Error", err);
            });
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render(){
        return(
            <>
                <div><h1 style={{ textAlign: "center" }}>Sign up</h1></div>
                <div className="form">
                    <form className="register-form" onSubmit={this.handleSubmit}>
                        <input type="email" placeholder="email address" name={"email"} onChange={this.handleChange}/>
                        <input type="password" placeholder="password" name={"password"} onChange={this.handleChange}/>
                        <button>create</button >
                        <p className="message">Already registered? <a href="/login">Sign In</a></p>
                    </form>
                </div>
            </>
        );
    }
}

export default SignupPage;