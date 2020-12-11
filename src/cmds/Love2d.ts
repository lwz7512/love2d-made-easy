/**
 * love2d button to run main.lua
 * 
 * @2020/12/09
 * 
 * By: lwz7512@gmail.com
 */

var love_started = false;
// import path = require('path');
import * as path from 'path';
import * as child from 'child_process';
import { window, commands, workspace, Uri, } from "vscode";


// ====== main.lua generator @2020/12/10 ======
export const createMainLua = commands.registerCommand("loveme.mainlua", () => {
  window.showInformationMessage('love2d main.lua created!');
  
  let mainUri = Uri.file(path.join(__dirname, '../../templates/main.lua'));
  let mainlua = workspace.fs.readFile(mainUri);
  let rootPath = workspace.workspaceFolders![0].uri.fsPath;
  let mainOut = Uri.file(path.join(rootPath, 'main.lua'));
  mainlua.then(
    content => {
      // console.log(value.toString())
      workspace.fs.writeFile(mainOut, content).then(
        () => {
          commands.executeCommand('vscode.open', mainOut);
        }, 
        failure => {
          console.error('>>> open failed!');
        }
      )
    }, 
    reason => {console.error(reason)}
  );
});

// ====== Default love2d command ======
const disposableLove2d = commands.registerCommand("loveme.love2d", () => {
  
  let editor = window.activeTextEditor;
  if (!editor) return window.showWarningMessage('No editor open!');
  if (love_started) return
  
  // let projectRoot = workspace.rootPath; // @deprecated
  let projectRoot = workspace.workspaceFolders![0].uri.fsPath;
  // console.log('>>> root: '+projectRoot)
  // love project runner
  let loveProjectHandler = (files: any[]) => {
    // console.log('>>> got main.lua size:')
    let nomainlua = 'No main.lua found in current project!'
    if (!files.length) return window.showErrorMessage(nomainlua);
    
    window.showInformationMessage('Running love2d game ... ');
    // check love2d ...
    child.exec('love --version', function(error, stdout: string, stderr: string){
      if (error) {
        console.error('>>> love2d not found!')
        window.showErrorMessage(stderr);
        return console.log(stderr)
      }
      // LOVE 11.3 (Mysterious Mysteries)
      console.log(stdout)
      window.showInformationMessage(stdout);
      // execute main.lua
      child.exec('love '+projectRoot)
    }).on("close", function(code, signal){
      // console.log('>>> love process closed!')
      love_started = false
    }).on("error", function(code:any, signal:any){
      console.error('>>> love process error: '+code+'/'+signal)
    }).on("exit", function(code, signal){
      // console.log('>>> love process exit!')
    })
    // console.log('>>> start love child process ...')
    love_started = true
  }
  // console.log('workspace.name: '+workspace.name)
  workspace.findFiles('main.lua').then(loveProjectHandler)
  
});

export default disposableLove2d