function SpreadOp() {
const array1 = [1, 2, 3];
const array2 = [4, 5, 6];

const combinedArray = [...array1, ...array2];
console.log("Combined Array:", combinedArray);

const copiedArray = [...array1];
copiedArray.push(99);
console.log("Original Array:", array1);
console.log("Modified Copy:", copiedArray);

const object1 = { name: "vk", age: 20 };
const object2 = { city: "Cbe", country: "India" };

const combinedObject = { ...object1, ...object2 };
console.log("Combined Object:", combinedObject);

}

export default SpreadOp