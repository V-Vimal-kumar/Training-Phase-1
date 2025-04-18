
function Object() {
    let person = {
        name: "Vimal",
        age: 21,
        city: "Chennai",
        hobbies: ["coding", "reading", "gaming"]
      };
      
      console.log(person.name);
      console.log(person.age);
      console.log(person.city);
      console.log(person.hobbies);
      
      person.job = "Developer";
      person.age = 22;
      
      person.greet = function () {
        return "Hello, my name is " + this.name;
      };
      
      console.log(person.job);
      console.log(person.age);
      console.log(person.greet());
      
}

export default Object