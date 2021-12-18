import {app, BrowserWindow, ipcMain, nativeTheme, Menu, MenuItem} from 'electron';
import isDev from 'electron-is-dev';
import {resolve} from 'path';
import process from 'process';
import path from 'path';

const provideEvent = () => {
    ipcMain.handle('test', () => {
        return 12313;
    });
};

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {               // 网页功能设置
            nodeIntegration: true,      // 是否在node工作器中启用工作集成默认false
            // enableRemoteModule: true,   // 是否启用remote模块默认false
            preload: path.resolve(__dirname, 'preload.js')
        }
    });

    if (isDev) {
        win.webContents.openDevTools(); //打开控制台
        win.loadURL('http://localhost:3333');
    } else {
        win.loadFile(resolve(__dirname, '../dist-react/index.html'));
    }

    provideEvent();
    return win;
};


app.whenReady().then(() => {
    console.log(`平台:${process.platform}`);
    // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; // 关闭web安全警告
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

});

app.on('window-all-closed', function () {
    // 针对 macOS，在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序。
    if (process.platform !== 'darwin') app.quit();
});




