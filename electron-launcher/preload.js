const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

contextBridge.exposeInMainWorld('launcher', {
  loadGames: () => {
    const data = fs.readFileSync(path.join(__dirname, 'game_data.json'), 'utf8');
    return JSON.parse(data).games;
  },
  launchGame: (exePath) => ipcRenderer.invoke('launch-game', exePath)
});
