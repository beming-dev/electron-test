const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  sendImage: (title) => ipcRenderer.send("set-image", title),
});
