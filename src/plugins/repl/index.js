import webRepl from './webRepl'
import serialRepl from "./serialRepl"

var REPL = {};

const WEBREPL = 0;
const SERIALREPL = 1;

REPL.install = function (Vue) {
  Vue.prototype.$ws = null;

  // data transfer protocl
  Vue.prototype.$dtp = {
    binaryState: 0,
    getFilename: null,
    getFileData: null,
    putFilename: null,
    putFileData: null,
    recData: null,
    fragments: ""
  }

  Vue.prototype.$repl = {
    passwd: "",
    url: "",
    term: null,
    connected: false,
    connectionType: WEBREPL,
    tasklock: false,
  };

  Vue.prototype.$replExec = null;

  Vue.prototype.$replStart = function () {
    let handlers = this.$repl.connectionType === SERIALREPL ? serialRepl : webRepl;
    this.$ws = new WebSocket(this.$repl.url);
    this.$ws.binaryType = "arraybuffer";
    this.$repl.term.attach(this.$ws, true, true);
    this.$ws.onmessage = handlers.onMessage.bind(this);
    this.$ws.onopen = handlers.onOpen.bind(this);
    this.$ws.onclose = handlers.onClose.bind(this);
    this.$replExec = handlers.replExec.bind(this);

    this.$replSetupFTP(handlers);
  };

  Vue.prototype.$replStop = function () {
    this.$ws.close();
  };

  Vue.prototype.$replSetupFTP = function (handlers) {
    this.$replPutFile = handlers.putFile.bind(this);
    this.$replGetFile = handlers.getFile.bind(this);
  }

  Vue.prototype.$replPutFile = null;
  Vue.prototype.$replGetFile = null;

}

export default REPL;