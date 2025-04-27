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
        preload: path.join(__dirname, 'preload.js')
    }
  })

  if (isDev) {
    // win.webContents.openDevTools();
  }

  win.loadFile('./src/index.html')
}
// CREATE DEEPCODING WINDOW
const createDeepCodingWindow = () => {
    const win = new BrowserWindow({
      title: 'DeepCoder',
      width: 800,
      height: 600,
      webPreferences: {
          preload: path.join(__dirname, 'preload.js')
      }
    })
  
    if (isDev) {
      // win.webContents.openDevTools();
    }
  
    win.loadFile('./src/deepcoding.html')
}
//APP IS READY
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})