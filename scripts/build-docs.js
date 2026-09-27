// Generate the MaterialX API documentation with Doxygen, and copy it into
// the output folder of the site.
//
// The MaterialX version is read from src/_data/materialx.json, and the
// corresponding release tag is fetched from the MaterialX repository.
// Requires git, CMake, a C++ compiler, and Doxygen.

import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const MATERIALX_REPOSITORY = "https://github.com/AcademySoftwareFoundation/MaterialX.git";

const root = path.resolve(import.meta.dirname, "..");
const { version } = JSON.parse(fs.readFileSync(path.join(root, "src/_data/materialx.json"), "utf8"));

const sourceDir = path.join(root, ".cache", `MaterialX-v${version}`);
const buildDir = path.join(sourceDir, "build");
const outputDir = path.join(root, "_site", "docs", "api");

function run(command, args) {
  console.log(`> ${command} ${args.join(" ")}`);
  execFileSync(command, args, { stdio: "inherit" });
}

if (!fs.existsSync(path.join(sourceDir, "CMakeLists.txt"))) {
  fs.rmSync(sourceDir, { recursive: true, force: true });
  run("git", ["clone", "--depth", "1", "--branch", `v${version}`, MATERIALX_REPOSITORY, sourceDir]);
}

run("cmake", ["-S", sourceDir, "-B", buildDir, "-DMATERIALX_BUILD_DOCS=ON", "-DMATERIALX_BUILD_RENDER=OFF"]);

// Generate the same file names on all platforms, so that links to the
// API documentation remain stable.
const doxyfile = path.join(buildDir, "documents", "Doxyfile");
const caseSetting = "CASE_SENSE_NAMES = NO";
if (!fs.readFileSync(doxyfile, "utf8").includes(caseSetting)) {
  fs.appendFileSync(doxyfile, `\n${caseSetting}\n`);
}

run("cmake", ["--build", buildDir, "--target", "MaterialXDocs"]);

fs.rmSync(outputDir, { recursive: true, force: true });
fs.cpSync(path.join(buildDir, "documents", "html"), outputDir, { recursive: true });
console.log(`Wrote MaterialX v${version} API documentation to ${path.relative(root, outputDir)}`);
