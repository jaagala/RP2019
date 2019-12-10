import React from "react";
import "./fancybutton.css";
import PropTypes from "prop-types";


const Fancybutton = ({children, onClick}) => (
    <div className={"btn btn--fancy"} onClick={onClick}>
        <div className={"btn-inner"}>
            <div>
                {children}
            </div>
        </div>
    </div>
);

Fancybutton.propTypes = {
    children: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
};

export default Fancybutton;