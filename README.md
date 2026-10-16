# Praneet Savant — Portfolio

A responsive personal portfolio built with React, TypeScript, and Vite. The visual direction is an original implementation inspired by the editorial layout of modern AI-engineering portfolios, customized with Praneet's projects and profile.

## Run locally on Windows

Install Node.js (LTS) and Git, then open PowerShell in this folder:

```powershell
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Validate a production build

```powershell
npm run build
npm run preview
```

The production output is written to `dist/`.

## Deploy to the existing Vercel project

1. Extract this repository and replace the contents of your existing `Portfolio` repository with these files, keeping the `.git` directory if working in your existing local clone.
2. Test with `npm ci` and `npm run build`.
3. Commit and push to the branch already connected to your Vercel project.
4. Vercel should build the Vite project using `npm run build` and publish `dist`.
5. Check the Vercel deployment preview before confirming the production deployment. Keep the existing `praneetsavant.in` domain assignment and DNS records unchanged.

Do not create a new Vercel project or edit DNS for this redesign.

## Update your content

Most content is in `src/app/App.tsx`:
- Intro and About
- Project cards and repository links
- Skill groups
- Education and current focus
- Contact links

Design and responsive behavior are in `src/app/portfolio.css`. Page title, SEO description, and social metadata are in `index.html`.

## Notes

- The project is built with React + TypeScript + Vite, not plain HTML files alone.
- Project cards currently link to the owner's GitHub profile where a specific public repository URL was not known. Replace those links with direct project URLs before publishing if available.
- The contact address is configured as `hello@praneetsavant.in`; confirm it is an inbox you use before publishing.
- The portfolio content intentionally avoids inventing employers, job titles, awards, or publication claims.
