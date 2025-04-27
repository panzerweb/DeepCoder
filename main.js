const { app, BrowserWindow, ipcMain} = require('electron')
const path = require('node:path')

const isDev = process.env.NODE_ENV !== 'production';
//CREATE MAIN WINDOW
const createWindow = () => {
  const win = new BrowserWindow({
    title: 'DeepCoder',
    width: 800,
    height: 600,
    webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        nodeIntegration: false,
        contextIsolation: true, // This should be true to avoid mixing the contexts
    }
  })

  if (isDev) {
    // win.webContents.openDevTools();
  }

  win.loadFile('./src/index.html')
}
// CREATE DEEPCODING WINDOW
const createSuperDeepCodingWindow = () => {
    const win = new BrowserWindow({
      title: 'Super Deep Coding',
      width: 800,
      height: 600,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js'),
          nodeIntegration: false,
          contextIsolation: true, // This should be true to avoid mixing the contexts
      }
    })
  
    if (isDev) {
      // win.webContents.openDevTools();
    }
  
    win.loadFile('./src/supercode.html')
}
//APP IS READY
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()
    
    // Opens supercode.html
    ipcMain.on('open-super-window', () => {
      createSuperDeepCodingWindow();
    })

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})