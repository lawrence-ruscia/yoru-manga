# Manga Shop

A React e-commerce demo focused on routing, state management, and testing best practices.

## Tech Stack

- React + TypeScript
- React Router v6
- CSS Modules
- Vitest + React Testing Library

## Features

- Client-side routing and navigation
- Product browsing with async data fetching
- Shopping cart (add, remove, update quantities)
- Integration and unit tests
- Responsive, accessible UI

## Project Structure

```
src/
├── app/               # App level contexts
├── features/
│   ├── Cart/          # Cart feature (components, hooks, pages)
│   ├── ProductPage/
│   ├── ShopPage/
│   └── HomePage/
├── shared/            # Shared utilities and components
├── routes/            # Route configuration
└── tests/             # Setup files
```

## Design Approach

- Fetch data at route boundaries to avoid request waterfalls
- Use context only for truly shared state
- Test user-facing behavior, not implementation details
- Mock only external boundaries (API, browser APIs)

## Getting Started

```bash
npm install
npm run dev
npm run test
```

## Purpose

This project demonstrates practical patterns for React applications including proper routing architecture, testable component design, and clean state management without relying on external libraries.
