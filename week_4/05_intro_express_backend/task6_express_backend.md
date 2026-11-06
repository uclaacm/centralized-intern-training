# Task: Build a Backend for Your Blog

## Objective:
Build an Express API that stores your blog's posts in a Postgres database, and connect your Next.js blog to it.

## Part 1: Setting Up

1. Create a new folder called `blog-api`, and run `npm init -y`.
2. Install your dependencies: `npm install express sequelize pg dotenv express-validator`.
3. Add a `.gitignore` that includes `node_modules` and `.env`.
4. Add the `docker-compose.yml` from the lesson, and start your database.
5. Create your `.env` file with your `DATABASE_URL`.

## Part 2: Models

1. Create `Post` and `Comment` models in `db.js`.
2. Link them with `hasMany` and `belongsTo`.
3. Run `sequelize.sync()` before starting your server, then check that your tables exist using `psql`.

## Part 3: Endpoints

Put these in a router in `routes/posts.js`, and mount it at `/api/posts`:

| Method   | URL                       | What it does                     |
| -------- | ------------------------- | -------------------------------- |
| `GET`    | `/api/posts`              | Lists all posts, newest first    |
| `GET`    | `/api/posts/:id`          | Gets a post and its comments     |
| `POST`   | `/api/posts`              | Creates a post                   |
| `PUT`    | `/api/posts/:id`          | Updates a post                   |
| `DELETE` | `/api/posts/:id`          | Deletes a post                   |
| `POST`   | `/api/posts/:id/like`     | Adds one to a post's likes       |
| `POST`   | `/api/posts/:id/comments` | Adds a comment to a post         |

## Part 4: Middleware

1. Add a middleware that logs the method and URL of every request.
2. Validate the input for creating posts and comments with `express-validator`.
3. Add a 404 handler, and an error handler that responds with JSON.
4. Check each endpoint with `curl` or Postman, including the cases that should fail.

## Part 5: Connect Your Blog

1. Add `API_URL=http://localhost:8080` to your Next.js blog's `.env.local`.
2. Replace your posts in `lib/posts.ts` by fetching from your API in your server components. Since your API uses IDs, change your post page's route from `[slug]` to `[id]`.
3. Add `cache: "no-store"` to your `fetch` calls so that new posts show up right away.
4. Use a server action to add comments on the post page, and to save likes.

## Stretch Goal

Protect the endpoints that create, update, and delete posts. Add a `POST /api/login` endpoint that checks a password from your `.env` file and returns a JWT, and write an `authenticated` middleware that checks for it.

## Deliverables:

- Source code for your API in a GitHub repository.
- A README file listing your endpoints and how to run the project.

Keep this project! You will test and deploy it in the deployment task.
