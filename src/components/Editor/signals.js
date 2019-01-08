var signals = {
  methods: {
    SIGNAL_CLEAR_TERM(sender, receiver = 'terminal', slot = 'slotClearTerm') {
      return {
        event: "clearTerm",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          who: 'editor'
        }
      }
    },
    SIGNAL_UNLOCK(sender, receiver = 'parent', slot = 'slotUnlock'){
      return {
        event: "unlock",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_SAVE_FILE(sender, receiver = 'terminal', slot = 'slotPutFile'){
      var fileData = new TextEncoder().encode(
        this.code.replace(/\r\n/g, "\n")
      );
    
      return {
        event: "saveFile",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          filename: this.openedFile,
          fileData: fileData
        }
      }
    },

  }
}

export default signals
