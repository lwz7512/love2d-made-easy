/**
 * love2d button to run main.lua
 * 
 * @2020/12/09
 * 
 * By: lwz7512@gmail.com
 */

var loveStarted = false;
// import path = require('path');
import * as path from 'path';
import * as child from 'child_process';
import { commands, window, workspace, Uri, } from "vscode";


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
      );
    }, 
    reason => {console.error(reason);}
  );
});

// ====== Default love2d command ======
const disposableLove2d = commands.registerCommand("loveme.love2d", () => {
  
  let editor = window.activeTextEditor;
  if (!editor) {
    return window.showWarningMessage('No editor open!');
  }
  if (loveStarted) {
    return console.warn('love2d application started!');
  }

  let love2dConfig = workspace.getConfiguration();
  let windowsLove2dPath: string|undefined = love2dConfig.get('Windows Love2d Path');
  let unixLove2dPath: string|undefined = love2dConfig.get('Unix Love2d Path');
  // console.warn('get windows love 2d path:' + windowsLove2dPath);
  
  // let projectRoot = workspace.rootPath; // @deprecated
  let projectRoot = workspace.workspaceFolders![0].uri.fsPath;
  // console.log('>>> root: '+projectRoot)
  // love project runner
  let loveProjectHandler = (files: any[]) => {
    // console.log('>>> got main.lua size:')
    let nomainlua = 'No main.lua found in current project!';
    if (!files.length) {
      return window.showErrorMessage(nomainlua);
    }
    
    window.showInformationMessage('Running love2d game ... ');
    // check love2d ...
    let isWindows = process.platform === 'win32';
    let love2dExePath = isWindows ? `"${windowsLove2dPath}"` : `"${unixLove2dPath}"`;
    // let love2dExePath = isWindows ? '"C:\\Program Files\\LOVE\\love.exe"' : 'love';
    child.exec(`${love2dExePath} --version`, function(error, stdout: string, stderr: string){
      if (error) {
        console.error('>>> love2d not found!');
        window.showErrorMessage(stderr);
        return console.log(stderr);
      }
      // LOVE 11.3 (Mysterious Mysteries) 
      console.log(stdout);
      window.showInformationMessage(stdout);
      // execute main.lua
      child.exec(`${love2dExePath} ` + projectRoot);
    }).on("close", function(code, signal){
      // console.log('>>> love process closed!')
      loveStarted = false;
    }).on("error", function(code:any, signal:any){
      console.error('>>> love process error: '+code+'/'+signal);
    }).on("exit", function(code, signal){
      // console.log('>>> love process exit!')
    });
    // console.log('>>> start love child process ...')
    loveStarted = true;
  };
  // console.log('workspace.name: '+workspace.name)
  workspace.findFiles('main.lua').then(loveProjectHandler);
  
});

export default disposableLove2d;