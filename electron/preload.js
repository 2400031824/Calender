const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('widgetAPI', {
  hideToTray: () => ipcRenderer.send('widget:hide'),
  restoreWidget: () => ipcRenderer.send('widget:show'),
  toggleOverlay: () => ipcRenderer.send('widget:toggle-overlay'),
  setOverlayMode: (enabled) => ipcRenderer.invoke('widget:set-overlay', !!enabled),
  getOverlayMode: () => ipcRenderer.invoke('widget:get-overlay'),
  checkForUpdates: () => ipcRenderer.invoke('widget:check-updates'),
  installUpdate: () => ipcRenderer.invoke('widget:install-update'),
  onOverlayModeChanged: (callback) => {
    if (typeof callback !== 'function') return () => {};
    const listener = (_event, value) => callback(!!value);
    ipcRenderer.on('widget:overlay-changed', listener);
    return () => ipcRenderer.removeListener('widget:overlay-changed', listener);
  }
});
