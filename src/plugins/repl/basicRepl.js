let basicRepl = {
    onOpen: function () {
        this.$repl.term.focus();
        this.$repl.term.write("Welcome to 1ZLAB-EMPIDE!\r\n");

        if (this.$repl.connectionType === 0)
            this.$ws.send(this.$repl.passwd + "\r");
        this.$ws.send(this.$emp.deviceInfo());
        this.$ws.send(this.$emp.memoryStatus());
        this.$ws.send(this.$emp.tree());

        this.$toast.success("WebREPL connected!");
        if (this.$ws.readyState === 1) {
            this.$send(this.SIGNAL_REPORT_CONNECTED(this));
            this.$repl.connected = true;
            this.connected = true;
        }
    },
    onClose: function () {
        this.$repl.connected = false;
        this.connected = false;
        this.$send(this.SIGNAL_REPORT_DISCONNECTED(this));
        this.$toast.error("Disconnected");
        if (this.$repl.term) {
            this.$repl.term.write("\r\n\x1b[31mDisconnected\x1b[m\r\n");
        }
    },
}

export default basicRepl