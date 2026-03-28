# react-auto-skeletonizer

Automatically transforms your existing React UI tree into shimmering skeleton placeholders while preserving layout.

Wrap any section of your UI with `Skeletonizer`, pass `loading={true}`, and the component recursively applies skeleton styles to text and common elements like images, icons, and empty layout blocks.

## Features

- **Zero setup:** wrap existing JSX, no manual duplicate skeleton markup.
- **Custom Component Support:** Automatically wraps and skeletonizes custom React components while preserving hooks and internal state.
- **Recursive processing:** handles nested children automatically.
- **Layout-preserving:** keeps your original element structure to reduce visual jumps.
- **Themeable:** customize colors, hide borders, or clear background colors per instance.

## Installation

```bash
npm install @nivedganga/react-auto-skeletonizer
```

## Usage

### Simple Usage
```jsx
import React, { useEffect, useState } from "react";
import { Skeletonizer } from "@nivedganga/react-auto-skeletonizer";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <Skeletonizer loading={loading}>
      <div className="card">
        <img src="avatar.jpg" alt="Avatar" />
        <div className="card-content">
          <h2>John Doe</h2>
          <p>Software Engineer</p>
        </div>
      </div>
    </Skeletonizer>
  );
}
```

### Advanced Usage (Custom Components & Styling)
```jsx
import { Skeletonizer } from "@nivedganga/react-auto-skeletonizer";
import { ProductCard } from "./components/ProductCard";

// Skeletonizer will automatically reach inside ProductCard and 
// skeletonize its rendered output while keeping its internal hooks working.
<Skeletonizer 
  loading={true} 
  hideBorders={true} 
  hideBgColour={true}
  bgColor="white"
>
  <ProductCard title="Premium Headphones" price={199} />
</Skeletonizer>
```

## API

### Skeletonizer props

| Prop             | Type              | Default          | Description                                                            |
| ---------------- | ----------------- | ---------------- | ---------------------------------------------------------------------- |
| `loading`        | `boolean`         | required         | Enables skeleton transformation when `true`.                           |
| `children`       | `React.ReactNode` | required         | The UI subtree to skeletonize.                                         |
| `className`      | `string`          | `''`             | Optional class applied to a wrapping root when provided.               |
| `baseColor`      | `string`          | internal default | Skeleton base color via CSS variable `--skeleton-base-color`.          |
| `highlightColor` | `string`          | internal default | Shimmer highlight color via CSS variable `--skeleton-highlight-color`. |
| `bgColor`        | `string`          | `undefined`      | Custom background color for the root container while loading.          |
| `hideBorders`    | `boolean`         | `false`          | If `true`, hides all borders/outlines on children while loading.        |
| `hideBgColour`   | `boolean`         | `false`          | If `true`, hides all background colors on children while loading.      |

## Technical Notes

- **Custom Components:** `Skeletonizer` uses a specialized `SkeletonWrapper` to call functional components within a real React render context. This ensures that `useState`, `useEffect`, and `useContext` inside your custom components continue to work correctly during the loading phase.
- **Image Shapes:** By default, images and blocks have a slight `6px` border-radius. This can be overridden by your component's own CSS (as we've removed `!important` from the default radius).
- **CSS Injection:** Styles are bundled and injected automatically when the library is loaded.
- **Borders & Backgrounds:** The `hideBorders` and `hideBgColour` props use CSS descendant selectors to cleanly strip styling from complex subtrees for a more modern "ghost" look.

## License

MIT
