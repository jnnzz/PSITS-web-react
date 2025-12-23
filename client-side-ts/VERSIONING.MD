# Versioning Guidelines

## Overview

This project follows [Semantic Versioning 2.0.0](https://semver.org/) (SemVer) for version numbers and maintains a detailed changelog of all notable changes.

## Version Format

Versions are formatted as: **MAJOR.MINOR.PATCH** (e.g., `1.2.3`)

### MAJOR Version

Increment when you make **incompatible API changes** or **breaking changes**:

- Removing or renaming public APIs, props, or exports
- Changing function signatures in breaking ways
- Removing support for older dependencies (Node.js, React, etc.)
- Major architectural rewrites
- Changes that require users to modify their code

**Example:** `1.5.2` → `2.0.0`

### MINOR Version

Increment when you add **functionality in a backward-compatible manner**:

- Adding new features or components
- Adding new optional props or parameters
- Deprecating functionality (but not removing it)
- Adding new exports or utilities
- Performance improvements without breaking changes
- Upgrading dependencies in a non-breaking way

**Example:** `1.5.2` → `1.6.0`

### PATCH Version

Increment when you make **backward-compatible bug fixes**:

- Fixing bugs or defects
- Security patches
- Documentation updates
- Internal refactoring without API changes
- Dependency updates for security patches
- Type definition fixes

**Example:** `1.5.2` → `1.5.3`

## Pre-release Versions

For pre-release versions, use the following format:

- **Alpha:** `1.0.0-alpha.1` - Early development, unstable
- **Beta:** `1.0.0-beta.1` - Feature complete, testing phase
- **RC (Release Candidate):** `1.0.0-rc.1` - Final testing before release

## Version Workflow

### 1. Development Phase

- Work on features/fixes in feature branches
- Keep `package.json` version unchanged during development
- Document changes in CHANGELOG.md under `[Unreleased]` section

### 2. Pre-Release

When preparing for a release:

1. Review all changes in the `[Unreleased]` section
2. Determine the appropriate version bump (MAJOR, MINOR, or PATCH)
3. Update version in `package.json`
4. Move `[Unreleased]` changes to a new version section in CHANGELOG.md
5. Add release date to the version heading

### 3. Release

1. Create a git tag with the version number (prefixed with `v`):
   ```bash
   git tag -a v1.2.3 -m "Release version 1.2.3"
   ```

2. Push the tag to remote:
   ```bash
   git push origin v1.2.3
   ```

3. Publish to npm (if applicable):
   ```bash
   npm publish
   ```

## Special Considerations for This Project

### React Compiler

- Changes to React Compiler configuration should be considered MINOR changes
- Breaking changes in compiler behavior should trigger MAJOR version bump

### TypeScript

- Adding or improving type definitions is a MINOR change
- Breaking type changes (that require user code modifications) are MAJOR changes
- Fixing incorrect types that break builds is a PATCH change if it corrects wrong behavior

### Vite Configuration

- Vite config changes that don't affect the built output are PATCH changes
- Changes that affect build output or require configuration updates are MINOR changes
- Breaking changes to build process are MAJOR changes

## Changelog Guidelines

### Structure

Each version entry should include:

```markdown
## [Version] - YYYY-MM-DD

### Added
- New features or functionality

### Changed
- Changes to existing functionality

### Deprecated
- Features marked for removal in future versions

### Removed
- Features that have been removed

### Fixed
- Bug fixes

### Security
- Security patches or improvements
```

### Writing Good Changelog Entries

- **Be specific:** Instead of "Fixed bugs", write "Fixed modal not closing on backdrop click"
- **User-focused:** Write from the user's perspective, not the developer's
- **Link to issues/PRs:** Reference GitHub issues or PRs when relevant
- **Breaking changes:** Clearly mark with `**BREAKING:**` prefix
- **Group related changes:** Keep similar changes together

### Example Entry

```markdown
## [1.5.0] - 2024-01-15

### Added
- New `DataTable` component with sorting and filtering (#123)
- Dark mode support across all components (#145)

### Changed
- **BREAKING:** Renamed `Button` prop `type` to `variant` for clarity (#156)
- Improved performance of `List` component by 40% (#167)

### Fixed
- Fixed memory leak in `useWebSocket` hook (#134)
- Resolved TypeScript errors in production builds (#142)

### Security
- Updated dependencies to address CVE-2024-12345 (#178)
```

## Version Commit Messages

Use conventional commit format for version bumps:

- **Major:** `chore(release): bump version to 2.0.0`
- **Minor:** `chore(release): bump version to 1.6.0`
- **Patch:** `chore(release): bump version to 1.5.3`

## Tools and Automation

### Recommended Tools

- **standard-version:** Automates versioning and changelog generation
  ```bash
  npm install --save-dev standard-version
  ```

- **commitizen:** Helps write conventional commits
  ```bash
  npm install --save-dev commitizen
  ```

### NPM Scripts

Add these to your `package.json`:

```json
{
  "scripts": {
    "release": "standard-version",
    "release:major": "standard-version --release-as major",
    "release:minor": "standard-version --release-as minor",
    "release:patch": "standard-version --release-as patch"
  }
}
```

## Version History

- **0.x.x:** Initial development (unstable API)

## References

- [Semantic Versioning 2.0.0](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)