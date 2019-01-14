var signals = {
  methods: {
    //打开设置窗口,点击设置按钮时触发
    SIGNAL_PUT_FILE(sender, receiver = 'connector', slot = 'slotPutFile') {
      return {
        event: "putFile",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          filename: this.putFilename[this.index],
          fileData: this.putFileData[this.index]
        }
      }
    },


  }
}

export default signals
