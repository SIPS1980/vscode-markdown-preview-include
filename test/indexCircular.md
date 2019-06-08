# Additional Circular Tests

> Alternative Circluar

:[|Alternative Text|Alternative Circluar](indexCircular.md)

> Alternative Circluar Text with reference to 'indexCircular.md'

:[|Alternative Circluar Text with reference to '{{FILE}}'](indexCircular.md)

> Circular reference between 'indexCircular.md' and 'indexCircular.md'

:(indexCircular.md)

> Circular reference between 'indexCircular.md' and 'indexCircular.md'

!!!include(indexCircular.md)!!!

> *No Output*

:[](indexCircular.md)

> Test include of testCircular.md\
> Circular reference between 'indexCircular.md' and 'subfolder\testCircular.md'

:(subfolder/testCircular.md)
