import React, { useRef } from "react";
import "./Skeletonizer.css";

export interface SkeletonizerProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  baseColor?: string;
  highlightColor?: string;
  /** Make every border transparent while the skeleton is shown. */
  hideBorders?: boolean;
  /** Make every background colour transparent while the skeleton is shown. */
  hideBgColour?: boolean;
  /** Set a custom background color for the root container while loading. */
  bgColor?: string;
}

// Well-known React internal $$typeof symbols
const REACT_MEMO_TYPE = Symbol.for("react.memo");
const REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");

export const Skeletonizer = ({
  loading,
  children,
  className = "",
  baseColor,
  highlightColor,
  hideBorders = false,
  hideBgColour = false,
  bgColor,
}: SkeletonizerProps) => {
  // ── Hooks must come before any early return (Rules of Hooks) ──────────────

  /**
   * Per-Skeletonizer-instance cache: original fn → SkeletonWrapper component.
   * Stored in a ref so it survives re-renders and never causes an extra render.
   */
  const wrapperCacheRef = useRef(new Map<Function, React.ComponentType<any>>());

  /**
   * Mutable ref that always points to the *current* processChild closure.
   * SkeletonWrapper components capture this ref (not the closure value) so they
   * always call the up-to-date version — no stale-closure issues.
   */
  const processChildRef = useRef<
    (child: React.ReactNode) => React.ReactElement | null
  >(() => null);

  // ─────────────────────────────────────────────────────────────────────────

  if (!loading) {
    return className ? (
      <div className={className}>{children}</div>
    ) : (
      <>{children}</>
    );
  }

  /**
   * Returns a stable SkeletonWrapper for the given original function component.
   * The wrapper:
   *  1. Calls the original function inside a real React render context
   *     → all hooks (useState, useContext, …) attach to the wrapper's fiber
   *  2. Pipes whatever JSX it returned back through processChild
   */
  const getOrCreateWrapper = (
    originalFn: Function
  ): React.ComponentType<any> => {
    const cache = wrapperCacheRef.current;
    if (cache.has(originalFn)) {
      return cache.get(originalFn)!;
    }

    const SkeletonWrapper = (props: any): React.ReactElement | null => {
      // Hooks inside originalFn execute here, during SkeletonWrapper's render.
      try {
        const output = (originalFn as React.FC<any>)(props);
        if (output === null || output === undefined) return null;
        // Re-run skeletonization on whatever the component rendered.
        const result = processChildRef.current(output as React.ReactNode);
        return result ?? null;
      } catch {
        // Library components (e.g. MUI Tooltip, Typography) may throw when
        // called outside their expected context.  Fall back to processing
        // the children prop so we can still skeletonize their content.
        if (props?.children) {
          const processed = React.Children.map(
            props.children,
            (c: React.ReactNode) => processChildRef.current(c)
          );
          return <>{processed}</>;
        }
        return null;
      }
    };

    SkeletonWrapper.displayName = `Skeleton(${(originalFn as any).displayName || originalFn.name || "Component"
      })`;

    cache.set(originalFn, SkeletonWrapper);
    return SkeletonWrapper;
  };

  /**
   * Recursively transforms a React node tree into its skeleton equivalent.
   */
  const processChild = (child: React.ReactNode): React.ReactElement | null => {
    // ── Primitive nodes ────────────────────────────────────────────────────
    if (typeof child === "string" || typeof child === "number") {
      if (typeof child === "string" && !child.trim()) return null; // whitespace only
      return <span className="skeleton-text skeleton-shimmer">{child}</span>;
    }

    if (!React.isValidElement(child)) return null;

    const element = child as React.ReactElement<any>;

    // ── Custom function components ─────────────────────────────────────────
    if (typeof element.type === "function") {
      // Skip class components — they need `new` and lifecycle methods
      if (!(element.type as any).prototype?.isReactComponent) {
        const Wrapper = getOrCreateWrapper(element.type as Function);
        return React.createElement(Wrapper, {
          ...element.props,
          key: element.key ?? undefined,
        });
      }
    }

    // ── React.memo(Component) ──────────────────────────────────────────────
    if (element.type && (element.type as any).$$typeof === REACT_MEMO_TYPE) {
      const inner = (element.type as any).type;
      if (typeof inner === "function" && !inner.prototype?.isReactComponent) {
        const Wrapper = getOrCreateWrapper(inner as Function);
        return React.createElement(Wrapper, {
          ...element.props,
          key: element.key ?? undefined,
        });
      }
    }

    // ── React.forwardRef(fn) ───────────────────────────────────────────────
    if (
      element.type &&
      (element.type as any).$$typeof === REACT_FORWARD_REF_TYPE
    ) {
      const renderFn = (element.type as any).render;
      if (typeof renderFn === "function") {
        const Wrapper = getOrCreateWrapper(renderFn as Function);
        return React.createElement(Wrapper, {
          ...element.props,
          key: element.key ?? undefined,
        });
      }
    }

    // ── Native HTML elements ───────────────────────────────────────────────
    const isImage = element.type === "img" || element.type === "svg";
    const isIcon =
      element.type === "i" ||
      (typeof element.props.className === "string" &&
        element.props.className.includes("icon"));
    const isEmptyLayout =
      (element.type === "div" || element.type === "button") &&
      !element.props.children;

    if (isImage || isIcon) {
      return React.cloneElement(element, {
        ref: null,
        className:
          `${element.props.className || ""} skeleton-image skeleton-shimmer`.trim(),
        ...(element.type === "img"
          ? {
            src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E",
            alt: "skeleton",
          }
          : {}),
      });
    }

    if (isEmptyLayout) {
      return React.cloneElement(element, {
        ref: null,
        className:
          `${element.props.className || ""} skeleton-block skeleton-shimmer`.trim(),
      });
    }

    if (element.props && element.props.children) {
      const processedChildren = React.Children.map(
        element.props.children,
        processChild
      );
      return React.cloneElement(element, { 
        ref: null,
        children: processedChildren 
      });
    }

    // Fallback for unrecognised leaf nodes
    return React.cloneElement(element, {
      ref: null,
      className:
        `${element.props.className || ""} skeleton-block skeleton-shimmer`.trim(),
    });
  };

  // Keep the ref in sync with the closure defined this render
  processChildRef.current = processChild;

  const processedChildren = React.Children.map(children, processChild);

  const style: React.CSSProperties = {};
  if (baseColor) (style as any)["--skeleton-base-color"] = baseColor;
  if (highlightColor)
    (style as any)["--skeleton-highlight-color"] = highlightColor;
  if (bgColor) (style as any)["--skeletonizer-bg-color"] = bgColor;

  // Build the root class string
  const rootClass =
    [
      "skeletonizer-root",
      className,
      hideBorders ? "skeletonizer-hide-borders" : "",
      hideBgColour ? "skeletonizer-hide-bg" : "",
      bgColor ? "skeletonizer-bg-color" : "",
    ]
      .filter(Boolean)
      .join(" ")
      .trim() || undefined;

  return (
    <div className={rootClass} style={{ display: "contents", ...style }}>
      {processedChildren}
    </div>
  );
};
