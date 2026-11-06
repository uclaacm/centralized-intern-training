# Task: Enhance Your Blog Website with TypeScript and Advanced React Hooks

## Objective:
Refactor the personal blog website to use TypeScript for type safety and explore advanced React Hooks for efficient state management and component lifecycle handling.

### Part 1: Refactoring with TypeScript

1. Convert JavaScript to TypeScript:
   - Create a TypeScript project with `npm create vite@latest my-blog-ts -- --template react-ts`.
   - Copy your `src` files from Task 3 into the new project.
   - Rename your `.jsx` files to `.tsx` (for files with JSX) and your `.js` files to `.ts` (for others).
   - Introduce static typing to your components, state, and props.

2. Define TypeScript Interfaces:
   - Create interfaces for the props of your components.
   - Define the shape of your state objects.

3. Type Checking with TypeScript:
   - Use TypeScript to prevent type-related errors in your code.
   - Ensure all function arguments and return types are correctly typed.


### Part 2: Advanced React Hooks

1. Using useEffect for Side Effects:
   - Load your posts from `localStorage` when the app starts, and save them whenever they change.
   - Use `fetch` inside `useEffect` to show data from an API, such as a random quote on your homepage.
   - Show a loading message while the data loads, and an error message if the request fails.

2. Global State Management with useContext:

   - Set up a theme context that holds a light or dark theme.
   - Replace prop drilling with `useContext` to pass down the theme and a function to change it.

3. Shared State with Jotai:

   - Create an atom that holds the IDs of the posts a reader has liked.
   - Show a "Liked posts" count in your header, in a different component from the 'Like' buttons.

## Deliverables:
- Source code for the simple blog application in a GitHub repository. Deploying the application on a service of your choice is preferred but not required.
- A README file explaining the TypeScript integrations and usage of advanced React hooks in the project. Include instructions on how to run the project.

Keep this project! You will move it to Next.js in the next task.
