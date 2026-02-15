/**
 * In-memory access token store.
 *
 * The access token is intentionally kept in a module-level variable (NOT in
 * localStorage / sessionStorage) so that it is:
 *   - inaccessible to XSS (no `document.cookie` or `Storage` API exposure)
 *   - available synchronously to Axios interceptors
 *   - automatically cleared on page refresh (refresh endpoint restores it)
 */

let accessToken: string | null = null;

export const getAccessToken = (): string | null => accessToken;

export const setAccessToken = (token: string): void => {
  accessToken = token;
};

export const clearAccessToken = (): void => {
  accessToken = null;
};
