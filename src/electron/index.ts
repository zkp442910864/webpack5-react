import {
    app, BrowserWindow, ipcMain, nativeTheme, Menu, MenuItem,
    shell, dialog
} from 'electron';
import isDev from 'electron-is-dev';
import {resolve} from 'path';
import process from 'process';
import path from 'path';
import fs from 'fs';

const provideEvent = () => {
    ipcMain.handle('test', () => {
        return 12313;
    });
};

const customMenu = () => {
    const menu = new Menu();
    menu.append(new MenuItem({
        label: '菜单',
        submenu: [{
            role: 'help',
            accelerator: process.platform === 'darwin' ? 'Alt+Cmd+I' : 'Alt+Shift+I',
            click: () => {console.log('Electron rocks!');}
        }]
    }));

    Menu.setApplicationMenu(menu);
};

// 离屏渲染，按帧截图
const offscreenTest = () => {
    const win = new BrowserWindow({
        show: false,
        frame: false,
        webPreferences: { offscreen: true }
    });
    win.loadURL('https://github.com/');
    win.webContents.on('paint', (event, dirty, image) => {
        fs.writeFileSync('ex.png', image.toPNG());
    });
    win.webContents.setFrameRate(60);
    console.log(`The screenshot has been successfully saved to ${path.join(process.cwd(), 'ex.png')}`);
};

// 设置进度
const setWinProBar = (win: BrowserWindow) => {
    let val = 0;
    const fn = () => {
        setTimeout(() => {
            val += 0.1;
            val = Math.min(val, 1);
            win.setProgressBar(val);

            if (val >= 1) {
                win.setProgressBar(-1);
            } else {
                fn();
            }
        }, 500);
    };

    fn();
};

// 创建文件
const createFile = () => {
    const fileName = 'recently-used.md';
    fs.writeFile(fileName, 'Lorem Ipsum', () => {
        console.log(process.cwd());
        console.log(__dirname);
        app.addRecentDocument(path.join(__dirname, '../', fileName));
    });
};

// 右键菜单
const rightContentMenu = (win: BrowserWindow) => {
    win.webContents.on('context-menu', (event, params) => {
        const menu = new Menu();

        menu.append(new MenuItem({
            label: '测试',
            click: () => {
                console.log('click test');
            }
        }));

        menu.popup();
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
    customMenu();
    return win;
};


const start = () => {
    // url启动应用 electron-fiddle://open
    const gotTheLock = app.requestSingleInstanceLock();
    let mainWindow: BrowserWindow | null;

    app.disableHardwareAcceleration();
    createFile();

    if (process.defaultApp) {
        if (process.argv.length >= 2) {
            app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])]);
        }
    } else {
        app.setAsDefaultProtocolClient('electron-fiddle');
    }

    if (!gotTheLock) {
        app.quit();
    } else {
        app.on('second-instance', (event, commandLine, workingDirectory) => {
            // 用户正在尝试运行第二个实例，我们需要让焦点指向我们的窗口
            if (mainWindow) {
                if (mainWindow.isMinimized()) mainWindow.restore();
                mainWindow.focus();
            }
        });

        // 处理协议。 在本例中，我们选择显示一个错误提示对话框。
        app.on('open-url', (event, url) => {
            console.log(1);
            dialog.showErrorBox('欢迎回来', `导向自: ${url}`);
        });
    }

    app.on('window-all-closed', function () {
        // 针对 macOS，在Windows和Linux上，关闭所有窗口通常会完全退出一个应用程序。
        if (process.platform !== 'darwin') app.quit();
    });

    app.whenReady().then(() => {
        console.log(`平台:${process.platform}`);
        // process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'; // 关闭web安全警告
        mainWindow = createWindow();

        setWinProBar(mainWindow);

        // rightContentMenu(mainWindow);

        // offscreenTest();

        app.on('activate', () => {
            if (BrowserWindow.getAllWindows().length === 0) {
                createWindow();
            }
        });
    });
};


start();






