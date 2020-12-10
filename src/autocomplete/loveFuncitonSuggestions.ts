'use strict';
import * as vscode from 'vscode';

import cp = require('child_process');
import { 
    languages, window, commands, SignatureHelpProvider, 
    SignatureHelp, SignatureInformation, ParameterInformation, 
    TextDocument, Position, Range, CancellationToken 
} from 'vscode';
import { api } from './luaApi';
import { getModuleData, getTypeData } from './loveAutocomplete';

export class LoveSignatureHelpProvider implements SignatureHelpProvider {
    private toolForDocs = 'phpdoc';

    constructor(toolForDocs: string) {
        this.toolForDocs = toolForDocs;
    }

    public provideSignatureHelp(
        document: TextDocument, position: Position, token: CancellationToken
    ): Promise<SignatureHelp | null> {

        let theCall = this.walkBackwardsToBeginningOfCall(document, position);
        if (theCall == null) {
            return Promise.resolve(null);
        }

        // Find the name of the function that's being called
        let functionNameRange = this.previousTokenPosition(document, theCall.openParen);
        let functionName = document.getText(functionNameRange?functionNameRange:undefined);

        // Find the full method call
        let currentLine = document.lineAt(position.line).text.substring(0, position.character);
        let fullMethodCall = currentLine.trim().split('(')[0];

        let result = new SignatureHelp();
        let declarationText, sig: string;
        let si: SignatureInformation;

        // If it's not a love call, just return
        if (fullMethodCall.split('.')[0] != 'love') {
            return Promise.resolve(result);
        }

        result.activeParameter = theCall.commas.length;

        // Check if it's a function of the base love module
        if (fullMethodCall.split('.').length == 2) {
            let functionData = this.getFunctionData(functionName, api.functions);
            si = new SignatureInformation(functionName);
            si.documentation = functionData.description;

            let params: ParameterInformation[] = [];
            // params.push(new ParameterInformation("test label-param1", "test documentation-param1"));
            // params.push(new ParameterInformation("test label-param2", "test documentation-param2"));
            si.parameters = params;

            console.log("Result:", result);
            result.signatures.push(si);
            result.activeSignature = 0;
            result.activeParameter = Math.min(theCall.commas.length, si.parameters.length - 1);
        } else {
            // This is either a function from a module or a type
            // Figure out which one we're dealing with first

            let moduleOrTypeName = fullMethodCall.split('.')[1];
            if (moduleOrTypeName[0] === moduleOrTypeName[0].toUpperCase()) {
                // We're dealing with a type of the base love module
                let typeData = getTypeData(api.types, moduleOrTypeName);
                let functionData = this.getFunctionData(functionName, typeData.functions);

                result = this.addFunctionSuggestions(functionData, result.activeParameter);

            } else {
                // We're dealing with a module of love
                // We can either be directly calling a function of the love module, or maybe we're calling a function
                // of the modules types. Check if the third element of the fullMethodCall (love.module.typeOrFunction)
                // to see if it's a type or function
                let functionOrTypeName = fullMethodCall.split('.')[2];
                let moduleData = getModuleData(moduleOrTypeName);

                let functionData: any = {};
                if (functionOrTypeName[0] === functionOrTypeName[0].toUpperCase()) {
                    // We're dealing with a function from a type of the module
                    let typeData = getTypeData(moduleData.types, functionOrTypeName);
                    functionData = this.getFunctionData(functionName, typeData.functions);

                } else {
                    // We're dealing with a function of the module directly
                    functionData = this.getFunctionData(functionName, moduleData.functions);
                }
                result = this.addFunctionSuggestions(functionData, result.activeParameter);
            }
        }
        result.activeSignature = 0;

        // Set the active param text to be bold and italics
        //this.highlightActiveParam(result, result.activeParameter);
        return Promise.resolve(result);
    }

    private previousTokenPosition(document: TextDocument, position: Position): Range|null {
        while (position.character > 0) {
            let word = document.getWordRangeAtPosition(position);
            if (word) {
                return word;
            }
            position = position.translate(0, -1);
        }
        return null;
    }

    // private highlightActiveParam(result: SignatureHelp, activeParam: any) {
    //     let label = result.signatures[result.activeSignature].label;
    //     let activeParamName = result.signatures[result.activeSignature].parameters[activeParam].label.split(':')[0];

    //     console.log("Replacing label: " + label, ", Param: " + activeParamName);
    //     result.signatures[result.activeSignature].label = label.replace(activeParamName, "**" + activeParamName + "**");
    // }

    private walkBackwardsToBeginningOfCall(
        document: TextDocument, position: Position
    ): { openParen: Position, commas: Position[] }|null {
        let currentLine = document.lineAt(position.line).text.substring(0, position.character);
        let parenBalance = 0;
        let commas = [];
        for (let char = position.character; char >= 0; char--) {
            switch (currentLine[char]) {
                case '(':
                    parenBalance--;
                    if (parenBalance < 0) {
                        return {
                            openParen: new Position(position.line, char),
                            commas: commas
                        };
                    }
                    break;
                case ')':
                    parenBalance++;
                    break;
                case ',':
                    if (parenBalance === 0) {
                        commas.push(new Position(position.line, char));
                    }
            }
        }
        return null;
    }

    // Find the data for a target function name given an array of functions
    private getFunctionData(targetFunction: string, functions: any) {
        for (let i = 0; i < functions.length; i++) {
            if (targetFunction == functions[i].name) {
                return functions[i];
            }
        }
    }

    // Add the function suggestions based on the function data
    private addFunctionSuggestions(functionData: any, activeParameter: number) {
        let suggestions = new SignatureHelp();

        // loop through all function variants
        for (let f of functionData.variants) {

            let si = new SignatureInformation(functionData.name);
            si.documentation = (f.description ? f.description : functionData.description);

            let argumentNames: string[] = [];
            // Loop through the arguments if there is any
            if ('arguments' in f) {
                for (let arg of f.arguments) {
                    argumentNames.push(arg.name + ": " + arg.type);
                    si.parameters.push(new ParameterInformation(arg.name, arg.name + ": " + arg.type + "\n" + arg.description));
                }
            }

            let decorator: vscode.TextEditorDecorationType = window.createTextEditorDecorationType({color: "white"});
            argumentNames[activeParameter] =  argumentNames[activeParameter].toUpperCase();
            si.label = si.label + "(" + argumentNames.join(', ') + ")";
            suggestions.signatures.push(si);
        }

        return suggestions;
    }
}