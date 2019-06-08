# Markdown Preview Include Files Extension - Test File

## General positive tests

### Include 2x `testLinks.md`

> No Output

!!!include(testLinks.md)!!!

> No Output

:(testLinks.md)

### Include 2x `testInclude.md`

> Test include of  `testInclude.md`

:[Test Include](testInclude.md)

> Test include of  `testInclude.md`

!!!include(testInclude.md)!!!

### Include 2x `subfolder/testSubfolder.md`

> Test include of  `testSubfolder.md`

:[Test Include](subfolder/testSubfolder.md)

> Test include of  `testSubfolder.md`

!!!include(subfolder/testSubfolder.md)!!!

### Include 2x `testCode.ts`

> ```TypeScript
> function testCode() {
>     console.log('test')
> }
> ```

```TypeScript
:[Test Code](testCode.ts)
```

> ```TypeScript
> function testCode() {
>     console.log('test')
> }
> ```

```TypeScript
!!!include(testCode.ts)!!!
```

## General negative tests

### File not found

> Alternative Text

:[Alternative Text](testFileNotFound.md)

> Alternative Text with reference to 'testFileNotFound.md'

:[Alternative Text with reference to '{{FILE}}'](testFileNotFound.md)

> File 'testFileNotFound.md' not found

:(testFileNotFound.md)

> File 'testFileNotFound.md' not found

!!!include(testFileNotFound.md)!!!

>&nbsp;

:[](testFileNotFound.md)

### Circular Reference

:(indexCircular.md)

## Test Links

Link to [Github][GITHUB]
