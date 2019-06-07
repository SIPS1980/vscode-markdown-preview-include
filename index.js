'use strict'

var vscode = require('vscode')

function activate(context) {
    return {
        extendMarkdownIt(md) {
            var file = vscode.window.activeTextEditor.document.fileName;
            var folder = undefined;
            
            if (file.indexOf("/") == -1) {
                folder = file.substring(0, file.lastIndexOf('\\') + 1);
            } else {
                folder = file.substring(0, file.lastIndexOf('/') + 1);
            }

            return md.use(require('markdown-it-include'), folder);
        }
    };
}

exports.activate = activate;
