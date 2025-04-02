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
    if (/^```/.test(line.trim())) {
      insideCodeBlock = !insideCodeBlock;
      return;
    }
    if (insideCodeBlock) return;

    const trimmedLine = line.trim();
    const headingMatch = /^#+\s+/.exec(trimmedLine);

    if (headingMatch) {
      const level = headingMatch[0].length - 1;
      const title = trimmedLine.slice(headingMatch[0].length).trim();
      const slug = uslug(title);
      headings.push({ level, title, slug });
    }
  });

  return headings;
}

export function TableOfContent({ markdownText }: { markdownText: string }) {
  const headings = React.useMemo(() => extractHeadings(markdownText), [markdownText]);
  return (
    <ul>
      {headings.map((heading) => (
        <li
          key={heading.slug} // Use slug instead of index for stable keys
          style={{ marginLeft: `${(heading.level - 1) * 20}px` }} // Fixed syntax
        >
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
