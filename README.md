# react-auto-skeletonizer

Automatically converts any React UI tree into a beautiful, shimmering skeleton loader.

Instead of manually creating skeleton loading components for each of your components, `react-auto-skeletonizer` figures out the geometry of your existing layout and applies a shimmering skeleton mask over your UI elements.

## Features
- **Zero Configuration**: Works by wrapping any part of your React tree.
- **Auto-Discovery**: Automatically masks text, buttons, inputs, images, and tables.
- **Customizable**: Allows defining inline or global exclusions, or customized styles.
- **Preserves Layout**: Keeps the original widths, heights, paddings, margins, flex layouts, etc., to avoid layout jumps when the skeleton finishes loading.

## Installation

```bash
npm install react-auto-skeletonizer
```

## Usage

Simply wrap your component in `<Skeletonizer>` and toggle the `enabled` prop to `true` while loading data.

```jsx
import React, { useState, useEffect } from 'react';
import { Skeletonizer } from 'react-auto-skeletonizer';

// Import the CSS (if not injected via your bundler plugin)
// Optional if your environment naturally handles it or the package injects it.
// import 'react-auto-skeletonizer/dist/style.css'; 

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <Skeletonizer enabled={loading}>
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

### `Skeletonizer` Component

| Prop | Type | Default | Description |
| ---- | ---- | ------- | ----------- |
| `enabled` | `boolean` | `false` | When `true`, all nested elements (text, images, inputs, etc.) will be masked by the skeleton animation. |
| `children` | `ReactNode` | | The React component subtree to be skeletonized. |

### Ignoring Elements

If you want the skeletonizer to ignore a specific element in the tree, you can add a `data-skeleton-ignore` attribute:

```jsx
<span data-skeleton-ignore>This text will remain visible during loading</span>
```

For styling ignore logic manually, the library skips applying skeleton classes based on internal markers that are configurable (depending on exact package API).

## How it works
The library traverses the inner DOM node elements via a generic class applier. The core library attaches CSS variables representing height/width measurements and covers the element contents with a fluid CSS background animation, maintaining the original element padding and margins to ensure true-to-size placeholders.
