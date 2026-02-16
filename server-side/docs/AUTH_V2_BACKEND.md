# Backend V2 Auth Reference

## Routes

Mounted at `/api/v2/auth`:

| Method | Path       | What it does                                              |
| ------ | ---------- | --------------------------------------------------------- |
| POST   | `/login`   | Authenticate, return tokens (rate limited: 10/15min prod) |
| POST   | `/refresh` | Exchange cookie for new tokens (rotation)                 |
| POST   | `/logout`  | Clear cookie + nullify DB token                           |

## Protecting Routes (Middleware)

Import from `../middlewares/authV2.middleware`.

### Stack them in order:

```
Layer 1 (pick one)  →  Layer 2 (always)  →  Layer 3 (optional)  →  Controller
```

**Layer 1 — Token check (choose one):**

| Middleware                      | When to use                                                               |
| ------------------------------- | ------------------------------------------------------------------------- |
| `requireAccessTokenV2`          | Reads, fetches, non-sensitive ops (fast, no DB hit)                       |
| `requireAccessTokenWithDBCheck` | Deletes, payments, sensitive writes (verifies account still active in DB) |

**Layer 2 — Role check (always add):**

```ts
roleAuthenticateV2(["Student"]); // students only
roleAuthenticateV2(["Admin"]); // admins only
roleAuthenticateV2(["Admin", "Student"]); // both
```

**Layer 3 — Admin access level (optional):**

```ts
adminAccessAuthenticateV2(["president"]); // president only
adminAccessAuthenticateV2(["treasurer", "secretary"]); // specific access levels
// Skip this entirely if ANY admin can access the route
```

### Examples

```ts
// Simple read — any student
router.get(
  "/profile",
  requireAccessTokenV2,
  roleAuthenticateV2(["Student"]),
  controller
);

// Dangerous op — admin only, DB-checked
router.delete(
  "/student/:id",
  requireAccessTokenWithDBCheck,
  roleAuthenticateV2(["Admin"]),
  controller
);

// President-only action
router.post(
  "/suspend",
  requireAccessTokenWithDBCheck,
  roleAuthenticateV2(["Admin"]),
  adminAccessAuthenticateV2(["president"]),
  controller
);

// Any admin, no access restriction
router.post(
  "/event",
  requireAccessTokenV2,
  roleAuthenticateV2(["Admin"]),
  controller
);
```

## Accessing User in Controllers

After middleware runs, user claims are on `req.userV2`:

```ts
req.userV2.sub; // MongoDB ObjectId (string)
req.userV2.idNumber; // "2024-12345"
req.userV2.role; // "Admin" | "Student"
req.userV2.campus; // "UC-Main"
```

## Migrating Old Routes to V2

```ts
// OLD
router.get("/data", authenticate, controller);
// use req.user.id

// NEW
router.get(
  "/data",
  requireAccessTokenV2,
  roleAuthenticateV2(["Admin", "Student"]),
  controller
);
// use req.userV2.sub
```

## Error Codes

All V2 middleware errors return `{ error: "CODE", message: "..." }`:

| Code                             | Status | Meaning                                   |
| -------------------------------- | :----: | ----------------------------------------- |
| `INVALID_TOKEN`                  |  401   | Missing, expired, or bad token            |
| `ACCOUNT_INACTIVE`               |  403   | Account suspended/deleted (DB check only) |
| `CREDENTIALS_MISMATCH`           |  403   | Token claims don't match DB               |
| `INSUFFICIENT_PERMISSIONS`       |  403   | Wrong role                                |
| `INSUFFICIENT_ADMIN_PERMISSIONS` |  403   | Wrong admin access level                  |
