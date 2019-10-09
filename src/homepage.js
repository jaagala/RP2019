import React from "react";
import {laptops, phones} from "./mydatabase";
import Header from "./ItemList";

const utils = require('./utils.js');

const categories = {
    PHONE: "phones",
    LAPTOP: "laptops",
};

let selectedCategory = categories.PHONE; 


function createItems() {
    const root = document.getElementById("item-list");

    root.innerHTML = null;

    let items = [];

    if(selectedCategory === categories.PHONE){
        items = phones;
    } else if (selectedCategory === categories.LAPTOP){
        items = laptops;
    }

    console.log("items", items);

    items.forEach((phone) => {
        const element = utils.createItemElement(phone);
        console.log("root", root);
        root.append(element);
    })
}


function setupCategoryListener(){
    const dropdown = document.getElementById("category-dropdown");
    dropdown.addEventListener("change", (event) => {
        selectedCategory = event.target.value;
        createItems();
    })  
}




function setup(){
    const root = document.getElementById("item-list");
    if(!root) return;
    createItems();
    setupCategoryListener();

    
}

module.exports = {
    setup,
}

export default HomePage;