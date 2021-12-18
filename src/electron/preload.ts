
import {contextBridge, ipcRenderer} from 'electron';

// console.log('333');
// console.log(process);
// window.onload = function onload () {
//     const dom = document.createElement('div');
//     dom.setAttribute('style', 'display:none');
//     dom.id = 'versions';
//     dom.innerHTML = JSON.stringify({
//         versions: process.versions,
//         platform: process.platform,
//         ppid: process.ppid,
//         pid: process.pid,
//     });
//     document.body.appendChild(dom);
// };

contextBridge.exposeInMainWorld('electron', {
    process: {
        versions: process.versions,
        platform: process.platform,
        ppid: process.ppid,
        pid: process.pid,
    },
    test: () => ipcRenderer.invoke('test')
});

