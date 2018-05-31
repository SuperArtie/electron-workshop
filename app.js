const { ipcRenderer } = require( "electron" );

document.addEventListener( "DOMContentLoaded", () => {
    const msg = `Node.js: ${process.versions.node},
        Electron: ${process.versions.electron},
        Chrome: ${process.versions.chrome}`;
        document.getElementById("info").textContent = msg;
        const homeList = document.getElementById("homeList");
        const fs = require("fs");
        fs.readdir(process.env.HOME, (err, entries) => {
            entries.forEach(entry => {
                if(!entry.startsWith(".")){
                    const li = document.createElement("li");
                    li.textContent = entry;
                    homeList.appendChild(li);
                }
            });
        });
        const btn = document.getElementById( "clickme" );
        btn.addEventListener( "click", e => {
            console.log( "I was clicked." );
            console.log( e );
            ipcRenderer.send( "show-dialog", { message: "The button was clicked" } );
        } );
        console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"
} );
ipcRenderer.on('asynchronous-reply', (event, arg) => {
    console.log(arg) // prints "pong"
  })