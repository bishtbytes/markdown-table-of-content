import React from "react";
import uslug from "uslug";

export interface Heading {
  level: number;
  title: string;
  slug: string;
}

export function extractHeadings(markdown: string): Heading[] {
  const lines = markdown.split("\n");
  const headings: Heading[] = [];
  let insideCodeBlock = false;

  lines.forEach((line) => {
    // Check for the beginning or end of a code block
    if (/^```/.test(line.trim())) {
      insideCodeBlock = !insideCodeBlock;
      return; // Skip this line
    }

    // If inside a code block, skip heading extraction
    if (insideCodeBlock) {
      return;
    }

    // Trim the line and check for headings
    const trimmedLine = line.trim();
    const headingMatch = /^#+\s+/.exec(trimmedLine);

    if (headingMatch) {
      const level = headingMatch[0].length - 1; // Number of '#' characters indicates the heading level
      const title = trimmedLine.slice(headingMatch[0].length).trim(); // The text of the heading
      const slug = uslug(title); // Generate a slug

      headings.push({ level, title, slug });
    }
  });

  return headings;
}

export function TableOfContent({ markdownText }: { markdownText: string }) {
  const headings = extractHeadings(markdownText);
  return (
    <ul>
      {headings.map((heading, index) => (
        <li key={index} style={{ marginLeft: `${(heading.level - 1) * 20}px` }}>
          <a href={`#${heading.slug}`}>{heading.title}</a>
        </li>
      ))}
    </ul>
  );
}

export function getTocMarkdownText(markdown: string) {
  const headings = extractHeadings(markdown);
  let toc = "";
  headings.forEach((heading) => {
    // Indent based on heading level
    const indent = "  ".repeat(heading.level - 1);
    toc += `${indent}- [${heading.title}](#${heading.slug})\n`;
  });
  return toc;
}
