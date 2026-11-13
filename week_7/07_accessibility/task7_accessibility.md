# Task: Make Your Blog Accessible

## Objective:
Find and fix the accessibility problems in your Next.js blog.

## Part 1: Audit Your Blog

1. Run Lighthouse on your homepage and on a post page, and write down your accessibility scores.
2. Use only your keyboard to get through your site. Write down anything you can't reach, or anywhere you can't see what's focused.
3. Turn on a screen reader, such as VoiceOver on macOS or Narrator on Windows, and listen to one of your posts.

## Part 2: Fix What You Found

1. Check that each page has a single `h1`, and that headings don't skip levels.
2. Use semantic tags like `nav`, `main`, `article`, and `footer`, instead of a `div` for everything.
3. Give every image useful `alt` text, and every form input a `label`.
4. Use a real `button` for anything clickable that isn't a link.
5. Add a visible focus style to your links and buttons.
6. Fix any text that fails the color contrast check, in both of your themes.
7. Add an `aria-label` to any button that only has an icon. For example, your 'Like' button could read "Like this post".
8. Turn off any animations for people who prefer reduced motion, using the `prefers-reduced-motion` media query.

## Part 3: Check Your Work

Run Lighthouse again. Aim for a score of 90 or higher, and remember that a good score doesn't catch everything, so try your keyboard again too.

## Deliverables:

- Your changes in a Pull Request on your blog's repository.
- Your Lighthouse scores from before and after, and a list of what you fixed, in the Pull Request description.
