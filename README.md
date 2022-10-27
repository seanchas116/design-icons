# design-icons

<p align="center"><img src="thumbnails.svg"></p>

design-icons is a small collection of icons for use in design tools.

The icons are originally used in [Macaron](https://macaron-elements.com/), a design tool for creating web pages.

Each icon is 24x24px sized and has 2px stroke. You can combine this icon set with other popular ones with the same proportion like Material Symbols with 400 weight.

It includes SVG files and JSON files compatible with [Iconify](https://iconify.design/).

## Installation

```bash
npm install @seanchas116/design-icons
```

## Directories

- `/svg`: Icon SVG files
- `/json`: JSON files [compatible with Iconify](https://docs.iconify.design/types/iconify-icon.html)
  - Format:
    ```json
    {
      "body": "<svg><path fill==\"currentColor\" ... >...</svg>",
      "width": 24,
      "height": 24
    }
    ```

## Usage

### [Iconify React](https://docs.iconify.design/icon-components/react/)

```js
import image from "@seanchas116/design-icons/json/image.json";
import { Icon } from "@iconify/react";

const App = () => (
  <>
    <Icon icon={image} />
    <Icon icon={image} vFlip rotate={2} />
  </>
);
```
