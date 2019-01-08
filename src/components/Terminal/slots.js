var slots = {
  methods: {
    slotToggleTermVisible() {
      this.termVisible = !this.termVisible;
    },

    slotToggleConfig() {
      this.showConfig = !this.showConfig;
    },

    slotResizeTerm() {
      // this.term.resize(20,1);
      this.term.fit();
    },

    slotClearTerm() {
      this.term.clear();
    },

    slotSendCommands(kwargs) {
      if (!this.tasklock) {
        this.ws.send(kwargs.command);
        if (kwargs.command.startsWith(this.$emp.funcName(this.$emp.memoryAnalysing))) {
          this.$send(this.SIGNAL_LOCK(this));
        }
      } else this.$toast.error("IO busy");
    },

    slotPutFile(kwargs) {
      if (!this.tasklock) {
        if (kwargs.fileData.length > 0) this.putFileData = kwargs.fileData;
        else {
          this.putFileData = new TextEncoder().encode(" ");
          kwargs.fileData = new TextEncoder().encode(" ");
        }

        var dest_fname = kwargs.filename;
        var dest_fsize = kwargs.fileData.length;

        // WEBREPL_FILE = "<2sBBQLH64s"
        var rec = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);
        rec[0] = "W".charCodeAt(0);
        rec[1] = "A".charCodeAt(0);
        rec[2] = 1; // put
        rec[3] = 0;
        rec[4] = 0;
        rec[5] = 0;
        rec[6] = 0;
        rec[7] = 0;
        rec[8] = 0;
        rec[9] = 0;
        rec[10] = 0;
        rec[11] = 0;
        rec[12] = dest_fsize & 0xff;
        rec[13] = (dest_fsize >> 8) & 0xff;
        rec[14] = (dest_fsize >> 16) & 0xff;
        rec[15] = (dest_fsize >> 24) & 0xff;
        rec[16] = dest_fname.length & 0xff;
        rec[17] = (dest_fname.length >> 8) & 0xff;
        for (var i = 0; i < 64; ++i) {
          if (i < dest_fname.length) {
            rec[18 + i] = dest_fname.charCodeAt(i);
          } else {
            rec[18 + i] = 0;
          }
        }

        // initiate put
        this.binaryState = 11;
        // this.show_message("Sending " + put_file_name + "...");
        this.$toast.info("Sending " + kwargs.filename + "...");
        this.$send(this.SIGNAL_LOCK(this));
        this.ws.send(rec);
      } else {
        this.$toast.error("IO busy");
      }
    },

    slotGetFile(kwargs) {
      var src_fname = kwargs.filename;
      // WEBREPL_FILE = "<2sBBQLH64s"
      var rec = new Uint8Array(2 + 1 + 1 + 8 + 4 + 2 + 64);
      rec[0] = "W".charCodeAt(0);
      rec[1] = "A".charCodeAt(0);
      rec[2] = 2; // get
      rec[3] = 0;
      rec[4] = 0;
      rec[5] = 0;
      rec[6] = 0;
      rec[7] = 0;
      rec[8] = 0;
      rec[9] = 0;
      rec[10] = 0;
      rec[11] = 0;
      rec[12] = 0;
      rec[13] = 0;
      rec[14] = 0;
      rec[15] = 0;
      rec[16] = src_fname.length & 0xff;
      rec[17] = (src_fname.length >> 8) & 0xff;
      for (var i = 0; i < 64; ++i) {
        if (i < src_fname.length) {
          rec[18 + i] = src_fname.charCodeAt(i);
        } else {
          rec[18 + i] = 0;
        }
      }
      // initiate get
      this.binaryState = 21;
      this.getFilename = src_fname;
      this.getFileData = new Uint8Array(0);
      this.$toast.info("Getting " + this.getFilename + "...");
      this.ws.send(rec);
    },

    slotDependsOnMemoryToGetFile(kwargs) {
      this.getFilename = kwargs.filename;

      var mf = kwargs.mf;

      var fsize = kwargs.fsize;

      if (fsize < this.memLimit * mf) {
        // this.ws.send('get_code(\'' + kwargs.filename + '\')\r');
        this.ws.send(this.$emp.getCode(kwargs.filename));
      } else {
        this.slotGetFile(kwargs);
      }
    },

    slotAdjustMemLimit(kwargs) {
      this.memLimit = kwargs.memLimit;
    }
  }
};

export default slots;