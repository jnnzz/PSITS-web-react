import { Request, Response, NextFunction } from "express";
import { verifyAccessToken, AccessTokenClaims } from "../util/jwt.util";
import { Student } from "../models/student.model";
import { Admin } from "../models/admin.model";

/**
 * Extend Express Request to include v2 auth user claims from access token.
 * Attaches user info to req.userV2 for use in route handlers and downstream middleware.
 */
declare global {
  namespace Express {
    interface Request {
      userV2?: AccessTokenClaims;
    }
  }
}

/**
 * Layer 1A: Fast, Stateless Token Verification
 *
 * Use for READ-ONLY or NON-CRITICAL operations where speed matters.
 * - Validates access token signature & expiry only
 * - Does NOT check if user still exists or is active in DB
 * - Perfect for: profile reads, data fetches, list queries
 * - NOT suitable for: payments, deletions, sensitive edits
 *
 * Error Responses:
 * - 401: Missing or invalid access token
 * - Then chain with roleAuthenticateV2() to control access by role
 */
export const requireAccessTokenV2 = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  let token: string | undefined;

  if (authHeader) {
    if (Array.isArray(authHeader)) {
      token = authHeader[0].split(" ")[1];
    } else {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const claims = verifyAccessToken(token);
    req.userV2 = claims;
    next();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid access token";
    return res.status(401).json({ message });
  }
};

/**
 * Layer 1B: Slow, Stateful Token Verification
 *
 * Use for DANGEROUS or CRITICAL operations where security matters more than speed.
 * - Validates access token signature & expiry
 * - ALSO checks real-time DB status (prevents damage from deactivated accounts)
 * - Verifies user still exists and account is "Active" (Admin) or "True" (Student)
 * - Ensures token claims match current DB data
 * - Perfect for: payments, deletions, sensitive edits, status changes
 * - NOT needed for: simple data reads where stale data is acceptable
 *
 * Benefits Over requireAccessTokenV2:
 * If admin/student is deactivated AFTER getting an access token, this middleware
 * will reject them immediately instead of waiting for token expiry (which could be
 * hours away), preventing them from causing damage with stolen or compromised tokens.
 *
 * Performance Note: This requires DB lookups, so avoid on high-traffic read endpoints.
 *
 * Error Responses:
 * - 401: Missing or invalid access token
 * - 403: User not found OR account no longer active OR credentials mismatch
 * - Then chain with roleAuthenticateV2() and optionally adminAccessAuthenticateV2()
 */
export const requireAccessTokenWithDBCheck = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"];

  let token: string | undefined;

  if (authHeader) {
    if (Array.isArray(authHeader)) {
      token = authHeader[0].split(" ")[1];
    } else {
      token = authHeader.split(" ")[1];
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Access token required" });
  }

  try {
    const claims = verifyAccessToken(token);

    // Verify user still exists and is active
    if (claims.role === "Admin") {
      const admin = await Admin.findById(claims.sub);
      if (!admin || admin.status !== "Active") {
        return res.status(403).json({ message: "Account no longer active" });
      }
      // Verify role hasn't changed
      if (admin.id_number !== claims.idNumber) {
        return res
          .status(403)
          .json({ message: "Account credentials mismatch" });
      }
    } else {
      const student = await Student.findById(claims.sub);
      if (!student || student.status !== "True") {
        return res.status(403).json({ message: "Account no longer active" });
      }
      if (student.id_number !== claims.idNumber) {
        return res
          .status(403)
          .json({ message: "Account credentials mismatch" });
      }
    }

    req.userV2 = claims;
    next();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Invalid access token";
    return res.status(401).json({ message });
  }
};

/**
 * Layer 2: Role-Based Access Control (REQUIRED for every protected route)
 *
 * Use ALWAYS after choosing Layer 1 middleware (requireAccessTokenV2 OR requireAccessTokenWithDBCheck).
 * Restricts route access to specific user roles.
 *
 * @param allowedRoles Array of roles that can access: ["Admin"] | ["Student"] | ["Admin", "Student"]
 *
 * Examples:
 * - Only students can view their own profile: roleAuthenticateV2(["Student"])
 * - Only admins can approve requests: roleAuthenticateV2(["Admin"])
 * - Both can view announcements: roleAuthenticateV2(["Admin", "Student"])
 *
 * Error Responses:
 * - 401: No authentication found (shouldn't reach here if Layer 1 is used)
 * - 403: User role not in allowedRoles
 *
 * Usage Pattern:
 * router.get("/data", requireAccessTokenV2, roleAuthenticateV2(["Student", "Admin"]), controller)
 */
export const roleAuthenticateV2 = (
  allowedRoles: Array<"Admin" | "Student">
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.userV2) {
      return res.status(401).json({ message: "Authentication required" });
    }

    if (!allowedRoles.includes(req.userV2.role)) {
      return res.status(403).json({ message: "Insufficient permissions" });
    }

    next();
  };
};

/**
 * Layer 3: Granular Admin Access Control (OPTIONAL, only if needed)
 *
 * Use ONLY if you need to restrict routes to specific admin access levels.
 * Must chain after requireAccessTokenV2 or requireAccessTokenWithDBCheck.
 * Requires roleAuthenticateV2(["Admin"]) upstream.
 *
 * @param allowedAccess Array of specific admin access levels to allow
 *   Examples: ["president"] | ["secretary", "registrar"] | ["treasurer", "vp"]
 *
 * WHEN TO USE:
 * ✓ Route for presidents only: adminAccessAuthenticateV2(["president"])
 * ✓ Route for financial admins: adminAccessAuthenticateV2(["treasurer", "vp"])
 * ✗ Route open to ALL admins: Skip this middleware (no need to restrict further)
 *
 * WHEN TO SKIP:
 * If your route allows ANY admin regardless of access level, you don't need this.
 * roleAuthenticateV2(["Admin"]) alone is sufficient.
 *
 * Error Responses:
 * - 403: User is not Admin OR admin access level not in allowedAccess
 * - 500: Database lookup failed
 *
 * Usage Pattern:
 * Only presidents can delete students
 * router.delete("/student/:id", requireAccessTokenWithDBCheck,
 *   roleAuthenticateV2(["Admin"]), adminAccessAuthenticateV2(["president"]), controller)
 *
 * Any admin can post announcements
 * router.post("/announcement", requireAccessTokenV2,
 *   roleAuthenticateV2(["Admin"]), controller) // No adminAccessAuthenticateV2
 */
export const adminAccessAuthenticateV2 = (allowedAccess: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    if (!req.userV2 || req.userV2.role !== "Admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    try {
      // Fetch admin to check access level
      const admin = await Admin.findById(req.userV2.sub);
      if (!admin) {
        return res.status(403).json({ message: "Admin not found" });
      }

      if (!allowedAccess.includes(admin.access)) {
        return res
          .status(403)
          .json({ message: "Insufficient admin permissions" });
      }

      next();
    } catch (error) {
      console.error("Admin access check error:", error);
      return res.status(500).json({ message: "Authorization check failed" });
    }
  };
};
