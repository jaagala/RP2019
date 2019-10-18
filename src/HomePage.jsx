import React from "react";
import Header from "./Header.jsx";
import ItemList from "./ItemList.jsx";
import Checkbox from "./Checkbox.jsx";
import propTypes from "prop-types";
import "./homepage.css";

class HomePage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            allCategorires: ["phones", "laptops"],
            selectedCategories: ["phones"],
        };
    }

    componentDidMount(){
        this.fetchItems();
    }

    fetchItems(){
        fetch("/api/products")
            .then(res => {
                //console.log("res", res);
                return res.json();
            })
            .then(items => {
                //console.log("items", items);
                this.setState({
                    items
                });
            })
            .catch(err => {
                console.log("err", err);
            });
    }

    handleDropdown = (event) => {
        if(this.isSelected(event.target.name)){
            const clone = this.state.selectedCategories.slice();
            const index = this.state.selectedCategories.indexOf(event.target.name);
            clone.splice(index, 1);
            this.setState({
                selectedCategories: clone
            });
        }else{
            this.setState({
                selectedCategories: this.state.selectedCategories.concat([event.target.name])
            });
        }
    }

    getVisibleItems = () => {
        return this.state.items.filter(item => this.isSelected(item.category));
    }

    isSelected = (name) => this.state.selectedCategories.indexOf(name) >= 0 ;
    

    render() {
        console.log(this.state);
        return (
            <>
                <Header />
                <ItemFilters
                    allCategorires={this.state.allCategorires}
                    handleDropdown={this.handleDropdown}
                    isSelected={this.isSelected}
                />
                <ItemList items={this.getVisibleItems()} />
            </>
        );
    }
}

const ItemFilters = ({ allCategorires, handleDropdown, isSelected}) => {
    return (
        <div className={"itemFilters-wrapper"}>
            {
                allCategorires.map(categoryName => {
                    return (
                        <Checkbox
                            key={categoryName}
                            name={categoryName}
                            onChange={handleDropdown}
                            checked={isSelected(categoryName)}
                        />
                        );
                })
            }
        </div>
    );
};

ItemFilters.propTypes = {
    allCategorires : propTypes.array,
    handleDropdown : propTypes.func,
    isSelected : propTypes.func
};


export default HomePage;