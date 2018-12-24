import * as emp from "../../plugins/emp";

var signals = {
  methods: {
    SIGNAL_CLEAR(sender, receiver = "cli", slot = "slotClearTerm") {
      return {
        event: "clearTerm",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      };
    },

    // 获取文件前 先获取内存与文件大小的比对,来决定 以下那种方式来获取文件内容
    SIGNAL_DEPENDS_ON_MEMORY(
      sender,
      filename = null,
      receiver = "cli",
      slot = "slotSendCommands"
    ) {
      return {
        event: "dependsOnMemory",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          filename: filename,
          command: emp.memoryAnalysing(filename)
        }
      };
    },

    // 读小文件用,内存足够的情况下,提高效率
    SIGNAL_GET_CODE(
      sender,
      filename = null,
      receiver = "cli",
      slot = "slotSendCommands"
    ) {
      return {
        event: "getCode",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          filename: filename,
          command: emp.getCode(filename)
        }
      };
    },

    // 读大文件用, 内存不足的情况下求稳,但是现在无法设置下位机的数据帧大小
    SIGNAL_GET_FILE(
      sender,
      filename = null,
      receiver = "cli",
      slot = "slotGetFile"
    ) {
      return {
        event: "getFile",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          filename: filename
        }
      };
    },

    SIGNAL_SEND_COMMAND(
      sender,
      command,
      receiver = "cli",
      slot = "slotSendCommands"
    ) {
      return {
        event: "sendComands",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          command: command
        }
      };
    }
  }
};

export default signals;
