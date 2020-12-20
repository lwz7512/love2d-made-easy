/**
 * autocomplete commands
 * @2020/12/11
 */


import {
    window, commands, ExtensionContext,
} from "vscode";

const openurl = require('openurl').open;

// FIXME: CAN NOT USE THIS, OR CAUSE AUTO COMPLETION FAILURE !
// @2020/12/19
// const lauchWiki = commands.registerCommand('loveme.openDocumentation', () => {
//     // The code you place here will be executed every time your command is executed
//     let editor = window.activeTextEditor!;
//     let functionCall = getFunctionCall(editor.selection.start.line, editor.selection.start.character);

//     if (functionCall.startsWith("love.")) {
//         console.log('Trying to open LOVE documentation!: ' + functionCall);
//         // Check if we have a Type or Enum in the functionCall by looking at the first character
//         // of each part of a split by '.' string and seeing if it's a capital letter
//         for (let part of functionCall.split('.')){
//             if (part[0] === part[0].toUpperCase()){
//                 openurl("https://love2d.org/wiki/" + part);
//                 return;
//             }
//         }
//         openurl("https://love2d.org/wiki/" + functionCall);
//     }
// });

// Register command to launch love
// const lauchConsole = commands.registerCommand('loveme.launch', () => {
//     let terminal = window.createTerminal();
//     terminal.sendText("love --console .", true);
// });

// Get the full function call based on where the cursor is
const getFunctionCall = (lineNum: number, cursorPosition: number) => {
  let editor = window.activeTextEditor!;
  let line = editor.document.lineAt(lineNum);
  let lineText = line.text;
  let characterLimit = line.range.end.character;

  let functionCall = lineText.charAt(cursorPosition);
  let newPos = cursorPosition - 1;
  // Iterate from the cursor position to the beginning of the line or a whitespace character
  while (true) {
      if (newPos < 0) {
          // We've reached the beginning of the line so break
          break;
      }
      let newChar = lineText.charAt(newPos);
      let done = false;
      switch (newChar) {
          case ' ':
              done = true;
              break;
          case '\t':
              done = true;
              break;
          default:
              functionCall = newChar + functionCall
              break;
      }
      newPos -= 1;

      if (done) { break; }
  }

  // Iterate from the cursor until the end of line or when a '(' is hit
  newPos = cursorPosition + 1;
  while (true) {
      if (newPos > characterLimit) {
          // We've reached the end of the line so break
          break;
      }
      let newChar = lineText.charAt(newPos);
      let done = false;
      switch (newChar) {
          case ' ':
              done = true;
              break;
          case '(':
              done = true;
              break;
          case '\t':
              done = true;
              break;
          default:
              functionCall = functionCall + newChar;
              break;
      }
      newPos += 1;

      if (done) { break; }
  }

  return functionCall;
}

export const addAutoCompleteLaunchCmd = (context: ExtensionContext) => {
    // context.subscriptions.push(lauchWiki);
    // context.subscriptions.push(lauchConsole);
}