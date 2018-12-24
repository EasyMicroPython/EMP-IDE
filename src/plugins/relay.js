  var Relay = {};


  Relay.install = function (Vue) {

    Vue.prototype.$ws = null;

    Vue.prototype.$open = function (url, onOpen, onMessage, onClose) {
      if (this.$ws === null) {
        this.$ws = new WebSocket(url);
        this.$ws.binaryType = "arraybuffer";
        this.$ws.onOpen = onOpen;
        this.$ws.onMessage = onMessage;
        this.$ws.onClose = onClose;
      }
    }

    Vue.prototype.$close = function () {
      if (this.$ws != null) {
        this.$ws.close();
      }
    }

    Vue.prototype.$getFile = function (filename, func) {
      if (this.$ws != null) {
        func(filename);
      }
    }

    Vue.prototype.$putFile = function (filename, func) {
      if (this.$ws != null) {
        func(filename)
      }
    }

    Vue.prototype.$excute = function () {

    }

  }

  export default Relay;