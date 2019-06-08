# Support transclusion of files wihin Markdown Preview

[![Version](https://vsmarketplacebadge.apphb.com/version/stamminger.vscode-markdown-preview-include.svg)](https://marketplace.visualstudio.com/items?itemName=stamminger.vscode-markdown-preview-include)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/stamminger.vscode-markdown-preview-include.svg)](https://marketplace.visualstudio.com/items?itemName=stamminger.vscode-markdown-preview-include)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads/stamminger.vscode-markdown-preview-include.svg)](https://marketplace.visualstudio.com/items?itemName=stamminger.vscode-markdown-preview-include)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-short/stamminger.vscode-markdown-preview-include.svg)](https://marketplace.visualstudio.com/items?itemName=stamminger.vscode-markdown-preview-include)

Visual Studio Code Extension for the built-in Markdown Preview to support transculsion of further files.

---

The following 2 syntaxes are supported and can be used at anytime:

## Syntax based on [suggestion](https://talk.commonmark.org/t/transclusion-or-including-sub-documents-for-reuse/270/8) for [CommonMark.org](https://commonmark.org/)

```markdown
:[Alternative Text when file.md was not found](file.md)
```

* Output for circulare reference: `Circular reference between 'pathToFile/file.md' and 'pathToParentFile/partent.md'`

### Syntax to use default alternative text's when either the file is not found or if there is a circular reference

```markdown
:(file.md)
```

* Output when file is not found: `File 'pathToFile/file.md' not found`
* Output for circulare reference: `Circular reference between 'pathToFile/file.md' and 'pathToParentFile/partent.md'`

### Include file names in alternative text

Optionally using an `|` after the alterntive text for when the file is not found allows changing the alternative text for the circular reference

```markdown
:[Did not find '{{FILE}}'|'{{FILE}}'<>'{{PARENT}}'](file.md)
```

* Output, if the file is not found: `Did not find 'pathToFile/file.md'`
* Output, if there is a circulare reference: `'pathToFile/file.md'<>'pathToParentFile/partent.md'`

### Omit any output if the file is not found and / or if there is a circular reference

```markdown
:[](file.md)
:[|](file.md)
```

## Syntax from [Markdown-It-Include](https://github.com/camelaissani/markdown-it-include) project

```markdown
!!!include(file.md)!!!
```

---

## **Use Cases**

### Include copyright on multiple markdown files

Content of file `copyright.md` with copyright notice in includes folder

```markdown
Copyright &copy; 2019 Company Name - All rights reserved
```

Files referecing `copyright.md` in includes folder

```markdown
Text with information

:[Copyright Notice][includes/copyright.md]
```

This will produce the follwoing output

> Text with information
>
> Copyright &copy; 2019 Company Name - All rights reserved

### Include file containing important links and reference them

Content of file `links.md` with multiple links defined in includes folder

```markdown
[GITHUB]: https://github.com
[VSMARKETPLACE]: https://marketplace.visualstudio.com
```

Include `links.md` in the top of the file where links shall be referenced and use them in the content

```markdown
:[includes/links.md]

This is a link to [Github][GITHUB]
```

This will produce the follwoing output

> This is a link to <a href="https://github.com">Github</a>

### Multiple editors working on a large document

Splitting up the document, for example into chapters, provides the possibility for multiple editors working sections of the document. One master document can then include the individual sections for final render.

Example content of file `chapter1.md`

```markdown
## Chapter 1

Text for Chapter 1
```

Example content of file `chapter2.md`

```markdown
## Chapter 2

Text for Chapter 2 including a link to [Github][GITHUB]
```

Bringing it all together

```markdown
# Document Title
:[includes/links.md]

:[Chapter 1](chapter1.md)

:[Chapter 2](chapter2.md)

---

:[Copyright Notice][includes/copyright.md]
```

This will produce the follwoing output

> # Document Title
>
> ## Chapter 1
>
> Text for Chapter 1
>
> ## Chapter 2
>
> Text for Chapter 2 including a link to <a href="https://github.com">Github</a>
>
> ---
>
> Copyright &copy; 2019 Company Name - All rights reserved

---

## **Credits**

This Visual Studio Code Extension was inspired by

* [**Markdown-It-Include**](https://github.com/camelaissani/markdown-it-include) plugin for [Markdown-It](https://github.com/markdown-it/markdown-it)
* [**Transclusion conversation**](https://talk.commonmark.org/t/transclusion-or-including-sub-documents-for-reuse/270) in [CommonMark.org](https://commonmark.org/) forum
