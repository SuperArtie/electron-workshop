"use strict";

const electron = require("electron");
const path = require("path");
const reload = require("electron-reload");
const isDev = require("electron-is-dev");
const { app, BrowserWindow, ipcMain, dialog } = electron;
let mainWindow = null;

if (isDev) {
	const electronPath = path.join(__dirname, "node_modules", ".bin", "electron");
	reload(__dirname, { electron: electronPath });
}

app.on( "window-all-closed", () => {
    if ( process.platform !== "darwin" ) {
        app.quit();
    }
} );

app.on( "ready", () => {
    mainWindow = new BrowserWindow( { width: 1000, height: 600, show: false } );
    mainWindow.loadURL( `file://${ __dirname }/index.html` );
    if(isDev){
        mainWindow.webContents.openDevTools({mode:'detach'});
    }
    mainWindow.once( "ready-to-show", () => {
        mainWindow.show();
    } );
    mainWindow.on( "closed", () => {
        mainWindow = null;
    } );
} );

ipcMain.on( "show-dialog", ( e, arg ) => {
    const msgInfo = {
        title: "My App Alert",
        message: arg.message,
        buttons: [ "OK" ]
    };
    dialog.showMessageBox( msgInfo );
    e.sender.send('asynchronous-reply', 'piping hot');
} );

ipcMain.on('synchronous-message', (event, arg) => {
    console.log("yo----> " + arg) // prints "ping"
    event.returnValue = 'pong'
  })