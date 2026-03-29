import React, { useLayoutEffect, useRef, useState } from "react";
import { Tooltip, Typography } from "@mui/material";

interface ClampListProps {
  items: string[];
  maxLines?: number;
  separator?: string;
  id?: string;
}

export function ClampList({
  id,
  items,
  maxLines = 2,
  separator = ", ",
}: ClampListProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleText, setVisibleText] = useState(items.join(separator));
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const allText = items.join(separator);
    el.innerText = allText;

    const visibleItems = [...items];
    let hidden = 0;

    while (el.scrollHeight > el.clientHeight && visibleItems.length > 1) {
      visibleItems.pop();
      hidden = items.length - visibleItems.length;
      const displayText =
        visibleItems.join(separator) + (hidden > 0 ? `… +${hidden}` : "");
      el.innerText = displayText;
    }

    setVisibleText(el.innerText);
    setIsTruncated(hidden > 0);
  }, [items, maxLines, separator]);

  const tooltipContent = items.join(separator);

  return (
    <Tooltip title={tooltipContent} disableHoverListener={!isTruncated}>
      <Typography
        id={id}
        ref={ref}
        variant="body2"
        sx={{
          mt: "4px",
          display: "-webkit-box",
          WebkitLineClamp: maxLines,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          cursor: isTruncated ? "pointer" : "default",
        }}
      >
        {visibleText}
      </Typography>
    </Tooltip>
  );
}
