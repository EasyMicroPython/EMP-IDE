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
      this.openedFile = this.$dtp.getFilename;
      // this.openedFile = '/Test.py';
      this.$send(this.SIGNAL_UNLOCK(this));
      setTimeout(() => this.$send(this.SIGNAL_CLEAR_TERM(this)), 300);
      // this.$send(this.SIGNAL_CLEAR_TERM(this));
    },

    slotApplyFontSize(kwargs) {
      let fontSize = parseInt(kwargs.fontSize);
      if (!isNaN(fontSize))
        this.fontSize = fontSize
    },

  }
}

export default slots