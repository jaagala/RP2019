/* eslint-disable no-unused-vars */
import React from "react";
import PropTypes from "prop-types";
import {getItems} from "../items/itemsActions.js";
import {FaRegTrashAlt, FaAngleRight} from "react-icons/fa";
import "../components/cart.css";

class CartPage extends React.Component {
    state = {
        rows: []
    };
    
    componentDidMount(){
        getItems()
        .then(items => {
            this.setState({
                rows: items.slice(0,4)
            });
        })
        .catch(err => {
            console.log(err);
            console.error("Something went wrong");
        });
    }

    render() {
        return (
            <div className={"spacer"}>
                <div className={"box-cart"}>
                    <Table rows={this.state.rows} />
                </div>
                <div className={"box-cart__summary"}>
                    <table>
                        <tbody>
                            <tr><td>Vahesumma</td><td>200 €</td></tr>
                            <tr><td>Vahesumma</td><td>25 €</td></tr>
                            <tr><td>Vahesumma</td><td>225 €</td></tr>
                            <tr>
                                <td></td>
                                <td><div className={"submit-button"}>Vormista ost<FaAngleRight /></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const Table = ({rows}) => {
    return (
        <div className={"shopping-cart"}>
            <div className={"row"}>
                <div className={"cell"} >Toode</div>
                <div className={"cell2"}>Nimetus</div>
                <div className={"cell3"}>Kategooria</div>
                <div className={"cell4"}>Summa</div>
                <span className={"cell5"}></span>
            </div>
            {rows.map( (row) => <Row key={row._id} {...row} />)}
        </div>
    );
};

Table.propTypes = {
    rows: PropTypes.array.isRequired,
};

const Row = ({title, imgSrc, category, price}) => {
    return (
        <div className={"row"}>
            <div className={"cell"}>
                <img src={imgSrc} className={"cell-img"}/>
            </div>
            <div className={"cell2"}>
                {title}
            </div>
            <div className={"cell3"}>
                {category}
            </div>
            <div className={"cell4"}>
                {price} €
            </div>
            <div className={"cell5"}>
                <FaRegTrashAlt/>
            </div>
        </div>
    );
};

export const ItemProps = {
    _id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

Row.propTypes = ItemProps;

export default CartPage;