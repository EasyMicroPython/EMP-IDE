var signals = {
  methods: {
   
    SIGNAL_CLEAR(sender, receiver = 'cli', slot = 'slotClearTerm') {
      return {
        event: "clearTerm",
        sender: sender,
        receiver: receiver,
        slot: slot,
        kwargs: {}
      }
    },

    SIGNAL_RESIZE_TERM(sender, receiver = 'cli', slot = 'slotResizeTerm') {
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
