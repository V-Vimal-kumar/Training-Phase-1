import React from 'react'

function Switch() {
    const day = 5;
    let dayName;
    
    switch (day) {
      case 1:
        dayName = "Monday";
        break;
      case 2:
        dayName = "Tuesday";
        break;
      case 3:
        dayName = "Wednesday";
        break;
      case 4:
        dayName = "Thursday";
        break;
      case 5:
        dayName = "Friday";
        break;
      case 6:
        dayName = "Saturday";
        console.log("It's the weekend!");
        break;
      case 7:
        dayName = "Sunday";
        console.log("It's the weekend!");
        break;
      default:
        dayName = "Invalid day number";
    }
    
    console.log(dayName);
    
}

export default Switch