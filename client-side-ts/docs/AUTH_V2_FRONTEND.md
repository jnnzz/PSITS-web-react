# Frontend V2 Auth Reference

## useAuth Hook

```ts
import { useAuth } from "@/features/auth";

const { user, isLoading, isAuthenticated, login, logout } = useAuth();
```

| Property          | Type                              | Description                                       |
| ----------------- | --------------------------------- | ------------------------------------------------- |
| `user`            | `User \| null`                    | Current user, null if logged out                  |
| `isLoading`       | `boolean`                         | True during initial silent refresh (show spinner) |
| `isAuthenticated` | `boolean`                         | `user !== null`                                   |
| `login(payload)`  | `(LoginPayload) => Promise<User>` | Log in. Throws on failure                         |
| `logout()`        | `() => Promise<void>`             | Log out. Always resolves                          |

## Making API Calls

Use the shared Axios instance — it auto-attaches the access token and handles 401 refresh:

```ts
import api from "@/api/axios";

const { data } = await api.get("/api/v2/some-endpoint");
const { data } = await api.post("/api/v2/events", payload);
```

Don't import from `features/auth/api/auth.api.ts` for general API calls — that file uses a separate Axios instance to avoid circular deps.

## Route Protection

### Pre-built guards (in `components/common/RouteGuards.tsx`):

```tsx
import {
  AdminRouteGuard,
  StudentRouteGuard,
} from "@/components/common/RouteGuards";
```

### Usage in router.ts:

```tsx
// Admin-only section
{
  path: "admin",
  Component: AdminRouteGuard,
  children: [{ index: true, Component: Dashboard }],
}

// Student-only section
{
  path: "student",
  Component: StudentRouteGuard,
  children: [{ index: true, Component: Profile }],
}
```

### Custom guard (any authenticated user):

```tsx
import ProtectedRoute from "@/components/common/ProtectedRoute";

{ path: "shared", element: <ProtectedRoute />, children: [...] }
// or with specific roles:
{ path: "shared", element: <ProtectedRoute allowedRoles={["Admin", "Student"]} />, children: [...] }
```

Guard behavior: loading → spinner, not logged in → redirect to `/auth/login`, wrong role → redirect to `/`.

## Common Patterns

**Check role in a component:**

```tsx
const { user } = useAuth();
if (user?.role === "Admin") {
  /* admin UI */
}
```

**Logout with redirect:**

```tsx
const { logout } = useAuth();
const navigate = useNavigate();

await logout();
navigate("/auth/login", { replace: true });
```

**Handle login errors:**

```tsx
try {
  await login({ id_number: values.id, password: values.password });
  showToast("success", "Signed in");
} catch (error: unknown) {
  const msg = (error as any)?.response?.data?.message || "Login failed";
  showToast("error", msg);
}
```

## Key Types

```ts
import type { User, AuthResponse, LoginPayload } from "@/features/auth";
```

```ts
type User = {
  id: string;
  idNumber: string;
  role: "Admin" | "Student";
  campus: string;
  name?: string;
  email?: string;
  course?: string;
  year?: number | string;
  membershipStatus?: string; // Student
  position?: string;
  access?: string; // Admin
};

type LoginPayload = { id_number: string; password: string };
type AuthResponse = { message: string; accessToken: string; user: User };
```
