import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { Student } from "../models/student.model";
import { IStudentDocument } from "../models/student.interface";
import { Admin } from "../models/admin.model";
import { IAdminDocument } from "../models/admin.interface";
import { signAccessToken, signRefreshToken } from "../util/jwt.util";
import {
  setRefreshCookie,
  clearRefreshCookie,
  getRefreshTokenFromCookie,
} from "../util/cookie.util";
import { verifyRefreshToken } from "../util/jwt.util";
import { Log } from "../models/log.model";

/**
 * Shared user response type for frontend
 */
type UserResponse = {
  id: string;
  idNumber: string;
  role: "Admin" | "Student";
  campus: string;
  name?: string;
  email?: string;
  course?: string;
  year?: number | string;
  membershipStatus?: string;
  position?: string;
  access?: string;
};

/**
 * Convert Student/Admin model to UserResponse
 */
const toUserResponse = (
  user: IStudentDocument | IAdminDocument,
  role: "Admin" | "Student"
): UserResponse => {
  if (role === "Student") {
    const student = user as IStudentDocument;
    return {
      id: student._id.toString(),
      idNumber: student.id_number,
      role: "Student",
      campus: student.campus,
      name: `${student.first_name} ${student.middle_name || ""} ${student.last_name}`.trim(),
      email: student.email,
      course: student.course,
      year: student.year,
      membershipStatus: student.membershipStatus,
    };
  } else {
    const admin = user as IAdminDocument;
    return {
      id: admin._id.toString(),
      idNumber: admin.id_number,
      role: "Admin",
      campus: admin.campus || "UC-Main",
      name: admin.name,
      email: admin.email,
      course: admin.course,
      year: admin.year,
      position: admin.position,
      access: admin.access,
    };
  }
};

/**
 * POST /v2/auth/login
 * Validates credentials, issues access + refresh tokens, sets refresh cookie.
 */
export const loginV2Controller = async (req: Request, res: Response) => {
  const { id_number, password } = req.body;

  try {
    let user: IAdminDocument | IStudentDocument | null = null;
    let role: "Admin" | "Student";

    // Check if admin login (id_number contains "-admin")
    if (id_number.includes("-admin")) {
      const admin = await Admin.findOne({ id_number });
      if (!admin) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, admin.password);

      if (!passwordMatch) {
        return res
          .status(400)
          .json({ message: "Invalid ID number or password" });
      }

      if (admin.status === "Suspend") {
        return res.status(403).json({
          message: "Your account has been suspended! Please contact president",
        });
      }

      if (admin.status !== "Active") {
        return res.status(403).json({ message: "Account is not active" });
      }

      user = admin;
      role = "Admin";

      // Log admin login
      const log = new Log({
        admin: admin.name,
        admin_id: String(admin._id),
        action: "Admin Login (v2)",
      });
      await log.save();
    } else {
      // Student login
      const student = await Student.findOne({ id_number });
      if (!student) {
        return res.status(400).json({ message: "Invalid credentials" });
      }

      const passwordMatch = await bcrypt.compare(password, student.password);

      if (!passwordMatch) {
        return res
          .status(400)
          .json({ message: "Invalid ID number or password" });
      }

      if (student.status === "False") {
        return res
          .status(403)
          .json({ message: "Your account has been deleted!" });
      }

      if (student.status !== "True") {
        return res.status(403).json({ message: "Account is not active" });
      }

      user = student;
      role = "Student";
    }

    // Sign tokens
    const accessToken = signAccessToken({
      sub: user._id.toString(),
      idNumber: user.id_number,
      role,
      campus: user.campus || "UC-Main",
    });

    const refreshToken = signRefreshToken({
      sub: user._id.toString(),
      idNumber: user.id_number,
      role,
      campus: user.campus || "UC-Main",
    });

    // Save refresh token to database for rotation validation
    if (role === "Admin") {
      await Admin.findByIdAndUpdate(user._id, {
        currentRefreshToken: refreshToken,
      });
    } else {
      await Student.findByIdAndUpdate(user._id, {
        currentRefreshToken: refreshToken,
      });
    }

    // Set refresh token in httpOnly cookie
    setRefreshCookie(res, refreshToken);

    // Return access token and user data
    return res.status(200).json({
      message: "Signed in successfully",
      accessToken,
      user: toUserResponse(user, role),
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "An error occurred during login" });
  }
};

/**
 * POST /v2/auth/refresh
 * Reads refresh token from cookie, verifies it, checks for reuse (theft detection), issues new tokens.
 * Implements refresh token rotation: old token is invalidated upon successful refresh.
 */
export const refreshV2Controller = async (req: Request, res: Response) => {
  try {
    const refreshToken = getRefreshTokenFromCookie(req.headers.cookie);

    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token not found" });
    }

    // Verify refresh token signature
    let claims;
    try {
      claims = verifyRefreshToken(refreshToken);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Invalid refresh token";
      return res.status(401).json({ message });
    }

    // Fetch user from DB to check if token matches stored currentRefreshToken
    let user: IStudentDocument | IAdminDocument | null = null;
    let role: "Admin" | "Student" = claims.role;

    if (role === "Admin") {
      user = await Admin.findById(claims.sub);
      if (!user || user.status !== "Active") {
        clearRefreshCookie(res);
        return res.status(403).json({ message: "Account no longer active" });
      }
    } else {
      user = await Student.findById(claims.sub);
      if (!user || user.status !== "True") {
        clearRefreshCookie(res);
        return res.status(403).json({ message: "Account no longer active" });
      }
    }

    // CRITICAL: Verify refresh token matches the stored token (rotation check)
    // If tokens don't match, this indicates a reuse attempt (possible theft)
    if (user.currentRefreshToken !== refreshToken) {
      // Invalidate all sessions for this user by setting currentRefreshToken to null
      if (role === "Admin") {
        await Admin.findByIdAndUpdate(claims.sub, {
          currentRefreshToken: null,
        });
      } else {
        await Student.findByIdAndUpdate(claims.sub, {
          currentRefreshToken: null,
        });
      }

      clearRefreshCookie(res);
      console.warn(
        `Refresh token reuse detected for user ${claims.idNumber} (${role}). All sessions invalidated.`
      );
      return res.status(401).json({
        message:
          "Refresh token has been invalidated. Please log in again. Suspected token theft.",
      });
    }

    // TODO (auth): validate pwdChangedAt if we implement password change tracking
    // if (claims.pwdChangedAt && user.passwordChangedAt > claims.pwdChangedAt) {
    //   clearRefreshCookie(res);
    //   return res.status(401).json({ message: "Password has been changed" });
    // }

    // Generate new tokens (rotation)
    const newAccessToken = signAccessToken({
      sub: user._id.toString(),
      idNumber: user.id_number,
      role,
      campus: user.campus || "UC-Main",
    });

    const newRefreshToken = signRefreshToken({
      sub: user._id.toString(),
      idNumber: user.id_number,
      role,
      campus: user.campus || "UC-Main",
    });

    // Update database with new refresh token (invalidate old one)
    if (role === "Admin") {
      await Admin.findByIdAndUpdate(claims.sub, {
        currentRefreshToken: newRefreshToken,
      });
    } else {
      await Student.findByIdAndUpdate(claims.sub, {
        currentRefreshToken: newRefreshToken,
      });
    }

    // Set new refresh token in cookie
    setRefreshCookie(res, newRefreshToken);

    return res.status(200).json({
      message: "Token refreshed successfully",
      accessToken: newAccessToken,
      user: toUserResponse(user, role),
    });
  } catch (error) {
    console.error("Refresh error:", error);
    return res
      .status(500)
      .json({ message: "An error occurred during token refresh" });
  }
};

/**
 * POST /v2/auth/logout
 * Clears refresh token cookie and invalidates stored token in database.
 * This ensures the token can never be reused, even if it's stolen.
 */
export const logoutV2Controller = async (req: Request, res: Response) => {
  try {
    const refreshToken = getRefreshTokenFromCookie(req.headers.cookie);

    // If a valid refresh token exists, invalidate it in the database
    if (refreshToken) {
      try {
        const claims = verifyRefreshToken(refreshToken);

        if (claims.role === "Admin") {
          await Admin.findByIdAndUpdate(claims.sub, {
            currentRefreshToken: null,
          });
        } else {
          await Student.findByIdAndUpdate(claims.sub, {
            currentRefreshToken: null,
          });
        }
      } catch (error) {
        // Token might be expired or invalid, but we still clear the cookie
        console.debug("Could not verify token during logout:", error);
      }
    }

    clearRefreshCookie(res);
    return res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "An error occurred during logout" });
  }
};

/**
 * GET /v2/auth/me
 * Returns current user profile based on access token (middleware attaches req.userV2).
 */
export const meV2Controller = async (req: Request, res: Response) => {
  try {
    // Access token claims are attached by middleware
    const { sub, role } = req.userV2!;

    let user: IStudentDocument | IAdminDocument | null = null;

    if (role === "Admin") {
      user = await Admin.findById(sub);
    } else {
      user = await Student.findById(sub);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      user: toUserResponse(user, role),
    });
  } catch (error) {
    console.error("Me endpoint error:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
};
