var signals = {
  methods: {
    SIGNAL_INSTALL(sender, pkg, receiver = "terminal", slot = "slotSendCommands") {
      return {
        event: "install",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {
          command: this.$emp.install(pkg)
        }
      };
    }
  }
};

export default signals;
