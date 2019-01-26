// import debounce from 'lodash/debounce';
var slots = {
  methods: {

    slotResizeEditor() {
      // debounce(function () {
      this.$refs["editor"].layout();

      // }, 200);
    },


    slotShowCode(kwargs) {
      this.code = kwargs.code;
      // if (this.$repl.connectionType === 1) this.code = this.code.slice(1, this.code.length - 2)
      this.openedFile = this.$dtp.getFilename;
      this.$send(this.SIGNAL_UNLOCK(this));
      setTimeout(() => this.$send(this.SIGNAL_CLEAR_TERM(this)), 300);
    },

    slotApplyFontSize(kwargs) {
      let fontSize = parseInt(kwargs.fontSize);
      if (!isNaN(fontSize))
        this.fontSize = fontSize
    },

  }
}

export default slots