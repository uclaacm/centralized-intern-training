# Introduction to Next.js

Most of our projects, including the ACM website and the membership portal, use [Next.js](https://nextjs.org/). Next.js is a framework built on top of React. React gives us components and state, and Next.js adds the things almost every real website needs, like multiple pages and code that runs on a server.

## Table of Contents

- [Why Next.js?](#why-nextjs)
- [Creating a Next.js App](#creating-a-nextjs-app)
- [Routing With Folders](#routing-with-folders)
  - [Pages](#pages)
  - [Layouts](#layouts)
  - [Navigating With Link](#navigating-with-link)
  - [Dynamic Routes](#dynamic-routes)
- [Server and Client Components](#server-and-client-components)
  - [Server Components](#server-components)
  - [Client Components](#client-components)
  - [Using Them Together](#using-them-together)
- [Fetching Data](#fetching-data)
- [Server Actions](#server-actions)
- [Metadata](#metadata)
- [Environment Variables](#environment-variables)
- [The App Router and the Pages Router](#the-app-router-and-the-pages-router)
- [Conclusion](#conclusion)
- [References](#references)

## Why Next.js?

In the React app we built last week, the browser downloads an almost empty HTML file, and then JavaScript draws everything. That has a few downsides. The page is blank until the JavaScript loads, search engines have less to read, and there's only one real page.

Next.js addresses these with a few key features:

- **Routing:** each page gets its own URL, based on your folders.
- **Server rendering:** pages can be turned into HTML on the server, so they appear faster.
- **Server code:** you can safely run code that the user should never see.

## Creating a Next.js App

Run this to create a new project with TypeScript:

```sh
$ pnpm dlx create-next-app@latest my-next-blog --ts --eslint --app --no-src-dir --no-tailwind --import-alias "@/*" --use-pnpm --yes
$ cd my-next-blog
```

Before you run it, open `next.config.ts` and delete the `cacheComponents` and `partialPrefetching` lines if they're there. These are newer caching features that change how pages load data. The membership portal doesn't use them, and the lessons here assume they're off, so that your blog behaves like our projects. Your config should look like this:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default nextConfig;
```

Now start your app:

```sh
$ pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app. Here's what we care about in the project:

- `app/` holds your pages and layouts.
- `app/layout.tsx` wraps every page.
- `app/page.tsx` is your homepage.
- `public/` holds static files like images.

The `@/` in import paths is a shortcut to the root of your project. For example, `import PostCard from "@/components/PostCard"` works from any file, so you don't need to count `../../`.

## Routing With Folders

### Pages

In Next.js, **folders create URLs**. A folder becomes part of the URL, and a file named `page.tsx` inside of it is what shows at that URL.

| File                        | URL            |
| --------------------------- | -------------- |
| `app/page.tsx`              | `/`            |
| `app/about/page.tsx`        | `/about`       |
| `app/posts/page.tsx`        | `/posts`       |
| `app/posts/[slug]/page.tsx` | `/posts/hello` |

A page is a React component that's the default export of its file:

```tsx
// app/about/page.tsx
export default function AboutPage() {
  return <h1>About me</h1>;
}
```

Other files in a folder don't become pages, so you can keep a page's components next to it. A few other file names are special too, such as `loading.tsx`, which shows while a page loads, and `not-found.tsx`, which shows when a page doesn't exist.

### Layouts

A **layout** wraps the pages inside of its folder, and stays on screen when you move between them. It's the right place for a navigation bar and footer. Whatever page is being shown gets passed in as `children`:

```tsx
// app/layout.tsx
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <nav>
          <Link href="/">Home</Link>
          <Link href="/posts">Posts</Link>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

### Navigating With Link

Use the `Link` component for links inside of your site. It swaps the page without a full reload, which is much faster than an `<a>` tag. Keep using `<a>` for links to other websites.

```tsx
import Link from "next/link";

<Link href="/about">About me</Link>;
```

To change pages from code, such as after a form is submitted, use the `useRouter` hook in a client component:

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();
router.push("/posts");
```

### Dynamic Routes

What if we have a hundred posts? We don't want a hundred folders. Square brackets make a **dynamic route**, where that part of the URL can be anything. The value is passed to the page in `params`:

```tsx
// app/posts/[slug]/page.tsx
import { notFound } from "next/navigation";
import { posts } from "@/lib/posts";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);

  if (!post) notFound();

  return (
    <article>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </article>
  );
}
```

Notice that `params` is a Promise, so the page is `async` and uses `await` to read it. Older tutorials read `params.slug` directly, which no longer works in current versions of Next.js.

Similarly, the `?search=boba` part of a URL is passed in a prop called `searchParams`, which is also a Promise.

## Server and Client Components

This is the most important idea in Next.js. Every component runs in one of two places.

### Server Components

**Components are server components by default.** They run on the server, and only their HTML is sent to the browser. They can read from a database or use secrets directly, and they can be `async`.

However, they can't use anything that needs the browser, so no `useState`, no `useEffect`, and no `onClick`.

### Client Components

To make a component interactive, add `"use client"` as the very first line of its file. It then works just like the React components we've been writing.

```tsx
"use client";

import { useState } from "react";

export default function LikeButton() {
  const [likes, setLikes] = useState(0);

  return <button onClick={() => setLikes(likes + 1)}>{likes} likes</button>;
}
```

If you forget this line, Next.js shows an error saying that `useState` only works in a client component. This is probably the first error you'll hit in the membership portal, and now you know the fix!

| I need to...                                       | Use    |
| -------------------------------------------------- | ------ |
| Show content, or fetch data                        | Server |
| Use a secret, like an API key                      | Server |
| Use `useState`, `useEffect`, or Jotai              | Client |
| Handle clicks, typing, or forms with instant feedback | Client |
| Use browser features, like `localStorage`          | Client |

### Using Them Together

Keep as much as you can on the server, and make only the interactive parts client components. A server component can render a client component and pass it props:

```tsx
// app/posts/page.tsx
import LikeButton from "@/components/LikeButton";
import { posts } from "@/lib/posts";

export default function PostsPage() {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.slug}>
          {post.title} <LikeButton />
        </li>
      ))}
    </ul>
  );
}
```

## Fetching Data

In a server component, you don't need `useEffect` to load data. Make the component `async` and `await` the data directly:

```tsx
interface Post {
  id: number;
  title: string;
}

export default async function PostsPage() {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  if (!response.ok) throw new Error("Could not load posts");

  const posts: Post[] = await response.json();

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
}
```

This code only runs on the server, so it's much shorter than last week's version.

There's one catch. If a page doesn't use anything specific to a request, Next.js builds it once ahead of time, so this data would stay the same until you rebuild your site. For data that changes, tell `fetch` to skip the cache so that the page is rendered on each request:

```tsx
const response = await fetch(url, { cache: "no-store" });
```

## Server Actions

A **server action** is a function that runs on the server, but can be called from your components. Adding `"use server"` at the top of a file makes every exported function in it a server action. They must be `async`.

The membership portal has a folder of these at `app/actions`. Almost every request from the portal to its backend goes through one, like this simplified version of `app/actions/rsvp/cancelRSVP.ts`:

```ts
"use server";

import { cookies } from "next/headers";

export default async function cancelRSVP(eventUuid: string) {
  const cookieStore = await cookies();

  const response = await fetch(`${process.env.API_URL}/rsvp/${eventUuid}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${cookieStore.get("token")?.value}`,
    },
  });

  if (!response.ok) return { success: false, error: "Failed to cancel RSVP." };
  return { success: true };
}
```

Because this runs on the server, the browser never sees the backend's address, and the action can read the login cookie. A client component can then call it like any other function:

```tsx
"use client";

import cancelRSVP from "@/app/actions/rsvp/cancelRSVP";

export default function CancelButton({ eventUuid }: { eventUuid: string }) {
  return <button onClick={() => cancelRSVP(eventUuid)}>Cancel RSVP</button>;
}
```

Server actions also work directly with forms. Give a `<form>` a server action as its `action`, and the action receives the form's values:

```tsx
// app/actions/subscribe.ts
"use server";

export default async function subscribe(formData: FormData) {
  const email = formData.get("email");
  console.log(`Subscribing ${email}`);
}
```

```tsx
import subscribe from "@/app/actions/subscribe";

export default function SubscribeForm() {
  return (
    <form action={subscribe}>
      <input type="email" name="email" required />
      <button type="submit">Subscribe</button>
    </form>
  );
}
```

Anyone can call a server action directly, so always check the input and whether the user is allowed to do it, just like you would for a backend endpoint.

## Metadata

Export a `metadata` object from a page or layout to set the page's title and description. This is what appears in browser tabs and search results. It only works in server components.

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Blog",
  description: "Posts about things I like",
};
```

## Environment Variables

Settings and secrets go in a file named `.env.local`, which should never be committed:

```sh
API_URL=http://localhost:8080
NEXT_PUBLIC_SITE_NAME=My Blog
```

Read them with `process.env.API_URL`. By default, these are only available on the server. A name that starts with `NEXT_PUBLIC_` gets included in the code sent to the browser, so anyone can read it. **Never put a secret in a `NEXT_PUBLIC_` variable.**

## The App Router and the Pages Router

Next.js has two ways of organizing pages. Everything above is the newer **App Router**, which is what the membership portal uses. The ACM website uses the older **Pages Router**, so you should be able to recognize both:

|                 | App Router (membership portal) | Pages Router (ACM website) |
| --------------- | ------------------------------ | -------------------------- |
| About page file | `app/about/page.tsx`           | `pages/about.js`           |
| Dynamic route   | `app/posts/[slug]/page.tsx`    | `pages/posts/[slug].js`    |
| Shared wrapper  | `app/layout.tsx`               | `pages/_app.js`            |
| Components run  | On the server by default       | In the browser after loading |
| Page metadata   | `export const metadata`        | `<NextSeo />` in the website |

When you search for help, check which router the answer is for, since most of the code above doesn't apply to the Pages Router.

## Conclusion

Today we learned how Next.js turns folders into pages, the difference between server and client components, and how to load and change data with server components and server actions. Time to move your blog over!

## References

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn Course](https://nextjs.org/learn)
- [Server and Client Components](https://nextjs.org/docs/app/getting-started/server-and-client-components)
