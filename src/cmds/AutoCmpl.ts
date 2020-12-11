/**
 * autocomplete commands
 * @2020/12/11
 */

import {
  ExtensionContext, commands, languages, workspace, window,
  TextDocument, Position, CancellationToken, CompletionItem, CompletionItemKind, 
} from "vscode";

import { EXT_TAG } from "../common/CONSTS"
import { LUA_MODE } from "../autocomplete/luaMode";
import { MOONSCRIPT_MODE } from '../autocomplete/moonscriptMode';
import { getSuggestions } from '../autocomplete/loveAutocomplete'
import { LoveSignatureHelpProvider } from "../autocomplete/loveFuncitonSuggestions";

const openurl = require('openurl').open;

export const addAutoCompleteLaunchCmd = (context: ExtensionContext) => {
  // Setup the command to open the documentation for the LOVE method the cursor is currently on
  var disposable = commands.registerCommand('loveme.openDocumentation', () => {
    if (!window.activeTextEditor) return
    // The code you place here will be executed every time your command is executed
    let editor = window.activeTextEditor!;
    let functionCall = getFunctionCall(editor.selection.start.line, editor.selection.start.character);

    if (functionCall.startsWith("love.")) {
        console.log('Trying to open LOVE documentation!: ' + functionCall);
        // Check if we have a Type or Enum in the functionCall by looking at the first character
        // of each part of a split by '.' string and seeing if it's a capital letter
        for (let part of functionCall.split('.')){
            if (part[0] === part[0].toUpperCase()){
                openurl("https://love2d.org/wiki/" + part);
                return;
            }
        }
        openurl("https://love2d.org/wiki/" + functionCall);
    }
});

context.subscriptions.push(disposable);

// Register command to launch love
var launch = commands.registerCommand('loveme.launch', () => {
    let terminal = window.createTerminal();
    terminal.sendText("love --console .", true);
});

context.subscriptions.push(launch);
}

export const addAutoCompleteSignatureCmds = (context: ExtensionContext) => {
  console.log('Congratulations, your extension "love-autocomplete" is now active!');
  // Setup our plugin to help with function signatures
  let signatureHelper = new LoveSignatureHelpProvider(workspace.getConfiguration('lua')['docsTool'])
  let signatureCmd = languages.registerSignatureHelpProvider(LUA_MODE, signatureHelper, '(', ',')
  context.subscriptions.push(signatureCmd);

  let sigatureHelper2 = new LoveSignatureHelpProvider(workspace.getConfiguration('lua')['docsTool'])
  let signatureCmd2 = languages.registerSignatureHelpProvider(MOONSCRIPT_MODE, sigatureHelper2, '(', ',')
  context.subscriptions.push(signatureCmd2);

}

export const addAutoCompleteCompletionCmds = (context: ExtensionContext) => {
  let completionItemProvider = {
    provideCompletionItems(document: TextDocument, position: Position, token: CancellationToken): CompletionItem[] {

        let filename = document.fileName;
        let lineText = document.lineAt(position.line).text;
        let lineTillCurrentPosition = lineText.substr(0, position.character);

        let wordAtPosition = document.getWordRangeAtPosition(position);
        let currentWord = '';
        if (wordAtPosition && wordAtPosition.start.character < position.character) {
            let word = document.getText(wordAtPosition);
            currentWord = word.substr(0, position.character - wordAtPosition.start.character);
        }

        // Check if we don't have any '.'s in the line and the letter starts with 'l'
        // If so, return love as a suggestions
        var count = (lineText.match(/\./g) || []).length;
        if (count == 0 && currentWord == "l") {
            let suggestion: CompletionItem = new CompletionItem("love", CompletionItemKind.Module);
            suggestion.detail = EXT_TAG;
            suggestion.documentation = "LOVE 2D Game Framework";
            return [suggestion];
        }

        // Check through the list of functions that are included in this file and see if any match
        // the starting letter of the word we have so far
        let suggestions: CompletionItem[] = getSuggestions(lineText, currentWord);

        return suggestions;

    }
  };
  let completionCmd = languages.registerCompletionItemProvider(LUA_MODE, completionItemProvider, '.')
  context.subscriptions.push(completionCmd);
  let completionCmd2 = languages.registerCompletionItemProvider(MOONSCRIPT_MODE, completionItemProvider, '.')
  context.subscriptions.push(completionCmd2);
}

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
