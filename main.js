const { app, BrowserWindow } = require('electron')
const path = require('path')
const config = require('./config.js')

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: config.width,
    height: config.height,
    webPreferences: { preload: path.join(__dirname, 'preload.js') }
  })

  mainWindow.loadURL(config.url)

  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
