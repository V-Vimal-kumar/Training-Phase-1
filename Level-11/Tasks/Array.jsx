import React from 'react'

function Array() {

    
    let favoriteFoods = ["Pizza", "Burger", "Pasta", "Sushi", "Ice Cream"];

    favoriteFoods.push("Tacos");
    favoriteFoods.shift();
    let length = favoriteFoods.length;
    let position = favoriteFoods.indexOf("Sushi");
    let slicedFoods = favoriteFoods.slice(1, 4);
    
    console.log("Original array:", favoriteFoods);
    console.log("Length of array:", length);
    console.log("Position of 'Sushi':", position);
    console.log("Sliced array (index 1 to 3):", slicedFoods);
    
}

export default Array