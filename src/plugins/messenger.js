var Messenger = {};


Messenger.install = function (Vue) {
  Vue.prototype.$ws = {
    _ws: null,
    term: null,
    connected: false,
    binaryState: 0,
    recData: null,
    putFilename: null,
    putFileData: null,
    getFilename: null,
    getFileData: null,

    open: function (context, url, handlers) {
      if (context.$ws._ws === null) {
      context.$ws._ws = new WebSocket(url);
      context.$ws._ws.binaryType = "arraybuffer";
      context.$ws._ws.onmessage = handlers.onMessage.bind(context);
      context.$ws._ws.onopen = handlers.onOpen.bind(context);
      context.$ws._ws.onclose = handlers.onClose.bind(context);
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