/**
 * builtin commands
 */
import { window, commands, } from "vscode";

export const dispSave = commands.registerCommand("loveme.save", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.action.files.save").then(v=>true)
});


export const disptoggleTerminal = commands.registerCommand("loveme.toggleTerminal", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.action.terminal.toggleTerminal").then(v=>true)
});

export const disptoggleActivityBar = commands.registerCommand("loveme.toggleActivityBar", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.action.toggleActivityBarVisibility").then(v=>true)
});


export const dispBack = commands.registerCommand("loveme.back", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.action.navigateBack").then(v=>true)
});

export const dispForward = commands.registerCommand("loveme.forward", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.action.navigateForward").then(v=>true)
});

export const dispToggleWS = commands.registerCommand("loveme.toggleWhitespace", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("editor.action.toggleRenderWhitespace").then(v=>true)
});

export const dispQuickOpen = commands.registerCommand("loveme.quickOpen", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.action.quickOpen").then(v=>true)
});

export const dispFR = commands.registerCommand("loveme.findReplace", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("editor.action.startFindReplaceAction").then(v=>true)
});

export const dispUd = commands.registerCommand("loveme.undo", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("undo").then(v=>true)
});

export const dispRd = commands.registerCommand("loveme.redo", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("redo").then(v=>true)
});

export const dispCL = commands.registerCommand("loveme.commentLine", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("editor.action.commentLine").then(v=>true)
});

export const dispSaveAll = commands.registerCommand("loveme.saveAll", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.action.files.saveAll").then(v=>true)
});

export const dispOF = commands.registerCommand("loveme.openFile", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.action.files.openFile").then(v=>true)
});

export const dispNF = commands.registerCommand("loveme.newFile", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.action.files.newUntitledFile").then(v=>true)
});

export const dispGTD = commands.registerCommand("loveme.goToDefinition", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("editor.action.revealDefinition").then(v=>true)
});

export const dispCut = commands.registerCommand("loveme.cut", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("editor.action.clipboardCutAction").then(v=>true)
});

export const dispCp = commands.registerCommand("loveme.copy", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("editor.action.clipboardCopyAction").then(v=>true)
});

export const dispPst = commands.registerCommand("loveme.paste", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("editor.action.clipboardPasteAction").then(v=>true)
});

export const dispCWSave = commands.registerCommand("loveme.compareWithSaved", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.files.action.compareWithSaved").then(v=>true)
});

export const dispSC = commands.registerCommand("loveme.showCommands", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.action.showCommands").then(v=>true)
});

export const dispSD = commands.registerCommand("loveme.startDebug", () => {
  let editor = window.activeTextEditor;
  if (!editor || !editor.viewColumn) {
    return window.showWarningMessage('No editor open!'); // No open text editor
  }
  commands.executeCommand("workbench.action.debug.start").then(v=>true)
});
