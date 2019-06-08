import fs = require('fs')
import path = require('path')
import * as vscode from 'vscode'
import MarkdownIt = require('markdown-it')
import StateCore = require('markdown-it/lib/rules_core/state_core');
import IncludeSettings from './includeSettings'

// Default settings
const DEFAULT_COMMONMARK_REGEX: boolean = true
const DEFAULT_MARKDOWN_IT_REGEX: boolean = true
const DEFAULT_NOT_FOUND_MESSAGE: string = 'File \'{{FILE}}\' not found'
const DEFAULT_CIRCULAR_MESSAGE: string = 'Circular reference between \'{{FILE}}\' and \'{{PARENT}}\''

// Default regex patterns
const COMMONMARK_PATTERN: RegExp = /\:(?:\[([^|\]]*)\|?([^\]]*)\])?\(([^)]+)\)/i
const MARKDOWN_IT_PATTERN: RegExp = /\!{3}\s*include\s*\(\s*(.+?)\s*\)\s*\!{3}/i

/** Main entry point for markdown-it plugin */
export = function Include(markdown: MarkdownIt, settings: IncludeSettings) {

    // Ensure there is a settings object
    if (settings === undefined) {
        settings = { }
    }

    /** Replace include mark in parent content with assemblied child content */
    function replace(
        regexResult: RegExpExecArray,
        parentContent: string,
        parentFolder: string,
        parentFile: string,
        childName: string,
        notFoundMessage: string,
        circulareMessage: string,
        processedFiles: String[]): string {

        // Assembly path to child file
        const childFile: string = path.resolve(parentFolder, childName)

        // Assembly child content
        let childContent: string
        if (fs.existsSync(childFile) === false) {
            // Child file does not exist
            childContent = notFoundMessage.replace('{{FILE}}', childFile)
        } else if (processedFiles.indexOf(childFile) !== -1) {
            // Child file would be a circular reference
            childContent = circulareMessage.replace('{{FILE}}', childFile).replace('{{PARENT}}', parentFile as string)
        } else {
            // Get child file content and process it
            childContent = fs.readFileSync(childFile, 'utf8')
            childContent = execute(childContent, childFile, processedFiles);
        }

        // Execute replace
        return parentContent.slice(0, regexResult.index)
            + childContent
            + parentContent.slice(regexResult.index + regexResult[0].length, parentContent.length);
    }

    /** Execute including of child files (execute the transclusion) */
    function execute(parentContent: string, parentFile: string, processedFiles?: String[]): string {
        // Prepare checking for circulare references
        processedFiles = processedFiles === undefined ? [] : processedFiles.slice()
        if (parentFile !== undefined) {
            processedFiles.push(parentFile)
        }

        // Get folder of parent file as reference for child files
        const parentFolder: string = path.dirname(parentFile)

        // Replace include marks in parent file
        let regexResult

        // Check for COMMONMARK pattern `:[NotFoundMessage|CircularMessage](file.md)`
        if (settings.commonmarkRegex === undefined ? DEFAULT_COMMONMARK_REGEX : settings.commonmarkRegex) {
            while ((regexResult = COMMONMARK_PATTERN.exec(parentContent))) {
                parentContent = replace(
                    regexResult,
                    parentContent,
                    parentFolder,
                    parentFile,
                    regexResult[3].trim(),
                    settings.notFoundMessage === undefined
                        ? regexResult[1] === undefined
                            ? DEFAULT_NOT_FOUND_MESSAGE
                            : regexResult[1]
                        : settings.notFoundMessage,
                    settings.circularMessage === undefined
                        ? regexResult[2] === undefined
                            ? DEFAULT_CIRCULAR_MESSAGE
                            : regexResult[2]
                        : settings.circularMessage,
                    processedFiles
                )
            }
        }

        // Check for MARKDOWN-IT-INCLUDE pattern `!!!include(file.md)!!!`
        if (settings.markdownItRegex === undefined ? DEFAULT_MARKDOWN_IT_REGEX : settings.markdownItRegex) {
            while ((regexResult = MARKDOWN_IT_PATTERN.exec(parentContent))) {
                parentContent = replace(
                    regexResult,
                    parentContent,
                    parentFolder,
                    parentFile,
                    regexResult[1].trim(),
                    (settings.notFoundMessage === undefined ? DEFAULT_NOT_FOUND_MESSAGE : settings.notFoundMessage),
                    (settings.circularMessage === undefined ? DEFAULT_CIRCULAR_MESSAGE : settings.circularMessage),
                    processedFiles
                )
            }
        }

        // Return include (transclusion) result
        return parentContent
    }

    /** Trigger the execution of include (trigger the transclusion) */
    const trigger: MarkdownIt.Rule<StateCore> = (state: StateCore) => {

        // Check for an active text editor
        if (vscode.window.activeTextEditor === undefined) {
            return
        }

        // Check if there is a file open in the active text editor
        const file: string = vscode.window.activeTextEditor.document.fileName
        if (file === undefined) {
            return
        }

        // Execute transclusion
        state.src = execute(state.src, file)
    }

    // Add plugin to markdown-it parser instance
    markdown.core.ruler.before('normalize', 'include', trigger)
}