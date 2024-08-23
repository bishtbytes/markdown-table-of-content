import { render } from "@testing-library/react";
import React from "react";
import { extractHeadings, getTocMarkdownText, TableOfContent } from "../src/TableOfContent";

describe("extractHeadings", () => {
  test("should extract headings with correct levels and slugs", () => {
    const markdown = `
      # Heading 1
      ## Heading 2
      ### Heading 3
      #### Heading 4
    `.trim();

    const expectedHeadings = [
      { level: 1, title: "Heading 1", slug: "heading-1" },
      { level: 2, title: "Heading 2", slug: "heading-2" },
      { level: 3, title: "Heading 3", slug: "heading-3" },
      { level: 4, title: "Heading 4", slug: "heading-4" },
    ];

    const headings = extractHeadings(markdown);
    expect(headings).toEqual(expectedHeadings);
  });

  test("should handle special characters in headings", () => {
    const markdown = `
      # Heading with special characters! @#$%
    `;

    const expectedHeadings = [
      { level: 1, title: "Heading with special characters! @#$%", slug: "heading-with-special-characters!-@#$%" },
    ];

    const headings = extractHeadings(markdown);
    expect(headings).toEqual(expectedHeadings);
  });

  test("should return an empty array if no headings are found", () => {
    const markdown = `
      This is just a paragraph.
      Another paragraph.
    `;

    const headings = extractHeadings(markdown);
    expect(headings).toEqual([]);
  });
});

describe("TableOfContent", () => {
  test("should render list items with correct indentation and links", () => {
    const markdown = `
      # Heading 1
      ## Heading 2
    `;

    const { container } = render(<TableOfContent markdownText={markdown} />);
    const listItems = container.querySelectorAll("li");

    expect(listItems.length).toBe(2);
    expect(listItems[0].style.marginLeft).toBe("0px");
    expect(listItems[0].querySelector("a")?.getAttribute("href")).toBe("#heading-1");
    expect(listItems[0].textContent).toBe("Heading 1");

    expect(listItems[1].style.marginLeft).toBe("20px");
    expect(listItems[1].querySelector("a")?.getAttribute("href")).toBe("#heading-2");
    expect(listItems[1].textContent).toBe("Heading 2");
  });

  test("should handle empty markdown text", () => {
    const { container } = render(<TableOfContent markdownText="" />);
    const listItems = container.querySelectorAll("li");

    expect(listItems.length).toBe(0);
  });
});

describe("getTocMarkdownText", () => {
  test("should generate a table of contents in markdown format", () => {
    const markdown = `
      # Heading 1
      ## Heading 2
      ### Heading 3
    `;

    const expectedToc = `- [Heading 1](#heading-1)
  - [Heading 2](#heading-2)
    - [Heading 3](#heading-3)
`;

    const tocMarkdown = getTocMarkdownText(markdown);
    expect(tocMarkdown).toBe(expectedToc);
  });

  test("should return an empty string if no headings are found", () => {
    const markdown = `
      This is just a paragraph.
      Another paragraph.
    `;

    const tocMarkdown = getTocMarkdownText(markdown);
    expect(tocMarkdown).toBe("");
  });
});
