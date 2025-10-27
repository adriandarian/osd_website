---
title: 'Writing Documentation'
description: 'Guide to writing and formatting documentation for OpenSeadragon'
category: 'Contributing'
icon: 'heroicons:document-text'
order: 1
---

# Writing Documentation

This guide explains how to write and format documentation for OpenSeadragon using all available components and features.

## Basic Markdown

All documentation is written in Markdown with support for:

- **Bold text** using `**text**`
- *Italic text* using `*text*`
- `Inline code` using backticks
- [Links](/) using `[text](url)`
- Lists (ordered and unordered)
- Headings (H1-H6)
- Tables
- Blockquotes

## Frontmatter

Every documentation page should include frontmatter at the top:

```yaml
---
title: 'Your Page Title'
description: 'Brief description for SEO'
category: 'Getting Started'  # Groups pages in navigation
icon: 'heroicons:sparkles'   # Icon for sidebar
order: 1                      # Sort order within category
badge: 'new'                  # Optional: new, beta, or updated
---
```

## Using Alerts

Alerts highlight important information:

```markdown
::alert{type="info" title="Optional Title"}
Your content here
::
```

**Types:** `info`, `tip`, `warning`, `danger`, `note`

::alert{type="tip" title="When to Use Alerts"}
- **info**: General information or context
- **tip**: Best practices and helpful suggestions  
- **warning**: Cautions about potential issues
- **danger**: Critical warnings or breaking changes
- **note**: Additional context without specific urgency
::

## Using Badges

Inline badges for status or version info:

```markdown
::badge[Text]{type="success"}::
```

**Types:** `success`, `info`, `warning`, `danger`, `neutral`

Examples:
- ::badge[New]{type="success"}::
- ::badge[Beta]{type="warning"}::
- ::badge[Deprecated]{type="danger"}::

## Using Tabs

Organize related content with tabs:

```markdown
::tabs
  ::tab{label="JavaScript"}
  JavaScript content here
  ::

  ::tab{label="TypeScript"}
  TypeScript content here
  ::
::
```

Perfect for showing the same example in different languages or contexts.

## Code Blocks

Code blocks automatically include:
- Syntax highlighting
- Language label
- Copy button (on hover)
- Line number support

````markdown
```javascript
const viewer = OpenSeadragon({ /* config */ })
```
````

**Supported languages:** JavaScript, TypeScript, HTML, CSS, JSON, YAML, Bash, and more.

## Mermaid Diagrams

Create diagrams directly in markdown:

````markdown
::mermaid
```
graph TD
    A[Start] --> B[Process]
    B --> C[End]
```
::
````

**Supported diagrams:**
- Flowcharts
- Sequence diagrams
- Class diagrams
- State diagrams
- ER diagrams
- And more!

## Tables

Create tables using standard Markdown syntax:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

You can use inline components like badges within tables.

## Links and References

### Internal Links

Link to other documentation pages:

```markdown
[Getting Started](/docs/getting-started)
[Installation Guide](/docs/installation)
```

### External Links

External links open in a new tab automatically:

```markdown
[OpenSeadragon GitHub](https://github.com/openseadragon/openseadragon)
```

### Anchor Links

Link to headings within the same page:

```markdown
[Jump to section](#section-heading)
```

## Images

Include images in documentation:

```markdown
![Alt text](/path/to/image.jpg)
```

Images are automatically optimized and responsive.

## Best Practices

::alert{type="tip" title="Documentation Tips"}
1. **Be Clear**: Write for developers of all skill levels
2. **Use Examples**: Show code examples for every concept
3. **Be Consistent**: Follow the same patterns throughout
4. **Add Visuals**: Use diagrams to explain complex concepts
5. **Test Code**: Ensure all code examples actually work
6. **Update Regularly**: Keep documentation in sync with code
::

## SEO Optimization

Documentation pages are automatically optimized for SEO with:

- Meta titles and descriptions
- Open Graph tags for social sharing
- Twitter cards
- Canonical URLs
- Structured data (JSON-LD)

Enhance SEO by:
- Writing descriptive titles and descriptions in frontmatter
- Using keywords naturally in content
- Adding custom `keywords` field in frontmatter (optional)

## Example Template

Here's a complete template for a new documentation page:

```markdown
---
title: 'Page Title'
description: 'Clear description of what this page covers'
category: 'Category Name'
icon: 'heroicons:icon-name'
order: 1
---

# Page Title

Brief introduction to the topic.

## Overview

Main content starts here.

::alert{type="info"}
Important information to highlight
::

## Usage Example

\`\`\`javascript
// Your code example
const example = 'code'
\`\`\`

## Advanced Topics

::tabs
  ::tab{label="Basic"}
  Basic usage content
  ::

  ::tab{label="Advanced"}
  Advanced usage content
  ::
::

## See Also

- [Related Page 1](/docs/related-1)
- [Related Page 2](/docs/related-2)
```

---

::alert{type="success" title="Ready to Contribute!"}
You now have everything you need to write beautiful, feature-rich documentation for OpenSeadragon!
::
