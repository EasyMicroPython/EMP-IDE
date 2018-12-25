import wsHandlers from './wshandler'


var REPL = {};

const WEBREPL = 0;
const SERIALREPL = 1;

REPL.install = function (Vue) {
  Vue.prototype.$ws = null;
  Vue.prototype.$connected = false;
  Vue.prototype.$binaryState = 0;
  Vue.prototype.$recData = null;
  // Vue.prototype.$term = null;


  Vue.prototype.$replType = WEBREPL;

  Vue.prototype.$repl = {
    passwd: "",
    url: "",
    term: null,
  };

  Vue.prototype.$replStart = function (handlers = wsHandlers) {
    // console.log(this);
    if (this.$ws === null) {
      this.$ws = new WebSocket(this.$repl.url);
      this.$ws.binaryType = "arraybuffer";
      this.$ws.onmessage = handlers.onMessage.bind(this);
      this.$ws.onopen = handlers.onOpen.bind(this);
      this.$ws.onclose = handlers.onClose.bind(this);
    }
  };

  Vue.prototype.$replStop = function () {

  };

  Vue.prototype.$replFTP = function (handlers) {
    this.$replPutFile = handlers.putFile;
    this.$replGetFile = handlers.getFile;
  }

  Vue.prototype.$replPutFile = null;
  Vue.prototype.$replGetFile = null;

}

export default REPL;