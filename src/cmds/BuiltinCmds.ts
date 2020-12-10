/**
 * builtin commands
 */

const commandArray = [
  //=> ["name in package.json" , "name of command to execute"]

  ["extension.save", "workbench.action.files.save"],
  ["extension.toggleTerminal", "workbench.action.terminal.toggleTerminal"],
  [
    "extension.toggleActivityBar",
    "workbench.action.toggleActivityBarVisibility",
  ],
  ["extension.back", "workbench.action.navigateBack"],
  ["extension.forward", "workbench.action.navigateForward"],
  ["extension.toggleWhitespace", "editor.action.toggleRenderWhitespace"],
  ["extension.quickOpen", "workbench.action.quickOpen"],
  ["extension.findReplace", "editor.action.startFindReplaceAction"],
  ["extension.undo", "undo"],
  ["extension.redo", "redo"],
  ["extension.commentLine", "editor.action.commentLine"],
  ["extension.saveAll", "workbench.action.files.saveAll"],
  ["extension.openFile", "workbench.action.files.openFile"],
  ["extension.newFile", "workbench.action.files.newUntitledFile"],
  ["extension.goToDefinition", "editor.action.revealDefinition"],
  ["extension.cut", "editor.action.clipboardCutAction"],
  ["extension.copy", "editor.action.clipboardCopyAction"],
  ["extension.paste", "editor.action.clipboardPasteAction"],
  ["extension.compareWithSaved", "workbench.files.action.compareWithSaved"],
  ["extension.showCommands", "workbench.action.showCommands"],
  ["extension.startDebug", "workbench.action.debug.start"],
];

export default commandArray
