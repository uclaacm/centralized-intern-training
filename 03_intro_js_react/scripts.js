let myVar = "hello";

function greet(person) {
  console.log("Hello there " + person + "!");
}
greet("advaith");
//console.log(greet);

let peopleArr = ["advaith, amanda, sid"];

function greetEveryone(people, greeter) {
  people.forEach((person) => {
    greeter(person);
  });
}

greetEveryone(peopleArr, greet);

// if (number === "42") {
//   console.log("Equal!");

// }

// message = 4;

// console.log(typeof message);
// console.log(message);

//string
//number
//bigInt
//Boolean
//null
//undefined
