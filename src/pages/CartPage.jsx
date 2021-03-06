import PropTypes from "prop-types";
import React from "react";
import Fancybutton from "../components/Fancybutton.jsx";
import { FaAngleRight, FaRegTrashAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { removeItem } from "../store/actions.js";
import "../components/cart.css";
import { toast } from "react-toastify";
import * as selectors from "../store/selectors.js";
import * as services from "../services.js";

class CartPage extends React.Component {
    static propTypes = {
        cartItemIds: PropTypes.arrayOf(PropTypes.string).isRequired,
        dispatch: PropTypes.func.isRequired,
    };

    state = {
        cartItems: [],
    };

    componentDidMount() {
        this.fetchItems();
    }

    componentDidUpdate(prevProps){
        const prevPropIds = prevProps.cartItemIds.join("");
        const currentIds = this.props.cartItemIds.join("");
        if(prevPropIds !== currentIds){
            this.fetchItems();
        }
    }

    fetchItems = () => {
        const promises = this.props.cartItemIds.map(itemId => services.getItem({ itemId }));
        Promise.all(promises).then(items => {
            this.setState({
                cartItems: items,
            });
        })
            .catch(err => {
                console.error(err);
                toast.error("Failed fetching items");
            });
    }

    calcNumbers = () => {
        const VAT = 20;
        const sum = Math.round(this.state.cartItems.reduce((acc, item) => acc + item.price, 0));
        const tax = Math.round(sum / 100 * VAT);
        return {
            sum, tax
        };
    };

    handleTrash = (_id) => {
        this.props.dispatch(removeItem(_id));
    }

    render() {
        const { tax, sum } = this.calcNumbers();
        return (
            <div className={"spacer"}>
                <div className={"box-cart"}>
                    <Table
                        onTrash={this.handleTrash}
                        rows={this.state.cartItems}
                    />
                </div>
                <div className={"box-cart__summary"}>
                    <table>
                        <tbody>
                            <tr><td>Vahesumma</td><td>{sum} €</td></tr>
                            <tr><td>Käibemaks</td><td>{tax} €</td></tr>
                            <tr><td>Kogusumma</td><td>{tax + sum} €</td></tr>
                            <tr>
                                <td></td>
                                <td><Fancybutton onClick={() => console.log("buy")}>Vormista ost<FaAngleRight /></Fancybutton></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const Table = ({ rows, onTrash }) => {
    return (
        <div className={"shopping-cart"}>
            <div className={"row"}>
                <div className={"cell"} >Toode</div>
                <div className={"cell2"}>Nimetus</div>
                <div className={"cell3"}>Kategooria</div>
                <div className={"cell4"}>Summa</div>
                <span className={"cell5"}></span>
            </div>
            {rows.map((row, index) => <Row onTrash={onTrash} key={index} {...row} />)}
        </div>
    );
};

Table.propTypes = {
    rows: PropTypes.array.isRequired,
    onTrash: PropTypes.func.isRequired,
};

const Row = ({ _id, title, imgSrc, category, price, onTrash }) => {
    return (
        <div className={"row"}>
            <div className={"cell"}>
                <img src={imgSrc} className={"cell-img"} />
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
            <div className={"cell5 hover--opacity"}>
                <FaRegTrashAlt title={"Eemalda"} onClick={() => onTrash(_id)} />
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

Row.propTypes = {
    ...ItemProps,
    onTrash: PropTypes.func.isRequired,
};

const mapStateToProps = (store) => {
    return {
        cartItemIds: selectors.getCart(store),
    };
};

export default connect(mapStateToProps)(CartPage);