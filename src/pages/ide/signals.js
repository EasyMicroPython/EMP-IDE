var signals = {
  methods: {

    SIGNAL_CLEAR(sender, receiver = 'terminal', slot = 'slotClearTerm') {
      return {
        event: "clearTerm",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_RESIZE_TERM(sender, receiver = 'terminal', slot = 'slotResizeTerm') {
      return {
        event: "onResize",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_RESIZE_EDITOR(sender, receiver = 'editor', slot = 'slotResizeEditor') {
      return {
        event: "onResize",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    }
  }
}

export default signals
