# Javascript And React.js

Today, we'll go into an introduction to Javascript as a programming language, and how React builds on these features to make dynamic websites!

## Table of Contents

- [JavaScript Vs React](#javascript-vs-react)
- [Hello World](#hello-world)
- [Node.js](#nodejs)
  - [NVM](#nvm)
  - [Package Managers: NPM Vs Yarn](#package-managers-npm-vs-yarn)
  - [NPM To Yarn](#npm-to-yarn)
- [Variables](#variables)
  - [let, var, and const](#let-var-and-const)
- [Primitive Types](#primitive-types)
- [Type Coercion](#type-coercion)
- [Objects Vs Primitives](#objects-vs-primitives)
  - [Arrays And References in JavaScript](#arrays-and-references-in-javascript)
  - [The Spread Operator](#the-spread-operator)
  - [Objects](#objects)
- [JavaScript Functions](#javascript-functions)
  - [First-Class Functions](#firstclass-functions)
  - [Anonymous Functions](#anonymous-functions)
  - [Arrow Functions](#arrow-functions)
- [For, If, While](#for-if-while)
- [Common Issues With JavaScript](#common-issues-with-javascript)
  - [Wrong Function Arguments](#wrong-function-arguments)
  - [Refactoring Struggles](#refactoring-struggles)
- [Manipulating the DOM](#manipulating-the-dom)
  - [`addEventListener`](#addeventlistener)
- [What's React?](#whats-react)
- [`create-react-app`](#create-react-app)
  - [Understanding the `create-react-app` demo](#understanding-the-create-react-app-demo)
- [HTML in JS: JSX](#HTML-in-JS-JSX)
  - [Including Other Files](#including-other-files)
  - [JSX Extension](#jsx-extension)
- [Arrays](#arrays)
  - [`forEach`](#foreach)
  - [`map`](#map)
  - [`reduce`](#reduce)
- [Using `map` in React](#using-map-in-react)
  - [List and Keys](#list-and-keys)
- [Functional React](#functional-react)
  - [State](#state)
  - [Props](#props)
  - [Props Vs State](#props-vs-state)
  - [Outdated: Class Based React](#outdated-class-based-react)
  - [Why Functional](#why-functional)
- [Manipulating the DOM in React](#manipulating-the-dom-in-React)
- [Conclusion](#conclusion)
- [References](#references)

## JavaScript Vs React

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is a lightweight interpreted scripting/programming language that is heavily used in Web Applications and even beyond them!

[React.js](https://reactjs.org/) is a framework built on top of Javascript. **React only updates what needs to be updated**, which is one of the main reasons why it's so popular.

## Hello World

As we said, JavaScript is heavily used within Web Applications. In fact, we can even insert JavaScript into our HTML files with the `script` tag!

```html
<div>Some Code...</div>
<script>
  console.log("Hello World!");
</script>
```

The script tag executes javascript code in the browser, but it can get really messy to have one giant file with both HTML and JS. Similarly to how we can make a CSS stylesheet and link it within our HTML file, we can put our separate JavaScript code within a separate JavaScript file with the `.js` extension.

We can link back to it in our code with the `src` property of our script tag!

```js
//tests.js
console.log("Hello World!");
```

The console is an object in javascript, and we log something to it with the `.log()` method!

```html
<div>Some Code within index.html...</div>
<script src="tests.js"></script>
```

If you refresh the page, it looks like nothing got added to our page! However, if we go into the console section of our page with `Inspect Element`, we can see that it says Hello World to us!

This makes our browser execute JavaScript code, but there are actually other ways to execute JS code without your browser.

## Node.js

Node is a JavaScript runtime which is a way to execute your javascript code files without using your browser, and you can run a file by simply calling

```sh
$ node FILE_NAME.js
```

### NVM

To install Node.js and npm, we will be using another application, we will be using another program, **nvm** (node version manager). This makes it a lot easier to manage which version of node we're using. To use nvm, run either of the following scripts in your home directory:

```sh
$ curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

```sh
$ wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

Complete nvm source code, documentation, and installation troubleshooting can be found here: [https://github.com/nvm-sh/nvm](https://github.com/nvm-sh/nvm)

The nvm installation script should install Node.js (and therefore npm) by default. Verify the successful installation by running <br />
`node -v` and `npm -v`, which will output the programs' respective version numbers.

If Node.js was not installed, run `nvm install --LTS` to install the latest stable version of Node.js.

### Package Managers: NPM Vs Yarn

With Node comes a package manager to install dependencies and external libraries for your code. Node comes with one built in, NPM, (node package manager), but we can also use Yarn instead! This is because yarn is a lot faster and there used to be security issues within NPM.

### NPM To Yarn

Switching from NPM to Yarn isn't that bad, you can install yarn globally through npm with

```sh
$ npm install --global yarn
```

and there's only a few differences between the two, like how `npm start` becomes `yarn start` or how `npm install PACKAGE` becomes `yarn add PACKAGE`, etc.

To initialize yarn in your application, just run

```
$ yarn init
```

or

```
$ yarn init --yes
```

to skip all the prompts that appear!

## Variables

To make variables in JavaScript, you simply call your variables with the `let` keyword.

```sh
let message = "Hello World!";
console.log(message);
```

Unlike other statically typed languages like C++, Java, JavaScript is **dynamically typed** which means that the types of variables, return values of functions, etc are all evaluated **at runtime**. In **statically typed languages**, you have to declare the type of the variable when you make it. But in JavaScript, you just have to say `let`, and the browser figures out what type it is.

Even though types are determined at run-time, JavaScript still has types to it! In JavaScript, everything is either a primitive data type or an object, let's go over each of them after we cover the three different ways to define variables!

### let, var, and const

So far, we've discussed using the `let` keyword to define variables. `let` is block-scoped:

```js
let error = true;
if (error) {
  let errorMessage = "oh no!";
}
console.log(errorMessage);
// undefined
```

It only maintains its scope in the "block" that it was defined in, which is roughly the nearest set of braces. This is similar to how variable declarations work in almost any other language that you know.

There is another keyword, `var` - in fact, this is the original one. `var` is function scoped. We... haven't gone into functions yet, but the key difference is visible here:

```js
let error = true;
if (error) {
  var errorMessage = "oh no!";
}
console.log(errorMessage);
// "oh no!"
```

This rarely will affect you in your day-to-day coding life, but it's probably best practice to use `let` - it's the behaviour that most programmers expect. We'll go over `var` once we get to functions!

And finally, `const`? Well, it mostly behaves how you'd think:

```js
const DO_NOT_CHANGE_THIS = 42;
DO_NOT_CHANGE_THIS = 21;
// Uncaught TypeError: Assignment to constant variable.

const CONSTANT_OBJECT = {};
CONSTANT_OBJECT["a"] = 42;
console.log(CONSTANT_OBJECT);
// {a : 42}

CONSTANT_OBJECT = {};
// Uncaught TypeError: Assignment to constant variable.
```

Okay, well that first example makes sense. But what's up with the second one? Well, recall that all data types in Javascript are objects, and therefore all variables are references.

So, what `const` really guarantees is that the reference will always stay the same. With primitive data types, that's great: because they're immutable, once the value is created, it'll never change. But, for every non-primitive data type, the object _is mutable_, and so it can change at any point without changing the underlying reference. Long story short? Using `const` on an object, or an array, or many other data types doesn't guarantee that it's truly constant - it just can't be reassigned.

## Primitive Types

In JavaScript, there are 7 different "primitive" data types. By primitive data type, it means that in memory they are represented with their actual value in memory, and their values are immutable, which means that that the value of a primitive cannot be altered, but the variable associated with it can be reassigned a new value!

The six primitive data types are

- string
- number
- bigInt (big integer values)
- boolean (true or false)
- null
- undefined

(and Symbol, but it's not very common and we won't cover it!)

Numbers in JavaScript are an example of a primitive type. You can check the type of something with `typeof`.

```js
console.log(typeof 4);
// number
```

Let's see an example of how primitive data is stored in memory:

```js
let myNum = 56;
const numRef = myNum;

// SEPARATION BETWEEN CHARTS

myNum = 50;
console.log(myNum == numRef);
//prints out false!
```

| Variable | Value |
| -------- | ----- |
| myNum    | 56    |
| numRef   | 56    |

We can assign new values with the assignment operator `=`. The assignment operator takes the value that's within the right side and assigns it to the variable on the left side.

After we change myNum's value to 50, it becomes

| Variable | Value |
| -------- | ----- |
| myNum    | 50    |
| numRef   | 56    |

## Type Coercion

Did you see how we compared two values with the `==` symbol? In JavaScript, there are actually two ways to compare values.

The first way, `==` tries to cast things to be the same type before comparing them.

```js
console.log(1 == "1");
//returns true!
```

However, for `===` to return true, the two things you compare need to be of the same type!

```js
console.log(1 === "1");
//returns false!

console.log(1 === 1);
//returns true!
```

`-` only works with `Numbers` on both sides, and will convert to Number first.
**However**, + will convert to string if the types aren't the same!

```js
console.log("10" - 1);
//9

console.log("10" + 1);
//101
```

If you try subtracting things that aren't numbers, you get **NaN** which means Not a Number.

Type coercion is also really helpful with booleans!

Values that are evaluated as false are the following:

- `0`
- `null`
- `undefined`
- `""` (empty string)
- `NaN`

while all other values are coerced to true.

This is really helpful because in our code, we can make something like

```js
let str = "";

if (str) {
  //execute code
}
```

to clean up and avoid having to explicitly check equality or inequality with `==` or `===`.

## Objects Vs Primitives

Now that we've covered primitive types, the other data type that JavaScript uses for non-primitive types are **objects.** Everything else that's not a primitive is an object!

The main difference between primitives and objects is how they are stored in memory. While the values of primitives are directly represented, objects actually store references to addresses. These addresses are what store the data!

An example of an object is an array, let's see how an array is stored in memory:

### Arrays And References in JavaScript

```js
const arr = [1, 2, 3];
const arrRef = arr;
//why can we change arr's 2nd index even though it's const??
arr[2] = 4;
//arr and arrRef are both [1,2,4] now!

console.log(arr == arrRef);
//prints out true!
```

Alright, now let's take a look at how references work! First, let's take a look at the **const** keyword. The reason why we can change the value of arr[2] even though it's declared const is because the const keyword defines a constant **reference** to a value for objects.

Now, references are different than the primitive data types that we just discussed. While primitive data types store the value directly with respect to their variables, references work differently.

Referential equality is used for nested data types. (Nested data types are objects with {}, arrays with [], or anything that's not the five primitive types we covered above). Let's take a look to see how references are stored in memory!

| Variable | Value  | Address | Object  |
| -------- | ------ | ------- | ------- |
| arr      | <#001> | #001    | [1,2,3] |
| arrRef   | <#001> |         |         |

When we change arr[2] to 4...

| Variable | Value  | Address | Object  |
| -------- | ------ | ------- | ------- |
| arr      | <#001> | #001    | [1,2,4] |
| arrRef   | <#001> |         |         |

Just like with primitive types, `===` compares the value associated with each variable. However, here we can see that the value actually corresponds to a corresponding address in memory where the Object is stored!

If we want to create a new object in memory that's based off of the previous one, we have to use the **spread** operator.

### The Spread Operator

With the spread operator, we can create "deeper" copies of objects as opposed to "shallow" copies. Deep copies are not connected to the original data, while shallow copies are "connected" to the data by having the same reference pointer!

Let's try doing the same thing as above except with the spread operator this time!

```js
const arr = [1, 2, 3];
//Spread operator!
const arrRef = [...arr];
arr[2] = 4;
console.log(arr);
//prints out [1,2,4]
console.log(arrRef);
//prints out [1,2,3]
```

The spread operator passes in the values within the object, but creates a new reference to a **new object** in memory!

| Variable | Value  | Address | Object  |
| -------- | ------ | ------- | ------- |
| arr      | <#001> | #001    | [1,2,3] |
| arrRef   | <#002> | #002    | [1,2,3] |

After changing arr[2]'s value...

| Variable | Value  | Address | Object  |
| -------- | ------ | ------- | ------- |
| arr      | <#001> | #001    | [1,2,4] |
| arrRef   | <#002> | #002    | [1,2,3] |

**NOTE:** The spread operator is not a fully "deep" copy, but it's one step deeper than a shallow copy. This means that it copies over all the values of the copied over array. If you have an array of arrays for instance, you would have to nest your spread operators to create a fully deep copy like so...

```js
//arrays of numbers
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const arr3 = [7, 8, 9];

//array of the array of numbers
const arrArr = [arr1, arr2, arr3];

//mapping to create a deep copy by nesting our spread operator inside of a mapping function
const fullyDeep = numArr.map((subArray) => [...subArray]);

const stillShallow = [...numArr];

arr1[2] = 10;

/*stillShallow is changed as well since its values point to the same arrays as 
numArr even with the spread operator! */

//However, fullyDeep is correctly a deep copy!
```

Representation in Memory with stillShallow and fullyDeep:

| Variable     | Value  | Address | Object                 |
| ------------ | ------ | ------- | ---------------------- |
| arr1         | <#001> | #001    | [1,2,3]                |
| arr2         | <#002> | #002    | [4,5,6]                |
| arr3         | <#003> | #003    | [7,8,9]                |
| arrArr       | <#004> | #004    | [<#001>,<#002>,<#003>] |
| stillShallow | <#005> | #005    | [<#001>,<#002>,<#003>] |
| fullyDeep    | <#006> | #006    | [<#006>,<#007>,<#008>] |
| fullyDeep[0] | <#007> | #007    | [1,2,3]                |
| fullyDeep[1] | <#008> | #008    | [4,5,6]                |
| fullyDeep[2] | <#009> | #009    | [7,8,9]                |

So, in order to make fully deep copies, you have to know the **structure** of the object you are copying and make sure that you use the spread operator when necessary to prevent shallow copy shenanigans.

Key takeaways of arrays:

- Arrays in JS can have multiple types in them
- They can be used as stacks/queues.
- Arrays are Objects

## Objects

That's right, this array was an object. Under the hood, when we called let arr, we "called the constructor for an array" (not... entirely true). Then, when we do things like .length or .push(), we're accessing variables or using class functions respectively!

This is the case for every data type in Javascript, including the primitive ones we discussed earlier! They all stem from one "class" (not entirely true) called Object, which has a wide variety of predefined properties and methods.

In JavaScript, `Objects` are kind of like dicts in Python, with **key-value pairs** holding all the data. Let's see the syntax here!

```js
const myPet = {
  name: "Rufus",
  type: "dog",
};

console.log(myPet["name"]);
//Rufus

myPet["name"] = "Rufus the Fourth";
myPet.type = "cat";
```

As you can see, you can declare the "shape" of the object with the key on the left, and you can specify its value on the right!
And to access values within your object, you simply can call the key of it.

## JavaScript Functions

Javascript is a **functional programming language**. By the sound of that, functions are probably pretty important. They look pretty C-like to us:

```js
function saySomething(message) {
  console.log(message);
}

saySomething("hey there!");
// "hey there!"

function squared(n) {
  return n ^ 2;
}

squared(2);
// 4
```

You start by writing the keyword `function`, then the name of the function, and inside the parentheses, each parameter. Finally, you've got the body, and either an explicit `return` statement, or an implicit empty return (`return;`).

Note that there are no explicit types here! This can actually make things quite confusing.

```js
function adder(a, b) {
  return a + b;
}

adder(42, 42);
// 84
adder(42, "42");
// "4242"
```

Type coercion is back again! In this case, you'd probably want to use explicit type conversions.

```js
function numberAdder(a, b) {
  return Number(a) + Number(b);
}
```

This type of typecasting is essentially calling the `Number` constructor with our parameters. While this looks pretty annoying, you often have to write code like this when interfacing with other libraries, as guaranteeing types is tricky!

### First-Class Functions

Let's move on to the cool stuff though. One of the big features of functional programming languages is the idea of _first-class functions_: functions are treated like any other data type. In this case, that means that... functions are objects too!

```js
function saySomething(message) {
  console.log(message);
}

let greeter = saySomething;
greeter("hey!");
// "hey!"

console.log(greeter);
// f: greeter(message) ...
```

Wow! That's not something you'll see often. The lack of type annotations makes this a little tricky to understand, but we're basically pointing `greeter` to the "function body" of `saySomething`! Every time you use the name of the function _without parentheses or its parameters_, it's the reference to the function - just like any other variable!

One useful application of this is a _higher-order function_, or passing in functions as arguments for other functions.

```js
function friendlyGreeting(name) {
  return "Hey there! Great to meet you, " + name;
}

function greetEverybody(listOfPeople, greetingFunction) {
  for (let person of listOfPeople) {
    console.log(greetingFunction(person));
  }
}

let flirters = ["🥺", "😘", "😍"];

greetEverybody(flirters, friendlyGreeting);
// "Hey there! Great to meet you, 🥺"
// "Hey there! Great to meet you, 😘"
// "Hey there! Great to meet you, 😍"
```

That's a trivial example, but it demonstrates the point. One more realistic example of this is the `.map` function on arrays:

```js
function double(x) {
  return 2 * x;
}
let nums = [1, 2, 3, 5, 7, 11];
nums.map(double);
// 2, 4, 6, 10, 14, 22
```

This is a huge part of functional programming (something about no side effects, parallelization, etc. - out of scope of this discussion, but hit up Matt for more)! You'll find this often in React apps when you need to generate lists of components from data.

### Anonymous Functions

There's one other thing we'll quickly point out: anonymous (or lambda, or whatever you want to call them) functions.

Let's say we wanted to double all elements of the `nums` array again, but we only need to _really_ do this operation once. It wouldn't make sense to write a whole function, so we'd like for a slightly more disposable medium.

Luckily, JavaScript provides for this in the form of **anonymous functions**, otherwise known as **lambda expressions** in languages like C++ and Python. It is easier to take a peek at one in action:

```py
# in python, lambda functions are very common.
# you've likely seen or used one in a call to `filter`:
nums = [1, 2, 3, 5, 7, 11]
filter(lambda item: item == 5, nums)
# [5]
```

We have an indication that we are providing a lambda expression (`lambda` in Python), the name(s) of the argument(s) it will take (`item` after the `lambda`), and the expression itself (after the `:`). In this case, we wrote a lambda expression that will return true if `item` is equal to 5. Using this expression in a call to `filter` (which takes a function argument), we filter out all the items except for 5!

With that under our belt, let's take a look at what one looks like in JavaScript:

```js
let nums = [1, 2, 3, 5, 7, 11];
nums.map(function (element) {
  return element * 2;
});
// [2, 4, 6, 10, 14, 22]
```

Let's break down the syntax a little. Just like Python, we have:

- Indication of the start of a `function` with the keyword
- The parameter list or arguments to the function (the part in `()`)
- The body of the function (in our case, the part in `{}`)

Thus, each element in `nums` has our anonymous function called on it, and the element is set to its return value.

There are slightly cleaner ways of creating lambdas in JavaScript, but this form will never fail you. Just make sure that your lambda expression takes the parameters its caller expects, and the return value is expected as well!

### Arrow Functions

Anonymous functions can alse be written differently, using **Arrow Functions**. Let's look at the above example in the form of an arrow function.

```js
let nums = [1, 2, 3, 5, 7, 11];
nums.map((element) => {
  return element * 2;
});
// [2, 4, 6, 10, 14, 22]
```

It's basically the same as before, except that we don't have to use the `function` keyword anymore, and arguments go inside the paranthesis.

## For, If, While

Just like in other languages, we can make loops and do conditionals! I won't bore you with the syntax, but here's some quick examples:

```js
const answer = 9 + 10 === 21;

if (answer) {
  console.log("9+10=21");
} else {
  console.log("That's wrong!");
}

let hungry = true;
while (hungry) {
  goToBplate();
}

const nums = ["1", "2", "3"];

for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}

// 1 2 3

for (let num of nums) {
  console.log(num);
}
// 1 2 3

const skillLevels = {
  coding: 4,
  running: 3,
  singing: 1,
};

for (skill in skillLevels) {
  console.log(skillLevels[skill]);
}
```

In the last two examples, we see how we can use `of` and `in` to go through objects! The `of` keyword can be used for things that are "iterable" (a set order to them like an array). And the `in` keyword can be used to go through "enumerable" things, where you can name all of the properties of it without ordering them, like an object.

## Common Issues With JavaScript

Since JavaScript is a dynamically typed language (which means that variables can change types), JavaScript fails to catch a lot of errors and makes refactoring code in the future hard.

### Wrong Function Arguments

Let's take a look at this function that divides two numbers!

```js
function divideTwoNums(a, b) {
  return a / b;
}
```

If we try running our code with two arguments that are both numbers, then the function works perfectly fine.

```js
console.log(divideTwoNums(8, 4));
//returns 2
```

However, if we try to pass in two arguments that are **_not_** numbers into `divideTwoNums`, we can see that some issues arise!

```js
console.log(divideTwoNums("apple", "banana"));
//returns NaN
```

### Refactoring Struggles

Let's take a look at a function that calls a pet argument we pass in!

```js
function callPet(pet) {
  return "Come here " + pet + "!";
}
```

We can call it like so:

```js
const myPet = "Rufus";
console.log(callPet(myPet));
//Prints out "Come here Rufus!"
```

However, let's say that we want to change the structure of our pet parameter for the function `callPet` to be a pet object like so:

```js
const newPet = {
  name: {
    first: "Rufus",
    last: "the Third",
  },
  type: "dog",
};
```

Even though our code editor won't spit any errors at us when we try running `callPet(newPet)`, the application **will** crash, but the error will point us towards the function instead of where the problem **really lies**, inside the function call.

```js
/*Our terminal tells us: TypeError: Cannot read property 'first' of undefined at callPet, even though our code editor thinks this is perfectly fine!  */
console.log(callPet(newPet));
```

This can be a **serious problem** since application crashes can be very costly for companies and we want to be able to detect our errors at the source!

## Manipulating the DOM

Okay, but how does this help us make websites? Well, the original focus was to change the "Document Object Model", which as you may recall, is a fancy word for our webpage. Let's run through a bare-bones example:

```html
<div>You have <span id="likes-counter">0</span> upvotes.</div>
<button id="incrementer">Upvote!</button>
<button id="decrementer">Downvote!</button>
```

```js
let likeCounterElement = document.getElementById("likes-counter");
const buttonIncrementer = document.getElementById("incrementer");
buttonIncrementer.addEventListener("click", function () {
  const currentLikes = Number(likeCounterElement.innerHTML);
  likeCounterElement.innerHTML = currentLikes + 1;
});
document.getElementById("decrementer").addEventListener("click", () => {
  const currentLikes = Number(likeCounterElement.innerHTML);
  likeCounterElement.innerHTML = currentLikes - 1;
});
```

Let's open this up in our web browser and take a peek at what's going on.

Let's focus in a little bit on this: `document.getElementById(...) ...`. If you're looking for a direct example of the DOM in JS, here it is: the literal `document` object! This is the native JavaScript representation of the current webpage.

Next, we call `getElementById()` on it, with argument `"likes-counter"`. This should be pretty self explanatory as to what it does, but let's take a look at what it actually looks like in our console:

This is the crux of the DOM. Every tag in our document is representable as an object in native JavaScript (notice the properties `classList` or `attributes`?). We call each of these tags a **node** on our page. Why a node?

Going back to the tree structure of HTML documents we discussed in lesson 1, we can see where this is useful in JavaScript. Every tag is a **node** on our webpage, with a parent node and children nodes - notice the inclusion of the `children` field.

Each node also has a variety of member functions that can be called. In our example, we call `addEventListener`.

### `addEventListener`

This is an absolutely essential function to working with the DOM. If we want a particular function to be called each time an event occurs on the webpage with respect to a certain portion of said document, we can do so with this function.

To put the function in more definite types, its signature is a little something like: `addEventListener(string eventName, function callBack)`.

That is, we specify the event to listen for (in our case `"click"`), and the function to call when said event happens.

With that out of the way, let's talk about our callback function and our first const variable:

```js
let likeCounterElement = document.getElementById("likes-counter");
function() {
    const currentLikes = Number(likeCounterElement.innerHTML);
    likeCounterElement.innerHTML= currentLikes+1;
});
```

We declare a variable to be the element on our page with ID "likes-counter", cast the contents of its HTML (the `.innerHTML` field) to a `Number`, then set its `.innerHTML` field to said number + 1. That is, it increments the numerical value of the innerHTML of `likes-counter`.

## What's React?

React is **a library for building user interfaces. It is declarative, component-based, and "learn once, write anywhere"**. Here's what all those terms mean:

- **declarative**: your code is free to _describe_ what it does, rather than implement every little detail. Think of it as the difference between writing HTML and writing C++.
- **component-based**: your interface will be compartmentalized into discrete components.
  - This makes life easier for us down the line, since our code will be far more maintainable. Imagine if Facebook kept all it's interface code in a single HTML file!
- **"learn once, write anywhere"**: your code will work regardless the other technologies you use. Additional features are painless.

### But why is it so popular?

Sure, there are other libraries out there like Vue and Angular (or Svelte), but React has amassed insurmountable popularity primarily because of one feature that it brought to the table:

**React only updates what needs to be updated**

What this means is that if you are running something that handles a ridiculous amount of data, like [Open MCT](https://nasa.github.io/openmct/), every time a new piece of data comes in, you don't have to update every single element of the interface.

Of course, it always helps when your technology is built by Facebook and open-sourced, as well.

## `create-react-app`

`create-react-app` is a tool made by Facebook that **bootstraps** (see: sets up) an NPM package with handy scripts, all the dependencies you need, and a sample app for you to get started with! All we need to do to create our app is run:

```sh
npx create-react-app <folderName>
```

Once this runs, you'll create a new package with all the dependencies for a react app already installed, and a handful of scripts to run, test, and build your app at your disposal. More specifically,

- We can install our dependencies with `yarn install`
  - When you install, you'll see a `yarn.lock` file appear. This contains all the exact dependencies that we need. Don't forget to commit this to Github! (The npm equivalent is called `package-lock.json` and if you ever use npm, don't forget to commit it). You don't have to commit `node_modules` though, since it's just all the dependencies that you specified in the `yarn.lock` file and is downloaded to your computer.
- We can serve the project locally with `yarn start`
- We can build the project for production with `yarn build`
- We can run any tests we have written with `yarn test`

The equivalents using `npm` are:

- We can install our dependencies with `npm install`
- We can serve the project locally with `npm start`
- We can build the project for production with `npm build`
- We can run any tests we have written with `npm test`

You can take a look at (and edit!) the package.json dependencies, scripts, and linters!

Let's run the demo. Change directories into the folder we just made, and run `yarn start`. This will begin serving the application on a development server so that we can see what the app looks like at present.

You should get a page that looks like:

![a rotating atom, the logo for React](images/craDemo.png)

Let's investigate how this all works.

### Understanding the `create-react-app` demo

Well, judging by the fact that the webpage tells us to "Edit src/App.js and save to reload.", why don't we do just that?

Navigate in your package folder to [src/App.js](src/App.js). Once in, we can see what it is that React wants us to edit:

```js
import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

Pretty short and sweet! If we change something in the file, we can see that the webpage on our browser will automatically reflect our changes. So what does this demo tell us?

- We can return HTML as easily as anything else.
- We can import CSS files and others - not just JS - to our code.
  - Notice we import `./App.css`, and its styles are applied to the component.
  - Notice how we import `logo.svg` as `logo` and then use it later as a value: `src={logo}`.
- Some of our HTML properties exist under a different name.
  - `class` becomes `className`, for example.

## HTML in JS: JSX

The first thing that we mention is one of React's great parts. This is something called JSX. It allows us to pass around HTML as easily as anything else in React.

If we are passing it around, though, it needs to all be contained in a single container tag. Notice how our return statement up above wraps it in a `<div>` tag?

In any case, let's change up the structure a little bit by adding in an `<h1>` tag:

```js
// ...
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Hello</h1>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
// ...
```

Better yet, let's try adding in the header tag but use a variable:

```js
// ...
function App() {
  const greeting = "Hello";

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>{greeting}</h1>
// ...
```

This is where things get interesting. We can intersperse JavaScript results throughout our JSX by encapsulating them with curly braces. In this case, we used a variable, but we can use any output we wish. Consider using a function, for example:

```js
<h1>{function(g) { return g + 'extra'; }(greeting)}</h1> # TODO
```

Certainly unconventional, but it works. This takes our constant `greeting` and appends `'extra'` to it.

A common pattern you'll see in JSX is use of ternary:

```js
<h1>{greeting ? greeting : "hello"}</h1>
```

If the value `greeting` is truthy, then it will be returned. Otherwise, 'hello' is returned. This is handy for dealing with values we might not be sure exist.

#### Things that were renamed

There are a few properties from HTML that have been renamed in React's JSX. That is, there are a few **DOM elements** that have been renamed. Here are example changes from what we've learned for reference:

- `class` -> `className`
- `onchange` -> `onChange`

Notice the trend? **DOM element names have just been made camel-cased**. That's all there is to it! A more complete list (including how inline styling has changed), can be found [here](https://reactjs.org/docs/dom-elements.html).

### Including other files

We can include other files in our React components very easily through `import` statements, just like ES6 modules.

Typically for a React component, this means that we style our JSX through a CSS file. In the case of our App component, this is `App.css`.

### JSX Extension

The extension for javasript files, whether or not it has "Javascript Expressions" or JSX, is `.js`, and we see this with the files we're working with.

## Arrays

`forEach`, `map`, `reduce`

[Take a look here for more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

```jsx
const cats = ["pickles", "oscar", "mittens", "meow meow"];
```

### `forEach`

To iterate on each value, we can use `forEach`

```jsx
cats.forEach((cat) => console.log(cat + " says 'meow i want food' :("));
```

### `map`

To iterate on each value, and return the results (in an array), we can use `map`

```jsx
cats.map((cat) => <>{cat} wants food >:0</>);
```

### `reduce`

To accumulate on each value, then return the accumulated result, we can use `reudce`

```jsx
cats.reduce((cat) => cat + " ");
```

### Other functional commands

There are other things like `find`, `filter`, and others, but you can just try it out as need be! Generally those definitions above are more often used.

## Using `map` in React

```jsx
{
  cats.map((cat) => (
    <div style={{ backgroundColor: "blue" }}>{cat} wants food :0</div>
  ));
}
```

### Lists and Keys

Doing the above causes
`Warning: Each child in a list should have a unique "key" prop.`

This means that every item, every `div` needs to have a key.
This is because react renders this list by checking out whats different right, and it uses key to help determine whether to render a completely new object, or just modify it.
If you want to learn more about how React reconcilitates things, take a look (here)[https://reactjs.org/docs/reconciliation.html]

```
{cats.map((cat)=> <div key={cat}>{cat} wants food :0</div>)}
```

## Functional React

### State

`useState` is basically the same as setting state.

Remember to break up state with `[name, setName]`

Use `setName` to setup the new state so that React knows to rerender!

```jsx
function App() {
  const [number, setNumber] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        {number}
        <button onClick={() => setNumber(number + 1)} />
      </header>
    </div>
  );
}
```

### Props

This is the original input passed into a function

- Imagine this as the things you put into a constructor

```jsx
function Cats(props) {
  return <div>{props.name}</div>;
}
function App() {
  const cats = ["pickles", "oscar", "mittens", "meow meow"];

  const [number, setNumber] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        {cats.map((cat) => (
          <Cats name={cat} />
        ))}
        <button onClick={() => setNumber(number + 1)} />
      </header>
    </div>
  );
}
```

### Props vs State

Imagine Props as the constructor variables in C++, and the state as the member variables! **You cannot modify state directly, you have to use `setState` in order to set the state.** This is because React only knows to rerender (the parts of) your component based on when which states have changed from `setState`.

Let’s combine these topics so that every time you press a button, the number of cats you own increases!
Let’s bring the button and number logic into the Cats function

```jsx
function Cats(props) {
  const [number, setNumber] = useState(0);
  return (
    <div>
      {props.name}
      <br />
      {number}
      <br />
      <button onClick={() => setNumber(number + 1)}>Like</button>
    </div>
  );
}
function App() {
  const cats = ["pickles", "oscar", "mittens", "meow meow"];

  return (
    <div className="App">
      <header className="App-header">
        {cats.map((cat) => (
          <Cats name={cat} />
        ))}
      </header>
    </div>
  );
}
```

Now, let’s try to pass in the starting number!

Let’s add in the value from the map!

```jsx
function Cats(props) {
  const [number, setNumber] = useState(props.startingPoint);
  return (
    <div>
      {props.name}
      <br />
      {number}
      <br />
      <button onClick={() => setNumber(number + 1)}>Like</button>
    </div>
  );
}
function App() {
  const cats = ["pickles", "oscar", "mittens", "meow meow"];

  return (
    <div className="App">
      <header className="App-header">
        {cats.map((cat) => (
          <Cats name={cat} startingPoint={4} />
        ))}
      </header>
    </div>
  );
}
```

### Outdated: Class Based React

This is getting phased out. This is just for reference!

```jsx
class ComponentName extends React.Component {
  render() {
    return <div>HI I AM COMPONENT</div>;
  }
}
```

### State and Props

See here for more details: https://reactjs.org/docs/state-and-lifecycle.html

```jsx
class ComponentName extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }
  tick() {
    this.setState({
      date: new Date(),
    });
  }
  render() {
    return <div>HI I AM COMPONENT {this.state.date.toLocaleTimeString()}</div>;
  }
}
```

`componentDidMount`, `componentWillUnmount` => things happen when the Component starts up and when it is deleted

## Why Functional

- Lightweight
- Easier to read
- Nice hooks (like the `useState` stuff)
- Performance boost
- Basically barely any pros for Class based, so I’d recommend defaulting to functional

## Manipulating the DOM in React

Now, let's make the same upvote counter we made in js using React. Here's a bare-bones example.

```jsx
import React, { useState } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div> You have {counter} upvotes. </div>
      <button onClick={() => setCounter(counter + 1)}>Upvote! </button>
      <button onClick={() => setCounter(counter - 1)}>Downvote! </button>
    </div>
  );
}

export default App;
```

## Conclusion

And that's it for today! We've learned the basics of Javascript and React, and how to manipulate the DOM in both.

## References

- [TeachLA Intro To WebDev](https://github.com/uclaacm/teach-la-dev-training/tree/main/intro-to-web-dev/05_javascript_and_typescript)
- [TeachLA Learning Labs Crash Course](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/main/03-intro-js)
- [TeachLA Intro To React](https://github.com/uclaacm/teach-la-dev-training/tree/main/intro-to-react)
- [TeachLA Learning Labs Crash Course](https://github.com/uclaacm/learning-lab-crash-course-su20/tree/main/07-intro-react)
