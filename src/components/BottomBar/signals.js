var signals = {
  methods: {
    //打开设置窗口,点击设置按钮时触发
    SIGNAL_OPENSET(sender, receiver = 'parent', slot = 'slotToggleSettings') {
      return {
        event: "openset",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          show: this.showSetting
        }
      }
    },
    SIGNAL_TOGGLE_TERM(sender, receiver = 'splitHorizontal', slot = 'slotToggleTerm') {
      return {
        event: "toggleTerm",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_ADJUST_MEMLIMIT(sender, receiver = 'cli', slot = 'slotAdjustMemLimit') {
      return {
        event: "adjustMemLimit",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          memLimit: 0.001
        }
      }
    }

  }
}

export default signals
