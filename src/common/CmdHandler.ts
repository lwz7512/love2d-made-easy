/**
 * utility functions
 */

import { ExtensionContext, commands, } from "vscode";

import disposableBeautify from "../cmds/Beautify";
import disposableFormatWith from "../cmds/FormatWith";
import disposableFileList from "../cmds/FileList";
import disposableSwitch from "../cmds/Switch";
import disposableLove2d, { createMainLua } from "../cmds/Love2d";
import {
  dispSave, disptoggleTerminal, disptoggleActivityBar, dispBack, dispForward, 
  dispToggleWS, dispQuickOpen, dispFR, dispUd, dispRd, dispCL, dispSaveAll,
  dispOF, dispNF, dispGTD, dispCut, dispCp, dispPst, dispCWSave, dispSC, dispSD,
} from "../cmds/BuiltinCmds"


var init = false;
var hasCpp = false;

export const checkCpp = () => {
  if (init) return
  commands.getCommands().then(function (value) {
    let result = value.indexOf("C_Cpp.SwitchHeaderSource");
    if (result >= 0) {
      hasCpp = true;
    }
  });
  init = true;
}

export const addCustomizeCmds = (context: ExtensionContext) => {
  context.subscriptions.push(disptoggleActivityBar);
  context.subscriptions.push(dispBack);
  context.subscriptions.push(dispForward);
  context.subscriptions.push(dispToggleWS);
  context.subscriptions.push(dispQuickOpen);
  context.subscriptions.push(dispFR);
  context.subscriptions.push(dispSave);
  context.subscriptions.push(disptoggleTerminal);
  context.subscriptions.push(dispUd);
  context.subscriptions.push(dispRd);
  context.subscriptions.push(dispCL);
  context.subscriptions.push(dispSaveAll);
  context.subscriptions.push(dispOF);
  context.subscriptions.push(dispNF);
  context.subscriptions.push(dispGTD);
  context.subscriptions.push(dispCut);
  context.subscriptions.push(dispCp);
  context.subscriptions.push(dispPst);
  context.subscriptions.push(dispCWSave);
  context.subscriptions.push(dispSC);
  context.subscriptions.push(dispSD);
  context.subscriptions.push(disposableFileList);
  context.subscriptions.push(disposableBeautify);
  context.subscriptions.push(disposableFormatWith);
  context.subscriptions.push(disposableSwitch(hasCpp));
  context.subscriptions.push(disposableLove2d);
  context.subscriptions.push(createMainLua);
}