var signals = {
  methods: {
    SIGNAL_REPORT_CONNECTED(sender, receiver = 'bottomBar', slot = 'slotConnected') {
      return {
        event: "reportConnected",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },
    SIGNAL_REPORT_DISCONNECTED(sender, receiver = 'bottomBar', slot = 'slotDisconnected') {
      return {
        event: "reportDisconnected",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_UPDATE_TREE(sender, data = null, receiver = 'folderTree', slot = 'slotUpdateTree') {
      return {
        event: "updateTree",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          treeData: data
        }
      }
    },

    SIGNAL_UPDATE_FINDER(sender, data = null, receiver = 'searchBox', slot = 'slotUpdateFiles') {
      return {
        event: "updateTree",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          files: data
        }
      }
    },

    SIGNAL_LOCK(sender, receiver = 'parent', slot = 'slotLock') {
      return {
        event: "lock",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_UNLOCK(sender, receiver = 'parent', slot = 'slotUnlock') {
      return {
        event: "unlock",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_SHOW_CODES(sender, data = null, receiver = 'editor', slot = "slotShowCode") {
      return {
        event: "showCode",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          code: data,
          filename: this.$dtp.getFilename
        }
      }
    },

    SIGNAL_SHOW_CODES_PMAX(sender, data = null, receiver = 'editor', slot = "slotShowCode") {
      return {
        event: "showCode",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          code: data.code,
          filename: this.getFilename
        }
      }
    },

    SIGNAL_DEPENDS_ON_MEMORY_TO_GET_FILE(sender, result = null, receiver = 'self', slot = "slotDependsOnMemoryToGetFile") {
      return {
        event: "dependsOnMemoryToGetFile",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          mf: result.mf,
          fsize: result.fsize,
          filename: result.filename
        }
      }
    },

    SIGNAL_PUT_NEXT_FILE(sender, receiver = 'uploader', slot = "slotNextFile") {
      return {
        event: "nextFile",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_SHOW_SYS_INFO(sender, data, receiver = 'bottomBar', slot = "slotShowSysInfo") {
      return {
        event: "ShowSysInfo",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          data: data
        }
      }
    },
    SIGNAL_SHOW_MEMORY_STATUS(sender, data, receiver = 'bottomBar', slot = "slotShowMemoryStatus") {
      return {
        event: "ShowMemoryStatus",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          data: data
        }
      }
    },

    SIGNAL_SHOW_PANE(sender, receiver = 'splitVertical', slot = 'slotShowPane') {
      return {
        event: "showPane",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },
  }
}

export default signals