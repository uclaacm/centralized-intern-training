# Task: Create a Simple Blog with React.js

## Objective:
Develop a simple blog application using React.js that allows users to add, view, and like blog posts.

## Part 1: Setting Up and Basic JavaScript

### Setting up the Environment:

1. Install Node.js and npm using nvm.
2. Use Vite to create a new React project: `npm create vite@latest my-blog -- --template react`.

### JavaScript Basics:

3. Create a simple JavaScript script that logs "Hello World" to the console, and run it with `node`.
4. Experiment with `const`, `let`, primitive types, and arrow functions.
5. Use `async`/`await` and `fetch` to log data from `https://jsonplaceholder.typicode.com/posts/1`.

## Part 2: Building the Blog with React

### Creating Components:

- Create a `Blog` component to display a list of blog posts.
- Each blog post should be a separate `Post` component showing the post's title and content.
- Use the content from your personal blog website for your first posts.

### State and Props:

- Use state (`useState`) in the `Blog` component to hold an array of posts.
- Pass each post as a prop to the `Post` components, and give each one a unique `key`.

### Adding New Posts:

Implement a form to add new posts to the blog. This should update the state in the `Blog` component with a new array, without using `push`.

### Implementing Likes:

- Add a 'Like' button to each `Post` component.
- Use state to track and display the number of likes for each post.

## Part 3: Interactivity and Final Touches

### Adding Interactivity:

Ensure that clicking the 'Like' button updates the number of likes for the respective post.

### Styling the Application:

Bring over the CSS from your personal blog website so that the app looks like your site.

Test your application to ensure that adding posts and liking them works as expected.

## Deliverables:

- Source code for the simple blog application in a GitHub repository. Deploying the application on a service of your choice is preferred but not required.
- A README file documenting the structure of your project and instructions on how to run it.

Keep this project! You will keep building on it in the next tasks.
