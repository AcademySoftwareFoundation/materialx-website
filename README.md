# MaterialX Website

Source code and data for https://www.materialx.org

## Layout

- `src`: Site pages, built with [Eleventy](https://www.11ty.dev/).  Each page contains only its own content, with the shared page structure in `src/_includes`.
- `src/_data`: Site data, including the announcements and events on the front page.
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

## Testing

The generated pages can be checked for valid HTML:

```
npm run build
npm test
```

Each pull request runs this check, along with a check of the links between pages of the site.  Links to other sites are checked for each pull request as well, and can be checked at any time by running the `main` workflow manually from the Actions tab.

## Deployment

Each push to the `main` branch builds the site and API documentation and deploys them to GitHub Pages.

## Updating

For a new MaterialX release:

- Update the version in `src/_data/materialx.json`, which sets the release shown on the front page and the release used to generate the API documentation.
- Add an entry to the top of `src/_data/announcements.yaml`, with the date, version, and a summary of the release.

For a new event, add an entry to the top of `src/_data/events.yaml`, placing any slides in the `assets` folder.
