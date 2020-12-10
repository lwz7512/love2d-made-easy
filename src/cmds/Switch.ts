/**
 * switch command
 */

import { window, commands, } from "vscode";

const disposableSwitch = (hasCpp:boolean) => {
  return commands.registerCommand("extension.switch", () => {
    if (hasCpp) {
      commands.executeCommand("C_Cpp.SwitchHeaderSource").then(function () {});
    } else {
      window.showErrorMessage(
        "C/C++ extension (ms-vscode.cpptools) is not installed!"
      );
    }
  });
}

export default disposableSwitch