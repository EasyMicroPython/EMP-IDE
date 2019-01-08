var signals = {
  methods: {
    //打开设置窗口,点击设置按钮时触发
    SIGNAL_CONNECT_TO_DEVICE(sender, receiver = 'terminal', slot = 'slotConnectToDevice') {
      return {
        event: "connectToDevice",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          url: this.url,
          passwd: this.passwd,
        }
      }
    },

    SIGNAL_DISCONNECT(sender, receiver = 'terminal', slot = 'slotDisconnect') {
      return {
        event: "disconnect",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_TOGGLE_SETTINGS(sender, receiver = 'parent', slot = 'slotToggleSettings') {
      return {
        event: "toggleSettings",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_APPLY_FONTSIZE(sender, receiver = 'editor', slot = 'slotApplyFontSize') {
      return {
        event: "applyFontSize",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          fontSize: this.fontSize
        }
      }
    },

    // SIGNAL_ADJUST_MEMLIMIT(sender, receiver = 'terminal', slot = 'slotAdjustMemLimit'){
    //   return{
    //     event: "adjustMemLimit",
    //     sender: sender,
    //     receiver: receiver,
    //     slot: slot,
    //     kwargs: {
    //       memLimit: this.fontSize
    //     }
    //   }
    // }

  }
}

export default signals
