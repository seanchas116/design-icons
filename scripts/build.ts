import path from "path";
import fs from "fs";
import util from "util";
import _glob from "glob";
import { ElementNode, parse } from "svg-parser";

const glob = util.promisify(_glob);

interface IconJSON {
  body: string;
  width: number;
  height: number;
}

async function generateIcons(): Promise<void> {
  const cwd = path.resolve(__dirname, "../svg");

  const files = await glob("**/*.svg", { cwd });

  const icons: IconJSON[] = [];

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

    const icon = {
      body,
      width,
      height,
    };

    icons.push(icon);

    fs.writeFileSync(
      path.resolve(__dirname, "../json", `${baseName}.json`),
      JSON.stringify(icon, null, 2)
    );
  }

  fs.writeFileSync(
    path.resolve(__dirname, "../thumbnails.svg"),
    generateThumbnailsSVG(icons)
  );
}

function generateThumbnailsSVG(icons: IconJSON[]) {
  const colCount = 10;

  const xStride = 32;
  const yStride = 32;

  const rowCount = Math.ceil(icons.length / colCount);
  const canvasWidth = colCount * xStride;
  const canvasHeight = rowCount * yStride;

  let canvasSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${canvasWidth}" height="${canvasHeight}">`;

  for (let row = 0; row < rowCount; row++) {
    for (let col = 0; col < colCount; col++) {
      const index = row * colCount + col;

      if (index >= icons.length) {
        break;
      }

      const body = icons[index].body;

      const x = col * xStride;
      const y = row * yStride;

      canvasSVG += `<g transform="translate(${x}, ${y})">${body}</g>`;
    }
  }

  canvasSVG += "</svg>";

  return canvasSVG;
}

async function run() {
  await generateIcons();
}

run().finally(() => {});
