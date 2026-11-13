# Task: Move Your Blog to Next.js

## Objective:
Move your blog from Task 4 to Next.js, so that every post has its own page and your components run in the right place.

## Part 1: Setting Up

1. Create a new project using the `create-next-app` command from the lesson, and update your `next.config.ts` as shown.
2. Copy over your components, types, and CSS from Task 4.
3. Move your posts into `lib/posts.ts`, and give each post a `slug`, such as `my-first-post`.

## Part 2: Pages and Navigation

1. Add a layout with a navigation bar and footer that appear on every page.
2. Create these pages:
   - `/`: a homepage with your introduction
   - `/about`: an about page
   - `/posts`: a list of your posts
   - `/posts/[slug]`: a page for one post
3. Use `Link` for your navigation and for the links to each post.
4. Show the `not-found` page when someone visits a post that doesn't exist.
5. Give each page a title with `metadata`.

## Part 3: Server and Client Components

1. Keep your pages as server components.
2. Move your 'Like' button and theme toggle into client components with `"use client"`.
3. Replace your `useEffect` fetch from Task 4 with an `async` server component.

## Part 4: Server Actions

1. Add a newsletter or contact form that submits to a server action.
2. Have the server action read the form's values and log them on the server.
3. Check that the message appears in your terminal, and not in your browser's console.

## Deliverables:

- Source code in a GitHub repository.
- A README file explaining which of your components are client components, and why.

Keep this project! You will connect it to your own backend in the next task.
