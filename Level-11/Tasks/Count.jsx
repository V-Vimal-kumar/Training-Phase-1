
function Count() {
    let count=0;

    return function(){
        count++;
        return count;
    }
}
const count1=Count()
const count2=Count()

console.log(count1())
console.log(count1())
console.log(count2())
console.log(count1())
console.log(count2())


export default Count