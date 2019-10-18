import React from "react";
import propTypes from "prop-types";
import "./dropdown.css";

class SortDropdown extends React.PureComponent{
    state = {
        open: true,
    };

    handleTrigger = () => {
        this.setState({
            open: !this.state.open,
        });
    };

    render(){
        return(
            <div className={"custom-select-wrapper"} onClick={this.handleTrigger}>
                <div className={`custom-select sources ${!this.state.open ? "opened" : ""}`}>
                    <span className={"custom-select-trigger"}>
                        {getDirectionText(this.props.direction)}
                    </span>
                    <div className={"custom-options"}>
                        <span 
                        className={"custom-option"} 
                            onClick={() => this.props.onChange(1)}
                        >   
                            {getDirectionText(1)}
                        </span>
                        <span 
                        className={"custom-option"} 
                        onClick={() => this.props.onChange(-1)}
                        >
                            {getDirectionText(-1)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

const getDirectionText = (x) => {
    switch (x) {
        case 1: return "Price low to high";
        case -1: return "Price high to low";
    }
};

SortDropdown.propTypes = {
    direction : propTypes.oneOf([1, -1]),
    onChange : propTypes.func
};

export default SortDropdown;