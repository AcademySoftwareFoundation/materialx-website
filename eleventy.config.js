import { createHash } from "node:crypto";
import fs from "node:fs";

import yaml from "js-yaml";

const dateFormat = new Intl.DateTimeFormat("en-US", { dateStyle: "long", timeZone: "UTC" });

export default function (eleventyConfig) {
  // Static files, copied to the output folder without processing.
  for (const path of ["assets", "images", "LogoImages", "style", "faviconMX.ico", "CNAME"]) {
    eleventyConfig.addPassthroughCopy(path);
  }

  // Site data in YAML format.
  eleventyConfig.addDataExtension("yaml", (contents) => yaml.load(contents));

  // Format a date for display, as in "May 22, 2026".
  eleventyConfig.addFilter("displayDate", (date) => dateFormat.format(date));

  // Add a stamp of the contents of a static file to its link, as in
  // "style/default.css?v=1a2b3c4d", so that browsers fetch each new version
  // of the file rather than reusing the one in their cache.
  eleventyConfig.addFilter("versioned", (path) => {
    const hash = createHash("sha256").update(fs.readFileSync(path)).digest("hex");
    return `${path}?v=${hash.slice(0, 8)}`;
  });
}

export const config = {
  dir: {
    input: "src",
    output: "_site",
  },
  htmlTemplateEngine: "njk",
};
