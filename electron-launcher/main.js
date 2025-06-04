const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  win.loadFile('index.html');
}

app.whenReady().then(createWindow);

ipcMain.handle('launch-game', (_, exePath) => {
  spawn(exePath, [], { detached: true });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
