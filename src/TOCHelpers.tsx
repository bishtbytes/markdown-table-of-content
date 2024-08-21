import React from "react";

interface Heading {
  level: number;
  title: string;
  slug: string;
}

export function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.*)$/gm;
  const headings: Heading[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length; // Number of '#' characters indicates the heading level
    const title = match[2].trim(); // The text of the heading
    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\-]+/g, ""); // Generate a slug
    headings.push({ level, title, slug });
  }

  return headings;
}

export function buildTOC(
  headings: Heading[],
  outputFormat: "markdown" | "react-dom" = "markdown"
): string | JSX.Element {
  if (outputFormat === "markdown") {
    let toc = "";

    headings.forEach((heading) => {
      const indent = "  ".repeat(heading.level - 1); // Indent based on heading level
      toc += `${indent}- [${heading.title}](#${heading.slug})\n`;
    });

    return toc;
  } else if (outputFormat === "react-dom") {
    return (
      <ul>
        {headings.map((heading, index) => (
          <li
            key={index}
            style={{ marginLeft: `${(heading.level - 1) * 20}px` }}
          >
            <a href={`#${heading.slug}`}>{heading.title}</a>
          </li>
        ))}
      </ul>
    );
  } else {
    throw new Error(
      "Unsupported output format. Use 'markdown' or 'react-dom'."
    );
  }
}
