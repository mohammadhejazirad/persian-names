# Changelog

All notable changes to this project are documented in this file.

## 2.1.1 - 2026-11-03

### Added

- سید، سیده، and سادات are ignored when they sit before or, for the feminine
  titles, after a known given name. `سیدعلی`, `سیده زهرا`, and `زهرا سادات`
  resolve to the given name. The title does not change that name's gender.
  The same applies to the usual Latin forms, such as `Seyed Ali` and
  `Zahra Sadat`. An exact catalog spelling still wins.
- `getTitle` reports `seyed`, `seyedeh`, or `sadat` when a title was removed.
- `sameName` reports whether two spellings are the same given name.
- `searchNames` returns a short list of canonical names for a Persian or
  Latin prefix. The list is capped at 50.
- `countNames` returns the catalog size without building formatted records.
- 69 attested given names that were missing from the source dataset, including
  `پوری`, `دری`, `پاییزه`, `سوگول`, and `شیرکو`. Spellings `اناهید` and
  `ارتمیس` resolve to the existing canonical names `آناهید` and `آرتمیس`.
  Frequent names already published by سازمان ثبت احوال were already covered.

### Security

- Strings longer than 128 characters are rejected before normalization.
- An unsupported `format` is no longer copied verbatim into the `RangeError`.

### Fixed

- The publish workflow now passes the packed tarball as a local path. `npm publish`
  was treating `package/<name>.tgz` as a GitHub repository spec.

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
- `isName` reports whether a spelling is known.
- `getNationality` returns only the linguistic origin.
- `getEnglish` returns only the Latin spelling.
- `getNames` returns the whole catalog, and only when it is called.

### Changed

- `getGender` now accepts a unique Latin spelling in addition to Persian script.
  Its results for Persian-script input are unchanged.
- Origin labels follow the linguistic root of the name form. `سارا` is Hebrew,
  `یلدا` is Syriac, `هانیبال` is Phoenician, and `ژینوس` is French, matching
  the French label used by Iranian name catalogs. Turkic names such as
  `ارسلان` and `طغرل` are `turkish`, and `سلدوز` is `mongolian`. A Persian
  letter no longer marks every `ژی` name as Kurdish. The current dataset has
  no name left on `other`.
- Persian labels for Turkish and Kurdish now carry a damma: `تُرک` and `کُرد`.

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
