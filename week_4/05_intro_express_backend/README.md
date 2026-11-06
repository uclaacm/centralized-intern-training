# Introduction to Backend

Today we will learn the basics of how to write a backend server in Javascript using the Express framework, including learning why you need a backend in the first place and how it works!

## Table of Contents

- [Overview](#high-level-overview-of-backends)
  - [Why Backend?](#why-do-we-need-backends)
  - [What do Backends do?](#what-do-backends-do-exactly)
- [Endpoints and Handlers](#endpoints-and-handlers)
  - [What are endpoints](#what-are-endpoints)
  - [What is a body?](#what-is-a-body)
  - [What is a handler?](#what-is-a-handler)
  - [How do I make an endpoint with a handler?](#so-how-do-i-make-an-endpoint-with-a-handler)
  - [How do I receive data in an endpoint?](#how-do-i-receive-data-in-an-endpoint)
  - [How do I handle errors?](#how-do-i-handle-errors)
  - [How do I get data from an endpoint?](#how-do-i-get-data-from-an-endpoint)
- [Databases](#databases)
  - [SQL Databases](#sql-databases)
  - [SQL Query](#sql-query)
  - [PostgreSQL](#postgresql)
  - [Sequelize](#sequelize)
  - [Migrations](#migrations)
  - [NoSQL Databases](#nosql-databases)
- [Middleware](#middleware)
  - [Express Router](#express-router)
  - [More middleware examples](#more-middleware-examples)
- [Authentication](#authentication)
  - [DIY](#diy)
  - [SSO](#sso)
- [Conclusion](#conclusion)
- [References](#references)

## High Level Overview Of Backends

Today's workshop is about backend development. You don't need frontend experience, though having frontend experience will help you better understand some of the things we define in this workshop.

### Why Do We Need Backends?

A backend serves as a connection between the frontend, the database and external services that are used by a web app. It is responsible for the time-consuming processing of data or actions performed by the user. After completing the necessary processing, it returns the necessary information back to the frontend. Since the computationally demanding tasks were not performed on the frontend, the service is not reliant on user's on-device performance in order to perform critical tasks. In addition, backend's are frequently used for authentication or database serving, which may not be safe to do locally on a client's device.

### What Do Backends Do Exactly?

Here is a graphic from Google that helps illustrate this:
<img src="pictures/backend_diagram.jpeg"
alt="Backend Diagram"
/>
This is the typical structure of a fullstack web application. Let's ignore the left column for now.

First, we have a frontend that could be built in React, Angular, vanilla HTML/CSS/JS or any other framework tech stack. This is the interface that users interact with.

We then have a database that stores data that is required by the web app to function. We might also want to store and access data from some other services.

The backend in the middle serves as the support and glue between all the other components. The backend can be built using all sort of frameworks and technology, including Express.js (Node.js) and Flask/Django (Python). You can also build it in various other languages like Rust, PHP and Go! All it does is interface with the database (whether hosted locally or cloud-based), query APIs, and do any necessary computation before sending the required information to the frontend.

## Endpoints and Handlers

### What are endpoints?

**Endpoints** are network nodes that clients can connect to to perform certain actions or get some information from a backend server. They are the points of communication to and from the server. They are composed of two items: a **method** and a **URL**.

The method is the type of request that you are making to the server. There are several different methods, but the common ones are the following:

- `GET`: retrieves an item
- `POST`: creates an item
- `PUT`: update an item
- `DELETE`: delete an item

Secondly, the URL is the address at which you would like the clients to request the action. Think of it as the special command that tells the server what you want, in the form of a URL.

For example, `GET /users` could be an endpoint that responds with a list of users, and `POST /users` would create a new record of a user with the information included in the body of the request.

### What is a body?

In a HTTP request, there is a method, a URL, headers, and a body. The method and the URL together specify which endpoint the request is for. The headers specify information about the request, such as information about cookies. The body is where data is placed to pass to an endpoint. It is particularly used for `POST` and `PUT` requests, which usually send data to the server.

There are different formats for the body. The most common is JSON.
<img src="pictures/HTTP request.png"
alt="HTTP Request Diagram"
/>

### What is a handler?

A handler is simply the function that _handles_ the request send to the endpoint. It performs the action that is asked of the endpoint.

### So how do I make an endpoint with a handler?

Typically in any framework, you would need to first specify the handler, and then register the handler with a particular endpoints.

Specifying a handler requires you to define a function that performs the action. Suppose that we want to have an endpoint that returns hello at the URl `/hello`. In express, the code to create this endpoint would look something like this:

```js
const express = require("express");
const app = express();
const port = 8081;

app.get("/hello", (req, res) => {
  res.status(200).send("Hello!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

Here, the function `app.get()` is supplied the url for the endpoint we want and the handler function for the endpoint. If you were to run this on your computer by running the command `node app.js` (replace `app.js` with the name of your file) and go to your browser and try to access `localhost:8081/hello`, you would see the text "Hello".

The handler function takes in the request and response objects as its argument, and returns a status code 200 and the string "Hello!". The response code 200 means there is no error. There are other error codes that can mean other things. In fact, lets create an endpoint that it reached whenever there is an invalid URL. In this case we want to return the status code 404, which you might remember being the error code for not found.

```js
app.use((req, res) => {
  res.status(404).send("Endpoint does not exist");
});
```

And that's it! That's endpoints and handlers at their bare bones.

However, this is rather boring. What if we want to request a hello for a specific person? Or update some information? That's where path parameters, query parameters, and form data comes in.

Path parameters are variable parts of a URL. These can be stored and later used to access specific information.

For instance, we can have the endpoint `GET /users/:id`. The colon specifies that the part after `/users` is a path parameter. Anything put after /users is saved into a variable called `id`. So the request `GET /users/joebruin` would result in `joebruin` being saved to `id`. Note that if you try to request `GET /users/joebruin/goodbye`, you are requesting a different endpoint. This is because `/` is a special character and any instance of it sections the URL.

To see how the request parameters are stored and can be accessed in the handler function, we access the params property of the request object as shown below:

```js
app.get("/users/:id", (req, res) => {
  res.status(200).json(req.params);
});
```

Path parameters and query parameters are generally used for GET and DELETE requests.

If you were to access a URL in the form `/users/*`, where the `*` could be any data, you would see a javascript object that maps the key id to the value `*` you entered.

Query parameters are when you have ? after an endpoint URL followed by the pattern field1=value1&field2=value2&field3=value3 where there can be any number of pairs of fields and values. This type of endpoints get parsed as a map of the fields to values. The URL /users?name=joebruin would correspond to requesting data at the endpoint /users and with the query parameters as "name: joebruin", where joebruin can be any name.

An example endpoint that uses query parameters is shown below:

```js
app.get("/query", (req, res) => {
  const { param1, param2 } = req.query;
  res
    .status(200)
    .send(`You input param1 to be ${param1} and param2 to be ${param2}`);
});
```

### How do I receive data in an endpoint?

When a client sends data, like the contents of a new post, it goes in the request's body. Most of the time this is JSON. To read it, add Express's JSON middleware near the top of your app, and the data appears in `req.body`:

```js
app.use(express.json());

app.post("/posts", (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "A title and body are required" });
  }

  const post = { id: Date.now(), title, body };
  posts.push(post);
  return res.status(201).json(post);
});
```

Without `express.json()`, `req.body` is empty. Since a browser's address bar can only make `GET` requests, you can test this with `curl` or a tool like [Postman](https://www.postman.com/):

```sh
$ curl -X POST http://localhost:8081/posts -H "Content-Type: application/json" -d '{"title":"Hello","body":"My first post"}'
```

Status codes tell the client what happened. These are the ones you'll use most:

| Code  | Meaning                                |
| ----- | -------------------------------------- |
| `200` | Success                                |
| `201` | Success, and something was created     |
| `400` | The client sent something invalid      |
| `401` | The client isn't logged in             |
| `403` | The client isn't allowed to do this    |
| `404` | That doesn't exist                     |
| `500` | Something went wrong on the server     |

### How do I handle errors?

Backends spend a lot of time waiting on things like databases, so handlers are often `async`. In Express 5, the version we use, if an `async` handler throws an error, Express catches it and sends it to your error handler.

An error handler is a middleware with **four** arguments, and it goes after all of your routes:

```js
app.get("/posts/:id", async (req, res) => {
  const post = await findPost(req.params.id);
  if (!post) {
    const error = new Error("Post not found");
    error.status = 404;
    throw error;
  }
  res.json(post);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message });
});
```

Older handlers, like many in the membership portal, pass errors along by hand with `next(err)`. That still works, and it's how the portal's `.then()` chains end with `.catch(next)`.

### How do I get data from an endpoint?

The following code shows how to get data from an API endpoint in Node. `fetch` is built into Node, so you don't need to install anything.

```js
const url = "http://localhost:8081/json";

async function fetchData(url) {
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json();
}

const data = await fetchData(url);
console.log(data);
```

To send data, add a `method`, a `Content-Type` header, and a `body` that's been turned into a JSON string:

```js
const response = await fetch("http://localhost:8081/posts", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ title: "Hello", body: "My first post" }),
});
```

`fetch` takes in the URL of an API endpoint, and an optional object of settings. The call returns a response object, which has the status of the request and methods like `.json()` to read what was returned.

You can see these examples in [fetch.mjs](./fetch.mjs). The `.mjs` extension tells Node to treat the file as a module, which allows `await` at the top level of the file.

## Databases

### SQL Databases

SQL (Structured Query Language) databases are characterized by being structured in tables. Every row in the table represents an entry of data, organized by the columns.
<img src="pictures/SQL table.jpg"
alt="Sample SQL Table"
/>

Each column can have different types, such as integer, string, float, date, etc. However, everything in one particular column must have the specified type. They also don't have a map or dictionary type. To get that same effect, you can serialize the map into a string, as seen in the "attributes" and deserialize once you retrieve the data.

### SQL Query

To retrieve, add, modify, or delete information from SQL databases, you perform SQL queries. These can be performed in the console connected to the databases.

Here's an example of a basic query retrieving some data from our table above.

```sql
SELECT * FROM fruits
WHERE quantity < 5;
```

This query asks for all entries in the `fruits` table where the `quantity` field is less than 5. It asks for all the columns that these rows have. To query for only certain columns of the rows:

```sql
SELECT name, price FROM fruits
WHERE quantity < 5;
```

The other common queries add, change, and delete rows:

```sql
INSERT INTO fruits (name, quantity, price) VALUES ('mango', 3, 2.50);

UPDATE fruits SET quantity = 10 WHERE name = 'mango';

DELETE FROM fruits WHERE name = 'mango';
```

Be careful with `UPDATE` and `DELETE`. Without a `WHERE`, they apply to **every row** in the table!

You can learn more about SQL queries [here](https://www.w3schools.com/sql/).

### PostgreSQL

[PostgreSQL](https://www.postgresql.org/), or Postgres, is the SQL database that the membership portal uses for things like users, events, and RSVPs.

The easiest way to run Postgres on your computer is with Docker, which we'll cover in the deployment module. For now, [install Docker Desktop](https://www.docker.com/products/docker-desktop/), and save this file as `docker-compose.yml`:

```yml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: dev
      POSTGRES_PASSWORD: dev
      POSTGRES_DB: blog
    ports:
      - "5433:5432"
    volumes:
      - dbdata:/var/lib/postgresql/data

volumes:
  dbdata:
```

Then, start and stop the database with:

```sh
$ docker compose up -d
$ docker compose down
```

To type SQL queries directly into the database, run:

```sh
$ docker compose exec db psql -U dev -d blog
```

### Sequelize

Writing SQL by hand for everything gets repetitive, so many projects use an **ORM** (object-relational mapper), which lets you work with database rows as JavaScript objects. The membership portal uses [Sequelize](https://sequelize.org/).

```sh
$ pnpm add sequelize pg dotenv
```

Keep the database's address in a `.env` file, which should never be committed:

```sh
DATABASE_URL=postgres://dev:dev@localhost:5433/blog
```

A **model** describes a table. Each property becomes a column, and `validate` lists rules that the data must follow:

```js
// db.js
require("dotenv").config();
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, { logging: false });

const Post = sequelize.define("post", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: { notEmpty: true },
  },
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

const Comment = sequelize.define("comment", {
  author: { type: DataTypes.STRING, allowNull: false },
  text: { type: DataTypes.TEXT, allowNull: false },
});

// A post has many comments, and each comment belongs to one post
Post.hasMany(Comment, { onDelete: "CASCADE" });
Comment.belongsTo(Post);

module.exports = { sequelize, Post, Comment };
```

Sequelize automatically adds an `id`, `createdAt`, and `updatedAt` to every model. The `hasMany` and `belongsTo` lines add a `postId` column to comments, which links each comment to its post.

Here's how each kind of SQL query looks in Sequelize. These all return Promises, so we use `await`:

```js
// INSERT INTO posts ...
const post = await Post.create({ title: "Hello", body: "My first post" });

// SELECT * FROM posts ORDER BY "createdAt" DESC;
const posts = await Post.findAll({ order: [["createdAt", "DESC"]] });

// SELECT * FROM posts WHERE id = 1;
const found = await Post.findByPk(1);

// SELECT * FROM posts WHERE title = 'Hello' LIMIT 1;
const hello = await Post.findOne({ where: { title: "Hello" } });

// UPDATE posts SET title = 'New title' WHERE id = ...;
await post.update({ title: "New title" });

// DELETE FROM posts WHERE id = ...;
await post.destroy();

// A post along with its comments
const withComments = await Post.findByPk(1, { include: Comment });
```

Using a model in an endpoint looks like this:

```js
app.get("/posts/:id", async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (!post) return res.status(404).json({ error: "Post not found" });
  return res.json(post);
});
```

For a small project, you can create the tables from your models by running `sequelize.sync()` before starting your server:

```js
sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Listening on port ${port}`));
});
```

The portal's backend uses an older version of Sequelize, and it splits each model into its own file in `app/db/schema`. You'll also see it use `.then()` instead of `await`, but the methods like `findAll` and `findOne` are the same.

### Migrations

`sync()` is fine for a small project, but it won't safely change a table that already has real data. Real projects use **migrations**, which are files that describe a change to the database, so every copy of the database can be updated in the same way.

Each migration has an `up` function that makes the change, and a `down` function that undoes it. Here's one from the `migrations` folder of the membership portal, which adds a column to the events table:

```js
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "events" ADD COLUMN IF NOT EXISTS "capacity" INTEGER;
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "events" DROP COLUMN IF EXISTS "capacity";
    `);
  },
};
```

The rule to remember: when you add a field to a model in the portal, you also need a migration, or the column won't exist in the database.

### NoSQL Databases

NoSQL databases are structured into documents. Each document is similar to a JSON object, where you have a set of fields and values. A document can have missing fields, but each document in a collection must have the specified value type for a particular field.

The values could be of different types like integer, string, dates, etc. They can also be maps!. As such, NoSQL allow for much more flexibility.
For the same data that is in the table above, we can store them in NoSQL as such:

```json
{
    "id": 1,
    "name": "apple",
    "quantity": 5,
    "price": 4.00,
    "attributes": {
        "seasonal": false,
        "color": "red"
    }
}
{
    "id": 2,
    "name": "banana",
    "quantity": 7,
    "price": 5.30,
    "attributes": {
        "seasonal": true,
        "rotten": true
    }
}
{
    "id": 3,
    "name": "cantaloupe",
    "quantity": 9,
    "price": 10.00,
}
```

Notice how for attributes, we're storing a map and how we can have different fields in it. Furthermore, the last document doesn't have attributes at all.

You can play around with NoSQL [here](https://www.mongodb.com/nosql-explained).

Choosing what type of database to use depends on your use case and what is required. The membership portal uses both: Postgres for most of its data, and MongoDB, a NoSQL database, for parts of the internship system.

## Middleware

It is good software practice to compartmentalize your code and to avoid code wastage. Express middleware are functions that execute during the lifecycle of a request to the Express server. Each middleware has access to the HTTP request and response for each route (or path) it's attached to. You can chain middleware together to compartmentalize and reuse code.

### Express Router

Express provides a Router class that allows us to create modular route handlers. A Router instance serves as an example of middleware. The best way to demonstrate a router is with an example. We first create a new file called `birds.js` with the following content.

```js
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).send("Birds homepage");
});

router.get("/about", (req, res) => {
  res.status(200).send("About birds");
});

router.use((req, res) => {
  res.status(404).send("No birds were found here!");
});

module.exports = router;
```

This code sets up a router as a module and defines some routes. We now need to mount the router module on a path in the main app. To do this we go back to the entry point of our express app and add the following code.

```js
const birds = require("./birds");

// ...

app.use("/birds", birds);
```

Our app is now able to handle requests to `/birds` and `/birds/about` and list our customized error message for URLs that start with `/birds`.

### More middleware examples

We will now demonstrate middleware that runs at the beginning of every API call. Before the definition of other endpoints in our main express file, we can define a function that runs before any of the other handler functions. To do this, we add a call to `app.use` without specifying a route. An example of this is shown below.

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

It is important to note a few things here. First, middleware should be defined before the endpoints you want it to be used for. Secondly, the function passed into this endpoint takes in a function `next` as a parameter. The function `next` is a function in Express router which executes the middleware succeeding the current middleware. In our case, it would move on the API endpoint the request for intended for. Thirdly, We observer a similar call to `app.use()` for when we want to indicate the user has tried to reach and endpoint does not exist. Here, the relative position of the call to `app.use()` makes a difference, since our middleware being before the other endpoints means it will be called before them, while the code that returns a 404 error happens after all the code and there will only be run if none of them are reached of fail to return a response. You can check and see that you receive a 404 error in the case where you replace returning a response with a call to `next()`.

Middleware can also be attached to specific routes, which is how you protect them. This is how the membership portal requires a login for its routes. In `app/api/v1/index.js`, the `auth` middleware runs before each router:

```js
router.use("/rsvp", auth, require("./membership/rsvp").router);
```

If a request isn't logged in, `auth` responds with an error, and the RSVP routes never run.

The same pattern works for validating input. The membership portal uses [express-validator](https://express-validator.github.io/docs/), which lets you list rules for a route:

```js
const { body, validationResult } = require("express-validator");

const postRules = [
  body("title").trim().notEmpty().withMessage("A title is required"),
  body("body").trim().notEmpty().withMessage("A body is required"),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  return next();
};

app.post("/posts", postRules, handleValidationErrors, async (req, res) => {
  const post = await Post.create({ title: req.body.title, body: req.body.body });
  res.status(201).json(post);
});
```

Notice that we pick out the fields we want, instead of passing in all of `req.body`. Otherwise, a client could set fields that they shouldn't, like `likes`.

## Authentication

We will now briefly explore the different ways of implementation authentication. There are a couple fo different approaches to implement authentication. You can keep track of the user's password and the verification process yourself or let a 3rd party take care of it for you.

### DIY

To implement your own authentication, you need a users table/collection (I'll refer to it as just a table, even though you can use collections as well) in your database. It should have at the bare minimum an email field or some sort of unique identification for the account and password field. Then, you would have a `POST` request to an endpoint to create a user, with a handler to add a new entry to the users table, and a `POST` request to another endpoint to login a user, with a handler to query the table for a user with the expected email and to check that the password is correct.

However, you should not store the raw password. Instead, store a **hash** of the password, so that the original can't be recovered even if your database leaks. Use a well-tested library like [bcrypt](https://www.npmjs.com/package/bcrypt) for this, rather than writing it yourself.

Secondly, we need a sessions table to store whether or not the user is logged in. A session is a hash that contains information about who is logged in and other such metadata. On the frontend, the session would be stored as a cookie on the browser. This would allow the session to be remembered across different pages. Whenever the frontend makes a request to an endpoint that requires the user to be logged in, the session cookie is passed to the backend. The backend can then check if the session exists in the session table. This checking can be easily implemented for multiple endpoints by checking for user authorization in express middleware. If the user is logged in, it can return the information the user desires.

### JWT

Instead of keeping a sessions table, you can use a **JSON Web Token** (JWT). After logging in, the server gives the client a signed token that says who they are. The client sends it along with each request, and the server checks the signature using a secret that only the server knows. This is what the membership portal does:

```js
const jwt = require("jsonwebtoken");

// When a user logs in
const token = jwt.sign({ uuid: user.uuid }, process.env.SESSION_SECRET, { expiresIn: "1d" });

// Middleware that protects a route
const authenticated = (req, res, next) => {
  const [scheme, token] = (req.get("Authorization") || "").split(" ");
  if (scheme !== "Bearer" || !token) {
    return res.status(401).json({ error: "Please log in" });
  }

  try {
    req.user = jwt.verify(token, process.env.SESSION_SECRET);
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Please log in" });
  }
};
```

A JWT is signed, not encrypted, so anyone holding it can read what's inside. Don't put private information in one. You can learn more [here](https://jwt.io/introduction).

### SSO

These days, you often see "Sign in with \_\_" on websites. These sites use Single Sign-On (SSO) to associate users with data. They let 3rd parties deal with authentication and only take care of the data.

To achieve this, the general approach is to evoke the appropriate API call from the 3rd party on the frontend to trigger the Sign in pop up from the 3rd party. The 3rd party will then return a token and a profile ID. The profile ID is the assigned ID to the user account by the 3rd party. The token is a string that marks if the user is signed in. It's not exactly the same thing as a session, but it is similar.

On the backend, whenever a user should be signed in, you'd check using the token and the 3rd party's API to see if the user is signed in. You can associate the profile ID given with the data you want to store, as usual. SSO makes implementing authentication a lot easier since you don't have to store passwords.

The membership portal combines SSO and JWTs:

1. The login page shows a Google sign-in button, which gives the frontend a token from Google.
2. The frontend sends that token to `POST /auth/login` on the backend.
3. The backend asks Google's library to verify it, and finds or creates the user.
4. The backend responds with its own JWT, which is sent along with every request after that.

## Conclusion

Today we learned the basic principles of backend, how to use Express to build middleware and routing, and how to store data in Postgres with Sequelize!

## References

- [TeachLA Intro to Backend](https://github.com/uclaacm/teach-la-dev-training/tree/main/backend)
- [Express JS Documentation](https://expressjs.com/en/guide/routing.html)
- [Sequelize Documentation](https://sequelize.org/docs/v6/)
- [PostgreSQL Tutorial](https://www.postgresql.org/docs/current/tutorial.html)
