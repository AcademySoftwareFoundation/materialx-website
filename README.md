# MaterialX Website

Source code and data for https://www.materialx.org

## Layout

- `src`: Site pages, built with [Eleventy](https://www.11ty.dev/).  Each page contains only its own content, with the shared page structure in `src/_includes`.
- `assets`, `images`, `LogoImages`, `style`: Static files, copied to the site without processing.
- `scripts`: Build scripts.

## Building

With [Node.js](https://nodejs.org/) installed, the site can be built and previewed locally:

```
npm install
npm run serve
```

The MaterialX API documentation is not stored in this repository, and is generated from the MaterialX release given in `src/_data/materialx.json`.  With git, CMake, a C++ compiler, and [Doxygen](https://www.doxygen.nl/) installed, it can be added to a local build:

```
npm run build
npm run docs
```

## Deployment

Each push to the `main` branch builds the site and API documentation and deploys them to GitHub Pages.

To update the API documentation for a new MaterialX release, update the version in `src/_data/materialx.json`.
