import path from "path";
import fs from "fs";
import util from "util";
import _glob from "glob";
import { ElementNode, parse } from "svg-parser";

const glob = util.promisify(_glob);

async function generateIcons(): Promise<void> {
  const cwd = path.resolve(__dirname, "../svg");

  const files = await glob("**/*.svg", { cwd });
  for (const file of files) {
    const filePath = path.resolve(cwd, file);
    const baseName = path.basename(file, ".svg");
    const svgText = fs.readFileSync(filePath, { encoding: "utf-8" });
    const rootNode = parse(svgText);
    const svgNode = rootNode.children[0] as ElementNode;

    const width = Number(svgNode.properties!.width);
    const height = Number(svgNode.properties!.height);
    const body =
      '<g fill="none">' +
      svgText
        .replace(/<svg[^>]*>/, "")
        .replace("</svg>", "")
        .replaceAll(/#(?:[0-9a-fA-F]{3}){1,2}/g, "currentColor") +
      "</g>";

    fs.writeFileSync(
      path.resolve(__dirname, "../json", `${baseName}.json`),
      JSON.stringify({ body, width, height }, null, 2)
    );
  }
}

async function run() {
  await generateIcons();
}

run().finally(() => {});
