var slots = {
  methods: {
    slotToggleTermVisible() {
      this.termVisible = !this.termVisible;
    },

    slotResizeTerm() {
      this.term.fit();
    },

    slotClearTerm() {
      this.term.clear();
    }
  }
};

export default slots;