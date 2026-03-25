import React from 'react';
import './Skeletonizer.css';

export interface SkeletonizerProps {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  baseColor?: string;
  highlightColor?: string;
}

export const Skeletonizer = ({ 
  loading, 
  children, 
  className = '',
  baseColor,
  highlightColor
}: SkeletonizerProps) => {
  if (!loading) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  const processChild = (child: React.ReactNode): React.ReactNode => {
    if (typeof child === 'string' || typeof child === 'number') {
      if (typeof child === 'string' && !child.trim()) {
        return child;
      }
      return (
        <span className="skeleton-text skeleton-shimmer">{child}</span>
      );
    }

    if (!React.isValidElement(child)) {
      return child;
    }

    const element = child as React.ReactElement<any>;
    const isImage = element.type === 'img' || element.type === 'svg';
    const isIcon = element.type === 'i' || (typeof element.props.className === 'string' && element.props.className.includes('icon'));
    const isEmptyLayout = (element.type === 'div' || element.type === 'button') && !element.props.children;

    if (isImage || isIcon) {
      return React.cloneElement(element, {
        className: `${element.props.className || ''} skeleton-image skeleton-shimmer`.trim(),
        ...(element.type === 'img' ? { src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'/%3E", alt: "skeleton" } : {})
      });
    }

    if (isEmptyLayout) {
      return React.cloneElement(element, {
        className: `${element.props.className || ''} skeleton-block skeleton-shimmer`.trim()
      });
    }

    if (element.props && element.props.children) {
      const processedChildren = React.Children.map(element.props.children, processChild);
      return React.cloneElement(element, {
        children: processedChildren
      });
    }

    // Fallback for custom components or unspecified leaf nodes
    return React.cloneElement(element, {
      className: `${element.props.className || ''} skeleton-block skeleton-shimmer`.trim()
    });
  };

  const processedChildren = React.Children.map(children, processChild);

  const style: React.CSSProperties = {};
  if (baseColor) (style as any)['--skeleton-base-color'] = baseColor;
  if (highlightColor) (style as any)['--skeleton-highlight-color'] = highlightColor;

  if (className) {
    return <div className={`skeletonizer-root ${className}`.trim()} style={style}>{processedChildren}</div>;
  }
  
  return <div style={{ display: 'contents', ...style }}>{processedChildren}</div>;
};
