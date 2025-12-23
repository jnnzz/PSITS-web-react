# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial project setup with Vite, React, and TypeScript
- Initialized TailwindCSS
- Setup React Router with Data Routing
- Added ESLINT config
- React Compiler integration for automatic optimization
- Development environment configuration

---

## Template for Future Releases

```markdown
## [X.Y.Z] - YYYY-MM-DD

### Added

- New feature 1 (#PR_NUMBER)
- New feature 2 with description

### Changed

- **BREAKING:** Change that breaks backward compatibility (#PR_NUMBER)
- Non-breaking change to existing functionality

### Deprecated

- Feature marked for removal in next major version

### Removed

- Feature that was previously deprecated

### Fixed

- Bug fix with description (#ISSUE_NUMBER)
- Another bug fix

### Security

- Security vulnerability patch (CVE-XXXX-XXXXX)
```

---

## Release Guidelines

When updating this changelog:

1. **Keep [Unreleased] section at the top** - Add all new changes here during development
2. **Move to versioned section on release** - Create new version heading with date when releasing
3. **Follow semantic versioning** - See VERSIONING.md for guidelines
4. **Be specific and user-focused** - Describe changes from user's perspective
5. **Link to issues/PRs** - Add references where relevant
6. **Mark breaking changes** - Use `**BREAKING:**` prefix for breaking changes
7. **Group related changes** - Keep similar changes in the same category

### Categories

- **Added:** New features or functionality
- **Changed:** Changes to existing functionality
- **Deprecated:** Features marked for future removal
- **Removed:** Removed features or functionality
- **Fixed:** Bug fixes
- **Security:** Security-related changes

### Example Entry

```markdown
## [1.2.0] - 2024-01-15

### Added

- New `DataTable` component with sorting and filtering capabilities (#123)
  - Supports custom column definitions
  - Built-in pagination
  - Keyboard navigation
- Dark mode theme toggle in settings (#145)

### Changed

- **BREAKING:** Renamed `Button` component prop `type` to `variant` (#156)
  - Migration: Replace `type="primary"` with `variant="primary"`
- Improved `List` component rendering performance by 40% (#167)
- Updated React Compiler to latest version with better optimization

### Fixed

- Fixed memory leak in `useWebSocket` hook when component unmounts (#134)
- Resolved TypeScript errors in production builds related to strict mode (#142)
- Corrected z-index stacking issues in modal overlays (#151)

### Security

- Updated `vite` to 6.0.3 to address security vulnerability CVE-2024-12345 (#178)
- Patched XSS vulnerability in markdown renderer (#189)
```

---

## Version History Summary

- **0.1.0** - Initial project setup with Vite + React + TypeScript + React Compiler

---

## Links

- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Versioning Guidelines](./VERSIONING.md)

## Notes

- For pre-release versions, use format: `1.0.0-alpha.1`, `1.0.0-beta.1`, `1.0.0-rc.1`
- Breaking changes should always bump the MAJOR version (except in 0.x.x development)
- New features bump the MINOR version
- Bug fixes bump the PATCH version
