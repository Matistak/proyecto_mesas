import { contextBridge, ipcRenderer } from "electron";

// Ejemplo de API expuesta al renderer process
// Puedes agregar más métodos según necesites
contextBridge.exposeInMainWorld("electronAPI", {
  // Ejemplo: enviar mensajes al main process
  sendMessage: (channel: string, data: unknown) => {
    ipcRenderer.send(channel, data);
  },
  // Ejemplo: recibir mensajes del main process
  onMessage: (channel: string, callback: (...args: unknown[]) => void) => {
    ipcRenderer.on(channel, (_event, ...args) => callback(...args));
  },
});

export type ElectronAPI = {
  sendMessage: (channel: string, data: unknown) => void;
  onMessage: (channel: string, callback: (...args: unknown[]) => void) => void;
};
