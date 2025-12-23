# Versioning Guidelines

## Overview

This project uses a **modified Semantic Versioning** approach tailored for frontend applications. Since this is an application (not a library), versioning focuses on user-facing changes and deployment milestones rather than API compatibility.

## Version Format

Versions are formatted as: **MAJOR.MINOR.PATCH** (e.g., `1.2.3`)

### MAJOR Version

Increment for **significant releases with major changes**:

- Major UI/UX redesigns or rebrandings
- Significant new features or product pivots
- Major architectural rewrites
- Breaking changes to user workflows
- Removing major features
- Migrations that require user action (e.g., re-authentication, data migration)
- Major technology stack changes (e.g., migrating from React 18 to React 19)

**Example:** `1.5.2` → `2.0.0`

**Typical Frequency:** Yearly or when major milestones are reached

### MINOR Version

Increment for **new features and notable improvements**:

- New user-facing features or pages
- Significant UI improvements or enhancements
- New integrations or third-party services
- Performance improvements noticeable to users
- Non-breaking changes to existing features
- Adding new sections or modules

**Example:** `1.5.2` → `1.6.0`

**Typical Frequency:** Monthly or per feature release cycle

### PATCH Version

Increment for **bug fixes and minor updates**:

- Bug fixes that don't add new functionality
- Security patches
- Minor UI tweaks and polish
- Dependency updates (security or maintenance)
- Performance optimizations
- Typo fixes and content updates
- Internal refactoring without user-visible changes

**Example:** `1.5.2` → `1.5.3`

**Typical Frequency:** Weekly or as needed for hotfixes

## Pre-release Versions (Optional)

For staged deployments or testing environments:

- **Alpha:** `1.0.0-alpha.1` - Internal testing, dev/staging environment
- **Beta:** `1.0.0-beta.1` - User acceptance testing, limited rollout
- **RC (Release Candidate):** `1.0.0-rc.1` - Final testing before production

> **Note:** Many frontend apps skip pre-release versions and use environment-based deployments instead (dev → staging → production).

## Version Workflow

### 1. Development Phase

- Work on features/fixes in feature branches
- Document changes in CHANGELOG.md under `[Unreleased]` section
- Version remains unchanged until deployment

### 2. Preparing for Release

When ready to deploy:

1. Review all changes in the `[Unreleased]` section
2. Determine the appropriate version bump:
   - **PATCH:** Hotfixes, bug fixes only → Deploy quickly
   - **MINOR:** New features, scheduled release → Regular deployment cycle
   - **MAJOR:** Major release, significant changes → Plan carefully
3. Update version in `package.json`
4. Move `[Unreleased]` changes to a new version section in CHANGELOG.md
5. Add release date to the version heading
6. Commit the version bump:
   ```bash
   git add package.json CHANGELOG.md
   git commit -m "chore(release): bump version to 1.2.3"
   ```

### 3. Deployment & Tagging

1. Deploy to production (via CI/CD, manual deployment, etc.)

2. Create a git tag after successful deployment:

   ```bash
   git tag -a v1.2.3 -m "Release version 1.2.3"
   git push origin v1.2.3
   ```

3. (Optional) Create a GitHub release with release notes

## Special Considerations for Frontend Applications

### Deployment vs. Versioning

- **Version changes** represent significant milestones in the codebase
- **Deployments** can happen more frequently than version bumps
- Consider versioning on a schedule (e.g., sprint-based) rather than every deployment
- Hotfixes may warrant immediate PATCH version bumps

### User-Facing vs. Internal Changes

Focus versioning on **user-visible changes**:

- A complete UI redesign = MAJOR bump
- A new feature users will notice = MINOR bump
- A bug fix users experienced = PATCH bump
- Internal refactoring with no user impact = May not warrant a version bump

### Environment-Based Versioning Strategy

Many teams use:

- **Development branch:** No version bump, continuous integration
- **Staging/Beta:** Optional pre-release versions (1.5.0-beta.1)
- **Production:** Official versions (1.5.0)

### React Compiler

- Changes to React Compiler configuration are typically internal (no version bump needed unless it affects performance noticeably)
- Enabling/disabling compiler for production builds could be MINOR if it improves performance
- Breaking changes in compiler behavior affecting app functionality should trigger version bump

### TypeScript

- TypeScript version upgrades are generally internal changes
- Type improvements that don't affect runtime = No version bump
- Type changes that require code modifications = MINOR bump during regular release

### Vite Configuration

- Build optimizations and config changes are usually internal
- Changes affecting bundle size or load times significantly = MINOR bump
- Changes to dev server or build process = No version bump unless it affects team workflow significantly

## Changelog Guidelines

### Structure

Each version entry should include **user-facing changes**:

```markdown
## [Version] - YYYY-MM-DD

### Added

- New features or pages users will see

### Changed

- Notable changes to existing features

### Deprecated

- Features marked for removal (if applicable)

### Removed

- Features that have been removed

### Fixed

- Bug fixes users experienced

### Security

- Security patches or improvements

### Performance

- Noticeable performance improvements (optional category)
```

### Writing Good Changelog Entries

- **User-focused:** Write what users will experience, not technical implementation
  - ✅ "Added dark mode toggle in settings"
  - ❌ "Implemented ThemeContext with localStorage persistence"
- **Be specific:** Help users understand what changed
  - ✅ "Fixed modal not closing when clicking outside"
  - ❌ "Fixed modal bugs"
- **Avoid technical jargon:** Unless your users are developers
  - ✅ "Improved page load speed by 40%"
  - ❌ "Optimized React component memoization with React Compiler"
- **Group related changes:** Keep similar features together
- **Link to issues:** Reference GitHub issues for context (optional)
- **Highlight breaking changes:** Mark with `**BREAKING:**` if users need to take action

### Example Entry

```markdown
## [1.5.0] - 2024-01-15

### Added

- New dashboard with customizable widgets
- Export data to CSV functionality
- Dark mode theme option in user settings

### Changed

- Redesigned navigation menu for better usability
- Updated color scheme for improved accessibility
- Login session now persists for 30 days (previously 7 days)

### Fixed

- Fixed issue where forms would lose data on page refresh
- Resolved slow loading on mobile devices
- Corrected date formatting in reports for international users

### Performance

- Reduced initial page load time by 35%
- Improved search response time for large datasets

### Security

- Enhanced password requirements
- Added two-factor authentication option
```

## Version Commit Messages

Use conventional commit format for version bumps:

- **Major:** `chore(release): bump version to 2.0.0`
- **Minor:** `chore(release): bump version to 1.6.0`
- **Patch:** `chore(release): bump version to 1.5.3`

## Tools and Automation

### Manual Versioning (Recommended for Small Teams)

Simple and straightforward:

1. Update `package.json` version manually
2. Update CHANGELOG.md
3. Commit and tag
4. Deploy

### Automated Versioning (For Larger Teams)

**Option 1: standard-version**

```bash
npm install --save-dev standard-version
```

Add to `package.json`:

```json
{
  "scripts": {
    "release": "standard-version",
    "release:minor": "standard-version --release-as minor",
    "release:major": "standard-version --release-as major",
    "release:patch": "standard-version --release-as patch"
  }
}
```

**Option 2: CI/CD Integration**

- Automatically bump version on merge to main branch
- Generate changelog from commit messages
- Create git tags automatically
- Trigger deployment pipelines

**Option 3: Date-Based Versioning**
Some teams use CalVer (Calendar Versioning) for frontend apps:

- `2024.12.1` - Year.Month.Release
- `24.12.1` - YY.MM.Release
- Good for scheduled releases and gives context about when features were released

### Commit Convention (Optional)

Using conventional commits helps with automated changelog generation:

- `feat: add user profile page` → MINOR bump
- `fix: resolve login redirect issue` → PATCH bump
- `feat!: redesign navigation` → MAJOR bump
- `chore: update dependencies` → No version bump

Install commitizen for standardized commits:

```bash
npm install --save-dev commitizen cz-conventional-changelog
```

## Version History Philosophy

### Early Development (0.x.x)

- **0.1.0 - 0.9.x:** Initial development phase
- Rapid iteration and breaking changes are expected
- Version numbers indicate progress toward first stable release
- Can bump MINOR version frequently for new features

### Stable Releases (1.x.x+)

- **1.0.0:** First production-ready release
- **1.x.x:** Ongoing feature development with stability
- **2.0.0+:** Major milestones or significant redesigns

### When to Reach 1.0.0?

- All core features are implemented
- App is stable and production-ready
- Major bugs are resolved
- You're comfortable with public launch

### Practical Examples

**Scenario 1: Bug Fix Deployment**

- Fixed critical login bug
- Bump: `1.2.3` → `1.2.4`
- Deploy immediately as hotfix

**Scenario 2: Sprint Release with New Features**

- Added 3 new features this sprint
- Fixed 5 bugs
- Bump: `1.2.4` → `1.3.0`
- Deploy at end of sprint

**Scenario 3: Major Redesign**

- Complete UI overhaul
- New design system
- Rebranding
- Bump: `1.8.2` → `2.0.0`
- Plan carefully, communicate with users

**Scenario 4: Multiple Small Deployments**
Not every deployment needs a version bump:

- Deploy config changes, A/B tests, or experiments without versioning
- Bump version when accumulating user-visible changes
- Tag major deployments for easy rollback capability

## Alternative: Deployment-Based Versioning

Some teams version based on deployment milestones:

- Each production deployment = new version
- Version reflects "what's in production" rather than semantic meaning
- Simpler but loses semantic information
- Format: `1.234.0` (MAJOR.DEPLOYMENT_NUMBER.HOTFIX)

## Quick Decision Flowchart

When preparing a release, ask yourself:

```
┌─────────────────────────────────────┐
│   What changed in this release?     │
└──────────────┬──────────────────────┘
               │
               ▼
    ┌──────────────────────┐
    │  Major UI redesign?  │ YES ──► MAJOR (2.0.0)
    │  Breaking changes?   │
    │  Feature removal?    │
    └──────────┬───────────┘
               │ NO
               ▼
    ┌──────────────────────┐
    │  New features?       │ YES ──► MINOR (1.5.0)
    │  Enhancements?       │
    │  New pages?          │
    └──────────┬───────────┘
               │ NO
               ▼
    ┌──────────────────────┐
    │  Bug fixes only?     │ YES ──► PATCH (1.4.3)
    │  Security patches?   │
    │  Minor tweaks?       │
    └──────────┬───────────┘
               │ NO
               ▼
    ┌──────────────────────┐
    │  Internal changes?   │ YES ──► No version bump needed
    │  No user impact?     │         (or PATCH if significant)
    └──────────────────────┘
```

## References

- [Semantic Versioning 2.0.0](https://semver.org/) - Original spec (adapted for frontend)
- [Keep a Changelog](https://keepachangelog.com/) - Changelog best practices
- [Conventional Commits](https://www.conventionalcommits.org/) - Commit message format
- [Calendar Versioning](https://calver.org/) - Alternative versioning scheme

## Team Agreement

The most important thing is **consistency within your team**. Adapt these guidelines to fit your workflow, but once you decide on an approach, document it and stick to it. Your users (and future team members) will thank you!
