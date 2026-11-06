# Task: Test and Ship Your Blog

## Objective:
Add tests to your blog's API, run it in Docker, and set up Continuous Integration so that your checks run on every Pull Request.

## Part 1: Testing

1. Split your API into `app.js` and `server.js`, so that your tests can import your app.
2. Install Jest and Supertest, and add a `test` script.
3. Write a unit test for at least one helper function.
4. Using Supertest, write tests that check for:
   - A successful `GET /api/posts`
   - A `404` for a post that doesn't exist
   - A `400` for creating an invalid post
   - A successful `POST /api/posts`
5. Make sure that your tests clean up the data they create, so that they can run more than once.

## Part 2: Docker

1. Add a `Dockerfile` and a `.dockerignore` to your API.
2. Add your API as a service in your `docker-compose.yml`.
3. Run `docker compose up --build`, and check that your API can reach your database.

## Part 3: Continuous Integration

1. Add ESLint to your API with `npm init @eslint/config@latest`, and add a `lint` script.
2. Add a GitHub Actions workflow that runs your linter and your tests on every Pull Request.
3. Your tests need a database, so add Postgres to your workflow using a [service container](https://docs.github.com/en/actions/tutorials/use-containerized-services/create-postgresql-service-containers).
4. Make a Pull Request with a test that fails on purpose, and check that the workflow fails. Then fix it, and check that it passes.

## Part 4: Deploy

1. Deploy your Next.js blog to Netlify or Vercel.
2. Deploy your API and database to a hosting service of your choice, if you have one available. Otherwise, it's fine to run your API locally for this task.
3. Set your environment variables in your hosting service's settings, and never commit them.

## Part 5: Get Ready for the Real Thing

1. Follow the setup steps for the membership portal or the ACM website, and run it on your computer.
2. Pick a page, and follow one feature all the way through. For example, start with the RSVP button in the portal, find the server action it calls, then the Express route, then the database model.
3. Write a few sentences explaining what you found.

## Deliverables:

- A Pull Request showing your workflow passing.
- The live URL of your blog.
- Your notes from following a feature through the code.
