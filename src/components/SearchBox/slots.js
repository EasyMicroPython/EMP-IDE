var slots = {
  methods: {
    slotUpdateFiles(kwargs) {
      this.files = this.traverse(kwargs.files);
    }

  }
}

export default slots
