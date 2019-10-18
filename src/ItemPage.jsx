import React from "react";
import Header from "./Header.jsx";
import propTypes from "prop-types";

class ItemPage extends React.PureComponent {

    constructor(props){
        super(props);
        this.state = {};
    }

    componentDidMount(){
        this.fetchItem();
    }

    fetchItem(){
        fetch("/api/products/" + this.props.match.params.itemId)
            .then(res => {
                console.log(res);
                return res.json();
            })
            .then(item => {
                console.log("item", item);
                this.setState({
                    ...item
                });
            })
            .catch(err => {
                console.log("item page ", err);
            });
    }

    render() {
        return (
            <>
                <Header />
                <div className="itemContainer">
                    <img src={this.state.imgSrc} />
                    <div className={"item__title"}>{this.state.title}</div>
                    <div className={"item__price"}>{this.state.price}</div>
                </div>
            </>
        );
    }
}

ItemPage.propTypes = {
    match: propTypes.object,
};

export default ItemPage;