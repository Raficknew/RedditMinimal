# Reddit Minimal

[![Node.js CI](https://github.com/yourusername/RedditMinimal/actions/workflows/pull_request.yml/badge.svg)](https://github.com/yourusername/RedditMinimal/actions)

A minimalist Reddit client built with React, TypeScript, and Redux Toolkit. Browse Reddit posts, search across subreddits, and view comments with a clean, responsive interface.

![React](https://img.shields.io/badge/React-19.2.0-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.18-38B2AC)

## ✨ Features

- **Browse Reddit Posts**: View posts from popular subreddits or specific communities
- **Real-time Search**: Search for posts within subreddits with instant results
- **Comment Viewing**: Expand posts to read top comments
- **Category Navigation**: Quick access to popular subreddit categories (Gaming, Technology, Science, etc.)
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Loading States**: Skeleton loaders for smooth user experience
- **Type-Safe**: Built with TypeScript for reliability and maintainability

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/RedditMinimal.git
cd RedditMinimal
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📖 Usage

### Browsing Posts

The home page displays posts from `/r/popular` by default. Posts show:

- Title and author
- Number of likes (score)
- Comment count
- Post date
- Thumbnail image (if available)

### Searching

Use the search bar in the navigation to search for posts within the current subreddit:

```
Example: "javascript" in r/programming
```

### Switching Subreddits

Click any subreddit category in the sidebar to browse:

- Popular
- Gaming
- Technology
- Science
- Movies & TV
- And more...

### Viewing Comments

Click on a post to expand and view the top 20 comments. Comments display:

- Author name
- Comment content
- Post date

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm test` - Run unit and integration tests
- `npm run test:ui` - Run tests with Vitest UI
- `npm run lint` - Lint code with ESLint

### Project Structure

```
src/
├── components/          # React components
│   ├── CommentCard/     # Individual comment display
│   ├── NavBar/          # Navigation and search
│   ├── PostCard/        # Individual post display
│   ├── PostList/        # List of posts
│   ├── Skeletons/       # Loading state components
│   └── SubredditsList/  # Subreddit category sidebar
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
├── store/               # Redux store and slices
│   ├── postSlice.ts     # Posts state management
│   ├── commentsSlice.ts # Comments state management
│   └── store.ts         # Redux store configuration
├── tests/               # Unit and integration tests
└── types/               # TypeScript type definitions
```

### Tech Stack

**Core:**

- React 19.2 - UI library
- TypeScript 5.9 - Type safety
- Vite 7.2 - Build tool and dev server

**State Management:**

- Redux Toolkit 2.11 - Global state management
- React Redux 9.2 - React bindings for Redux

**Styling:**

- Tailwind CSS 4.1 - Utility-first CSS framework
- HugeIcons - Icon library

**Testing:**

- Vitest 4.0 - Unit testing framework
- Testing Library - React component testing
- MSW 2.12 - API mocking for tests

**Code Quality:**

- ESLint 9 - Linting
- TypeScript ESLint 8 - TypeScript-specific linting rules

### Running Tests

The project includes comprehensive test coverage:

```bash
# Run all tests
npm test

# Run tests with UI
npm run test:ui

# Run tests in watch mode
npm test -- --watch
```

Test files are located in [src/tests](src/tests) and include:

- Component tests (NavBar, PostCard, CommentCard, etc.)
- Redux slice tests (postSlice, commentsSlice)
- Integration tests (App.test.tsx)

## 🔌 API

This application uses the public Reddit JSON API:

- **Posts**: `https://www.reddit.com/{subreddit}/search.json?q={query}&restrict_sr=1&limit=20`
- **Comments**: `https://www.reddit.com/comments/{postId}.json?limit=20`

No authentication required for read-only access.

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Run tests: `npm test`
5. Run linter: `npm run lint`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

### Development Guidelines

- Write tests for new features
- Follow existing code style and conventions
- Keep components small and focused
- Use TypeScript types consistently
- Update documentation as needed

Built with using React, TypeScript, and Redux Toolkit
