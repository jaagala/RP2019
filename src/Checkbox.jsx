import React from "react";
import propTypes from "prop-types";

const Checkbox = ({name, onChange, checked}) => {
    return (
        <div>
           <label>
               {name}:
               <input
                    name = {name}
                    type = "checkbox"
                    checked = {checked}
                    onChange={onChange} />
           </label>
        </div>
    );

};

Checkbox.propTypes = {
    name: propTypes.string,
    onChange: propTypes.func,
    checked: propTypes.bool,
};

export default Checkbox;