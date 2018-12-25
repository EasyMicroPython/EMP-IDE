var Messenger = {};


Messenger.install = function (Vue) {
  Vue.prototype.$ws = {
    _ws: null,
    binaryState: 0,
    recData: null,
    putFilename: null,
    putFileData: null,
    getFilename: null,
    getFileData: null,
    
    open: function (url, handlers) {
      if (this.$ws._ws === null) {
        this.$ws._ws = new WebSocket(url);
        this.$ws._ws.binaryType = "arraybuffer";
        this.$ws._ws.onopen = handlers.onOpen;
        this.$ws._ws.onmessage = handlers.onMessage;
        this.$ws._ws.onclose = handlers.onClose;
      }
    },

    close: function () {
      if (this.$ws._ws instanceof WebSocket)
        this.$ws._ws.close();
    },
    send: function (data) {
      if (this.$ws._ws instanceof WebSocket)
        this.$ws._ws.send(data)
    }
  }


  Vue.prototype.$messenger = {
    setHandlers: function (handlers) {
      this.excute = handlers.excute;
      this.getFile = handlers.getFile;
      this.putFile = handlers.putFile;
    },
    excute: null,
    getFile: null,
    putFile: null
  }
}

export default Messenger;