"use strict";

import { ExtensionContext, } from "vscode";

import { addCustomizeCmds, } from "./common/CmdHandler";
import { addProviders, } from "./cmds/Providers";


// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
  // add complex command separately
  addCustomizeCmds(context);

  // WORKS ! @2020/12/19
  addProviders(context);
}

// this method is called when your extension is deactivated
export function deactivate() {}
