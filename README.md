# Support transclusion of files within Markdown Preview

[![Version](https://vsmarketplacebadge.apphb.com/version/stamminger.vscode-markdown-preview-include.svg)](https://marketplace.visualstudio.com/items?itemName=stamminger.vscode-markdown-preview-include)
[![Installs](https://vsmarketplacebadge.apphb.com/installs/stamminger.vscode-markdown-preview-include.svg)](https://marketplace.visualstudio.com/items?itemName=stamminger.vscode-markdown-preview-include)
[![Downloads](https://vsmarketplacebadge.apphb.com/downloads/stamminger.vscode-markdown-preview-include.svg)](https://marketplace.visualstudio.com/items?itemName=stamminger.vscode-markdown-preview-include)
[![Rating](https://vsmarketplacebadge.apphb.com/rating-short/stamminger.vscode-markdown-preview-include.svg)](https://marketplace.visualstudio.com/items?itemName=stamminger.vscode-markdown-preview-include)

Visual Studio Code Extension for the built-in Markdown Preview to support transculsion of further files.

---

The following 2 syntaxes are supported and can be used at anytime

> **`:(file.md)`**

> **`!!!include(file.md)!!!`**

* Output when referenced file is not found: *`File 'pathToFile/file.md' not found`*
* Output for circular reference: *`Circular reference between 'pathToFile/file.md' and 'pathToParentFile/partent.md'`*

---

**Content**

- [**Examples**](#examples)
  - [Example for syntax based on proposal for CommonMark.org](#example-for-syntax-based-on-proposal-for-commonmarkorg)
  - [Example for syntax from Markdown-It-Include plugin](#example-for-syntax-from-markdown-it-include-plugin)
- [**Options**](#options)
  - [Provide alternative text when file cannot be found](#provide-alternative-text-when-file-cannot-be-found)
  - [Provide alternative text for circular reference](#provide-alternative-text-for-circular-reference)
  - [Omit output if file cannot be found or if there is a circular reference](#omit-output-if-file-cannot-be-found-or-if-there-is-a-circular-reference)
- [**Use Cases**](#use-cases)
  - [Include copyright on multiple markdown files](#include-copyright-on-multiple-markdown-files)
  - [Include file containing important links and reference them](#include-file-containing-important-links-and-reference-them)
  - [Multiple editors working on a large document](#multiple-editors-working-on-a-large-document)
- [**Credits**](#credits)

---

## **Examples**

### Example for syntax based on proposal for CommonMark.org

![`:(file.md)`](examples/syntaxCommonMarkProposal.png)

### Example for syntax from Markdown-It-Include plugin

![`:(file.md)`](examples/syntaxMarkdownItImplementation.png)

---

## **Options**

### Provide alternative text when file cannot be found

> **`:[Alternative Text](file.md)`**

* To include file name in output use: *`{{FILE}}`*\
  E.g. **`:[Alternative Text for {{FILE}}](file.md)`**

![`:(file.md)`](examples/syntaxNotFound.png)


### Provide alternative text for circular reference

> **`:[|Alternative Text](file.md)`**

* To include file name in parent: *`{{PARENT}}`*\
  E.g. **`:[|Alternative Circular Text with {{PARENT}}](file.md)`**

* To include file name in child use: *`{{FILE}}`*\
  E.g. **`:[|Alternative Circular Text with {{FILE}}](file.md)`**

![`:(file.md)`](examples/syntaxCircularAlternative.png)

### Omit output if file cannot be found or if there is a circular reference

> **`:[](file.md)`**

![`:(file.md)`](examples/syntaxOmitOutput.png)

---

## **Use Cases**

### Include copyright on multiple markdown files

Content of file `copyright.md` with copyright notice in includes folder

```markdown
Copyright &copy; 2019 Company Name - All rights reserved
```

Files referencing `copyright.md` in includes folder

```markdown
Text with information

:[Copyright Notice][includes/copyright.md]
```

This will produce the following output

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

This will produce the following output

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

This will produce the following output

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
