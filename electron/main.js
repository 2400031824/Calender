delete process.env.ELECTRON_RUN_AS_NODE;
const {
  app,
  BrowserWindow,
  globalShortcut,
  Menu,
  Tray,
  nativeImage,
  ipcMain,
  screen
} = require('electron');
const { autoUpdater } = require('electron-updater');
const fs = require('fs');
const path = require('path');

const PROD_WIDGET_URL = 'https://calender-two-silk.vercel.app';
const WIDGET_URL = process.env.WIDGET_URL || (app.isPackaged ? `${PROD_WIDGET_URL}?widget=true` : 'http://localhost:3000?widget=true');
const ASSETS_DIR = path.join(__dirname, 'assets');
const ICON_PNG = path.join(ASSETS_DIR, 'widget-icon.png');
const ICON_ICO = path.join(ASSETS_DIR, 'widget-icon.ico');

let mainWindow;
let tray;
let overlayMode = false;
let saveTimer;
let updateCheckTimer;
let updateDownloadedVersion = null;

function stateFilePath() {
  return path.join(app.getPath('userData'), 'widget-state.json');
}

function readState() {
  try {
    const raw = fs.readFileSync(stateFilePath(), 'utf8');
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function writeState() {
  if (!mainWindow) return;

  const bounds = mainWindow.getBounds();
  const payload = {
    bounds,
    overlayMode
  };

  try {
    fs.writeFileSync(stateFilePath(), JSON.stringify(payload, null, 2), 'utf8');
  } catch {
    // ignore state save errors
  }
}

function queueStateSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(writeState, 250);
}

function getDefaultBounds() {
  const display = screen.getPrimaryDisplay();
  const { workArea } = display;

  const width = 420;
  const height = 690;
  const margin = 20;

  return {
    width,
    height,
    x: Math.max(workArea.x + margin, workArea.x + workArea.width - width - margin),
    y: workArea.y + margin
  };
}

function getStartOnBoot() {
  return !!app.getLoginItemSettings().openAtLogin;
}

function setStartOnBoot(enabled) {
  const openAtLogin = !!enabled;

  if (app.isPackaged) {
    app.setLoginItemSettings({ openAtLogin });
    return;
  }

  app.setLoginItemSettings({
    openAtLogin,
    path: process.execPath,
    args: [path.resolve(__filename)]
  });
}

function applyOverlayMode(nextOverlay) {
  overlayMode = !!nextOverlay;

  if (!mainWindow) return;

  if (overlayMode) {
    mainWindow.setAlwaysOnTop(true, 'floating');
    mainWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
    if (!mainWindow.isVisible()) {
      mainWindow.show();
    }
    mainWindow.focus();
  } else {
    mainWindow.setAlwaysOnTop(false, 'normal');
    mainWindow.setVisibleOnAllWorkspaces(false, { visibleOnFullScreen: false });
    mainWindow.setSkipTaskbar(false);
    mainWindow.blur();
  }

  mainWindow.webContents.send('widget:overlay-changed', overlayMode);
  updateTrayMenu();
  queueStateSave();
}

function checkForUpdates() {
  if (!app.isPackaged) return;
  autoUpdater.checkForUpdates().catch(() => {
    // ignore transient update errors
  });
}

function installDownloadedUpdate() {
  if (!updateDownloadedVersion) return;
  autoUpdater.quitAndInstall();
}

function createTrayImage() {
  if (fs.existsSync(ICON_PNG)) {
    const img = nativeImage.createFromPath(ICON_PNG);
    if (!img.isEmpty()) {
      return img.resize({ width: 16, height: 16 });
    }
  }

  const fallback = nativeImage.createFromPath(process.execPath);
  if (!fallback.isEmpty()) {
    return fallback.resize({ width: 16, height: 16 });
  }

  return nativeImage.createEmpty();
}

function updateTrayMenu() {
  if (!tray) return;

  const contextMenu = Menu.buildFromTemplate([
    {
      label: overlayMode ? 'Switch to Desktop Mode' : 'Switch to Overlay Mode',
      click: () => applyOverlayMode(!overlayMode)
    },
    {
      label: 'Check for Updates',
      click: () => checkForUpdates()
    },
    {
      label: updateDownloadedVersion
        ? `Install Update ${updateDownloadedVersion} and Restart`
        : 'No Update Downloaded Yet',
      enabled: !!updateDownloadedVersion,
      click: () => installDownloadedUpdate()
    },
    { type: 'separator' },
    {
      label: 'Start on Windows Login',
      type: 'checkbox',
      checked: getStartOnBoot(),
      click: (item) => setStartOnBoot(item.checked)
    },
    {
      label: 'Show Widget',
      click: () => {
        if (!mainWindow) return;
        mainWindow.show();
        mainWindow.focus();
      }
    },
    {
      label: 'Send to Tray',
      click: () => {
        if (!mainWindow) return;
        mainWindow.hide();
      }
    },
    { type: 'separator' },
    {
      label: 'Exit',
      click: () => app.quit()
    }
  ]);

  tray.setContextMenu(contextMenu);
  tray.setToolTip(`Wall Calendar Widget (${overlayMode ? 'Overlay' : 'Desktop'} mode)`);
}

function setupAutoUpdater() {
  if (!app.isPackaged) return;

  autoUpdater.autoDownload = true;
  autoUpdater.autoInstallOnAppQuit = true;

  autoUpdater.on('update-available', (info) => {
    if (tray && process.platform === 'win32' && typeof tray.displayBalloon === 'function') {
      tray.displayBalloon({
        title: 'Wall Calendar Widget',
        content: `Downloading update ${info.version}...`
      });
    }
  });

  autoUpdater.on('update-downloaded', (info) => {
    updateDownloadedVersion = info.version || 'latest';
    updateTrayMenu();

    if (tray && process.platform === 'win32' && typeof tray.displayBalloon === 'function') {
      tray.displayBalloon({
        title: 'Update Ready',
        content: `Version ${updateDownloadedVersion} is ready. Use tray menu to install.`
      });
    }
  });

  autoUpdater.on('error', () => {
    // Keep silent; update checks are background-only.
  });

  setTimeout(() => checkForUpdates(), 8000);
  updateCheckTimer = setInterval(() => checkForUpdates(), 1000 * 60 * 60 * 6);
}

function createWindow() {
  const saved = readState();
  const initial = saved?.bounds || getDefaultBounds();
  overlayMode = !!saved?.overlayMode;

  mainWindow = new BrowserWindow({
    width: initial.width,
    height: initial.height,
    x: initial.x,
    y: initial.y,
    minWidth: 360,
    minHeight: 560,
    frame: false,
    titleBarStyle: 'hidden',
    autoHideMenuBar: true,
    transparent: false,
    backgroundColor: '#EFEFEF',
    resizable: true,
    movable: true,
    alwaysOnTop: false,
    skipTaskbar: false,
    maximizable: false,
    fullscreenable: false,
    icon: fs.existsSync(ICON_ICO) ? ICON_ICO : undefined,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
      sandbox: false,
      devTools: true
    }
  });

  Menu.setApplicationMenu(null);
  app.setAppUserModelId('WallCalendar.Widget');

  applyOverlayMode(overlayMode);

  mainWindow.loadURL(`${WIDGET_URL}?widget=1`);

  mainWindow.on('move', queueStateSave);
  mainWindow.on('resize', queueStateSave);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

function registerIpc() {
  ipcMain.on('widget:hide', () => {
    if (!mainWindow) return;
    mainWindow.hide();
  });

  ipcMain.on('widget:show', () => {
    if (!mainWindow) return;
    mainWindow.show();
    mainWindow.focus();
  });

  ipcMain.on('widget:toggle-overlay', () => {
    applyOverlayMode(!overlayMode);
  });

  ipcMain.handle('widget:set-overlay', (_event, enabled) => {
    applyOverlayMode(!!enabled);
    return overlayMode;
  });

  ipcMain.handle('widget:get-overlay', () => overlayMode);
  ipcMain.handle('widget:check-updates', () => {
    checkForUpdates();
    return true;
  });
  ipcMain.handle('widget:install-update', () => {
    installDownloadedUpdate();
    return !!updateDownloadedVersion;
  });
}

function registerShortcuts() {
  globalShortcut.register('CommandOrControl+Shift+W', () => {
    applyOverlayMode(!overlayMode);
  });

  globalShortcut.register('CommandOrControl+Shift+D', () => {
    if (!mainWindow) return;
    if (mainWindow.webContents.isDevToolsOpened()) {
      mainWindow.webContents.closeDevTools();
    } else {
      mainWindow.webContents.openDevTools({ mode: 'detach' });
    }
  });

  globalShortcut.register('CommandOrControl+Shift+H', () => {
    if (!mainWindow) return;
    mainWindow.show();
    mainWindow.focus();
  });

  globalShortcut.register('Escape', () => {
    if (!mainWindow) return;
    mainWindow.hide();
  });
}

app.whenReady().then(() => {
  createWindow();
  registerIpc();
  registerShortcuts();
  setupAutoUpdater();

  tray = new Tray(createTrayImage());
  updateTrayMenu();

  if (process.platform === 'win32' && typeof tray.displayBalloon === 'function') {
    tray.displayBalloon({
      title: 'Wall Calendar Widget',
      content: 'Widget is running in tray. Use Ctrl+Shift+H to show it anytime.'
    });
  }

  tray.on('click', () => {
    if (!mainWindow) return;
    if (mainWindow.isVisible()) {
      mainWindow.focus();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('will-quit', () => {
  clearTimeout(saveTimer);
  if (updateCheckTimer) clearInterval(updateCheckTimer);
  writeState();
  globalShortcut.unregisterAll();
});

app.on('window-all-closed', () => {
  // Keep app active in tray for widget behavior.
});
