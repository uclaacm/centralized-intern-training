# Javascript And React.js

Today, we'll go into an introduction to Javascript as a programming language, and how React builds on these features to make dynamic websites!

## Table of Contents

- [JavaScript Vs React](#javascript-vs-react)
- [Hello World](#hello-world)
- [Node.js](#nodejs)
  - [NVM](#nvm)
  - [Package Managers](#package-managers)
  - [npm in ACM Repositories](#npm-in-acm-repositories)
- [Variables](#variables)
  - [let, var, and const](#let-var-and-const)
- [Primitive Types](#primitive-types)
- [Type Coercion](#type-coercion)
- [Objects Vs Primitives](#objects-vs-primitives)
  - [Arrays And References in JavaScript](#arrays-and-references-in-javascript)
  - [The Spread Operator](#the-spread-operator)
  - [Objects](#objects)
- [JavaScript Functions](#javascript-functions)
  - [First-Class Functions](#first-class-functions)
  - [Anonymous Functions](#anonymous-functions)
  - [Arrow Functions](#arrow-functions)
- [For, If, While](#for-if-while)
- [Common Issues With JavaScript](#common-issues-with-javascript)
  - [Wrong Function Arguments](#wrong-function-arguments)
  - [Refactoring Struggles](#refactoring-struggles)
- [Modern JavaScript Syntax](#modern-javascript-syntax)
  - [Template Literals](#template-literals)
  - [Destructuring](#destructuring)
  - [Optional Chaining and Nullish Coalescing](#optional-chaining-and-nullish-coalescing)
  - [Modules: import and export](#modules-import-and-export)
  - [Async, Await, and Fetch](#async-await-and-fetch)
- [Manipulating the DOM](#manipulating-the-dom)
  - [`addEventListener`](#addeventlistener)
- [What's React?](#whats-react)
- [Creating a React App With Vite](#creating-a-react-app-with-vite)
  - [Understanding the Project](#understanding-the-project)
- [HTML in JS: JSX](#HTML-in-JS-JSX)
  - [Including Other Files](#including-other-files)
  - [JSX Extension](#jsx-extension)
- [Arrays](#arrays)
  - [`forEach`](#foreach)
  - [`map`](#map)
  - [`filter`](#filter)
  - [`find`](#find)
  - [`reduce`](#reduce)
- [Using `map` in React](#using-map-in-react)
  - [Lists and Keys](#lists-and-keys)
- [Functional React](#functional-react)
  - [State](#state)
  - [Props](#props)
  - [Props Vs State](#props-vs-state)
- [Manipulating the DOM in React](#manipulating-the-dom-in-React)
- [Conclusion](#conclusion)
- [References](#references)

## JavaScript Vs React

[JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) is a lightweight interpreted scripting/programming language that is heavily used in Web Applications and even beyond them!

[React.js](https://react.dev/) is a framework built on top of Javascript. **React only updates what needs to be updated**, which is one of the main reasons why it's so popular.

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

To install Node.js and npm, we will use another program called **nvm** (node version manager). This makes it a lot easier to manage which version of Node we're using, which matters because different projects can need different versions.

- **macOS and Linux:** follow the install instructions at [nvm-sh/nvm](https://github.com/nvm-sh/nvm#installing-and-updating).
- **Windows:** nvm doesn't run on Windows directly, so use [nvm-windows](https://github.com/coreybutler/nvm-windows), which has the same basic commands.

Once nvm is installed, install the current long-term support version of Node and switch to it:

```sh
$ nvm install --lts
$ nvm use --lts
```

On nvm-windows, the commands are `nvm install lts` and `nvm use lts`.

Verify that it worked by running `node -v` and `npm -v`, which will output the programs' version numbers.

### Package Managers

A package manager installs the dependencies and external libraries for your code. Node comes with one called **npm** (node package manager), but in this training we'll use [pnpm](https://pnpm.io/), which does the same job. It's popular because it's fast, and it saves disk space by keeping one copy of each package on your computer and sharing it between your projects.

Install it with npm, then check that it worked:

```sh
$ npm install -g pnpm
$ pnpm -v
```

These are the commands you'll use most:

```sh
$ pnpm init --init-type commonjs   # create a package.json for a new Node project
$ pnpm install                     # install everything listed in package.json
$ pnpm add PACKAGE                 # add a new dependency
$ pnpm add -D PACKAGE              # add a dependency only needed during development
$ pnpm run SCRIPT_NAME             # run a script from package.json
$ pnpm exec TOOL                   # run a tool that's installed in your project
$ pnpm dlx TOOL                    # run a tool without installing it
```

- `package.json` lists your dependencies and scripts.
- `pnpm-lock.yaml` records the exact version of everything installed. **Commit this file** so that everyone gets the same versions.
- `node_modules` is where the packages are downloaded. **Don't commit this folder**, since `pnpm install` can recreate it.

Some packages run a script when they're installed, and pnpm blocks these by default for security. If you see `ERR_PNPM_IGNORED_BUILDS`, your packages were still installed. Run `pnpm approve-builds` to choose which scripts to allow, and only approve packages that you trust. Your choices are saved in `pnpm-workspace.yaml`, which you should also commit. **Be careful about running
this command as common supply chain attacks
manifest in this way.**

### npm in ACM Repositories

**For a shared project, always use the package manager that the project already uses.** Using two creates lockfiles that can disagree, so people end up with different versions of packages.

We use pnpm for the projects in this training, but the ACM website and the membership portal are built with npm, so use npm when you work in those repositories. You may notice a `pnpm-lock.yaml` in `membership-portal-ui`, but its Docker builds and GitHub workflows use npm. Luckily, the commands are very similar:

| What you want to do            | pnpm                              | npm                        |
| ------------------------------ | --------------------------------- | -------------------------- |
| Install everything             | `pnpm install`                    | `npm install`              |
| Add a dependency               | `pnpm add PACKAGE`                | `npm install PACKAGE`      |
| Add a development dependency   | `pnpm add -D PACKAGE`             | `npm install -D PACKAGE`   |
| Remove a dependency            | `pnpm remove PACKAGE`             | `npm uninstall PACKAGE`    |
| Run a script                   | `pnpm run SCRIPT_NAME`            | `npm run SCRIPT_NAME`      |
| Run a tool without installing  | `pnpm dlx TOOL`                   | `npx TOOL`                 |
| Install exactly what's locked  | `pnpm install --frozen-lockfile`  | `npm ci`                   |

npm's lockfile is called `package-lock.json`. You may also see Yarn, which is another package manager that works in a similar way.

## Variables

To make variables in JavaScript, you simply call your variables with the `let` keyword.

```js
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
// Uncaught ReferenceError: errorMessage is not defined
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

You should recognize `var` when you see it in older code, but **don't use it in new code**. Its scoping rules are a common source of bugs, and `let` behaves the way most programmers expect.

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

Okay, well that first example makes sense. But what's up with the second one? Well, a variable that holds an object or an array is really holding a **reference** to it.

So, what `const` really guarantees is that the reference will always stay the same. With primitive data types, that's great: because they're immutable, once the value is created, it'll never change. But, for every non-primitive data type, the object _is mutable_, and so it can change at any point without changing the underlying reference. Long story short? Using `const` on an object, or an array, or many other data types doesn't guarantee that it's truly constant - it just can't be reassigned.

**The rule to follow:** use `const` by default, and use `let` only when you need to reassign the variable.

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

## Modern JavaScript Syntax

Before we touch webpages, here's the syntax you'll see on nearly every line of a modern codebase, including the ACM website and membership portal.

### Template Literals

Backticks let you put values inside a string with `${...}`, which is easier to read than adding strings together.

```js
const name = "Joe";
const points = 20;

console.log("Hi " + name + ", you have " + points + " points");
console.log(`Hi ${name}, you have ${points} points`);
```

### Destructuring

Destructuring pulls values out of objects and arrays into their own variables.

```js
const post = { title: "My First Post", likes: 3 };

const { title, likes } = post;
console.log(title); // "My First Post"

const [first, second] = ["apple", "banana"];
console.log(second); // "banana"
```

You'll use the array form constantly in React, as in `const [count, setCount] = useState(0);`.

### Optional Chaining and Nullish Coalescing

Reading a property of `undefined` crashes your code. `?.` stops early and gives you `undefined` instead, and `??` supplies a default value when the left side is `null` or `undefined`.

```js
const user = { name: "Joe" };

console.log(user.profile?.major); // undefined, instead of a crash
console.log(user.profile?.major ?? "Undeclared"); // "Undeclared"
```

### Modules: import and export

Real projects are split into many files. A file shares code with `export`, and other files bring it in with `import`.

```js
// math.js
export function add(a, b) {
  return a + b;
}

export default function double(a) {
  return a * 2;
}
```

```js
// main.js
import double, { add } from "./math.js";

console.log(add(1, 2)); // 3
console.log(double(4)); // 8
```

A file can have one **default** export, imported with any name you like, and any number of **named** exports, imported with curly braces.

You'll also see an older module style in Node, including in the membership portal backend. It does the same job with different syntax:

```js
const express = require("express");

module.exports = router;
```

### Async, Await, and Fetch

Some work takes time, like asking a server for data. JavaScript doesn't stop and wait for it. Instead, you get a **Promise**, which is a placeholder for a value that arrives later. `await` pauses an `async` function until the value is ready.

`fetch` makes a network request, and it's built into both browsers and Node.

```js
async function getTodo() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const todo = await response.json();
    console.log(todo.title);
  } catch (err) {
    console.error(err.message);
  }
}

getTodo();
```

- `async` marks a function that uses `await`. It always returns a Promise.
- `await` can only be used inside an `async` function or at the top level of a module.
- `fetch` doesn't throw an error for a 404 or a 500, so check `response.ok` yourself.
- `try`/`catch` handles anything that goes wrong.

Older code uses `.then()` chains instead. You'll see these in the membership portal backend, and they do the same thing:

```js
fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => response.json())
  .then((todo) => console.log(todo.title))
  .catch((err) => console.error(err.message));
```

## Manipulating the DOM

Okay, but how does this help us make websites? Well, the original focus was to change the "Document Object Model", which as you may recall, is a fancy word for our webpage. Let's run through a bare-bones example:

```html
<div>You have <span id="likes-counter">0</span> upvotes.</div>
<button id="incrementer">Upvote!</button>
<button id="decrementer">Downvote!</button>
```

```js
const likeCounterElement = document.getElementById("likes-counter");
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

With that out of the way, let's talk about our callback function and the element it updates:

```js
const likeCounterElement = document.getElementById("likes-counter");

function () {
  const currentLikes = Number(likeCounterElement.innerHTML);
  likeCounterElement.innerHTML = currentLikes + 1;
}
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

Of course, it always helps when your technology is built by Meta and open-sourced, as well.

## Creating a React App With Vite

[Vite](https://vite.dev/) is a build tool that **bootstraps** (see: sets up) a React project with a development server, all the dependencies you need, and a sample app to get started with. All we need to do to create our app is run:

```sh
$ pnpm create vite my-blog --template react
$ cd my-blog
$ pnpm install
$ pnpm dev
```

You may see older tutorials use `create-react-app`. That tool is deprecated, so don't use it for new projects.

Once this runs, Vite prints a local URL, usually `http://localhost:5173`. Open it in your browser to see the demo app. Here are the scripts it gives us:

- `pnpm dev` serves the project locally and reloads when you save.
- `pnpm build` builds the project for production.
- `pnpm run preview` serves the production build locally.
- `pnpm lint` checks your code for common mistakes.

You can take a look at (and edit!) the dependencies and scripts in `package.json`.

### Understanding the Project

Let's investigate how this all works. The page itself lives in `index.html`, which is nearly empty apart from `<div id="root"></div>`. The file `src/main.jsx` tells React to draw our app inside that div:

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
```

The file we'll spend our time in is `src/App.jsx`. Replace everything in it with this:

```jsx
import "./App.css";

function App() {
  return (
    <div className="App">
      <header>
        <p>
          Edit <code>src/App.jsx</code> and save to reload.
        </p>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

Pretty short and sweet! If we change something in the file, the webpage in our browser automatically reflects our changes. So what does this tell us?

- We can return HTML as easily as anything else.
- We can import CSS files and others - not just JS - to our code.
  - Notice we import `./App.css`, and its styles are applied to the component.
- Some of our HTML properties exist under a different name.
  - `class` becomes `className`, for example.

## HTML in JS: JSX

The first thing that we mention is one of React's great parts. This is something called JSX. It allows us to pass around HTML as easily as anything else in React.

If we are passing it around, though, it needs to all be contained in a single parent tag. Notice how our return statement up above wraps everything in a `<div>` tag? If you don't want an extra `<div>` on the page, you can use an empty tag called a **fragment**:

```jsx
return (
  <>
    <h1>Hello</h1>
    <p>No extra div here!</p>
  </>
);
```

Let's add a heading that uses a variable:

```jsx
function App() {
  const greeting = "Hello";

  return (
    <div className="App">
      <header>
        <h1>{greeting}</h1>
      </header>
    </div>
  );
}
```

This is where things get interesting. We can put any JavaScript expression inside our JSX by wrapping it in curly braces. In this case we used a variable, but we can call functions too:

```jsx
<h1>{greeting.toUpperCase()}</h1>
```

Two patterns you'll see all the time are the ternary, which chooses between two options, and `&&`, which shows something only when a condition is true:

```jsx
<p>{isLoggedIn ? "Welcome back!" : "Please log in."}</p>
{isAdmin && <button>Delete</button>}
```

#### Things that were renamed

There are a few properties from HTML that have been renamed in React's JSX. That is, there are a few **DOM elements** that have been renamed. Here are example changes from what we've learned for reference:

- `class` -> `className`
- `onchange` -> `onChange`

Notice the trend? **DOM element names have just been made camel-cased**. That's all there is to it! A more complete list (including how inline styling has changed), can be found [here](https://react.dev/reference/react-dom/components/common).

### Including other files

We can include other files in our React components very easily through `import` statements, just like ES6 modules.

Typically for a React component, this means that we style our JSX through a CSS file. In the case of our App component, this is `App.css`.

### JSX Extension

Files that contain JSX use the `.jsx` extension, like `App.jsx`. Next week, we will use `.tsx` for the TypeScript version.

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
const messages = cats.map((cat) => `${cat} wants food >:0`);
```

### `filter`

To keep only the values that pass a test, we can use `filter`

```jsx
const shortNames = cats.filter((cat) => cat.length < 7);
// ["oscar"]
```

### `find`

To get the first value that passes a test, we can use `find`

```jsx
const oscar = cats.find((cat) => cat === "oscar");
// "oscar"
```

### `reduce`

To combine all of the values into a single result, we can use `reduce`. It takes a function and a starting value, and the function receives the running total and the current value.

```jsx
const totalLetters = cats.reduce((total, cat) => total + cat.length, 0);
// 28
```

## Using `map` in React

To show a list in React, `map` over an array and return JSX for each value:

```jsx
<div>
  {cats.map((cat) => (
    <div style={{ backgroundColor: "blue" }}>{cat} wants food :0</div>
  ))}
</div>
```

### Lists and Keys

Doing the above causes
`Warning: Each child in a list should have a unique "key" prop.`

This means that every item, every `div` needs to have a key.
React uses keys to work out which items in a list were added, removed, or moved, so that it only updates what changed. A key should be unique within the list, so use something like an ID. You can read more [here](https://react.dev/learn/rendering-lists).

```jsx
<div>
  {cats.map((cat) => (
    <div key={cat}>{cat} wants food :0</div>
  ))}
</div>
```

## Functional React

### State

**State** is data that a component remembers between renders. The `useState` hook creates it, and gives you back the current value and a function to change it.

Remember to destructure state with `[name, setName]`

Use `setName` to set the new state so that React knows to rerender!

```jsx
import { useState } from "react";

function App() {
  const [number, setNumber] = useState(0);
  return (
    <div className="App">
      <header className="App-header">
        {number}
        <button onClick={() => setNumber(number + 1)}>Add one</button>
      </header>
    </div>
  );
}
```

### Props

**Props** are the inputs passed into a component, like the arguments of a function. A parent component passes them down, and the child reads them.

```jsx
function Cats(props) {
  return <div>{props.name}</div>;
}

function App() {
  const cats = ["pickles", "oscar", "mittens", "meow meow"];

  return (
    <div className="App">
      <header className="App-header">
        {cats.map((cat) => (
          <Cats key={cat} name={cat} />
        ))}
      </header>
    </div>
  );
}
```

You'll usually see props destructured right in the function's parameters, which is the style used in our projects:

```jsx
function Cats({ name }) {
  return <div>{name}</div>;
}
```

### Props vs State

Props come from the parent and are read-only, while state belongs to the component and changes over time. **You cannot modify state directly, you have to use the setter function from `useState`.** This is because React only knows to rerender your component when the setter is called.

This also applies to arrays and objects in state. Create a new one with the spread operator instead of changing the existing one:

```jsx
setPosts([...posts, newPost]); // not posts.push(newPost)
```

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
          <Cats key={cat} name={cat} />
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
          <Cats key={cat} name={cat} startingPoint={4} />
        ))}
      </header>
    </div>
  );
}
```

## Manipulating the DOM in React

Now, let's make the same upvote counter we made in js using React. Here's a bare-bones example.

```jsx
import { useState } from "react";

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
