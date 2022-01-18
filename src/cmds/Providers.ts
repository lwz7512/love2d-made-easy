import * as vscode from 'vscode';

import { EXT_TAG } from "../common/CONSTS";
import { LUA_MODE } from "../autocomplete/luaMode";
import { MOONSCRIPT_MODE } from "../autocomplete/moonscriptMode";
import { LoveSignatureHelpProvider } from "../autocomplete/loveFuncitonSuggestions";
import { getSuggestions } from "../autocomplete/loveAutocomplete";


const luaCompletionProvider = vscode.languages.registerCompletionItemProvider(
	LUA_MODE, 
	{
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): vscode.CompletionItem[] {
        // let filename = document.fileName;
        let lineText = document.lineAt(position.line).text;
        // let lineTillCurrentPosition = lineText.substr(0, position.character);

        let wordAtPosition = document.getWordRangeAtPosition(position);
        let currentWord = '';
        if (wordAtPosition && wordAtPosition.start.character < position.character) {
            let word = document.getText(wordAtPosition);
            currentWord = word.substr(0, position.character - wordAtPosition.start.character);
        }
        // Check if we don't have any '.'s in the line and the letter starts with 'l'
        // If so, return love as a suggestions
        var count = (lineText.match(/\./g) || []).length;
        if (count === 0 && currentWord === "l") {
            let suggestion: vscode.CompletionItem = new vscode.CompletionItem("love", vscode.CompletionItemKind.Module);
            suggestion.detail = EXT_TAG;
            suggestion.documentation = "LOVE 2D Game Framework";
            return [suggestion];
        }
        // Check through the list of functions that are included in this file and see if any match
        // the starting letter of the word we have so far
        let suggestions: vscode.CompletionItem[] = getSuggestions(lineText, currentWord);

        return suggestions;
    }
  }, 
	'.'
);

const luaSignatureProvider = vscode.languages.registerSignatureHelpProvider(
	LUA_MODE,
	new LoveSignatureHelpProvider(vscode.workspace.getConfiguration('lua')['docsTool']),
	'(', ','
);

const moonSignatureProvider = vscode.languages.registerSignatureHelpProvider(
	MOONSCRIPT_MODE,
	new LoveSignatureHelpProvider(vscode.workspace.getConfiguration('lua')['docsTool']),
	'(', ','
);

const provider1 = vscode.languages.registerCompletionItemProvider('plaintext', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, 
			token: vscode.CancellationToken, context: vscode.CompletionContext) {

			// a simple completion item which inserts `Hello World!`
			const simpleCompletion = new vscode.CompletionItem('Hello World!');

			// a completion item that inserts its text as snippet,
			// the `insertText`-property is a `SnippetString` which will be
			// honored by the editor.
			const snippetCompletion = new vscode.CompletionItem('Good part of the day');
			snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
			snippetCompletion.documentation = new vscode.MarkdownString("Inserts a snippet that lets you select the _appropriate_ part of the day for your greeting.");

			// a completion item that can be accepted by a commit character,
			// the `commitCharacters`-property is set which means that the completion will
			// be inserted and then the character will be typed.
			const commitCharacterCompletion = new vscode.CompletionItem('console');
			commitCharacterCompletion.commitCharacters = ['.'];
			commitCharacterCompletion.documentation = new vscode.MarkdownString('Press `.` to get `console.`');

			// a completion item that retriggers IntelliSense when being accepted,
			// the `command`-property is set which the editor will execute after 
			// completion has been inserted. Also, the `insertText` is set so that 
			// a space is inserted after `new`
			const commandCompletion = new vscode.CompletionItem('new');
			commandCompletion.kind = vscode.CompletionItemKind.Keyword;
			commandCompletion.insertText = 'new ';
			commandCompletion.command = { command: 'editor.action.triggerSuggest', title: 'Re-trigger completions...' };

			// return all completion items as array
			return [
				simpleCompletion,
				snippetCompletion,
				commitCharacterCompletion,
				commandCompletion
			];
		}
	});

const provider2 = vscode.languages.registerCompletionItemProvider(
		'plaintext',
		{
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {

				// get all text until the `position` and check if it reads `console.`
				// and if so then complete if `log`, `warn`, and `error`
				const linePrefix = document.lineAt(position).text.substr(0, position.character);
				if (!linePrefix.endsWith('console.')) {
					return undefined;
				}

				return [
					new vscode.CompletionItem('log', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('warn', vscode.CompletionItemKind.Method),
					new vscode.CompletionItem('error', vscode.CompletionItemKind.Method),
				];
			}
		},
		'.' // triggered whenever a '.' is being typed
	);

	export const addProviders = (context: vscode.ExtensionContext) => {
		// @2020/12/19
		console.log('Congratulations, your extension "love-autocomplete" is now active!');
  
		context.subscriptions.push(
			provider1, provider2, 
			luaSignatureProvider, moonSignatureProvider,
			luaCompletionProvider,
		);
	};