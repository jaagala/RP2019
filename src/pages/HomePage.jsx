import React from "react";
import ItemList from "../components/ItemList.jsx";
import Checkbox from "../components/Checkbox.jsx";
import SortDropdown from "../components/SortDropdown.jsx";
import propTypes from "prop-types";
import "./homepage.css";

class HomePage extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            sortDirection: 1,
            items: [],
            allCategorires: ["pillows", "other"],
            selectedCategories: ["pillows"],
        };
    }

    componentDidMount(){
        this.fetchItems();
    }

    fetchItems(){
        fetch("/api/v1/products")
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

    handleFilterSelect = (event) => {
        const categoryName = event.target.name;
        if(this.isSelected(categoryName)){
            this.unselectCategory(categoryName);
        }else{
            this.selectCategory(categoryName);
        }
    };

    selectCategory = (categoryName) => {
        this.setState({
            selectedCategories: this.state.selectedCategories.concat([categoryName])
        });
    };

    unselectCategory = (categoryName) => {
        const newArr = this.state.selectedCategories.filter( cn => cn !== categoryName );
        this.setState({
            selectedCategories: newArr
        });
    };

    getVisibleItems = () => {
        return this.state.items
            .filter(item => this.isSelected(item.category))
            .sort( (a,b) => {
                switch (this.state.sortDirection) {
                    case -1: return  b.price - a.price;
                    case 1: return a.price - b.price;
                }
            });
    }

    isSelected = (name) => this.state.selectedCategories.indexOf(name) >= 0 ;
    
    handleSortDropdown = (sortDirection) => {
        this.setState({
            sortDirection: sortDirection
        });
    };


    render() {
        const items = this.getVisibleItems();
        return (
            <>
                <ItemFilters
                    allCategorires={this.state.allCategorires}
                    handleDropdown={this.handleFilterSelect}
                    isSelected={this.isSelected}
                />
                <div className={"items-settings"}>
                    <div className={"items__found"}>
                        Items found {items.length} in {this.state.selectedCategories.join(", ")}
                    </div>
                    <SortDropdown 
                        direction={this.state.sortDirection}
                        onChange={this.handleSortDropdown}
                    />
                </div>
                <ItemList items={items} />
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