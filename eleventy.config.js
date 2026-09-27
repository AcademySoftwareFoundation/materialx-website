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
}

export const config = {
  dir: {
    input: "src",
    output: "_site",
  },
  htmlTemplateEngine: "njk",
};
