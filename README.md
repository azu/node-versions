Fork of [@darkobits/node-versions](https://github.com/darkobits/node-versions)

## Diff

- `lts` return multiple LTS versions
- Remove CLI

## Install

This package is available as a CLI and as a Node API. If only using the Node
API, you should install it locally in your project:

```
npm i @azu/node-versions
```

If using the CLI, it may be preferable to install it globally:

```
npm i -g @azu/node-versions
```

## Use

### Node API

This package exports an [async function](https://ponyfoo.com/articles/understanding-javascript-async-await)
that returns a JSON object with 2 keys, `latest` and `lts`, each with the
following sub-keys:

```ts
interface VersionDescriptor {
  /**
   * Full semver version. (ex: '10.14.1')
   */
  full: string;

  /**
   * Major version number. (ex: 10)
   */
  major?: number;

  /**
   * Minor version number. (ex: 14)
   */
  minor?: number;

  /**
   * Patch version number. (ex: 1)
   */
  patch?: number;
}

interface NodeReleaseDescriptor {
  /**
   * Release date.
   */
  date: string;

  /**
   * Release version.
   */
  version: VersionDescriptor;

  /**
   * NPM version included in the release.
   */
  npm: VersionDescriptor;

  /**
   * V8 version included in the release.
   */
  v8: VersionDescriptor;

  /**
   * libuv version included in the release.
   */
  uv: VersionDescriptor;

  /**
   * zlib version included in the release.
   */
  zlib: VersionDescriptor;

  /**
   * OpenSSL version included in the release.
   */
  openssl: VersionDescriptor;
}
```
