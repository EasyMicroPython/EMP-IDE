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
    taskLock: false,
  };

  Vue.prototype.$lockRepl = function () {
    this.$repl.taskLock = true;
  };

  Vue.prototype.$unlockRepl = function () {
    this.$repl.taskLock = false;
  };

  Vue.prototype.$replStart = function () {
    let handlers = this.$repl.connectionType === SERIALREPL ? serialRepl : webRepl;
    this.$ws = new WebSocket(this.$repl.url);
    this.$ws.binaryType = "arraybuffer";
    this.$repl.term.attach(this.$ws, true, true);
    this.$ws.onmessage = handlers.onMessage.bind(this);
    this.$ws.onopen = handlers.onOpen.bind(this);
    this.$ws.onclose = handlers.onClose.bind(this);

  };

  Vue.prototype.$replStop = function () {
    this.$ws.close();
  };

  Vue.prototype.$replSetupFTP = function (handlers) {
    this.$replPutFile = handlers.putFile;
    this.$replGetFile = handlers.getFile;
  }

  Vue.prototype.$replPutFile = null;
  Vue.prototype.$replGetFile = null;

}

export default REPL;