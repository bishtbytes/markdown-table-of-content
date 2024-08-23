A React component for generating a Table of Contents (TOC) from a Markdown string, supporting both Markdown string and React DOM output.

## Installation

```bash
npm install markdown-table-of-content
```

### Sample Usage

```tsx
<TableOfContent markdownText={markdownText} />
```

OR

```tsx
<div className="content">{getTocMarkdownText(markdownText)}</div>
```

NOTE: This package also works for markdown containing nested markdown content.

## Example

Consider we have the following markdown

```tsx
import { TableOfContent, getTocMarkdownText } from "markdown-table-of-content";

const markdownText = `
# Title of the Document

## Introduction

Some introduction text.

### Subsection 1

Details about Subsection 1.

## Another Section

Additional content.

### Subsection 2

Details about Subsection 2.
`;

const TocWithinReactComponent: React.FC = () => {
  return (
    <div className="App">
      <h1>Table of Contents Example</h1>
      <TableOfContent markdownText={markdownText} />
    </div>
  );
};

const TocTextUsage: React.FC = ({ article }: { article: Article }) => {
  const articleMarkdown = article.content;
  const articleTableOfContent = getTocMarkdownText(markdownText);
  const content = articleTableOfContent + "\n\n" + articleMarkdown;
  return <Markdown className="markdown-preview">{content}</Markdown>;
};
```

### Output - Markdown Format

To get markdown string format as the output:

```tsx
<div className="content">{getTocMarkdownText(markdownText)}</div>
```

This will result in:

```markdown
- [Title of the Document](#title-of-the-document)
  - [Introduction](#introduction)
    - [Subsection 1](#subsection-1)
  - [Another Section](#another-section)
    - [Subsection 2](#subsection-2)
```

### Output - React DOM Format

To get React DOM elements as the output:

```tsx
<TableOfContent markdownText={markdownText} />
```

This will result in:

```jsx
<ul>
  <li>
    <a href="#title-of-the-document">Title of the Document</a>
  </li>
  <li style={{ marginLeft: "20px" }}>
    <a href="#introduction">Introduction</a>
  </li>
  <li style={{ marginLeft: "40px" }}>
    <a href="#subsection-1">Subsection 1</a>
  </li>
  <li style={{ marginLeft: "20px" }}>
    <a href="#another-section">Another Section</a>
  </li>
  <li style={{ marginLeft: "40px" }}>
    <a href="#subsection-2">Subsection 2</a>
  </li>
</ul>
```
