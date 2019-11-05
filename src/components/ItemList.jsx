import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
import "./itemlist.css";

const ItemList = (props) => {
    console.log("items list", props);
    return (
        <div className={"items-layout"}>
            {
                props.items.map(item => {
                    return <Item
                        key = {item._id}
                        id = {item._id}
                        imgSrc={item.imgSrc}
                        title={item.title}
                        price={item.price}
                    />;
                })
            }
        </div>
    );
};

const Item = (props) => {
    return (
        <Link to={"/products/"+props.id} className={"item"}>
            <div className={"item__img-wrapper"}>
                <img src={props.imgSrc} />
            </div>
            <div className={"item__description"}>
                <div className={"item__title"}>{props.title}</div>
                <div className={"item__footer"}>
                    <div className={"item__price"}>{props.price} €</div>
                    <div className={"item__reviews"}>{`(${getRandomIntInclusive(0,100)} reviews)`}</div>
                </div>
            </div>
        </Link>
    );
};

ItemList.propTypes = {
    items: propTypes.array
};

Item.propTypes = {
    id: propTypes.string,
    imgSrc: propTypes.string,
    title: propTypes.string,
    price: propTypes.number,
};

function getRandomIntInclusive(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
}

export default ItemList;