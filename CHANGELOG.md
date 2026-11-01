# Changelog

All notable changes to this project are documented in this file.

## 2.1.0 - 2026-11-01

### Added

- `getName` returns the canonical spelling, Latin form, gender, and linguistic
  origin of one name or a batch.
- A Latin spelling for every name, with a linguistic origin for each one.
  Origins cover Persian, Arabic, Turkish, Kurdish, Mongolian, Armenian, mixed,
  Greek, Hebrew, Latin, French, German, Spanish, Italian, English, Russian,
  Swedish, Finnish, Norse, Phoenician, Syriac, Aramaic, Celtic, Danish, and
  Sanskrit. `other` stays in the API only as a fallback.
- Origin labels in English, Persian, and Arabic, plus a stable numeric code.
  Codes 1 through 8 are unchanged.
- Lookup by a unique Latin spelling such as `Ali` or `Mohammad Reza`.
- Shared ambiguous Latin spellings stay unresolved instead of guessing.

### Changed

- `getGender` now accepts a unique Latin spelling in addition to Persian script.
  Its results for Persian-script input are unchanged.
- Origin labels follow the linguistic root of the name form. `سارا` is Hebrew,
  `یلدا` is Syriac, `هانیبال` is Phoenician, and `ژینوس` is French, matching
  the French label used by Iranian name catalogs. Turkic names such as
  `ارسلان` and `طغرل` are `turkish`, and `سلدوز` is `mongolian`. A Persian
  letter no longer marks every `ژی` name as Kurdish. The current dataset has
  no name left on `other`.

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
