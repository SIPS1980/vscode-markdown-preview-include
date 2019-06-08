export default interface IncludeSettings {
    commonmarkRegex?: boolean
    markdownItRegex?: boolean
    customPattern?: RegExp
    notFoundMessage?: string
    circularMessage?: string
}
