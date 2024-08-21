import React from "react";
import { buildTOC, extractHeadings } from "./TOCHelpers";

interface TOCComponentProps {
  markdownText: string;
  outputFormat?: "markdown" | "react-dom";
}

export function TOCComponent({
  markdownText,
  outputFormat = "markdown",
}: TOCComponentProps) {
  const headings = extractHeadings(markdownText);
  const toc = buildTOC(headings, outputFormat);

  return (
    <div>
      <h2>Table of Contents</h2>
      {outputFormat === "markdown" ? <pre>{toc}</pre> : toc}
    </div>
  );
}
