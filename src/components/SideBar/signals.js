import * as emp from "../../plugins/emp";

var signals = {
  methods: {
    // 打开设置窗口,点击设置按钮时触发
    SIGNAL_OPENSET(sender, receiver = "parent", slot = "slotToggleSettings") {
      return {
        event: "openset",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      };
    },
    SIGNAL_CLEAR(sender, receiver = "cli", slot = "slotClearTerm") {
      return {
        event: "clearTerm",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      };
    },

    SIGNAL_SWITCH(sender, receiver = "parent", slot = "slotSwitch") {
      return {
        event: "switch",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          index: this.index
        }
      };
    },
    SIGNAL_OPEN_CONFIG(sender, receiver = "cli", slot = "slotToggleConfig") {
      return {
        event: "toggleConfig",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      };
    },

    SIGNAL_RUN(sender, receiver = "folderTree", slot = "slotRunCurrentScript") {
      return {
        event: "runCurrentScript",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      };
    },

    SIGNAL_TOGGLE_PANE(
      sender,
      receiver = "splitVertical",
      slot = "slotTogglePane"
    ) {
      return {
        event: "showPane",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      };
    },

    SIGNAL_SHOW_PANE(
      sender,
      receiver = "splitVertical",
      slot = "slotShowPane"
    ) {
      return {
        event: "hidePane",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      };
    },

    SIGNAL_GC_COLLECT(sender, receiver = "cli", slot = "slotSendCommands") {
      return {
        event: "gcCollect",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          command: emp.memoryStatus()
        }
      };
    }
  }
};

export default signals;
