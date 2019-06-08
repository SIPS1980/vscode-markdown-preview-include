import * as MarkdownIt from 'markdown-it'

export function activate(/*context: vscode.ExtensionContext*/) {
    return {
        extendMarkdownIt(md: MarkdownIt) {

            // Define settings for include plugin
            /* For future use
            const settings: IncludeSettings = {
            }
            */

            // Enable plugin within markdown-it parser
            return md.use(require('./include')/*, settings */)
        }
    }
}