let webRepl = {
  onOpen: function () {
    this.$repl.term.focus();
    this.$repl.term.write("Welcome to 1ZLAB-EMPIDE!\r\n");

    if (this.$repl.connectionType === 0)
      this.$ws.send(this.$repl.passwd + "\r");
    this.$ws.send(this.$emp.deviceInfo());
    this.$ws.send(this.$emp.memoryStatus());
    this.$ws.send(this.$emp.tree());

    this.$toast.success("WebREPL connected!");
    if (this.$ws.readyState === 1) {
      this.$send(this.SIGNAL_REPORT_CONNECTED(this));
      this.$repl.connected = true;
      this.connected = true;
    }
  },

  onMessage: function (event) {
    if (event.data instanceof ArrayBuffer) {
      var data = new Uint8Array(event.data);
      switch (this.$dtp.binaryState) {
        case 11:
          // first response for put
          if (this.decodeResp(data) == 0) {
            // send file data in chunks
            for (
              var offset = 0; offset < this.$dtp.putFileData.length; offset += 1024
            ) {
              this.$ws.send(this.$dtp.putFileData.slice(offset, offset + 1024));
            }
            this.$dtp.binaryState = 12;
          }

          break;
        case 12:
          // final response for put
          this.$send(this.SIGNAL_UNLOCK(this));
          if (this.decodeResp(data) == 0) {
            this.$toast.success(
              "success! " +
              this.$dtp.putFilename +
              ", " +
              this.$dtp.putFileData.length +
              " bytes"
            );
            this.$dtp.putFileData = null;
            this.$dtp.putFilename = "";
          } else {
            this.$toast.error("Failed sending " + this.$dtp.putFilename);
          }
          this.$dtp.binaryState = 0;
          this.$ws.send("\r\r");
          // this.$ws.send('tree()\r');
          this.$ws.send(this.$emp.tree());
          setTimeout(() => this.$send(this.SIGNAL_PUT_NEXT_FILE(this)), 300);
          setTimeout(() => this.slotClearTerm(), 300);

          break;

        case 21:
          // first response for get
          if (this.decodeResp(data) == 0) {
            this.$dtp.binaryState = 22;
            let rec = new Uint8Array(1);
            rec[0] = 0;
            this.$ws.send(rec);
          }
          break;

        case 22:
          {
            // file data
            var sz = data[0] | (data[1] << 8);
            if (data.length == 2 + sz) {
              // we assume that the data comes in single chunks
              if (sz == 0) {
                // end of file
                this.$dtp.binaryState = 23;
              } else {
                // accumulate incoming data to this.$dtp.getFileData
                var new_buf = new Uint8Array(this.$dtp.getFileData.length + sz);
                new_buf.set(this.$dtp.getFileData);
                new_buf.set(data.slice(2), this.$dtp.getFileData.length);
                this.$dtp.getFileData = new_buf;
                // this.$toast.info('Getting ' + this.$dtp.getFilename + ', ' + this.$dtp.getFileData.length + ' bytes');
                var rec = new Uint8Array(1);
                rec[0] = 0;
                this.$ws.send(rec);
              }
            } else {
              this.$dtp.binaryState = 0;
            }
            break;
          }
        case 23:
          // final response
          // this.$send(this.SIGNAL_UNLOCK(this)); 为什么在这里无法调用 send函数?
          if (this.decodeResp(data) == 0) {
            this.$toast.success(
              "Got " +
              this.$dtp.getFilename +
              ", " +
              this.$dtp.getFileData.length +
              " bytes"
            );
            var code = new TextDecoder("utf-8").decode(this.$dtp.getFileData);
            this.$send(this.SIGNAL_SHOW_CODES(this, code));
          } else {
            this.$toast.error("Failed getting " + this.$dtp.getFilename);
          }
          this.$dtp.getFileData = null;
          this.$dtp.getFilename = null;
          this.$dtp.binaryState = 0;
          this.$ws.send("\r\r");

          setTimeout(() => this.slotClearTerm(), 300);
          break;
      }
    }
    // console.log(event.data.length)
    try {
      // console.log(event.data)
      this.$dtp.recData = JSON.parse(event.data);
      if (this.$dtp.recData.func === this.$emp.funcName(this.$emp.tree)) {
        this.$send(this.SIGNAL_UPDATE_TREE(this, [this.$dtp.recData.data]));
        this.$send(this.SIGNAL_UPDATE_FINDER(this, this.$dtp.recData.data));
        this.$send(this.SIGNAL_SHOW_PANE(this));
      }
      if (this.$dtp.recData.func === this.$emp.funcName(this.$emp.getCode))
        this.$send(this.SIGNAL_SHOW_CODES_PMAX(this, this.$dtp.recData.data));
      if (this.$dtp.recData.func === this.$emp.funcName(this.$emp.memoryAnalysing))
        this.$send(
          this.SIGNAL_DEPENDS_ON_MEMORY_TO_GET_FILE(this, this.$dtp.recData.data)
        );
      if (this.$dtp.recData.func === this.$emp.funcName(this.$emp.deviceInfo))
        this.$send(this.SIGNAL_SHOW_SYS_INFO(this, this.$dtp.recData.data));
      if (this.$dtp.recData.func === this.$emp.funcName(this.$emp.memoryStatus))
        this.$send(this.SIGNAL_SHOW_MEMORY_STATUS(this, this.$dtp.recData.data));
    } catch (e) {
      // 容错处理放在这儿
      if (event.data.indexOf("Traceback (most recent call last):") >= 0) {
        this.$send(this.SIGNAL_UNLOCK(this));
      }
    }
    this.$dtp.fragments += event.data;
    // console.log(countString(this.$dtp.fragments, '[+emp pdu+]'));
    // if (this.$dtp.fragments.indexOf('[+emp pdu+]') > 0)
    //   console.log(this.$dtp.fragments);
    if (countString(this.$dtp.fragments, '[+emp pdu+]') === 2) {

      this.$dtp.fragments = this.$dtp.fragments.split('[+emp pdu+]')[1];

      this.$dtp.fragments = this.$dtp.fragments.replace(/\r\n/g, '\\n');
      this.$dtp.fragments = this.$dtp.fragments.slice(4, this.$dtp.fragments.length - 4);
      console.log(this.$dtp.fragments);
      let recData = JSON.parse(this.$dtp.fragments);
      // console.log(recData.data);
      if (recData.func === this.$emp.funcName(this.$emp.tree)) {
        this.$send(this.SIGNAL_UPDATE_TREE(this, [recData.data]));
        this.$send(this.SIGNAL_UPDATE_FINDER(this, recData.data));
        this.$send(this.SIGNAL_SHOW_PANE(this));
      }
      if (recData.func === this.$emp.funcName(this.$emp.getCode)) {

        this.$send(this.SIGNAL_SHOW_CODES_PMAX(this, recData));
      }
      if (recData.func === this.$emp.funcName(this.$emp.memoryAnalysing))
        this.$send(
          this.SIGNAL_DEPENDS_ON_MEMORY_TO_GET_FILE(this, recData.data)
        );
      if (recData.func === this.$emp.funcName(this.$emp.deviceInfo))
        this.$send(this.SIGNAL_SHOW_SYS_INFO(this, recData.data));
      if (recData.func === this.$emp.funcName(this.$emp.memoryStatus))
        this.$send(this.SIGNAL_SHOW_MEMORY_STATUS(this, recData.data));

      this.$dtp.fragments = "";

    }
  },

  onClose: function () {
    this.$repl.connected = false;
    this.connected = false;
    this.$send(this.SIGNAL_REPORT_DISCONNECTED(this));
    this.$toast.error("Disconnected");
    if (this.$repl.term) {
      this.$repl.term.write("\r\n\x1b[31mDisconnected\x1b[m\r\n");
    }
  },

  decodeResp(data) {
    if (data[0] == "W".charCodeAt(0) && data[1] == "B".charCodeAt(0)) {
      var code = data[2] | (data[3] << 8);
      return code;
    } else {
      return -1;
    }
  },


}

let countString = function (string, subString) {

  string += "";
  subString += "";
  let n = 0;
  let pos = 0;
  if (subString.length <= 0)
    return 0
  while (true) {
    pos = string.indexOf(subString, pos);
    if (pos >= 0) {
      n += 1;
      pos += 1;

    } else break
  }
  return n;
};

export default webRepl