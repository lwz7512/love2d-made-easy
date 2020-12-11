/**
 * see opened files list
 */

import { window, commands, } from "vscode";

const disposableFileList = commands.registerCommand(
  "loveme.filelist",
  () => {
    let editor = window.activeTextEditor;
    if (!editor || !editor.viewColumn) {
      return; // No open text editor
    }
    commands
      .executeCommand("workbench.action.showAllEditorsByMostRecentlyUsed")
      .then(function () {});
  }
);

export default disposableFileList