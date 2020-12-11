/**
 * utility functions
 */

import {
  ExtensionContext, Disposable, commands,
} from "vscode";

import disposableBeautify from "../cmds/Beautify";
import disposableFormatWith from "../cmds/FormatWith";
import disposableFileList from "../cmds/FileList";
import disposableSwitch from "../cmds/Switch";
import disposableLove2d, { createMainLua } from "../cmds/Love2d";
import commandArray from "../cmds/BuiltinCmds";


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

export const addBuiltinCmds = (context: ExtensionContext) => {
  let disposableCommandsArray: Disposable[] = [];
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  commandArray.forEach((command) => {
    disposableCommandsArray.push(
      commands.registerCommand(command[0], () => {
        commands.executeCommand(command[1]).then(function () {});
      })
    );
  });
  // Adding 1) to a list of disposables which are disposed when this extension is deactivated

  disposableCommandsArray.forEach((i) => {
    context.subscriptions.push(i);
  });
}

export const addCustomizeCmds = (context: ExtensionContext) => {
  context.subscriptions.push(disposableFileList);
  context.subscriptions.push(disposableBeautify);
  context.subscriptions.push(disposableFormatWith);
  context.subscriptions.push(disposableSwitch(hasCpp));
  context.subscriptions.push(disposableLove2d);
  context.subscriptions.push(createMainLua);
}