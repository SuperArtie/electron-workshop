const electron = require( "electron" );
const { app, BrowserWindow } = electron;

let mainWindow = null;

app.on( "window-all-closed", () => {
    if ( process.platform !== "darwin" ) {
        app.quit();
    }
} );

app.on( "ready", () => {
    mainWindow = new BrowserWindow( { width: 800, height: 600, show: false } );
    mainWindow.loadURL( `file://${ __dirname }/index.html` );
    mainWindow.once( "ready-to-show", () => {
        mainWindow.show();
    } );
    mainWindow.on( "closed", () => {
        mainWindow = null;
    } );
} );