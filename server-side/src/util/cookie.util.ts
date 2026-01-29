import { Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const REFRESH_COOKIE_NAME = "rtid"; // refresh token id
const NODE_ENV = process.env.NODE_ENV || "development";
const IS_PROD = NODE_ENV === "production";

/**
 * Parse refresh token TTL (e.g., "7d", "604800") to milliseconds.
 * Supports formats: "7d", "7days", "604800" (seconds), "604800s"
 */
const parseTTLToMs = (ttl: string): number => {
  const match = ttl.match(/^(\d+)([a-z]?)$/i);
  if (!match) {
    throw new Error(`Invalid TTL format: ${ttl}`);
  }

  const value = parseInt(match[1], 10);
  const unit = match[2]?.toLowerCase() || "s";

  switch (unit) {
    case "d":
      return value * 24 * 60 * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    case "m":
      return value * 60 * 1000;
    case "s":
    default:
      return value * 1000;
  }
};

/**
 * Set refresh token in httpOnly cookie.
 * Cookie is automatically cleared on browser close in non-persistent mode.
 * @param res Express response object
 * @param token refresh token JWT
 */
export const setRefreshCookie = (res: Response, token: string): void => {
  const REFRESH_TOKEN_TTL = process.env.REFRESH_TOKEN_TTL || "7d";
  const maxAge = parseTTLToMs(REFRESH_TOKEN_TTL);

  res.cookie(REFRESH_COOKIE_NAME, token, {
    httpOnly: true, // Prevent JavaScript access; only sent with HTTP requests
    secure: IS_PROD, // HTTPS only in production; allow HTTP in dev
    sameSite: "lax", // Prevent CSRF while allowing top-level navigations
    path: "/api/v2/auth", // Only send with requests to /api/v2/auth routes
    maxAge, // Browser removes cookie after this duration (ms)
  });
};

/**
 * Clear refresh token cookie (logout).
 * @param res Express response object
 */
export const clearRefreshCookie = (res: Response): void => {
  res.clearCookie(REFRESH_COOKIE_NAME, {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: "lax",
    path: "/api/v2/auth",
  });
};

/**
 * Extract refresh token from cookies (for /v2/auth/refresh endpoint).
 * @param cookieString raw cookie header value
 * @returns token string or null if not found
 */
export const getRefreshTokenFromCookie = (
  cookieString?: string
): string | null => {
  if (!cookieString) return null;

  const cookies = cookieString.split(";").reduce(
    (acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = decodeURIComponent(value || "");
      return acc;
    },
    {} as Record<string, string>
  );

  return cookies[REFRESH_COOKIE_NAME] || null;
};
