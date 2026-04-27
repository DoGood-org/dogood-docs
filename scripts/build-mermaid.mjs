import { readdir, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const inputDir = "docs/diagrams";
const outputDir = "docs/public/diagrams";

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("error", reject);

    child.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Command failed with exit code ${code}`));
      }
    });
  });
}

async function main() {
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  const files = await readdir(inputDir);
  const mmdFiles = files.filter((file) => path.extname(file) === ".mmd");

  if (mmdFiles.length === 0) {
    console.log("No .mmd files found.");
    return;
  }

  const mmdcPath =
    process.platform === "win32"
      ? path.resolve("node_modules/.bin/mmdc.cmd")
      : path.resolve("node_modules/.bin/mmdc");

  for (const file of mmdFiles) {
    const inputPath = path.resolve(inputDir, file);
    const outputPath = path.resolve(
      outputDir,
      `${path.basename(file, ".mmd")}.svg`
    );

    console.log(`Generating ${outputPath}...`);

    await runCommand(mmdcPath, ["-i", inputPath, "-o", outputPath]);
  }

  console.log("All diagrams generated.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
