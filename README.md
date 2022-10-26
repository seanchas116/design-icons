# design-icons

Icon set for design tools

## Installation

```bash
npm install @seanchas116/design-icons
```

## Directories

- `/svg`: Icon SVG files
- `/json`: JSON files compatible with [Iconify offline](https://docs.iconify.design/icon-components/react/offline.html)
  - Format:
    ```json
    {
      "body": "<svg><path fill==\"currentColor\" ... >...</svg>",
      "width": 24,
      "height": 24
    }
    ```

## Usage

### Iconify

```js
import image from "@seanchas116/design-icons/json/image.json";
import { Icon } from "@iconify/react/dist/offline";

const App = () => (
  <>
    <Icon icon={image} />
    <Icon icon={image} vFlip rotate={2} />
  </>
);
```

```

```
