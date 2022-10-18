const { ipcMain } = require("electron");
const { app, BrowserWindow, Menu, shell } = require("electron");
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
            height: 300,
            width: 400,
            show: false,
          });

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
