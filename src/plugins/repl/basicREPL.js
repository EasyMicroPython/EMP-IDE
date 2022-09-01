let basicREPL = {
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
    replExec: function (kwargs) {
        if (!this.tasklock) {
            this.$ws.send(kwargs.command);
            // TODO 这里的锁可能会导致问题，后面排查下
            // 如果是内存分析，则说明接下来是读取文件的操作，所以 上锁
            if (kwargs.command.startsWith(this.$emp.funcName(this.$emp.memoryAnalysing))) {
                this.$send(this.SIGNAL_LOCK(this));
            }
        } else this.$toast.error("IO busy");
    }

}

export default basicREPL