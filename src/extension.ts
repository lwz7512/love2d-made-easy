"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
// import * as vscode from 'vscode';

import { ExtensionContext,  } from "vscode";
import {
  checkCpp, addCustomizeCmds,
} from "./common/CmdHandler"

import {
  addAutoCompleteSignatureCmds, addAutoCompleteCompletionCmds, addAutoCompleteLaunchCmd,
} from "./cmds/AutoCmpl"


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // Step: If simple commands then add to this array
  checkCpp()
  // add complex command separately
  addCustomizeCmds(context)
  
  // ADD autocomplete commands
  addAutoCompleteSignatureCmds(context)
  addAutoCompleteCompletionCmds(context)
  addAutoCompleteLaunchCmd(context)
}

// this method is called when your extension is deactivated
export function deactivate() {}
