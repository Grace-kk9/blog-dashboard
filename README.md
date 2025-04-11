# Blog Dashboard

A simple blog dashboard built with **Next.js**, **TypeScript**, **Material-UI**, and **RTK Query**. This project demonstrates CRUD operations with a mock API, clean UI using MUI, and proper state management.

## Live Demo

 [Live Site](https://blog-dashboard-3rss-r88u3w4re-krupas-projects-ceac6054.vercel.app/posts)

##  Features

- Fetch and display list of blog posts
- View individual post details
- Create and edit blog posts
- Responsive layout using Material-UI
- SSR/SSG with dynamic routing

---

##  Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- [TypeScript](https://www.typescriptlang.org/)
- [Material-UI](https://mui.com/)
- [Redux Toolkit & RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [MockAPI](https://mockapi.io/) for mock backend

---

##  Getting Started

Follow these instructions to run the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/Grace-kk9/blog-dashboard.git
cd blog-dashboard
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run the Development Server
```bash
npm run dev
```

Open your browser and go to: [http://localhost:3000/posts](http://localhost:3000/posts)

---

##  Design Decisions

- **App Router**: Chose Next.js App Router for cleaner routing and layout structure.
- **Material-UI**: Used MUI for rapid UI development, theming, and responsiveness.
- **RTK Query**: For efficient data fetching, caching, and mutation handling.
- **Client Component Separation**: Created separate client components (e.g. `ClientPostList`) to avoid hydration issues.

---

##  Challenges Faced

- **Hydration Errors**: Encountered hydration mismatches due to MUI and dynamic data. Fixed by carefully wrapping components with `"use client"` and using dynamic imports where necessary.
- **SSR Compatibility**: Had to balance client-only rendering (e.g. post detail fetching) with Next.js' SSR constraints.
- **Live Post Updates**: Initially, new posts didn’t reflect instantly. Solved it by refetching post list after create/update mutations.
- **Git Conflicts**: Faced issues pushing to GitHub after accidentally initializing a README. Resolved merge conflicts and committed successfully.

---





## Thanks for checking out the project!

