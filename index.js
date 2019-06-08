"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function activate() {
    return {
        extendMarkdownIt(md) {
            return md.use(require('./include'));
        }
    };
}
exports.activate = activate;
