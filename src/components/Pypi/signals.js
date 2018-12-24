import * as emp from "../../plugins/emp";

var signals = {
  methods: {
    SIGNAL_INSTALL(sender, pkg, receiver = "cli", slot = "slotSendCommands") {
      return {
        event: "install",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          command: emp.install(pkg)
        }
      };
    }
  }
};

export default signals;
