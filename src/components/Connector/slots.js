var slots = {
  methods: {
    slotToggleShow() {
      this.show = !this.show;
    },

    slotSendCommands(kwargs) {
      if (!this.tasklock) {
        this.$ws.send(kwargs.command);
        if (kwargs.command.startsWith(this.$emp.funcName(this.$emp.memoryAnalysing))) {
          this.$send(this.SIGNAL_LOCK(this));
        }
      } else this.$toast.error("IO busy");
    },

    slotPutFile(kwargs) {
      this.$replPutFile(kwargs);
    },

    slotGetFile(kwargs) {
      this.$replGetFile(kwargs);
    },

    slotDependsOnMemoryToGetFile(kwargs) {
      this.$dtp.getFilename = kwargs.filename;

      var mf = kwargs.mf;

      var fsize = kwargs.fsize;

      if (fsize < this.memLimit * mf) {
        this.$ws.send(this.$emp.getCode(kwargs.filename));
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