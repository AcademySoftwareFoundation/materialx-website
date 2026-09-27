export default function (eleventyConfig) {
  // Static files, copied to the output folder without processing.
  for (const path of ["assets", "images", "LogoImages", "style", "faviconMX.ico", "CNAME"]) {
    eleventyConfig.addPassthroughCopy(path);
  }
}

export const config = {
  dir: {
    input: "src",
    output: "_site",
  },
  htmlTemplateEngine: "njk",
};
