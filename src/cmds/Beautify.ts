/**
 * beautify command
 */

import { window, commands, } from "vscode";

const disposableBeautify = commands.registerCommand(
  "extension.beautify",
  () => {
    let editor = window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }

    if (window.state.focused === true && !editor.selection.isEmpty) {
      commands
        .executeCommand("editor.action.formatSelection")
        .then(function () {});
    } else {
      commands
        .executeCommand("editor.action.formatDocument")
        .then(function () {});
    }
  }
);

export default disposableBeautify;