# 📁 React TypeScript Project Structure Guide

> **💡 Quick Help**: Need a fast answer? Copy this guide into an LLM (like ChatGPT or Copilot)
> and ask: _"Based on this guide, where should I put [describe your file]?"_

> **Purpose**: This guide ensures consistent file organization across our codebase. Before creating any new file, component, or folder, consult this document.

---

## Table of Contents

1. [Decision Tree: Where Does My File Go?](#1-decision-tree-where-does-my-file-go)
2. [Project Structure Overview](#2-project-structure-overview)
3. [The Anatomy of a Feature](#3-the-anatomy-of-a-feature)
4. [Naming Conventions](#4-naming-conventions)
5. [Quick Reference Cheatsheet](#5-quick-reference-cheatsheet)

---

## 1. Decision Tree: Where Does My File Go?

Use this flowchart when creating ANY new file:

```
START: I need to create a new file
│
├─► Is it a PAGE (has its own route)?
│   │
│   YES ─► Go to src/pages/
│   │       ├─► Public page? ─► src/pages/ (root level)
│   │       ├─► Admin page?  ─► src/pages/admin/
│   │       └─► Student page? ─► src/pages/student/
│   │
│   NO ▼
│
├─► Is it a FEATURE (business logic, domain-specific)?
│   │
│   YES ─► Go to src/features/
│   │       │
│   │       ├─► Which domain does it belong to?
│   │       │   ├─► Authentication? ─► src/features/auth/
│   │       │   ├─► Events? ─► src/features/events/
│   │       │   ├─► Orders? ─► src/features/orders/
│   │       │   ├─► Students? ─► src/features/students/
│   │       │   └─► New domain? ─► Create src/features/{domain-name}/
│   │       │
│   │       └─► What type of file?
│   │           ├─► Component? ─► src/features/{domain}/components/
│   │           ├─► API/Query? ─► src/features/{domain}/api/
│   │           ├─► Hook? ─► src/features/{domain}/hooks/
│   │           ├─► Type? ─► src/features/{domain}/types/
│   │           ├─► Util (feature-specific)? ─► src/features/{domain}/utils/
│   │           └─► Constant? ─► src/features/{domain}/constants/
│   │
│   NO ▼
│
├─► Is it a REUSABLE UI component (no business logic)?
│   │
│   YES ─► Go to src/components/
│   │       ├─► Is it a shadcn/ui primitive or a single component? ─► src/components/ui/
│   │       ├─► Is it a layout component? ─► src/components/layout/
│   │       ├─► Is ita complex component shared across features? ─► src/components/common/
│   │       └─► Is it a section (landing page)? ─► src/components/sections/{section-name}/
│   │
│   NO ▼
│
├─► Is it a GLOBAL hook (used across multiple features)?
│   │
│   YES ─► src/hooks/
│   │
│   NO ▼
│
├─► Is it a GLOBAL utility function?
│   │
│   YES ─► src/lib/ (for critical utils like cn())
│   │   or src/utils/ (for general utilities)
│   │
│   NO ▼
│
├─► Is it a TYPE used across multiple features?
│   │
│   YES ─► src/types/
│   │
│   NO ▼
│
├─► Is it an API configuration (axios instance, query client)?
│   │
│   YES ─► src/api/
│   │
│   NO ▼
│
├─► Is it a CONTEXT provider?
│   │
│   YES ─► Is it feature-specific?
│   │       ├─► YES ─► src/features/{domain}/context/
│   │       └─► NO ─► src/contexts/
│   │
│   NO ▼
│
├─► Is it a CONSTANT/ENUM used globally?
│   │
│   YES ─► src/constants/
│   │
│   NO ▼
│
└─► Is it a static asset (image, video, font)?
    │
    YES ─► src/assets/{category}/
```

### Quick Decision Questions

Ask yourself these questions in order:

| #   | Question                                            | If YES, go to...                                          |
| --- | --------------------------------------------------- | --------------------------------------------------------- |
| 1   | Does this file represent a routable page?           | `src/pages/`                                              |
| 2   | Is this tied to a specific business domain/feature? | `src/features/{domain}/`                                  |
| 3   | Is this a dumb/presentational UI component?         | `src/components/`                                         |
| 4   | Is this used by 3+ features?                        | Move to global (`src/hooks/`, `src/utils/`, `src/types/`) |
| 5   | None of the above?                                  | Ask in the team chat before creating                      |

---

## 2. Project Structure Overview

```
src/
├── api/                    # Global API configuration
│   ├── axios.ts            # Axios instance with interceptors
│   └── queryClient.ts      # TanStack Query client configuration
│
├── assets/                 # Static assets (images, videos, fonts)
│   ├── images/
│   ├── videos/
│   └── icons/
│
├── components/             # Shared/Reusable components (NO business logic)
│   ├── common/             # Generic reusable components
│   │   ├── BackgroundText.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   └── OptimizedImage.tsx
│   │
│   ├── layout/             # Layout wrapper components
│   │   ├── PageContainer.tsx
│   │   └── Section.tsx
│   │
│   ├── sections/           # Landing page sections (public)
│   │   ├── banner/
│   │   ├── core-values/
│   │   ├── deans-message/
│   │   └── ...
│   │
│   └── ui/                 # shadcn/ui primitives (DO NOT add barrel exports here)
│       ├── button.tsx
│       ├── card.tsx
│       └── ...
│
├── constants/              # Global constants and enums
│   ├── routes.ts           # Route path constants
│   ├── queryKeys.ts        # TanStack Query key constants
│   └── enums.ts            # Shared enums
│
├── contexts/               # Global React contexts
│   ├── AuthContext.tsx
│   └── ThemeContext.tsx
│
├── features/               # Feature-based modules (THE CORE OF THE APP)
│   ├── auth/               # Authentication feature
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   ├── utils/
│   │   └── index.ts        # Public API (barrel export)
│   │
│   ├── events/             # Events feature
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types/
│   │   └── index.ts
│   │
│   ├── orders/             # Orders/Merchandise feature
│   │   └── ...
│   │
│   ├── students/           # Student management feature
│   │   └── ...
│   │
│   └── admin/              # Admin-specific features
│       ├── dashboard/
│       ├── user-management/
│       └── ...
│
├── hooks/                  # Global custom hooks
│   ├── useMobile.ts
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
│
├── layouts/                # Page layout components
│   ├── MainLayout.tsx      # Public pages layout
│   ├── AdminLayout.tsx     # Admin pages layout
│   └── StudentLayout.tsx   # Student pages layout
│
├── lib/                    # Core utilities (keep minimal)
│   └── utils.ts            # cn() and critical helpers
│
├── pages/                  # Route pages (THIN - mostly composition)
│   ├── Home.tsx
│   ├── Events.tsx
│   ├── ErrorPage.tsx
│   │
│   ├── auth/               # Auth pages (public)
│   │   ├── Login.tsx
│   │   ├── SignUp.tsx
│   │   └── ForgotPassword.tsx
│   │
│   ├── admin/              # Admin pages
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   └── Settings.tsx
│   │
│   └── student/            # Student pages
│       ├── Profile.tsx
│       ├── Orders.tsx
│       └── Membership.tsx
│
├── types/                  # Global TypeScript types
│   ├── api.types.ts        # API response/request types
│   ├── user.types.ts       # User-related types
│   └── common.types.ts     # Shared utility types
│
├── utils/                  # Global utility functions
│   ├── formatters.ts       # Date, currency formatters
│   ├── validators.ts       # Validation helpers
│   └── storage.ts          # LocalStorage helpers
│
├── index.css               # Global styles
├── main.tsx                # App entry point
└── router.ts               # Route definitions
```

---

## 3. The Anatomy of a Feature

Each feature is a **self-contained module** with everything it needs. Here's the detailed structure:

```
src/features/events/
│
├── api/                          # API layer (TanStack Query)
│   ├── events.queries.ts         # Query hooks (GET operations)
│   ├── events.mutations.ts       # Mutation hooks (POST, PUT, DELETE)
│   └── events.api.ts             # Raw API functions (axios calls)
│
├── components/                   # Feature-specific components
│   ├── EventCard/
│   │   ├── EventCard.tsx
│   │   ├── EventCard.types.ts    # Component prop types (if complex)
│   │   └── index.ts              # Optional: only if multiple exports
│   │
│   ├── EventList.tsx
│   ├── EventDetails.tsx
│   ├── EventForm.tsx
│   └── EventFilters.tsx
│
├── hooks/                        # Feature-specific hooks
│   ├── useEventFilters.ts
│   └── useEventForm.ts
│
├── types/                        # Feature-specific types
│   ├── event.types.ts            # Domain types (Event, EventStatus, etc.)
│   └── event.schemas.ts          # Zod schemas (if using validation)
│
├── utils/                        # Feature-specific utilities
│   ├── eventHelpers.ts
│   └── eventFormatters.ts
│
├── constants/                    # Feature-specific constants
│   └── eventConstants.ts
│
└── index.ts                      # PUBLIC API - What this feature exports
```

### The `index.ts` (Barrel Export) - Feature's Public API

```typescript
// src/features/events/index.ts

// Components - What other parts of the app can use
export { EventCard } from './components/EventCard';
export { EventList } from './components/EventList';
export { EventForm } from './components/EventForm';

// Hooks
export { useEvents, useEvent } from './api/events.queries';
export { useCreateEvent, useUpdateEvent } from './api/events.mutations';
export { useEventFilters } from './hooks/useEventFilters';

// Types - Only export what's needed externally
export type { Event, EventStatus, CreateEventInput } from './types/event.types';

// DO NOT export internal utilities, raw API functions, or implementation details
```

---

## 4. Naming Conventions

### Files & Folders

| Type                  | Convention                        | Example                              |
| --------------------- | --------------------------------- | ------------------------------------ |
| **React Components**  | PascalCase                        | `EventCard.tsx`, `UserProfile.tsx`   |
| **Component folders** | PascalCase                        | `EventCard/EventCard.tsx`            |
| **Hooks**             | camelCase with `use` prefix       | `useAuth.ts`, `useEventFilters.ts`   |
| **Utilities**         | camelCase                         | `formatters.ts`, `eventHelpers.ts`   |
| **Types**             | camelCase with `.types.ts` suffix | `event.types.ts`, `user.types.ts`    |
| **API files**         | camelCase with pattern suffix     | `events.api.ts`, `events.queries.ts` |
| **Constants**         | camelCase                         | `queryKeys.ts`, `routes.ts`          |
| **Contexts**          | PascalCase with `Context` suffix  | `AuthContext.tsx`                    |
| **Pages**             | PascalCase                        | `Dashboard.tsx`, `UserProfile.tsx`   |
| **Folders**           | kebab-case                        | `user-management/`, `core-values/`   |
| **Feature folders**   | kebab-case (singular preferred)   | `auth/`, `event/`, `order/`          |

### Code Naming

| Type                  | Convention                     | Example                                       |
| --------------------- | ------------------------------ | --------------------------------------------- |
| **Components**        | PascalCase                     | `const EventCard = () => {}`                  |
| **Hooks**             | camelCase with `use`           | `const useAuth = () => {}`                    |
| **Functions**         | camelCase, verb-first          | `getUser()`, `formatDate()`, `handleSubmit()` |
| **Constants**         | SCREAMING_SNAKE_CASE           | `const API_BASE_URL = ''`                     |
| **Types/Interfaces**  | PascalCase                     | `type Event = {}`, `interface User {}`        |
| **Enums**             | PascalCase (members too)       | `enum Status { Active, Inactive }`            |
| **Props types**       | PascalCase with `Props` suffix | `type EventCardProps = {}`                    |
| **Query keys**        | SCREAMING_SNAKE_CASE           | `QUERY_KEYS.EVENTS`                           |
| **Boolean variables** | `is`, `has`, `should` prefix   | `isLoading`, `hasError`, `shouldRefetch`      |
| **Event handlers**    | `handle` prefix                | `handleClick`, `handleSubmit`                 |
| **Callbacks**         | `on` prefix                    | `onClick`, `onSubmit`                         |

## 5. Quick Reference Cheatsheet

### File Location Cheatsheet

| I'm creating a...   | It goes in...                        |
| ------------------- | ------------------------------------ |
| New page with route | `src/pages/{role}/`                  |
| Feature component   | `src/features/{feature}/components/` |
| Shared UI component | `src/components/common/`             |
| shadcn component    | `src/components/ui/` (via CLI)       |
| Feature hook        | `src/features/{feature}/hooks/`      |
| Global hook         | `src/hooks/`                         |
| Feature types       | `src/features/{feature}/types/`      |
| Global types        | `src/types/`                         |
| API query/mutation  | `src/features/{feature}/api/`        |
| Global API config   | `src/api/`                           |
| Feature constant    | `src/features/{feature}/constants/`  |
| Global constant     | `src/constants/`                     |
| Layout component    | `src/layouts/`                       |
| Context (global)    | `src/contexts/`                      |
| Context (feature)   | `src/features/{feature}/context/`    |

## ⚠️ Before You Commit

Run through this checklist:

- [ ] File is in the correct location per decision tree
- [ ] Naming follows conventions (PascalCase components, camelCase hooks, etc.)
- [ ] Feature-specific code is colocated in feature folder
- [ ] Types are properly defined (no implicit any)

---

_Last updated: January 2026_
_Questions? Ask in the team chat before creating files in unexpected locations._
