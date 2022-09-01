var slots = {
  methods: {
    //打开设置窗口,点击设置按钮时触发
    slotConnected() {
      this.connected = true;
    },

    slotDisconnected() {
      this.connected = false;
    },

    slotShowMemoryStatus(kwargs) {
      this.memoryStatus = kwargs.data;
    },

    slotShowSysInfo(kwargs) {
      this.sysInfo = kwargs.data;
      if (kwargs.data.platform === 'esp8266') {
        // todo
        this.$send(this.SIGNAL_ADJUST_MEMLIMIT(this))
      }
    }

  }
}

export default slots
