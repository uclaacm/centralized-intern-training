const express = require("express");
const birds = require("./birds");

const app = express();
const port = 8081;

app.use(express.json());

const posts = [];

app.get("/users/:id", (req, res) => {
  res.status(200).json(req.params);
});

app.get("/hello", (req, res) => {
  res.status(200).send("Hello!");
});

app.get("/query", (req, res) => {
  const { param1, param2 } = req.query;
  res
    .status(200)
    .send(`You input param1 to be ${param1} and param2 to be ${param2}`);
});

app.get("/json", (req, res) => {
  res.status(200).json({ test: "test data" });
});

app.post("/posts", (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(400).json({ error: "A title and body are required" });
  }

  const post = { id: Date.now(), title, body };
  posts.push(post);
  return res.status(201).json(post);
});

app.use("/birds", birds);

app.use((req, res) => {
  res.status(404).send("Endpoint does not exist");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
