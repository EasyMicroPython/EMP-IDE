
var handleConnection = {
  data() {
    return {
      binaryState: 0,
      recData: null,
      putFilename: null,
      putFileData: null,
      getFilename: null,
      getFileData: null,
      chunks: ""
    };
  },

  methods: {
    onOpen: function() {
      this.term.focus();
      this.term.write("\x1b[34;2mWelcome to 1ZLAB-this.$empIDE!\x1b[m\r\n");

      this.ws.onmessage = this.onMessage;
      this.ws.send(this.passwd + "\r");
      // this.ws.send("tree()\r");
      this.ws.send(this.$emp.deviceInfo());
      this.ws.send(this.$emp.memoryStatus());
      this.ws.send(this.$emp.tree());

      this.$toast.success("WebREPL connected!");
      if (this.ws.readyState === 1) {
        this.$send(this.SIGNAL_REPORT_CONNECTED(this));
        this.wsConnected = true;
      }
    },

    onMessage: function(event) {
      if (event.data instanceof ArrayBuffer) {
        var data = new Uint8Array(event.data);
        switch (this.binaryState) {
          case 11:
            // first response for put
            if (this.decodeResp(data) == 0) {
              // send file data in chunks
              for (
                var offset = 0;
                offset < this.putFileData.length;
                offset += 1024
              ) {
                this.ws.send(this.putFileData.slice(offset, offset + 1024));
              }
              this.binaryState = 12;
            }

            break;
          case 12:
            // final response for put
            this.$send(this.SIGNAL_UNLOCK(this));
            if (this.decodeResp(data) == 0) {
              this.$toast.success(
                "success! " +
                  this.putFileName +
                  ", " +
                  this.putFileData.length +
                  " bytes"
              );
              this.putFileData = null;
              this.putFileName = "";
            } else {
              this.$toast.error("Failed sending " + this.putFileName);
            }
            this.binaryState = 0;
            this.ws.send("\r\r");
            // this.ws.send('tree()\r');
            this.ws.send(this.$emp.tree());
            setTimeout(() => this.$send(this.SIGNAL_PUT_NEXT_FILE(this)), 300);
            setTimeout(() => this.slotClearTerm(), 300);

            break;

          case 21:
            // first response for get
            if (this.decodeResp(data) == 0) {
              this.binaryState = 22;
              let rec = new Uint8Array(1);
              rec[0] = 0;
              this.ws.send(rec);
            }
            break;

          case 22: {
            // file data
            var sz = data[0] | (data[1] << 8);
            if (data.length == 2 + sz) {
              // we assume that the data comes in single chunks
              if (sz == 0) {
                // end of file
                this.binaryState = 23;
              } else {
                // accumulate incoming data to this.getFileData
                var new_buf = new Uint8Array(this.getFileData.length + sz);
                new_buf.set(this.getFileData);
                new_buf.set(data.slice(2), this.getFileData.length);
                this.getFileData = new_buf;
                // this.$toast.info('Getting ' + this.getFilename + ', ' + this.getFileData.length + ' bytes');
                var rec = new Uint8Array(1);
                rec[0] = 0;
                this.ws.send(rec);
              }
            } else {
              this.binaryState = 0;
            }
            break;
          }
          case 23:
            // final response
            // this.$send(this.SIGNAL_UNLOCK(this)); 为什么在这里无法调用 send函数?
            if (this.decodeResp(data) == 0) {
              this.$toast.success(
                "Got " +
                  this.getFilename +
                  ", " +
                  this.getFileData.length +
                  " bytes"
              );
              var code = new TextDecoder("utf-8").decode(this.getFileData);
              this.$send(this.SIGNAL_SHOW_CODES(this, code));
            } else {
              this.$toast.error("Failed getting " + this.getFilename);
            }
            this.getFileData = null;
            this.getFilename = null;
            this.binaryState = 0;
            this.ws.send("\r\r");

            setTimeout(() => this.slotClearTerm(), 300);
            break;
        }
      }

      try {
        this.recData = JSON.parse(event.data);
        if (this.recData.func === this.$emp.funcName(this.$emp.tree)) {
          this.$send(this.SIGNAL_UPDATE_TREE(this, [this.recData.data]));
          this.$send(this.SIGNAL_UPDATE_FINDER(this, this.recData.data));
          this.$send(this.SIGNAL_SHOW_PANE(this));
        }
        if (this.recData.func === this.$emp.funcName(this.$emp.getCode))
          this.$send(this.SIGNAL_SHOW_CODES_PMAX(this, this.recData.data));
        if (this.recData.func === this.$emp.funcName(this.$emp.memoryAnalysing))
          this.$send(
            this.SIGNAL_DEPENDS_ON_MEMORY_TO_GET_FILE(this, this.recData.data)
          );
        if (this.recData.func === this.$emp.funcName(this.$emp.deviceInfo))
          this.$send(this.SIGNAL_SHOW_SYS_INFO(this, this.recData.data));
        if (this.recData.func === this.$emp.funcName(this.$emp.memoryStatus))
          this.$send(this.SIGNAL_SHOW_MEMORY_STATUS(this, this.recData.data));
      } catch (e) {
        // 容错处理放在这儿
        if (event.data.indexOf("Traceback (most recent call last):") >= 0) {
          this.$send(this.SIGNAL_UNLOCK(this));
        }
      }
    },

    onClose: function() {
      this.wsConnected = false;
      this.$send(this.SIGNAL_REPORT_DISCONNECTED(this));
      this.$toast.error("Disconnected");
      if (this.term) {
        this.term.write("\r\n\x1b[31mDisconnected\x1b[m\r\n");
      }
    },

    decodeResp(data) {
      if (data[0] == "W".charCodeAt(0) && data[1] == "B".charCodeAt(0)) {
        var code = data[2] | (data[3] << 8);
        return code;
      } else {
        return -1;
      }
    }
  }
};

export default handleConnection;
