# react-auto-skeletonizer

Automatically transforms your existing React UI tree into shimmering skeleton placeholders while preserving layout.

Wrap any section of your UI with `Skeletonizer`, pass `loading={true}`, and the component recursively applies skeleton styles to text and common elements like images, icons, and empty layout blocks.

## Features

- **Zero setup:** wrap existing JSX, no manual duplicate skeleton markup.
- **Recursive processing:** handles nested children automatically.
- **Layout-preserving:** keeps your original element structure to reduce visual jumps.
- **Themeable colors:** customize skeleton base and highlight colors per instance.

## Installation

```bash
npm install @nivedganga/react-auto-skeletonizer
```

## Usage

```jsx
import React, { useEffect, useState } from "react";
import { Skeletonizer } from "@nivedganga/react-auto-skeletonizer";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Skeletonizer
      loading={loading}
      baseColor="#e5e7eb"
      highlightColor="#f9fafb"
    >
      <div className="card">
        <img src="avatar.jpg" alt="Avatar" className="avatar" />
        <div className="card-content">
          <h2>John Doe</h2>
          <p>Software Engineer</p>
          <button>Follow</button>
        </div>
      </div>
    </Skeletonizer>
  );
}

export default App;
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

## Notes

- CSS is bundled with the library build and injected at runtime.
- When `loading` is `false`, children are rendered as-is.
- For image placeholders during loading, `img` sources are replaced with a transparent inline SVG.

## License

MIT
