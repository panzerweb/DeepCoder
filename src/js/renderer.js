// =========Testing Purposes ONLY=============
// const information = document.getElementById('info')
// information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`
const { ipcRenderer } = require('electron');

const func = async () => {
    const response = await window.versions.ping()
    console.log(response) // prints out 'pong'
  }
  
func()

// Sends a response to main.js to open supercode.html
document.getElementById('openSuperWindow').addEventListener('click', (event) => {
  event.preventDefault(); // Prevents the default action of the anchor tag
  ipcRenderer.send('open-super-window'); // Send IPC event to main process
});


// Rendering UI
console.log("Hello World")