import React from "react";
import propTypes from "prop-types";
import "./itemPage.css";
import Fancybutton from "../components/Fancybutton.jsx";
import {connect} from "react-redux";
import {addItem} from "../store/actions.js";
import {toast} from "react-toastify";

class ItemPage extends React.PureComponent {

    static propTypes = {
        dispatch: propTypes.func.isRequired
    }

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

    handleBuy = () => {
        toast.success("Toode lisatud");
        this.props.dispatch(addItem(this.state));
    }

    render() {
        console.log(this.props);

        return (
            <>
                <div className="itemContainer">
                    <img className={"itemPage__img"} src={this.state.imgSrc} />
                    <div className={"itemPage__title"}>{this.state.title}</div>
                    <div className={"itemPage__price"}>{this.state.price} €</div>
                    <div className={"item__desc"}>{LoremIpsum}</div>
                    <div>
                        <Fancybutton onClick={this.handleBuy}>Osta</Fancybutton>
                    </div>
                </div>
            </>
        );
    }
}

ItemPage.propTypes = {
    match: propTypes.object,
};

const LoremIpsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

export default connect()(ItemPage);