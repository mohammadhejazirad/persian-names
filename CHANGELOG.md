# Changelog

All notable changes to this project are documented in this file.

## 2.0.0 - 2026-08-22

### Added

- A single typed `getGender` API for scalar and batch lookups.
- English, Persian, Arabic, and numeric output formats.
- ESM, CommonJS, and browser-global builds.
- Automatic Persian/Arabic Unicode normalization.
- Runtime, declaration, package-resolution, size, and benchmark checks.

### Changed

- Replaced the old 6,179-entry JSON database with the supplied compressed
  10,722-record dataset, producing 10,088 unique normalized lookup keys.
- Rebuilt the lookup path around a lazily initialized `Map` for constant-time
  average lookups.
- Removed all runtime dependencies and Node.js-only APIs.
- Unknown names now consistently return `null`.

### Removed

- The `PersianNames` class and the legacy `validation`, `getNames`, `findName`,
  `findNames`, and `includeName` APIs.
- Custom JSON loading, rates, sorting, and record projection.
- The legacy TSDX, Jest, Husky, `sort-array`, and `@persian-tools` setup.

### Fixed

- Data mutation across repeated calls.
- Process termination and console output during library use.
- Broken browser bundling caused by `fs`, `path`, `process`, and runtime JSON
  loading.
- Incorrect or inconsistent gender conversions and weak public return types.
