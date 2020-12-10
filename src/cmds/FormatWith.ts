/**
 * format file
 */

import { window, commands, } from "vscode";

const  disposableFormatWith = commands.registerCommand(
  "extension.formatWith",
  () => {
    let editor = window.activeTextEditor;
    if (!editor) {
      return; // No open text editor
    }

    if (window.state.focused === true && !editor.selection.isEmpty) {
      commands
        .executeCommand("editor.action.formatSelection.multiple")
        .then(function () {});
    } else {
      commands
        .executeCommand("editor.action.formatDocument.multiple")
        .then(function () {});
    }
  }
);

export default disposableFormatWith
