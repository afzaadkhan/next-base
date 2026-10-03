# Global Agent Rules & Guidelines

## Core Principles

You are an AI assistant working with software engineering tasks. Follow these rules to maintain code quality, consistency, and best practices across any project.

- Be concise, direct, and to the point in all communication
- Output responses on CLI - use GitHub-flavored markdown when formatting helps
- Minimize token output while maintaining helpfulness, accuracy, and quality
- Answer directly without unnecessary preamble, postamble, or explanations unless explicitly requested
- Never guess URLs - only use URLs provided by the user or from local files
- Only use emojis if explicitly requested

---

## 1. Technology & Environment

- **TypeScript strict mode** is required - no `any`. If unavoidable, use `unknown` with proper type narrowing.
- **No `// @ts-ignore` or `// @ts-nocheck`**. Fix type errors. Only use `// @ts-expect-error` with a clear explanation if absolutely necessary.
- Follow security best practices: never log or expose secrets/keys, never commit secrets to repositories.
- Access environment variables only through the project's configured env validation module (e.g., `@t3-oss/env-nextjs` or equivalent). Never use `process.env.*` directly in application code.
- Always verify dependencies exist before using them - check package.json and existing usage patterns.

---

## 2. Code Style & Conventions

### General
- Write clean, readable, maintainable code
- **No comments** unless explicitly requested by the user
- Use functional components with hooks (for React/Next.js projects)
- Prefer named exports for utilities/libs; components may use default or named exports based on existing patterns
- Mimic the existing code style, naming conventions, and patterns in the files you edit

### Naming Conventions
- Components: PascalCase (e.g., `UserList.tsx`)
- Hooks: camelCase starting with `use` (e.g., `useDebounce.ts`)
- Utilities/functions: camelCase (e.g., `formatDate.ts`)
- Types/Interfaces: PascalCase
- Constants: UPPER_SNAKE_CASE when truly constant
- Files: follow the project's existing naming convention (kebab-case or PascalCase)

### Imports
- **Use absolute imports via path aliases** when configured. Never use deep relative imports like `../../../`.
- Prefer barrel exports (`index.ts`) for clean module APIs
- Import only what you need
- Follow the project's import ordering convention

---

## 3. Project Structure & Organization

### Recommended Folder Structure
Follow this modular structure as a baseline (adapt to project needs):

```
/app/                    # Next.js App Router (routes, layouts, route handlers)
/components/             # Reusable UI components
├── ui/                  # Base/primitives (shadcn/ui style)
├── shared/              # Generic shared components
├── layout/              # Layout shell/components
└── sections/            # Page section building blocks

/lib/                    # Core shared logic, utilities, API layer
├── api/                 # API client & related utilities
│   ├── client.ts         # Base API client (fetch wrapper, error handling)
│   └── index.ts          # Barrel exports
├── hooks/               # Reusable React hooks (shared across app)
│   ├── use-api.ts        # TanStack Query helpers (useApiQuery, useApiMutation)
│   └── index.ts          # Barrel exports
├── utils/               # Pure utility functions
├── validations/         # Zod schemas/validation helpers
└── index.ts             # Barrel exports

/hooks/                  # App-level hooks (barrel exported)
/stores/                 # State management (Zustand etc.)
/types/                  # Global TypeScript type definitions
/config/                 # App configuration (env, constants)
/server/                 # Server-only code (use import "server-only")
/utils/                  # App-level utilities (barrel exported)
```

### API Layer Conventions

- **Base API Client**: Use `@/lib/api/client.ts` (or `lib/api/client.ts`) as the centralized fetch wrapper. Expose an `apiClient` object with HTTP methods (`get`, `post`, `put`, `patch`, `delete`) and a typed `ApiError` class.
- **TanStack Query Helpers**: Use `@/lib/hooks/use-api.ts` for shared query/mutation wrappers. Prefer `useApiQuery` and `useApiMutation` to standardize error handling (e.g., toast notifications) and type inference.
- **Custom API Hooks**: Create domain-specific hooks (e.g., `use-auth-api.ts`, `use-user-api.ts`) in `lib/hooks/` or co-located with domain modules as appropriate. Export via barrels (`lib/hooks/index.ts`).
- **Barrel Exports**: Always export API client from `lib/api/index.ts` and hooks from `lib/hooks/index.ts`. Import via aliases (`@/lib/api`, `lib/hooks`, etc.) rather than deep file paths.

### Path Aliases & Barrels
- **Use absolute imports via path aliases** when configured. Never use deep relative imports.
- Leverage barrel exports (`index.ts`) to reduce import verbosity.
- Do not import from deep internal module paths when a barrel export exists.
- Prefer short/aliased imports (e.g., `import { apiClient } from 'lib/api'` or `@/lib/api`) consistent with the project's tsconfig paths.

### Modular Architecture
- Organize code modularly with clear separation of concerns
- Respect module boundaries - import from module barrels, not deep internal paths
- Co-locate related code logically
- Keep business logic separate from UI components

### Separation of Concerns
- Server Components by default (Next.js App Router). Use `"use client"` only when necessary (hooks, browser APIs, event handlers).
- Server-only code must be clearly separated - mark with `import "server-only"` when applicable.
- API routes live in `/app/api/` (route handlers).
- Abstract data fetching into hooks/services, never call raw `fetch()` directly from React components.

---

## 4. Component Rules (React/TSX)

### Size & Modularity
- **Components must not exceed 300 lines of code**. This is a hard limit.
- **Components must be modular** - break large components into smaller, focused sub-components.
- **Prefer composition over monolithic components.**
- Keep components focused on a single responsibility (Single Responsibility Principle)

### Complexity Limits
- Maximum **5** `useState` calls per component
- Maximum **3** `useEffect` calls per component
- Maximum **10** props per component
- Extract complex logic into custom hooks or utility functions when limits are approached

### Best Practices
- Use TypeScript interfaces/types for all props
- Avoid inline style objects in TSX - prefer utility classes (e.g., Tailwind CSS)
- Never use array index as a React key - use stable, unique identifiers
- Never use `document.getElementById`, `document.querySelector`, or direct DOM manipulation in React components - use refs
- Never use `eval()` or `innerHTML` in TSX
- Never make raw `fetch()` calls directly in React components - abstract data fetching into hooks/services (use the API layer above)
- Ensure client-side storage (`localStorage`, `sessionStorage`) is only accessed in client components

---

## 5. Code Quality & Enforcement

### Banned Patterns
- `: any` - use proper types or `unknown`
- `as any` - use proper type narrowing/assertions
- `// @ts-ignore`, `// @ts-nocheck` - fix type errors
- `console.log`, `console.warn`, `console.error` - use a logger utility for intentional logging
- `debugger` statements
- `alert()` calls
- Inline style objects in TSX (prefer utility classes)
- Array indices as keys
- Direct DOM queries in components
- `eval()` or unsafe DOM manipulation
- Deep relative imports (use aliases)
- Bypassing established module boundaries
- Direct `process.env.*` access in application code

### Data Fetching
- Use `@/lib/api/client.ts` (`apiClient`) for low-level requests; use `@/lib/hooks/use-api.ts` (`useApiQuery`/`useApiMutation`) with TanStack Query for React data fetching.
- Abstract API calls into services/hooks/modules under `lib/` (or domain modules) - never directly in components.
- Use proper error handling for all async operations.


---

## 7. Development Workflow

1. **Understand first** - Explore the codebase using search tools before making changes. Understand existing patterns and conventions.
2. **Follow conventions** - Mimic the codebase's style, libraries, patterns, and organization.
3. **Minimal changes** - Make focused, minimal edits. Edit existing files when possible; only create new files if explicitly required.
4. **Respect boundaries** - Honor module boundaries, import rules, and client/server separation.
5. **Validate** - Ensure changes pass linting, type checking, and any project-specific quality checks.
6. **No unsolicited docs** - Never create documentation files (*.md) unless explicitly requested.

---

## 8. Task Completion

- When completing a task, run linting and type checking commands if available (`npm run lint`, typecheck, etc.)
- If you cannot find the appropriate verification command, ask the user and suggest recording it for future use
- Focus only on the specific task at hand - avoid tangential changes
- Verify your solution makes sense in the context of the existing codebase

---

## 9. General Best Practices

- Write self-documenting code through clear naming
- Handle edge cases and errors appropriately
- Keep functions small and focused
- Prefer composition and reusability
- Follow DRY (Don't Repeat Yourself) principles without over-abstraction
- Maintain backward compatibility when modifying existing code
- Test your changes when test infrastructure exists - look for existing test patterns first

---

# This Repo 

Generic rules above. These facts are specific to this codebase and verified against it.

## Commands

Use **bun** (`bun.lock`, `packageManager: bun@1.3.14`). Any npm/yarn/pnpm instruction you find in `README.md` is stale create-next-app boilerplate.

| Task | Command |
| --- | --- |
| dev server | `bun run dev` -> http://localhost:3000 |
| lint | `bun run lint` (bare `eslint`; pass a path to scope it, e.g. `bun run lint app`) |
| typecheck | `bunx tsc --noEmit` (no `typecheck` script exists) |
| build | `bun run build` |
| route types only | `bunx next typegen` |

- Verify in this order: `bun run lint` -> `bunx tsc --noEmit` -> `bun run build`. **`next build` typechecks but does not lint** (`next lint` was removed in Next 16), so linting is a separate required step.
- **No test runner and no tests are installed.** Do not assume `bun test` works. Next 16 only ships `next experimental-test`.
- Don't remove `trustedDependencies` (`sharp`, `unrs-resolver`) from `package.json`; bun skips their install scripts otherwise.

## Architecture

- Single Next.js 16.3.8 App Router app. **No `src/`** - routes live in `app/`. Turbopack is the default for both `dev` and `build`.
- Import alias is `@/*` -> `./*` (repo root), **not** `./src/*`. There are no other aliases - do not add bare `lib/...` style aliases alongside `@/lib/...`, two spellings of one module is a bug source.
- `app/layout.tsx` is the root layout and the only place global metadata/fonts live. `app/providers.tsx` composes the client providers (TanStack Query, next-themes, Tooltip, Toaster) - add client context there, not in the layout.
- `config/env.ts` is the only legal way to read env vars (`@t3-oss/env-nextjs`). Every **client** var has a default, so `next build` succeeds with no `.env` file present. `.env.example` is committed and lists the supported keys; real `.env*` files are gitignored.
- `lib/api/types.ts` and `lib/validations/common.ts` are pre-wired contracts for the API layer. `lib/validations/common.ts` uses the **Zod 4** top-level format API (`z.email()`, `z.url()`, `z.uuid()`, `z.iso.date()`) - `z.string().email()` is legacy.
- Still yours to fill in: `lib/api/client.ts` + `lib/api/index.ts` export, and `lib/hooks/use-api.ts` + `lib/hooks/index.ts` export.
- These `index.ts` barrels are intentionally **empty placeholders** - add exports as you fill the directories in: `lib/hooks/`, `stores/`, `server/`, `utils/`, `components/shared/`, `components/layout/`, `components/sections/`.

## shadcn/ui (v4 CLI, `radix-nova` style)

- Config lives in `components.json`; all 61 primitives are in `components/ui/`. Add more with `bunx shadcn@latest add <name>`, inspect with `bunx shadcn@latest view <name>`.
- **`cn` comes from the `cn` package, not `clsx` + `tailwind-merge`.** Do not add those two packages or hand-roll a `cn` helper; `lib/utils/cn.ts` re-exports the real one.
- The registry components import `{ cn } from "cn"` directly rather than through `@/lib/utils`. Both resolve; don't mass-rewrite imports.
- `components/ui/**` and `hooks/use-mobile.ts` are **registry-owned vendored files**. Two were patched to satisfy Next 16's `react-hooks/set-state-in-effect` rule (both now use `useSyncExternalStore`): `hooks/use-mobile.ts` and the `canScrollPrev`/`canScrollNext` tracking in `components/ui/carousel.tsx`. Running `shadcn add --overwrite` silently reverts those patches and reintroduces the lint errors - re-apply them.
- Dark mode is **class-based**: `app/globals.css` declares `@custom-variant dark (&:is(.dark *))` and next-themes toggles `.dark` on `<html>` (`attribute="class"`, `defaultTheme="system"`). There is no `prefers-color-scheme` media query, so OS preference is honoured via next-themes, not CSS. `<html>` needs `suppressHydrationWarning` for this to work.

## Styling

- Tailwind v4 is **CSS-first: there is no `tailwind.config.js`**. All design tokens live in `@theme inline` in `app/globals.css`. Add theme values there.
- `app/globals.css` imports must stay in order: `tailwindcss`, then `tw-animate-css`, then `shadcn/tailwind.css`. The last one provides the `data-open:`/`data-closed:` variants the components rely on - dropping it breaks them silently.
- Geist fonts: `app/layout.tsx` binds `next/font` to the CSS variable **`--font-sans`** (and `--font-geist-mono`), which `@theme inline` maps into `--font-sans`/`--font-mono`. Renaming that variable silently breaks the font - it did once already. Verify with `--font-sans: "Geist"` in the served CSS.

## Next 16 changes that differ from older Next

- **Turbopack is the default** for `next dev` and `next build`; its config key is top-level `turbopack`, not `experimental.turbopack`. `--webpack` opts out.
- **`middleware.ts` is `proxy.ts`** now, exporting a function named `proxy`. Node runtime only; `edge` is unsupported.
- **`params`, `searchParams`, `cookies()`, `headers()`, `draftMode()` are async-only.** The Next 15 sync compatibility shim is gone.
- Route prop types are **global and not imported**: `PageProps<'/blog/[slug]'>`, `LayoutProps<'/'>` (used in `app/layout.tsx`), `RouteContext<'/x/[id]'>`. The string literal must match the real route; refresh with `bunx next typegen`.
- `next build` is the only place type errors surface during a build. `agentRules` can be set to `false` in `next.config.ts` if you want to opt out of AGENTS.md auto-management.

## Verify against a running dev server

- `next dev` writes pid/port/URL to `.next/dev/lock`. Starting a second one prints the running server instead of launching a duplicate - read that file first.
- The dev server exposes an MCP endpoint at `/_next/mcp` (POST JSON-RPC) with `get_compilation_issues`, `compile_route`, `get_errors`, `get_logs`, `get_routes`. Use it to confirm a route compiles without paying for a full build.
- `next dev` forwards browser console errors into the terminal, so read dev output for client-side failures.
- Full workflow: `node_modules/next/dist/docs/01-app/02-guides/ai-agents.md`.