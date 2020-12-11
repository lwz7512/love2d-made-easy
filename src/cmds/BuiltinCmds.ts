/**
 * builtin commands
 */

const commandArray = [
  //=> ["name in package.json" , "name of command to execute"]

  ["loveme.save", "workbench.action.files.save"],
  ["loveme.toggleTerminal", "workbench.action.terminal.toggleTerminal"],
  [
    "loveme.toggleActivityBar",
    "workbench.action.toggleActivityBarVisibility",
  ],
  ["loveme.back", "workbench.action.navigateBack"],
  ["loveme.forward", "workbench.action.navigateForward"],
  ["loveme.toggleWhitespace", "editor.action.toggleRenderWhitespace"],
  ["loveme.quickOpen", "workbench.action.quickOpen"],
  ["loveme.findReplace", "editor.action.startFindReplaceAction"],
  ["loveme.undo", "undo"],
  ["loveme.redo", "redo"],
  ["loveme.commentLine", "editor.action.commentLine"],
  ["loveme.saveAll", "workbench.action.files.saveAll"],
  ["loveme.openFile", "workbench.action.files.openFile"],
  ["loveme.newFile", "workbench.action.files.newUntitledFile"],
  ["loveme.goToDefinition", "editor.action.revealDefinition"],
  ["loveme.cut", "editor.action.clipboardCutAction"],
  ["loveme.copy", "editor.action.clipboardCopyAction"],
  ["loveme.paste", "editor.action.clipboardPasteAction"],
  ["loveme.compareWithSaved", "workbench.files.action.compareWithSaved"],
  ["loveme.showCommands", "workbench.action.showCommands"],
  ["loveme.startDebug", "workbench.action.debug.start"],
];

export default commandArray
