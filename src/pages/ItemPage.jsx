import React from "react";
import propTypes from "prop-types";
import "./itemPage.css";

class ItemPage extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.fetchItem();
    }

    fetchItem(){
        fetch("/api/v1/products/" + this.props.match.params.itemId)
            .then(res => {
                return res.json();
            })
            .then(item => {
                this.setState({
                    ...item
                });
            })
            // eslint-disable-next-line no-unused-vars
            .catch(err => {
            });
    }

    render() {
        return (
            <>
                <div className="itemContainer">
                    <img className={"itemPage__img"} src={this.state.imgSrc} />
                    <div className={"item__title"}>{this.state.title}</div>
                    <div className={"itemPage__price"}>{this.state.price} €</div>
                </div>
            </>
        );
    }
}

ItemPage.propTypes = {
    match: propTypes.object,
};

export default ItemPage;