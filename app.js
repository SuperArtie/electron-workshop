document.addEventListener( "DOMContentLoaded", () => {
    const msg = `Node.js: ${process.versions.node},
        Electron: ${process.versions.electron},
        Chrome: ${process.versions.chrome}`;
        document.getElementById("info").textContent = msg;
        const homeList = document.getElementById("homeList");
        const fs = require("fs");
        fs.readdir('.', (err, entries) => {
            entries.forEach(entry => {
                if(!entry.startsWith(".")){
                    const li = document.createElement("li");
                    li.textContent = entry;
                    homeList.appendChild(li);
                }
            });
        });
} );