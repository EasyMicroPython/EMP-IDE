var slots = {
    methods: {
        slotNextFile() {
            this.index += 1;
            if (this.index <= this.putFileData.length - 1) {
                this.$send(this.SIGNAL_PUT_FILE(this));
            } else {
                this.index = 0;
                this.$ws.send(this.$emp.tree());
                this.putFileData = [];
                this.putFileName = [];
                this.$refs['eluploader'].clearFiles();
            }
        },

    }
}

export default slots
