import React from "react";
import propTypes from "prop-types";

const SortDropdown = ({direction, onChange}) => {
    return (
        <div>
            <select value={direction} onChange={onChange}>
                <option value={-1}>Price high to low</option>
                <option value={1}>Price low to high</option>
            </select>
        </div>
    );
};

SortDropdown.propTypes = {
    direction : propTypes.oneOf([1, -1]),
    onChange : propTypes.func
};

export default SortDropdown;