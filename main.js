const { app, BrowserWindow, Menu, shell, ipcMain } = require("electron");
const path = require("path");

const menuItems = [
  {
    label: "Menu",
    submenu: [
      {
        label: "now",
      },
    ],
  },
  {
    label: "File",
    submenu: [
      {
        label: "Open Camera",
        click: async () => {
          const win2 = new BrowserWindow({
            height: 500,
            width: 800,
            show: false,
            webPreferences: {
              preload: path.join(__dirname, "cameraPreload.js"),
            },
          });

          ipcMain.on("close-window-2", () => win2.close());
          win2.webContents.openDevTools();
          win2.loadFile("camera.html");
          win2.once("ready-to-show", () => win2.show());
        },
      },
      { type: "separator" },
      { label: "exit", click: () => app.quit() },
    ],
  },
  {
    label: "Window",
    submenu: [
      {
        role: "minimize",
      },
      {
        role: "close",
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  win.webContents.openDevTools();

  ipcMain.on("set-image", (event, data) => {
    win.webContents.send("get-image", data);
  });

  ipcMain.handle("ping", () => "pong");
  win.loadFile("index.html");
};

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
